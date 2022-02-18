import type { NFTState, RPCResponse } from 'types/rpc';
import type { TransactionType } from 'types/transaction';

import { fromBech32Address } from '@zilliqa-js/crypto';
import fetch from 'cross-fetch';

import { RPCHttpProvider } from '../lib/rpc-provider';
import { RPCMethod } from '../config/rpc-methods';
import { tohexString } from '../utils/hex';
import { CryptoMetaResponse, getMeta } from './cryptometa';
import { initParser } from '../utils/init-parse';
import { Token } from '../models/token';

export class Zilliqa {
  #provider = new RPCHttpProvider();
  #http = 'https://api.zilliqa.com';

  async getInits(metas: CryptoMetaResponse[]) {
    if (metas.length === 0) {
      throw new Error('meta Array is empty');
    }
  
    const base16Addresses = metas.map(({ bech32 }) => fromBech32Address(bech32));
    const requests = base16Addresses.map((address) => this.#provider.buildBody(
      RPCMethod.GetSmartContractInit,
      [tohexString(address)]
    ));
    const resList = await this.#send(requests);
    const result: Token[] = [];

    for (let index = 0; index < metas.length; index++) {
      const { bech32, score } = metas[index];
      const base16 = base16Addresses[index];
      const res = resList[index];

      try {
        const init = initParser(res.result);
        const token = new Token(
          bech32,
          base16,
          init.name,
          init.symbol,
          init.type,
          init.decimals,
          score,
          init.initSupply,
          init.contractOwner,
          init.baseUri
        );
        result.push(token);
      } catch (err) {
        console.error(err, bech32, JSON.stringify(res.result, null, 4));
      }
    }

    return result;
  }

  async getNFTState(address: string) {
    const owners = 'token_owners';
    const urls = 'token_uris';
    const requests = [
      this.#provider.buildBody(
        RPCMethod.GetSmartContractSubState,
        [tohexString(address), owners, []]
      ),
      this.#provider.buildBody(
        RPCMethod.GetSmartContractSubState,
        [tohexString(address), urls, []]
      )
    ];
    let resList;
    try {
      resList = await this.#send(requests);
    } catch {
      return {};
    }
    const [ownersList, urlsList] = resList;
    const urlsState = urlsList.result[urls];
    const ownersState = ownersList.result[owners];
    const list: NFTState = {};

    for (const key in ownersState) {
      const owner = ownersState[key];
      const url = urlsState[key];

      if (!Array.isArray(list[owner])) {
        list[owner] = [];
      }

      list[owner].push({
        url,
        id: key
      });
    }

    return list;
  }

  async getBlockBody(blockNumber: string) {
    const bach = [
      this.#provider.buildBody(
        RPCMethod.GetTxnBodiesForTxBlock,
        [String(blockNumber)]
      ),
    ];
    const [{ result, error }] = await this.#send(bach);

    if (error) {
      console.log(error);
    }
  
    return result as TransactionType[];
  }

  async #send(batch: object[]): Promise<RPCResponse[]> {
    const res = await fetch(this.#http, {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(batch),
    });
    return res.json();
  }
}

// const t = new Zilliqa();

// t.getNFTState('0xb4d83becb950c096b001a3d1c7abb10f571ae75f');

// getMeta().then((keys) => {
//   return t.getInits(keys);
// }).then((inits) => {
//   console.log(JSON.stringify(inits, null, 2));
// });

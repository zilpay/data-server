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
import { TokenStatus } from '../config/token-status';

export class Zilliqa {
  #provider = new RPCHttpProvider();
  #http = 'https://api.zilliqa.com';

  async getInits(metas: CryptoMetaResponse[]) {
    if (metas.length === 0) {
      throw new Error('meta Array is empty');
    }
  
    const baseURIField = 'base_uri';
    const base16List = metas.map(({ bech32 }) => fromBech32Address(bech32));
    const requestsInits = base16List.map((address) => this.#provider.buildBody(
      RPCMethod.GetSmartContractInit,
      [tohexString(address)]
    ));
    const requestsUri = base16List.map((address) => this.#provider.buildBody(
      RPCMethod.GetSmartContractSubState,
      [tohexString(address), baseURIField, []]
    ));
    const initsList = await this.#send(requestsInits);
    const baseURIList = await this.#send(requestsUri);
    const result: Token[] = [];

    for (let index = 0; index < metas.length; index++) {
      const { bech32, score } = metas[index];
      const base16 = base16List[index];
      const resInit = initsList[index].result;
      let resUri = baseURIList[index].result;

      if (resUri && resUri[baseURIField]) {
        resUri = resUri[baseURIField];
      }

      const init = initParser(resInit);
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
        init.baseUri || resUri
      );
      if (!init.name || !init.symbol) {
        token.status = TokenStatus.Blocked;
      }
      result.push(token);
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
    resList = await this.#send(requests);
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

    if (Object.keys(list).length === 0) {
      return {
        ['0x0000000000000000000000000000000000000000']: [{
          id: '0',
          url: ''
        }]
      };
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
      throw new Error(error.message);
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

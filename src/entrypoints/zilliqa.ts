import type { RPCResponse } from 'types/rpc';

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

// getMeta().then((keys) => {
//   return t.getInits(keys);
// }).then((inits) => {
//   console.log(JSON.stringify(inits, null, 2));
// });

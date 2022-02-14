import type { AddressInit, RPCResponse } from 'types/rpc';

import { fromBech32Address } from '@zilliqa-js/crypto';
import fetch from 'cross-fetch';

import { RPCHttpProvider } from '../lib/rpc-provider';
import { RPCMethod } from '../config/rpc-methods';
import { tohexString } from '../utils/hex';
import { getMeta } from './cryptometa';

export class Zilliqa {
  #provider = new RPCHttpProvider();
  #http = 'https://api.zilliqa.com';

  public async getInits(addresses: string[]) {
    if (addresses.length === 0) {
      throw new Error('Addresses Array is empty');
    }
  
    const requests = addresses.map((address) => this.#provider.buildBody(
      RPCMethod.GetSmartContractInit,
      [tohexString(address)]
    ));
    const resList = await this.#send(requests);
    const result: AddressInit = {};

    for (let index = 0; index < addresses.length; index++) {
      const address = addresses[index];
      const res = resList[index];

      result[address] = res.result || null;
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

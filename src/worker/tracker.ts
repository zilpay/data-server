import type { WSResponse } from 'types/ws';

import { toChecksumAddress } from '@zilliqa-js/crypto';

import { Block } from '../models/block';

import bunyan from 'bunyan';

import { initORM } from '../orm';
import { sleep } from '../utils/sleep';
import { Zilliqa } from '../entrypoints/zilliqa';
import { WebSocketProvider, WSMessageTypes } from '../entrypoints/ws-provider';
import { DEX } from '../config/dex';

const log = bunyan.createLogger({
  name: "TRACK_TASK"
});
const chain = new Zilliqa('https://dev-api.zilliqa.com');
const ws = new WebSocketProvider('wss://dev-api-ws.zilliqa.com');

(async function(){
  let latestBlockNumber = 0;
  const orm = await initORM();

  async function updateFromBlock(blockNumber: string) {
    const list = await chain.getBlockBody(blockNumber);
    const addrSet = new Set<string>();

    console.log(list);

    for (const tx of list) {
      if (!tx.receipt.transitions) {
        continue;
      }
  
      for (const transition of tx.receipt.transitions) {
        addrSet.add(toChecksumAddress(transition.addr));
        addrSet.add(toChecksumAddress(transition.msg._recipient));
      }
    }

    if (addrSet.has(DEX)) {
      console.log(Array.from(addrSet));
    }
  }

  // ws.on(WSMessageTypes.NewBlock, async(data: WSResponse) => {
  //   const block = new Block(data.TxBlock);
  //   await orm.em.persistAndFlush(block);

  //   await sleep(5000);

  //   log.info(`jsut created a new block`, block.blockNum);
  //   try {
  //     await updateFromBlock(String(block.blockNum));
  //   } catch (err) {
  //     log.error(`method updateFromBlock`, err);
  //   }
  // });

  setInterval(async() => {
    const block = await chain.getLatestBlock();

    if (latestBlockNumber < Number(block.header.BlockNum)) {
      latestBlockNumber = Number(block.header.BlockNum);

      try {
        await updateFromBlock(block.header.BlockNum);
      } catch (err) {
        log.warn((err as Error).message);
      }
    }
  }, 5000);
}());

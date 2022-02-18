import type { WSResponse } from 'types/ws';

import { toChecksumAddress } from '@zilliqa-js/crypto';

import { Token } from '../models/token';
import { NFTState } from '../models/nft-state';
import { Block } from '../models/block';

import { initORM } from '../orm';
import { TokenTypes } from '../config/token-types';
import { Zilliqa } from '../entrypoints/zilliqa';
import { TokenStatus } from '../config/token-status';
import { WebSocketProvider, WSMessageTypes } from '../entrypoints/ws-provider';

const chain = new Zilliqa();
const ws = new WebSocketProvider('wss://api-ws.zilliqa.com');

(async function(){
  const orm = await initORM();

  async function updateState(tokens: Token[]) {
    for (const t of tokens) {
      try {
        // await t.balances.init()
        // t.balances.removeAll();
        const states = await chain.getNFTState(t.base16);
        const owners = Object.keys(states);
  
        for (const onwer of owners) {
          const list = states[onwer].map((s) => new NFTState(s.id, s.url, onwer));
          t.balances.add(...list);
        }
      } catch (err) {
        t.status = TokenStatus.Blocked;
      }
    }
  
    await orm.em.persistAndFlush(tokens);
  
    console.log(tokens.map((t) => t.symbol), 'updated');
  }

  async function update() {
    try {
      const list = await orm.em.getRepository(Token).find({
        type: TokenTypes.ZRC1,
        status: TokenStatus.Enabled,
        balances: null
      }, {
        limit: 10
      });
  
      await updateState(list);
    } catch (err) {
      console.error(err);
    }
  }

  async function updateFromBlock(blockNumber: string) {
    const list = await chain.getBlockBody(blockNumber);
    const addrSet = new Set<string>();
  
    for (const tx of list) {
      if (!tx.receipt.transitions) {
        continue;
      }
  
      for (const transition of tx.receipt.transitions) {
        addrSet.add(toChecksumAddress(transition.addr));
        addrSet.add(toChecksumAddress(transition.msg._recipient));
      }
    }
    
    const tokens = await orm.em.getRepository(Token).find({
      status: TokenStatus.Enabled,
      type: TokenTypes.ZRC1,
      base16: Array.from(addrSet)
    });
  
    if (tokens && tokens.length > 0) {
      await updateState(tokens);
    }
  }

  // ws.on(WSMessageTypes.NewBlock, async(data: WSResponse) => {
  //   const block = new Block(data.TxBlock);
  //   await orm.em.persistAndFlush(block);
  //   try {
  //     await updateFromBlock(String(data.TxBlock.header.BlockNum));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // });

  setInterval(() => update(), 10000);

  await update();
}());

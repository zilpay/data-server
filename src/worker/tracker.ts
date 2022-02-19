import type { WSResponse } from 'types/ws';

import { toChecksumAddress } from '@zilliqa-js/crypto';

import { Token } from '../models/token';
import { NFTState } from '../models/nft-state';
import { Block } from '../models/block';

import bunyan from 'bunyan';

import { initORM } from '../orm';
import { TokenTypes } from '../config/token-types';
import { Zilliqa } from '../entrypoints/zilliqa';
import { TokenStatus } from '../config/token-status';
import { WebSocketProvider, WSMessageTypes } from '../entrypoints/ws-provider';

const log = bunyan.createLogger({
  name: "TRACK_TASK"
});
const chain = new Zilliqa();
const ws = new WebSocketProvider('wss://api-ws.zilliqa.com');

(async function(){
  const orm = await initORM();

  async function updateState(tokens: Token[]) {
    log.info('start update state, tokens: ', tokens.map((t) => t.symbol).join(','));
    await orm.em.getRepository(NFTState).nativeDelete({
      nft: tokens
    });
    for (const t of tokens) {
      await t.balances.init();
      t.balances.removeAll();
      try {
        const states = await chain.getNFTState(t.base16);
        const owners = Object.keys(states);

        for (const onwer of owners) {
          const list = states[onwer].map((s) => new NFTState(s.id, s.url, onwer));
          t.balances.add(...list);
        }
      } catch (err) {
        log.error('updateState, tokens: ', tokens.map((t) => t.symbol).join(','), err);
      }
    }

    await orm.em.persistAndFlush(tokens);
    log.info('state have just updated, tokens: ', tokens.map((t) => t.symbol).join(','));
  }

  async function updateEmptys() {
    try {
      const list = await orm.em.getRepository(Token).find({
        type: TokenTypes.ZRC1,
        status: TokenStatus.Enabled,
        balances: null
      }, {
        limit: 3
      });
  
      await updateState(list);
    } catch (err) {
      log.error('updateEmptys', err);
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

    log.info(`tokens from block ${tokens.map((t) => t.symbol).join(',')}`);

    if (tokens && tokens.length > 0) {
      await updateState(tokens);
    }
  }

  ws.on(WSMessageTypes.NewBlock, async(data: WSResponse) => {
    const block = new Block(data.TxBlock);
    await orm.em.persistAndFlush(block);
    log.info(`jsut created a new block`, block.blockNum);
    try {
      await updateFromBlock(String(block.blockNum));
    } catch (err) {
      log.error(`method updateFromBlock`, err);
    }
  });

  await updateEmptys();

  setInterval(async() => await updateEmptys(), 50000);
}());

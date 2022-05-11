import type { WSResponse } from 'types/ws';

import bunyan from 'bunyan';

import { initORM } from '../orm';
import { Zilliqa } from '../entrypoints/zilliqa';
// import { WebSocketProvider, WSMessageTypes } from '../entrypoints/ws-provider';
import { DEX } from '../config/dex';
import { Token } from '../models/token';

const log = bunyan.createLogger({
  name: "TRACK_TASK"
});
const chain = new Zilliqa('https://dev-api.zilliqa.com');
// const ws = new WebSocketProvider('wss://dev-api-ws.zilliqa.com');

(async function(){
  const orm = await initORM();
  const tokenRepo = orm.em.getRepository(Token);

  async function update() {
    const tokens = Object.keys(await chain.getContributions(DEX));

    const notListedTokens = await tokenRepo.find({
      base16: tokens,
      listed: false
    });
  
    for (const token of notListedTokens) {
      token.listed = true;
    }
  
    await tokenRepo.persistAndFlush(notListedTokens);

    log.info('updated', notListedTokens.map((t) => t.symbol).join(', '));
  }

  await update();

  setInterval(() => {
    update();
  }, 50000);
}());

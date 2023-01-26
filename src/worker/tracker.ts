import type { Pool } from 'types/pool';

import bunyan from 'bunyan';
import fs from 'fs';
import path from 'path';

import { initORM } from '../orm';
import { Zilliqa } from '../entrypoints/zilliqa';
import { DEX } from '../config/dex';
import { Token } from '../models/token';
import { TokenStatus } from '../config/token-status';

const log = bunyan.createLogger({
  name: "TRACK_TASK"
});
const chain = new Zilliqa();

(async function(){
  const orm = await initORM();
  const tokenRepo = orm.em.getRepository(Token);

  async function update() {
    const pools = await chain.getPools(DEX);
    const tokens = Object.keys(pools);

    const foundTokens = await tokenRepo.find({
      base16: tokens
    });
    const newState: Pool = {};

    for (const token of foundTokens) {
      newState[token.base16] = pools[token.base16].arguments;
    }

    try {
      fs.writeFileSync(path.join(__dirname, '../cache/pools.json'), JSON.stringify(newState, null, 2));
    } catch (err) {
      log.error('cahce JSON file', err);
    }

    const notListedTokens = await tokenRepo.find({
      base16: tokens,
      listed: false,
      status: TokenStatus.Enabled,
      scope: {
        $gt: 1
      }
    });

    for (const token of notListedTokens) {
      token.listed = true;
    }

    await tokenRepo.persistAndFlush(notListedTokens);

    log.info('updated', notListedTokens.map((t) => t.symbol).join(', '));
  }

  try {
    await update();
  } catch (err) {
    log.error('update', err);
  }

  setInterval(async() => {
    try {
      await update();
    } catch (err) {
      log.error('update', err);
    }
  }, 90000);
}());

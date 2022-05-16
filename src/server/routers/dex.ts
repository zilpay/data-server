import { MikroORM, IDatabaseDriver, Connection, QueryOrder } from '@mikro-orm/core';
import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { TokenStatus } from '../../config/token-status';
import { TokenTypes } from '../../config/token-types';
import { Token } from '../../models/token';
import { Rate } from '../../models/rate';

export const dex = Router();

const cachePath = path.join(__dirname, '../../cache/pools.json');
let pools = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

dex.get('/dex', async (req: Request, res: Response) => {
  const orm: MikroORM<IDatabaseDriver<Connection>> = req.app.get('orm');
  const rateRepo = orm.em.getRepository(Rate);
  const tokenRepo = orm.em.getRepository(Token);

  try {
    const limit = Number(req.query.limit) || 100;
    const offset = Number(req.query.offset) || 0;
    const [list, count] = await tokenRepo.findAndCount({
      type: TokenTypes.ZRC2,
      status: TokenStatus.Enabled,
      listed: true
    }, {
      cache: 10,
      limit,
      offset,
      orderBy: {
        scope: QueryOrder.DESC
      },
      fields: [
        'base16',
        'bech32',
        'name',
        'symbol',
        'decimals',
        'scope'
      ]
    });
    const lastId = await rateRepo.count();
    const ratesData = await rateRepo.findOne({
      id: lastId
    }, {
      cache: 5,
      fields: [
        'usd'
      ]
    });

    res.status(200).json({
      tokens: {
        list,
        count
      },
      pools,
      rate: ratesData?.usd || 0
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: (err as Error).message
    });
  }

  pools = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
});

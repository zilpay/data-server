import { MikroORM, IDatabaseDriver, Connection, QueryOrder, PopulateHint } from '@mikro-orm/core';
import { Router, Request, Response } from 'express';
import { toChecksumAddress } from '@zilliqa-js/crypto';

import { TokenStatus } from '../../config/token-status';
import { TokenTypes } from '../../config/token-types';
import { Token } from '../../models/token';
import { authMiddleware } from '../middleware/auth';

export const tokens = Router();

tokens.get('/tokens', async (req: Request, res: Response) => {
  const orm: MikroORM<IDatabaseDriver<Connection>> = req.app.get('orm');
  try {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const type = Number(req.query.type) || TokenTypes.ZRC1;
    const [list, count] = await orm.em.getRepository(Token).findAndCount({
      type,
      status: TokenStatus.Enabled
    }, {
      cache: 5,
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
        'type',
        'decimals',
        'baseUri',
        'scope'
      ]
    });
  
    res.status(200).json({
      list,
      count
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: (err as Error).message
    });
  }
});

tokens.get('/nfts/:addr', async (req: Request, res: Response) => {
  const orm: MikroORM<IDatabaseDriver<Connection>> = req.app.get('orm');
  const status = TokenStatus.Enabled;
  const type = TokenTypes.ZRC1;
  try {
    const addr = toChecksumAddress(req.params.addr);
    const list = await orm.em.getRepository(Token).find({
      status,
      type,
      // @ts-ignore
      balances: {
        base16: String(addr).toLowerCase()
      }
    }, {
      populate: ['balances.url', 'balances.tokenId'],
      populateWhere: PopulateHint.INFER,
      fields: [
        'base16',
        'bech32',
        'name',
        'symbol',
        'balances.tokenId',
        'balances.url',
        'baseUri'
      ]
    });
  
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: (err as Error).message
    });
  }
});

tokens.put('/token/:id', authMiddleware, async (req: Request, res: Response) => {
  const orm: MikroORM<IDatabaseDriver<Connection>> = req.app.get('orm');
  const id = Number(req.params.id);
  const data = req.body;

  try {
    const token = await orm.em.getRepository(Token).findOne({
      id
    });

    console.log(token);

    if (!token) {
      return res.status(204).json({
        code: 204,
        message: 'Token not found'
      });
    }

    if (data && typeof data.scope !== 'undefined') {
      token.scope = Number(data.scope);
    }
    if (data && data.baseUri) {
      token.baseUri = data.baseUri;
    }
    if (data && typeof data.status !== 'undefined') {
      token.status = Number(data.status);
    }
    if (data && typeof data.listed !== 'undefined') {
      token.listed = Boolean(data.listed);
    }
    if (data && typeof data.base16 !== 'undefined') {
      token.base16 = String(data.base16);
      token.bech32 = String(data.bech32);
    }
    if (data && typeof data.name !== 'undefined') {
      token.name = String(data.name);
    }
    if (data && typeof data.symbol !== 'undefined') {
      token.symbol = String(data.symbol);
    }
    if (data && typeof data.decimals !== 'undefined') {
      token.decimals = Number(data.decimals);
    }

    await orm.em.getRepository(Token).persistAndFlush([token]);

    res.status(201).json(token);
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: (err as Error).message
    });
  }
});

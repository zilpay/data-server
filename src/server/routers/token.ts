import { MikroORM, IDatabaseDriver, Connection, QueryOrder } from '@mikro-orm/core';
import { Router, Request, Response } from 'express';
import { Token } from '../../models/token';

export const tokens = Router();

tokens.get('/tokens', async (req: Request, res: Response) => {
  const orm: MikroORM<IDatabaseDriver<Connection>> = req.app.get('orm');
  try {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;
    const type = Number(req.query.type);
    const list = await orm.em.getRepository(Token).find({ type }, {
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
  
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: (err as Error).message
    });
  }
});

import { MikroORM, IDatabaseDriver, Connection, QueryOrder } from '@mikro-orm/core';
import { Router, Request, Response } from 'express';
import { Token } from '../../models/token';
import { authMiddleware } from '../middleware/auth';

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

tokens.put('/token/:id', authMiddleware, async (req: Request, res: Response) => {
  const orm: MikroORM<IDatabaseDriver<Connection>> = req.app.get('orm');
  const id = Number(req.params.id);
  const data = req.body;

  try {
    const token = await orm.em.getRepository(Token).findOne({
      id
    });

    if (!token) {
      return res.status(204).json({
        code: 204,
        message: 'Token not found'
      });
    }

    if (data && data.scope) {
      token.scope = data.scope;
    }
    if (data && data.baseUri) {
      token.baseUri = data.baseUri;
    }

    await orm.em.getRepository(Token).persistAndFlush([token]);
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: (err as Error).message
    });
  }
});

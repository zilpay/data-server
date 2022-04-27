import { MikroORM, IDatabaseDriver, Connection, QueryOrder } from '@mikro-orm/core';
import { Router, Request, Response } from 'express';

import { Rate } from '../../models/rate';

export const ratesRoute = Router();

ratesRoute.get('/rates', async (req: Request, res: Response) => {
  const orm: MikroORM<IDatabaseDriver<Connection>> = req.app.get('orm');
  const rateRepo = orm.em.getRepository(Rate);
  try {
    const currency = req.query.currency ? String(req.query.currency).split(',') : undefined;
    const lastId = await rateRepo.count();
    const ratesData = await rateRepo.findOne({
      id: lastId
    }, {
      cache: 5,
      fields: currency as any
    });
  
    res.status(200).json(ratesData);
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: (err as Error).message
    });
  }
});

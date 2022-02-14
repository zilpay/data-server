import { MikroORM, IDatabaseDriver, Connection } from '@mikro-orm/core';
import { Router, Request, Response } from 'express';

export const tokens = Router();

tokens.get('/tokens', (req: Request, res: Response) => {
  const orm: MikroORM<IDatabaseDriver<Connection>> = req.app.get('orm');

  console.log(orm);

  res.json({
    loh: true
  });
});

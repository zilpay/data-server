import { Router, Request, Response } from 'express';

export const tokens = Router();

tokens.get('/tokens', (req: Request, res: Response) => {

  res.json({
    loh: true
  });
});

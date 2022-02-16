import { NextFunction, Request, Response } from 'express';

const KEY = String(process.env.TOKEN);

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = String(req.headers.authorization);

  if (KEY === token) {
    return next();
  }

  return res.status(203).json({
    status: 203,
    message: 'Incorrect Key'
  });
}

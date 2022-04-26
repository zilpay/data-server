import { Router } from 'express';
import { tokens } from './token';
import { ratesRoute } from './rate';

export const router = Router();

router.use('/api/v1', tokens, ratesRoute);

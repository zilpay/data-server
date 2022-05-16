import { Router } from 'express';
import { tokens } from './token';
import { ratesRoute } from './rate';
import { dex } from './dex';

export const router = Router();

router.use('/api/v1', tokens, ratesRoute, dex);

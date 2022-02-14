import { Router } from 'express';
import { tokens } from './token';

export const router = Router();

router.use('/api/v1', tokens);

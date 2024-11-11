import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import cnRoutes from './cn-routes.js';
import jokesRoutes from './jokes-routes.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/api', authenticateToken, apiRoutes);
router.use('/cnroute', cnRoutes);
router.use('/jokesroute', authenticateToken, jokesRoutes);
export default router;



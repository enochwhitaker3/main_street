// backend/src/routes/plays.ts
import express from 'express';
import { getAllPlays } from '../controllers/plays_controller';

const router = express.Router();
router.get('/plays', getAllPlays);

export default router;
// Dependencies
import { Router } from 'express';

import { apiStatus } from '../controllers/';

const router = Router();

router.get('/', apiStatus);

export default router;

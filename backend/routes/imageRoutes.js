import { Router } from 'express';
import { getAllImages } from '../controllers/ImageControllers.js';

const router = Router();

router.get('/', getAllImages);

export default router;

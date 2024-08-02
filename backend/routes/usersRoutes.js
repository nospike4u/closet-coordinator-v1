import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
} from '../controllers/userControllers.js';

import {
  isAdmin,
  isAuthenticated,
  isOwnerOrAdmin,
} from '../middlewares/authMiddlewares.js';

const router = Router();

router.get('/', isAuthenticated, getAllUsers);
router.post('/', createUser);
router.use(isAuthenticated, isOwnerOrAdmin);
router.route(`/:id`).get(getUser).put(updateUser).delete(deleteUser);

export default router;

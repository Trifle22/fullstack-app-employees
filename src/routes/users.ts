import { current, login, register } from '@/controllers/users';
import express from 'express';
import { auth } from '@/middleware/auth';
const router = express.Router();

/* GET users listing. */
router.post('/login', login);
router.post('/register', register);
router.get ('/current', auth, current);
export default router;

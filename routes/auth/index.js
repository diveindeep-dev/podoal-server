import express from 'express';
import { checkId, create, getToken, getLoginUser } from './controller.js';
import { loginValidation, verifyToken } from '../middlewares/authValidation.js';

const router = express.Router();

router.get('/signup/check/:checkedId', checkId);
router.post('/signup', create);
router.post('/login', loginValidation, getToken);
router.get('/', verifyToken, getLoginUser);

export default router;

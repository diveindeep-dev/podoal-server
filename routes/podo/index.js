import express from 'express';
import { create, getList } from './controller.js';
import { verifyToken } from '../middlewares/authValidation.js';

const router = express.Router();

router.post('/new', verifyToken, create);
router.get('/list/:page', getList);

export default router;

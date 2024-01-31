import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('express router');
});

export default router;

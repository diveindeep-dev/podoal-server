import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { STATUS } from '../../config/index.js';

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const loginValidation = async (req, res, next) => {
  try {
    const { profileId, password } = req.body;
    const user = await User.findOne({ profileId });
    if (!user) {
      return res.status(STATUS.UNAUTHORIZED).json({
        message: '아이디 혹은 비밀번호를 정확하게 입력하세요.',
      });
    }

    const isCorrectPassword = await comparePassword(password, user.password);
    if (!isCorrectPassword) {
      return res.status(STATUS.UNAUTHORIZED).json({
        message: '아이디 혹은 비밀번호를 정확하게 입력하세요.',
      });
    } else {
      req.user = { _id: user._id };
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyToken = (req, res, next) => {
  const headerToken = req.headers.authorization;
  const bearer = headerToken.split(' ');
  const token = bearer[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, authorized) => {
    if (err) {
      return res
        .status(STATUS.UNAUTHORIZED)
        .json({ message: '로그인이 필요합니다.' });
    } else {
      req.authorizedUser = authorized;
      next();
    }
  });
};

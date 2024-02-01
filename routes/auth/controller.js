import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import { STATUS } from '../../config/index.js';

export const checkId = async (req, res, next) => {
  try {
    const checkedId = req.params.checkedId;
    const isUser = await User.findOne({ profileId: checkedId });
    if (isUser) {
      return res.status(STATUS.CONFLICT).json({
        message: `아이디(${checkedId})가 이미 존재합니다.`,
      });
    } else {
      return res.status(STATUS.OK).json({
        message: `사용 가능한 아이디(${checkedId})입니다.`,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(STATUS.CREATED).end();
  } catch (err) {
    next(err);
  }
};

export const getToken = (req, res, next) => {
  const jwtToken = jwt.sign(req.user, process.env.JWT_SECRET, {
    expiresIn: '5d',
  });
  return res.status(STATUS.OK).json({
    token: jwtToken,
  });
};

export const getLoginUser = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.authorizedUser._id,
      '_id profileId name',
    );
    return res.status(STATUS.OK).json({
      loginUser: {
        _id: user._id,
        name: user.name,
        profileId: user.profileId,
      },
    });
  } catch (error) {
    next(error);
  }
};

import { STATUS } from '../../config/index.js';
import Podo from '../../models/Podo.js';
import Tag from '../../models/Tag.js';
import User from '../../models/User.js';

export const create = async (req, res, next) => {
  try {
    const user = req.authorizedUser._id;
    const { title, reward, tags, icon } = req.body;
    const newPodo = new Podo({ user, title, reward, icon });
    const savedPodo = await newPodo.save();

    const getTagId = async (tag) => {
      const isTag = await Tag.findOneAndUpdate(
        { text: tag },
        {
          $addToSet: {
            podos: savedPodo._id,
          },
        },
        { new: true },
      );

      if (isTag) {
        return isTag._id;
      } else {
        const newTag = new Tag({
          text: tag,
          podos: [savedPodo._id],
        });
        const resTag = await newTag.save();
        return resTag._id;
      }
    };

    const tagIds = await Promise.all(
      tags.map((tag) => {
        return getTagId(tag);
      }),
    );

    await User.findByIdAndUpdate(user, {
      $push: {
        podos: savedPodo._id,
        tags: tagIds,
      },
    });

    await Podo.findByIdAndUpdate(savedPodo._id, {
      tags: tagIds,
    });

    res.status(STATUS.CREATED).end();
  } catch (err) {
    next(err);
  }
};

export const getList = async (req, res, next) => {
  try {
    const page = req.params.page;
    const limit = 5;
    const podos = await Podo.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name profileId')
      .populate('tags', 'text')
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(STATUS.OK).json({
      podos,
    });
  } catch (err) {
    next(err);
  }
};

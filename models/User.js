import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  profileId: { type: String, reqire: true },
  name: { type: String, reqire: true },
  password: { type: String, require: true },
  podos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Podo', default: [] }],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', default: [] }],
});

userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10, function (err, hashed) {
      if (err) return next(err);
      user.password = hashed;
      next();
    });
  } else {
    next();
  }
});

userSchema.set('timestamps', true);

export default mongoose.model('User', userSchema);

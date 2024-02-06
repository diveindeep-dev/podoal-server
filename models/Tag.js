import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  text: { type: String, require: true },
  podos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Podo',
      default: [],
    },
  ],
});

tagSchema.set('timestamps', true);

export default mongoose.model('Tag', tagSchema);

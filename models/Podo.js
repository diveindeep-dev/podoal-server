import mongoose from 'mongoose';

const podoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, require: true },
  icon: { type: String },
  podoals: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Podoal', default: [] },
  ],
  reward: { type: String },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', default: [] }],
  startDate: { type: String },
});

podoSchema.set('timestamps', true);

export default mongoose.model('Podo', podoSchema);

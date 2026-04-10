import mongoose from 'mongoose';

const learningSchema = new mongoose.Schema({
  name: { type: String, required: true },
  platform: { type: String },
  status: { type: String, default: 'In Progress' },
  description: { type: String },
  iconName: { type: String, default: 'BookOpen' }
}, { timestamps: true });

export default mongoose.model('Learning', learningSchema);

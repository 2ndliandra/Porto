import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model('Organization', organizationSchema);

import mongoose from 'mongoose';

const academicSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model('Academic', academicSchema);

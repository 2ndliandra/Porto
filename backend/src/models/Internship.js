import mongoose from 'mongoose';

const internshipSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

export default mongoose.model('Internship', internshipSchema);

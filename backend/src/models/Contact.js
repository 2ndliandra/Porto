import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  github: { type: String },
  githubUsername: { type: String },
  instagram: { type: String },
  instagramUsername: { type: String },
  linkedin: { type: String },
  linkedinUsername: { type: String }
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);

import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  techStack: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
  // Deprecated: keeping for backward compatibility
  image: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);
export default Project;

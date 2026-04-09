import mongoose from 'mongoose';

const softSkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const SoftSkill = mongoose.model('SoftSkill', softSkillSchema);
export default SoftSkill;

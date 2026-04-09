import Learning from '../models/Learning.js';

export const getLearnings = async (req, res) => {
  try {
    const learnings = await Learning.find().sort({ createdAt: -1 });
    res.json(learnings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLearning = async (req, res) => {
  try {
    const learning = await Learning.create(req.body);
    res.status(201).json(learning);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateLearning = async (req, res) => {
  try {
    const learning = await Learning.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!learning) return res.status(404).json({ message: 'Learning not found' });
    res.json(learning);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteLearning = async (req, res) => {
  try {
    const learning = await Learning.findByIdAndDelete(req.params.id);
    if (!learning) return res.status(404).json({ message: 'Learning not found' });
    res.json({ message: 'Learning removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

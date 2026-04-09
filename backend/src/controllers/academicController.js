import Academic from '../models/Academic.js';

export const getAcademics = async (req, res) => {
  try {
    const academics = await Academic.find().sort({ createdAt: -1 });
    res.json(academics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAcademic = async (req, res) => {
  try {
    const academic = await Academic.create(req.body);
    res.status(201).json(academic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAcademic = async (req, res) => {
  try {
    const academic = await Academic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!academic) return res.status(404).json({ message: 'Academic record not found' });
    res.json(academic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAcademic = async (req, res) => {
  try {
    const academic = await Academic.findByIdAndDelete(req.params.id);
    if (!academic) return res.status(404).json({ message: 'Academic record not found' });
    res.json({ message: 'Academic record removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

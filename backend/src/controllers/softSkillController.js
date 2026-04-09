import SoftSkill from '../models/SoftSkill.js';

// @desc    Get all soft skills
// @route   GET /api/softskills
// @access  Public
export const getSoftSkills = async (req, res) => {
  try {
    const softSkills = await SoftSkill.find({});
    res.json(softSkills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single soft skill
// @route   GET /api/softskills/:id
// @access  Public
export const getSoftSkillById = async (req, res) => {
  try {
    const softSkill = await SoftSkill.findById(req.params.id);
    if (softSkill) {
      res.json(softSkill);
    } else {
      res.status(404).json({ message: 'Soft skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a soft skill
// @route   POST /api/softskills
// @access  Public (No auth for CRM)
export const createSoftSkill = async (req, res) => {
  try {
    const { name, iconName } = req.body;
    const softSkill = new SoftSkill({
      name,
      iconName,
    });
    const createdSoftSkill = await softSkill.save();
    res.status(201).json(createdSoftSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a soft skill
// @route   PUT /api/softskills/:id
// @access  Public
export const updateSoftSkill = async (req, res) => {
  try {
    const { name, iconName } = req.body;
    const softSkill = await SoftSkill.findById(req.params.id);

    if (softSkill) {
      if (name !== undefined) softSkill.name = name;
      if (iconName !== undefined) softSkill.iconName = iconName;

      const updatedSoftSkill = await softSkill.save();
      res.json(updatedSoftSkill);
    } else {
      res.status(404).json({ message: 'Soft skill not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a soft skill
// @route   DELETE /api/softskills/:id
// @access  Public
export const deleteSoftSkill = async (req, res) => {
  try {
    const softSkill = await SoftSkill.findById(req.params.id);
    if (softSkill) {
      await softSkill.deleteOne();
      res.json({ message: 'Soft skill removed' });
    } else {
      res.status(404).json({ message: 'Soft skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

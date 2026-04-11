import Experience from '../models/Experience.js';

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({});
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single experience
// @route   GET /api/experiences/:id
// @access  Public
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      res.json(experience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an experience
// @route   POST /api/experiences
// @access  Public (No auth for CRM)
export const createExperience = async (req, res) => {
  try {
    const { role, company, year, description } = req.body;
    const experience = new Experience({
      role,
      company,
      year,
      description,
    });
    const createdExperience = await experience.save();
    res.status(201).json(createdExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an experience
// @route   PUT /api/experiences/:id
// @access  Public
export const updateExperience = async (req, res) => {
  try {
    const { role, company, year, description } = req.body;
    const experience = await Experience.findById(req.params.id);

    if (experience) {
      if (role !== undefined) experience.role = role;
      if (company !== undefined) experience.company = company;
      if (year !== undefined) experience.year = year;
      if (description !== undefined) experience.description = description;

      const updatedExperience = await experience.save();
      res.json(updatedExperience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an experience
// @route   DELETE /api/experiences/:id
// @access  Public
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      await experience.deleteOne();
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

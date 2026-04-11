import Project from '../models/Project.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Public (No auth for CRM)
export const createProject = async (req, res) => {
  try {
    const { title, description, techStack, image, images, link } = req.body;

    // Support both single image and multiple images
    const projectImages = images && Array.isArray(images) ? images : (image ? [image] : []);

    const project = new Project({
      title,
      description,
      techStack,
      images: projectImages,
      image: image || (projectImages.length > 0 ? projectImages[0] : ''), // Backward compatibility
      link,
    });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Public
export const updateProject = async (req, res) => {
  try {
    const { title, description, techStack, image, images, link } = req.body;
    const project = await Project.findById(req.params.id);

    if (project) {
      if (title !== undefined) project.title = title;
      if (description !== undefined) project.description = description;
      if (techStack !== undefined) project.techStack = techStack;

      // Handle both single and multiple images
      if (images !== undefined && Array.isArray(images)) {
        project.images = images;
        project.image = images.length > 0 ? images[0] : ''; // Set first image as thumbnail for backward compatibility
      } else if (image !== undefined) {
        project.image = image;
        // Preserve existing images array or create new one with single image
        if (project.images.length === 0) {
          project.images = [image];
        }
      }

      if (link !== undefined) project.link = link;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Public
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

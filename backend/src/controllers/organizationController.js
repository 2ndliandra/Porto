import Organization from '../models/Organization.js';

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find().sort({ createdAt: -1 });
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createOrganization = async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!organization) return res.status(404).json({ message: 'Organization not found' });
    res.json(organization);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findByIdAndDelete(req.params.id);
    if (!organization) return res.status(404).json({ message: 'Organization not found' });
    res.json({ message: 'Organization removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

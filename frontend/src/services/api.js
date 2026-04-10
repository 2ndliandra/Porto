import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Match backend port
});

export const getProjects = () => api.get('/projects');
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const getExperiences = () => api.get('/experiences');
export const getExperience = (id) => api.get(`/experiences/${id}`);
export const createExperience = (data) => api.post('/experiences', data);
export const updateExperience = (id, data) => api.put(`/experiences/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experiences/${id}`);

export const getSkills = () => api.get('/skills');
export const getSkill = (id) => api.get(`/skills/${id}`);
export const createSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

export const getSoftSkills = () => api.get('/softskills');
export const getSoftSkill = (id) => api.get(`/softskills/${id}`);
export const createSoftSkill = (data) => api.post('/softskills', data);
export const updateSoftSkill = (id, data) => api.put(`/softskills/${id}`, data);
export const deleteSoftSkill = (id) => api.delete(`/softskills/${id}`);

export const getAcademics = () => api.get('/academics');
export const getAcademic = (id) => api.get(`/academics/${id}`);
export const createAcademic = (data) => api.post('/academics', data);
export const updateAcademic = (id, data) => api.put(`/academics/${id}`, data);
export const deleteAcademic = (id) => api.delete(`/academics/${id}`);

export const getOrganizations = () => api.get('/organizations');
export const getOrganization = (id) => api.get(`/organizations/${id}`);
export const createOrganization = (data) => api.post('/organizations', data);
export const updateOrganization = (id, data) => api.put(`/organizations/${id}`, data);
export const deleteOrganization = (id) => api.delete(`/organizations/${id}`);

export const getInternships = () => api.get('/internships');
export const getInternship = (id) => api.get(`/internships/${id}`);
export const createInternship = (data) => api.post('/internships', data);
export const updateInternship = (id, data) => api.put(`/internships/${id}`, data);
export const deleteInternship = (id) => api.delete(`/internships/${id}`);

export const getContacts = () => api.get('/contacts');
export const getContact = (id) => api.get(`/contacts/${id}`);
export const createContact = (data) => api.post('/contacts', data);
export const updateContact = (id, data) => api.put(`/contacts/${id}`, data);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);

export const getLearnings = () => api.get('/learnings');
export const getLearning = (id) => api.get(`/learnings/${id}`);
export const createLearning = (data) => api.post('/learnings', data);
export const updateLearning = (id, data) => api.put(`/learnings/${id}`, data);
export const deleteLearning = (id) => api.delete(`/learnings/${id}`);

export const uploadImage = (formData) => api.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/uploads')) return `${window.location.origin}${path}`;
  return path;
};
export default api;

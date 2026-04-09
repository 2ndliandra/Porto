import { useState, useEffect } from 'react';
import { getProjects, deleteProject, getExperiences, deleteExperience, getSkills, deleteSkill, getSoftSkills, deleteSoftSkill, getAcademics, deleteAcademic, getOrganizations, deleteOrganization, getInternships, deleteInternship, getContacts, deleteContact, getLearnings, deleteLearning } from '../services/api';
import { Edit2, Trash2, Plus, ExternalLink, Briefcase, LayoutGrid, Zap, Users, BookOpen, Building, Laptop, Contact, Compass } from 'lucide-react';
import ProjectFormModal from '../components/ProjectFormModal';
import ExperienceFormModal from '../components/ExperienceFormModal';
import SkillFormModal from '../components/SkillFormModal';
import SoftSkillFormModal from '../components/SoftSkillFormModal';
import AcademicFormModal from '../components/AcademicFormModal';
import OrganizationFormModal from '../components/OrganizationFormModal';
import InternshipFormModal from '../components/InternshipFormModal';
import ContactFormModal from '../components/ContactFormModal';
import LearningFormModal from '../components/LearningFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'experiences' | 'skills'
  
  // Projects State
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Experience State
  const [experiences, setExperiences] = useState([]);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Skill State
  const [skills, setSkills] = useState([]);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Soft Skill State
  const [softSkills, setSoftSkills] = useState([]);
  const [isSoftSkillModalOpen, setIsSoftSkillModalOpen] = useState(false);
  const [selectedSoftSkill, setSelectedSoftSkill] = useState(null);

  // Academic State
  const [academics, setAcademics] = useState([]);
  const [isAcademicModalOpen, setIsAcademicModalOpen] = useState(false);
  const [selectedAcademic, setSelectedAcademic] = useState(null);

  // Organization State
  const [organizations, setOrganizations] = useState([]);
  const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  // Internship State
  const [internships, setInternships] = useState([]);
  const [isInternshipModalOpen, setIsInternshipModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  // Contact State
  const [contacts, setContacts] = useState([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Learning State
  const [learnings, setLearnings] = useState([]);
  const [isLearningModalOpen, setIsLearningModalOpen] = useState(false);
  const [selectedLearning, setSelectedLearning] = useState(null);

  // Universal Delete Modal State
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: '', id: null, title: '' });

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchExperiences = async () => {
    try {
      const response = await getExperiences();
      setExperiences(response.data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await getSkills();
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const fetchSoftSkills = async () => {
    try {
      const response = await getSoftSkills();
      setSoftSkills(response.data);
    } catch (error) {
      console.error('Error fetching soft skills:', error);
    }
  };

  const fetchAcademics = async () => {
    try {
      const response = await getAcademics();
      setAcademics(response.data);
    } catch (error) {
      console.error('Error fetching academics:', error);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const response = await getOrganizations();
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const fetchInternships = async () => {
    try {
      const response = await getInternships();
      setInternships(response.data);
    } catch (error) {
      console.error('Error fetching internships:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchLearnings = async () => {
    try {
      const response = await getLearnings();
      setLearnings(response.data);
    } catch (error) {
      console.error('Error fetching learnings:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchExperiences();
    fetchSkills();
    fetchSoftSkills();
    fetchAcademics();
    fetchOrganizations();
    fetchInternships();
    fetchContacts();
    fetchLearnings();
  }, []);

  // --- Project Handlers ---
  const handleProjectDelete = (id, title) => {
    setDeleteModal({ isOpen: true, type: 'Project', id, title: `Delete "${title}"?` });
  };

  const handleProjectEdit = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleProjectAddNew = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(true);
  };

  // --- Experience Handlers ---
  const handleExperienceDelete = (id, title) => {
    setDeleteModal({ isOpen: true, type: 'Experience', id, title: `Delete "${title}"?` });
  };

  const handleExperienceEdit = (experience) => {
    setSelectedExperience(experience);
    setIsExperienceModalOpen(true);
  };

  const handleExperienceAddNew = () => {
    setSelectedExperience(null);
    setIsExperienceModalOpen(true);
  };

  // --- Skill Handlers ---
  const handleSkillDelete = (id, title) => {
    setDeleteModal({ isOpen: true, type: 'Skill', id, title: `Delete "${title}"?` });
  };

  const handleSkillEdit = (skill) => {
    setSelectedSkill(skill);
    setIsSkillModalOpen(true);
  };

  const handleSkillAddNew = () => {
    setSelectedSkill(null);
    setIsSkillModalOpen(true);
  };

  // --- Soft Skill Handlers ---
  const handleSoftSkillDelete = (id, title) => {
    setDeleteModal({ isOpen: true, type: 'SoftSkill', id, title: `Delete "${title}"?` });
  };

  const handleSoftSkillEdit = (softSkill) => {
    setSelectedSoftSkill(softSkill);
    setIsSoftSkillModalOpen(true);
  };

  const handleSoftSkillAddNew = () => {
    setSelectedSoftSkill(null);
    setIsSoftSkillModalOpen(true);
  };

  // --- Academic Handlers ---
  const handleAcademicDelete = (id, title) => {
    setDeleteModal({ isOpen: true, type: 'Academic', id, title: `Delete "${title}"?` });
  };

  const handleAcademicEdit = (academic) => {
    setSelectedAcademic(academic);
    setIsAcademicModalOpen(true);
  };

  const handleAcademicAddNew = () => {
    setSelectedAcademic(null);
    setIsAcademicModalOpen(true);
  };

  // --- Organization Handlers ---
  const handleOrganizationDelete = (id, title) => {
    setDeleteModal({ isOpen: true, type: 'Organization', id, title: `Delete "${title}"?` });
  };

  const handleOrganizationEdit = (organization) => {
    setSelectedOrganization(organization);
    setIsOrganizationModalOpen(true);
  };

  const handleOrganizationAddNew = () => {
    setSelectedOrganization(null);
    setIsOrganizationModalOpen(true);
  };

  // --- Internship Handlers ---
  const handleInternshipDelete = (id, title) => {
    setDeleteModal({ isOpen: true, type: 'Internship', id, title: `Delete "${title}"?` });
  };

  const handleInternshipEdit = (internship) => {
    setSelectedInternship(internship);
    setIsInternshipModalOpen(true);
  };

  const handleInternshipAddNew = () => {
    setSelectedInternship(null);
    setIsInternshipModalOpen(true);
  };

  // --- Contact Handlers ---
  const handleContactDelete = (id, title) => {
    setDeleteModal({ isOpen: true, type: 'Contact', id, title: `Delete "${title}"?` });
  };

  const handleContactEdit = (contact) => {
    setSelectedContact(contact);
    setIsContactModalOpen(true);
  };

  const handleContactAddNew = () => {
    setSelectedContact(null);
    setIsContactModalOpen(true);
  };

  // --- Learning Handlers ---
  const handleLearningDelete = (id, title) => {
    setDeleteModal({ isOpen: true, type: 'Learning', id, title: `Delete "${title}"?` });
  };

  const handleLearningEdit = (learning) => {
    setSelectedLearning(learning);
    setIsLearningModalOpen(true);
  };

  const handleLearningAddNew = () => {
    setSelectedLearning(null);
    setIsLearningModalOpen(true);
  };

  const executeDelete = async () => {
    const { type, id } = deleteModal;
    try {
      if (type === 'Project') { await deleteProject(id); fetchProjects(); }
      if (type === 'Experience') { await deleteExperience(id); fetchExperiences(); }
      if (type === 'Skill') { await deleteSkill(id); fetchSkills(); }
      if (type === 'SoftSkill') { await deleteSoftSkill(id); fetchSoftSkills(); }
      if (type === 'Academic') { await deleteAcademic(id); fetchAcademics(); }
      if (type === 'Organization') { await deleteOrganization(id); fetchOrganizations(); }
      if (type === 'Internship') { await deleteInternship(id); fetchInternships(); }
      if (type === 'Contact') { await deleteContact(id); fetchContacts(); }
      if (type === 'Learning') { await deleteLearning(id); fetchLearnings(); }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
    setDeleteModal({ isOpen: false, type: '', id: null, title: '' });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up transition-colors duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent transition-colors duration-500">
          CRM Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div className="flex bg-slate-100 dark:bg-white/5 rounded-xl p-1 border border-slate-200 dark:border-white/10 transition-colors duration-500">
             <button 
               onClick={() => setActiveTab('projects')}
               className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'projects' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white'}`}
             >
               <LayoutGrid size={16} /> Projects
             </button>
             <button 
               onClick={() => setActiveTab('experiences')}
               className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'experiences' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white'}`}
             >
               <Briefcase size={16} /> Experiences
             </button>
             <button 
               onClick={() => setActiveTab('skills')}
               className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'skills' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white'}`}
             >
               <Zap size={16} /> Skills
             </button>
             <button 
               onClick={() => setActiveTab('softskills')}
               className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'softskills' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white'}`}
             >
               <Users size={16} /> Soft Skills
             </button>
             <button 
               onClick={() => setActiveTab('academics')}
               className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'academics' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white'}`}
             >
               <BookOpen size={16} /> Academics
             </button>
             <button 
               onClick={() => setActiveTab('organizations')}
               className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'organizations' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white'}`}
             >
               <Building size={16} /> Organizations
             </button>
             <button 
               onClick={() => setActiveTab('internships')}
               className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'internships' ? 'bg-sky-600 text-white shadow-lg' : 'text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white'}`}
             >
               <Laptop size={16} /> Internships
             </button>
             <button 
               onClick={() => setActiveTab('contacts')}
               className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'contacts' ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white'}`}
             >
               <Contact size={16} /> Contacts
             </button>
             <button 
               onClick={() => setActiveTab('learnings')}
               className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'learnings' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white'}`}
             >
               <Compass size={16} /> Learnings
             </button>
          </div>

          <button
            onClick={activeTab === 'projects' ? handleProjectAddNew : activeTab === 'experiences' ? handleExperienceAddNew : activeTab === 'skills' ? handleSkillAddNew : activeTab === 'softskills' ? handleSoftSkillAddNew : activeTab === 'academics' ? handleAcademicAddNew : activeTab === 'organizations' ? handleOrganizationAddNew : activeTab === 'internships' ? handleInternshipAddNew : activeTab === 'contacts' ? handleContactAddNew : handleLearningAddNew}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 whitespace-nowrap font-medium"
          >
            <Plus size={18} /> New {activeTab === 'projects' ? 'Project' : activeTab === 'experiences' ? 'Experience' : activeTab === 'skills' ? 'Skill' : activeTab === 'softskills' ? 'Soft Skill' : activeTab === 'academics' ? 'Academic' : activeTab === 'organizations' ? 'Organization' : activeTab === 'internships' ? 'Internship' : activeTab === 'contacts' ? 'Contact' : 'Learning'}
          </button>
        </div>
      </div>

      {activeTab === 'projects' && (
        <div className="glass rounded-xl overflow-hidden animate-fade-in transition-colors duration-500">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 uppercase text-xs text-slate-500 dark:text-text-muted transition-colors duration-500">
              <tr>
                <th className="px-6 py-4 font-medium">Project Title</th>
                <th className="px-6 py-4 font-medium">Tech Stack</th>
                <th className="px-6 py-4 font-medium">Link</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-300">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white transition-colors duration-500">{project.title}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-text-muted transition-colors duration-500">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white/80 text-xs transition-colors duration-500">{tech}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors duration-500">
                        View <ExternalLink size={14} />
                      </a>
                    ) : <span className="text-slate-500 dark:text-text-muted transition-colors duration-500">N/A</span>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleProjectEdit(project)} className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleProjectDelete(project._id, project.title)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500 dark:text-text-muted transition-colors">No projects found. Add your first project!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'experiences' && (
        <div className="glass rounded-xl overflow-hidden animate-fade-in transition-colors duration-500">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 uppercase text-xs text-slate-500 dark:text-text-muted transition-colors duration-500">
              <tr>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience) => (
                <tr key={experience._id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-300">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white transition-colors duration-500">{experience.role}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-white/80 transition-colors duration-500">{experience.company}</td>
                  <td className="px-6 py-4 text-blue-600 dark:text-blue-400 transition-colors duration-500">{experience.year}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleExperienceEdit(experience)} className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleExperienceDelete(experience._id, experience.role)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {experiences.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500 dark:text-text-muted transition-colors">No experiences found. Add your first experience!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'skills' && (
        <div className="glass rounded-xl overflow-hidden animate-fade-in transition-colors duration-500">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 uppercase text-xs text-slate-500 dark:text-text-muted transition-colors duration-500">
              <tr>
                <th className="px-6 py-4 font-medium">Skill Name</th>
                <th className="px-6 py-4 font-medium">Lucide Icon</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill._id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-300">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white transition-colors duration-500">{skill.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-white/80 transition-colors duration-500">{skill.iconName}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleSkillEdit(skill)} className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleSkillDelete(skill._id, skill.name)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {skills.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-slate-500 dark:text-text-muted transition-colors">No skills found. Add your first skill!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'softskills' && (
        <div className="glass rounded-xl overflow-hidden animate-fade-in transition-colors duration-500">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 uppercase text-xs text-slate-500 dark:text-text-muted transition-colors duration-500">
              <tr>
                <th className="px-6 py-4 font-medium">Soft Skill Name</th>
                <th className="px-6 py-4 font-medium">Lucide Icon</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {softSkills.map((softSkill) => (
                <tr key={softSkill._id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-300">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white transition-colors duration-500">{softSkill.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-white/80 transition-colors duration-500">{softSkill.iconName}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleSoftSkillEdit(softSkill)} className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleSoftSkillDelete(softSkill._id, softSkill.name)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {softSkills.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-slate-500 dark:text-text-muted transition-colors">No soft skills found. Add your first soft skill!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'academics' && (
        <div className="glass rounded-xl overflow-hidden animate-fade-in transition-colors duration-500">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 uppercase text-xs text-slate-500 dark:text-text-muted transition-colors duration-500">
              <tr>
                <th className="px-6 py-4 font-medium">Institution</th>
                <th className="px-6 py-4 font-medium">Degree / Major</th>
                <th className="px-6 py-4 font-medium">Year</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {academics.map((academic) => (
                <tr key={academic._id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-300">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white transition-colors duration-500">{academic.institution}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-white/80 transition-colors duration-500">{academic.degree}</td>
                  <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 transition-colors duration-500">{academic.year}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleAcademicEdit(academic)} className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleAcademicDelete(academic._id, academic.institution)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {academics.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500 dark:text-text-muted transition-colors">No academic records found. Add your first academic record!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'organizations' && (
        <div className="glass rounded-xl overflow-hidden animate-fade-in transition-colors duration-500">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 uppercase text-xs text-slate-500 dark:text-text-muted transition-colors duration-500">
              <tr>
                <th className="px-6 py-4 font-medium">Organization</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Year</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => (
                <tr key={org._id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-300">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white transition-colors duration-500">{org.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-white/80 transition-colors duration-500">{org.role}</td>
                  <td className="px-6 py-4 text-rose-600 dark:text-rose-400 transition-colors duration-500">{org.year}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleOrganizationEdit(org)} className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleOrganizationDelete(org._id, org.name)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {organizations.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500 dark:text-text-muted transition-colors">No organizations found. Add your first organization!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'internships' && (
        <div className="glass rounded-xl overflow-hidden animate-fade-in transition-colors duration-500">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 uppercase text-xs text-slate-500 dark:text-text-muted transition-colors duration-500">
              <tr>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {internships.map((internship) => (
                <tr key={internship._id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-300">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white transition-colors duration-500">{internship.company}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-white/80 transition-colors duration-500">{internship.role}</td>
                  <td className="px-6 py-4 text-sky-600 dark:text-sky-400 transition-colors duration-500">{internship.year}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleInternshipEdit(internship)} className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleInternshipDelete(internship._id, internship.company)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {internships.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-500 dark:text-text-muted transition-colors">No internships found. Add your first internship!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="glass rounded-xl overflow-hidden animate-fade-in transition-colors duration-500">
          <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 uppercase text-xs text-slate-500 dark:text-text-muted transition-colors duration-500">
              <tr>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Address</th>
                <th className="px-6 py-4 font-medium">GitHub</th>
                <th className="px-6 py-4 font-medium">Instagram</th>
                <th className="px-6 py-4 font-medium">LinkedIn</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-300">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white transition-colors duration-500">{contact.email}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-white/80 transition-colors duration-500">{contact.phone || 'N/A'}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-white/80 transition-colors duration-500 max-w-[200px] truncate">{contact.address || 'N/A'}</td>
                  <td className="px-6 py-4 text-teal-600 dark:text-teal-400 transition-colors duration-500">{contact.githubUsername || 'N/A'}</td>
                  <td className="px-6 py-4 text-pink-600 dark:text-pink-400 transition-colors duration-500">{contact.instagramUsername || 'N/A'}</td>
                  <td className="px-6 py-4 text-blue-600 dark:text-blue-400 transition-colors duration-500">{contact.linkedinUsername || 'N/A'}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleContactEdit(contact)} className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleContactDelete(contact._id, contact.email)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {contacts.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-slate-500 dark:text-text-muted transition-colors">No contacts found. Add your contact info!</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {activeTab === 'learnings' && (
        <div className="glass rounded-xl overflow-hidden animate-fade-in transition-colors duration-500">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 uppercase text-xs text-slate-500 dark:text-text-muted transition-colors duration-500">
              <tr>
                <th className="px-6 py-4 font-medium">Course / Topic</th>
                <th className="px-6 py-4 font-medium">Platform</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Icon Name</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {learnings.map((learning) => (
                <tr key={learning._id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-300">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white transition-colors duration-500">{learning.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-white/80 transition-colors duration-500">{learning.platform || 'N/A'}</td>
                  <td className="px-6 py-4 transition-colors duration-500">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      learning.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      learning.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' :
                      'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
                    }`}>
                      {learning.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-violet-600 dark:text-violet-400 transition-colors duration-500">{learning.iconName}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleLearningEdit(learning)} className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleLearningDelete(learning._id, learning.name)} className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 inline-flex items-center mx-2 p-1 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {learnings.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500 dark:text-text-muted transition-colors">No learning items found. Add what you are learning!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      </div>

      {isProjectModalOpen && (
        <ProjectFormModal
          project={selectedProject}
          onClose={() => setIsProjectModalOpen(false)}
          onSuccess={() => {
            setIsProjectModalOpen(false);
            fetchProjects();
          }}
        />
      )}

      {isExperienceModalOpen && (
        <ExperienceFormModal
          experience={selectedExperience}
          onClose={() => setIsExperienceModalOpen(false)}
          onSuccess={() => {
            setIsExperienceModalOpen(false);
            fetchExperiences();
          }}
        />
      )}

      {isSkillModalOpen && (
        <SkillFormModal
          skill={selectedSkill}
          onClose={() => setIsSkillModalOpen(false)}
          onSuccess={() => {
            setIsSkillModalOpen(false);
            fetchSkills();
          }}
        />
      )}

      {isSoftSkillModalOpen && (
        <SoftSkillFormModal
          softSkill={selectedSoftSkill}
          onClose={() => setIsSoftSkillModalOpen(false)}
          onSuccess={() => {
            setIsSoftSkillModalOpen(false);
            fetchSoftSkills();
          }}
        />
      )}

      {isAcademicModalOpen && (
        <AcademicFormModal
          academic={selectedAcademic}
          onClose={() => setIsAcademicModalOpen(false)}
          onSuccess={() => {
            setIsAcademicModalOpen(false);
            fetchAcademics();
          }}
        />
      )}

      {isOrganizationModalOpen && (
        <OrganizationFormModal
          organization={selectedOrganization}
          onClose={() => setIsOrganizationModalOpen(false)}
          onSuccess={() => {
            setIsOrganizationModalOpen(false);
            fetchOrganizations();
          }}
        />
      )}

      {isInternshipModalOpen && (
        <InternshipFormModal
          internship={selectedInternship}
          onClose={() => setIsInternshipModalOpen(false)}
          onSuccess={() => {
            setIsInternshipModalOpen(false);
            fetchInternships();
          }}
        />
      )}

      {isContactModalOpen && (
        <ContactFormModal
          contact={selectedContact}
          onClose={() => setIsContactModalOpen(false)}
          onSuccess={() => {
            setIsContactModalOpen(false);
            fetchContacts();
          }}
        />
      )}

      {isLearningModalOpen && (
        <LearningFormModal
          learning={selectedLearning}
          onClose={() => setIsLearningModalOpen(false)}
          onSuccess={() => {
            setIsLearningModalOpen(false);
            fetchLearnings();
          }}
        />
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        message={`This action cannot be undone. Are you sure you want to permanently delete this ${deleteModal.type.toLowerCase()}?`}
        onConfirm={executeDelete}
        onClose={() => setDeleteModal({ isOpen: false, type: '', id: null, title: '' })}
      />
    </>
  );
};

export default Admin;

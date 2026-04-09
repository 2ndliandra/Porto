import { useState, useEffect } from 'react';
import { createSkill, updateSkill } from '../services/api';
import { X } from 'lucide-react';

const SkillFormModal = ({ skill, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    iconName: ''
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        iconName: skill.iconName
      });
    }
  }, [skill]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (skill) {
        await updateSkill(skill._id, formData);
      } else {
        await createSkill(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving skill', error);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass w-full max-w-lg rounded-2xl p-6 animate-fade-in transition-colors duration-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">{skill ? 'Edit Skill' : 'New Skill'}</h2>
          <button onClick={onClose} className="text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Skill Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. React, Node.js, Mongoose"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Lucide Icon Name</label>
            <input
              type="text"
              name="iconName"
              placeholder="e.g. Zap, Code2, Database, Activity"
              value={formData.iconName}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-blue-500 transition-colors"
            />
            <p className="text-xs text-slate-500 dark:text-text-muted text-center mt-2 transition-colors">
              Must be a valid exact <a href="https://lucide.dev/icons" target="_blank" className="text-indigo-600 dark:text-indigo-400">Lucide-React</a> component name.
            </p>
          </div>
          
          <div className="flex justify-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10 transition-colors">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillFormModal;

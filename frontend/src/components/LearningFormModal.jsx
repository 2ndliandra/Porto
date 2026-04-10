import { useState, useEffect } from 'react';
import { createLearning, updateLearning } from '../services/api';
import { X } from 'lucide-react';

const LearningFormModal = ({ learning, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    status: 'In Progress',
    description: '',
    iconName: 'BookOpen'
  });

  useEffect(() => {
    if (learning) {
      setFormData({
        name: learning.name,
        platform: learning.platform || '',
        status: learning.status || 'In Progress',
        description: learning.description || '',
        iconName: learning.iconName || 'BookOpen'
      });
    }
  }, [learning]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (learning) {
        await updateLearning(learning._id, formData);
      } else {
        await createLearning(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving learning record', error);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass w-full max-w-lg rounded-2xl p-6 animate-fade-in transition-colors duration-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">{learning ? 'Edit Learning' : 'New Learning'}</h2>
          <button onClick={onClose} className="text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Course / Topic Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Machine Learning Fundamentals"
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Platform</label>
            <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="e.g. Udemy, Coursera, YouTube"
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-violet-500 transition-colors"
            >
              <option value="In Progress">In Progress</option>
              <option value="Exploring">Exploring</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Lucide Icon Name</label>
            <input
              type="text"
              name="iconName"
              value={formData.iconName}
              onChange={handleChange}
              placeholder="e.g. Brain, Rocket, Code2"
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="What are you learning and why?"
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-violet-500 transition-colors"
            ></textarea>
          </div>
          <div className="flex justify-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10 transition-colors">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl transition-colors">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearningFormModal;

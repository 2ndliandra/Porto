import { useState, useEffect } from 'react';
import { createInternship, updateInternship } from '../services/api';
import { X } from 'lucide-react';

const InternshipFormModal = ({ internship, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    year: '',
    description: ''
  });

  useEffect(() => {
    if (internship) {
      setFormData({
        company: internship.company,
        role: internship.role,
        year: internship.year,
        description: internship.description
      });
    }
  }, [internship]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (internship) {
        await updateInternship(internship._id, formData);
      } else {
        await createInternship(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving internship record', error);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass w-full max-w-lg rounded-2xl p-6 animate-fade-in transition-colors duration-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">{internship ? 'Edit Internship' : 'New Internship'}</h2>
          <button onClick={onClose} className="text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Year / Duration</label>
            <input
              type="text"
              name="year"
              placeholder="e.g. Jan 2024 - Jun 2024"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-sky-500 transition-colors"
            ></textarea>
          </div>
          <div className="flex justify-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10 transition-colors">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl transition-colors">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternshipFormModal;

import { useState, useEffect } from 'react';
import { createAcademic, updateAcademic } from '../services/api';
import { X } from 'lucide-react';

const AcademicFormModal = ({ academic, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    year: '',
    description: ''
  });

  useEffect(() => {
    if (academic) {
      setFormData({
        institution: academic.institution,
        degree: academic.degree,
        year: academic.year,
        description: academic.description
      });
    }
  }, [academic]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (academic) {
        await updateAcademic(academic._id, formData);
      } else {
        await createAcademic(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving academic record', error);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass w-full max-w-lg rounded-2xl p-6 animate-fade-in transition-colors duration-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">{academic ? 'Edit Academic Record' : 'New Academic Record'}</h2>
          <button onClick={onClose} className="text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Institution</label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Degree / Major</label>
            <input
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Year</label>
            <input
              type="text"
              name="year"
              placeholder="e.g. 2021 - 2024"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-blue-500 transition-colors"
            ></textarea>
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

export default AcademicFormModal;

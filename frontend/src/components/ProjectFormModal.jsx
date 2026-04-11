import { useState, useEffect } from 'react';
import { createProject, updateProject, uploadImage, getImageUrl } from '../services/api';
import { X, Upload, Trash2 } from 'lucide-react';

const ProjectFormModal = ({ project, onClose, onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    image: '',
    images: [],
    link: ''
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        techStack: project.techStack.join(', '),
        image: project.image,
        images: project.images || [],
        link: project.link
      });
    }
  }, [project]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      techStack: formData.techStack.split(',').map((item) => item.trim()).filter(Boolean)
    };

    try {
      // Upload new files if any
      if (files.length > 0) {
        const uploadedPaths = [];
        for (const file of files) {
          const uploadFormData = new FormData();
          uploadFormData.append('image', file);
          const response = await uploadImage(uploadFormData);
          uploadedPaths.push(response.data);
        }
        // Add newly uploaded paths to existing images
        submitData.images = [...(formData.images || []), ...uploadedPaths];
        // Set first image as thumbnail for backward compatibility
        submitData.image = submitData.images[0];
      }

      if (project) {
        await updateProject(project._id, submitData);
      } else {
        await createProject(submitData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving project', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass w-full max-w-lg rounded-2xl p-6 animate-fade-in transition-colors duration-500">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">{project ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={onClose} className="text-slate-500 dark:text-text-muted hover:text-slate-900 dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
              required
              rows="3"
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-blue-500 transition-colors"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Tech Stack (comma separated)</label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Project Images (Multiple)</label>
            <div className="space-y-3">
              {/* Display existing images */}
              {formData.images && formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={getImageUrl(img)}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg"
                      >
                        <Trash2 size={16} className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Display new files to upload */}
              {files.length > 0 && (
                <div className="grid grid-cols-3 gap-2 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-500/20">
                  {files.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`New ${index}`}
                        className="w-full h-24 object-cover rounded-lg border border-blue-200 dark:border-blue-500/30"
                      />
                      <div className="text-xs text-blue-700 dark:text-blue-300 text-center truncate mt-1">{file.name}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload button */}
              <div className="relative w-full">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                  <Upload size={18} />
                  <span>{files.length > 0 ? `${files.length} file(s) selected` : 'Upload Images (Multiple)'}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-text-muted mb-1 text-center transition-colors">Project Link (optional)</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-slate-900 dark:text-white text-center focus:outline-none focus:border-blue-500 transition-colors"
            />
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

export default ProjectFormModal;

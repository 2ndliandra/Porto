import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ isOpen, title, message, onConfirm, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="glass w-full max-w-sm rounded-2xl p-6 shadow-2xl shadow-red-500/10 border border-red-500/20 transform transition-all duration-500">
        
        {/* Header Icon */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
             <AlertTriangle size={32} className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{title}</h2>
          <p className="text-slate-600 dark:text-text-muted text-sm px-2 mb-6 transition-colors">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 w-full">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-text-muted bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/5"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all active:scale-95"
          >
            Delete
          </button>
        </div>
        
        {/* Close Top Right */}
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors">
            <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

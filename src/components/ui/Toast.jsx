import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 animate-slide-up">
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
      )}
      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{message}</p>
      <button 
        onClick={onClose}
        className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function Modal({ isOpen, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onClose, isDanger = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {isDanger && (
              <div className="p-2.5 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
            )}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 leading-relaxed">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded-xl transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-lg transition ${
              isDanger 
                ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20' 
                : 'bg-ieee-blue hover:bg-ieee-dark shadow-ieee-blue/20'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

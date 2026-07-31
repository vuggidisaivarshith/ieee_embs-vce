import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">404</h1>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mt-1">Page Not Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            The page you are searching for might have been moved, renamed, or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/"
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-ieee-blue hover:bg-ieee-dark shadow-md flex items-center justify-center gap-1.5 transition"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 flex items-center justify-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}

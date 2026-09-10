import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full text-center space-y-6 specular-card p-8 sm:p-12 rounded-3xl shadow-2xl"
      >
        <div className="w-16 h-16 bg-rose-500/20 border border-rose-500/40 text-rose-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-5xl font-black text-white font-mono">404</h1>
          <h3 className="text-xl font-bold text-slate-200 mt-1">Coordinates Not Found</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            The requested biological sector could not be located. It may have moved or been decommissioned.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/"
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-ieee-blue hover:bg-ieee-dark shadow-lg flex items-center justify-center gap-1.5 transition border border-sky-400/30"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-white/10 flex items-center justify-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

import React from 'react';
import { X, ExternalLink, Linkedin, GraduationCap, Briefcase, BookOpen, Award, UserCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpeakerModal({ isOpen, onClose, speakerData }) {
  if (!isOpen || !speakerData) return null;

  const {
    name = "Dr. Ajit Kumar",
    role = "Associate Professor, Information Systems, XIMB (XIM University)",
    photoUrl = "/assets/speaker.jpeg",
    bio = `Associate Professor of Information Systems at Xavier Institute of Management (XIMB), XIM University, Bhubaneswar. Obtained Ph.D. in Medical Informatics from Taipei Medical University, Taiwan, and completed a Postdoctoral Fellowship at National Central University, Taiwan. Has over 18 years of combined industry and academic experience across Health IT, Telemedicine, Electronic Medical Records (EMR) standards (SNOMED), and AI adoption frameworks in healthcare.`,
    education = [
      "Ph.D. in Medical Informatics — Taipei Medical University, Taiwan",
      "Postdoctoral Fellowship in HCI (Human-Computer Interaction) — Taiwan",
      "MCA (Master of Computer Applications) — India",
      "B.Sc. in Computer Science — India"
    ],
    experience = "18+ years across academia and software industry at the intersection of Information Systems, Digital Health, and Telemedicine.",
    focusAreas = [
      "Digital Health & Telemedicine Architectures",
      "Electronic Medical Records (EMR) & SNOMED Adoption",
      "Frameworks for Adopting Artificial Intelligence in Healthcare",
      "Academic Integrity & Health Informatics Policy"
    ],
    linkedin = "https://www.linkedin.com/in/drajitkumar-ai-dt/?originalSubdomain=in",
    university = "https://ximb.edu.in/faculty-research/faculty-profile/prof-ajit-kumar/"
  } = speakerData;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        
        {/* Backdrop Click */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto space-y-6"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Speaker Header Profile Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-200 dark:border-slate-800 text-center sm:text-left">
            <img 
              src={photoUrl} 
              alt={name}
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/assets/speaker.jpeg"; }}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-ieee-blue shadow-lg flex-shrink-0"
            />
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-ieee-blue/10 text-ieee-blue dark:bg-ieee-blue/20 dark:text-sky-400">
                Featured Keynote Speaker
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{name}</h2>
              <p className="text-xs font-semibold text-ieee-blue dark:text-sky-400">{role}</p>
              
              {/* Profile External Links */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0A66C2] hover:bg-[#084e96] shadow-sm transition transform hover:scale-105"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {university && (
                  <a
                    href={university}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-ieee-blue hover:text-white transition transform hover:scale-105"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-embs-purple" />
                    <span>XIMB Faculty Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Briefcase className="w-4 h-4 text-vardhaman-orange" />
              <span>Current Role & Background</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              {bio}
            </p>
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <GraduationCap className="w-4 h-4 text-ieee-blue" />
                <span>Education & Qualifications</span>
              </div>
              <ul className="space-y-1.5">
                {education.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Focus & Research Areas */}
          {focusAreas && focusAreas.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <Award className="w-4 h-4 text-embs-purple" />
                <span>Research & Expertise Focus</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {focusAreas.map((area, idx) => (
                  <div key={idx} className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                    • {area}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-ieee-blue hover:bg-ieee-dark shadow-md transition"
            >
              Close Profile
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
}

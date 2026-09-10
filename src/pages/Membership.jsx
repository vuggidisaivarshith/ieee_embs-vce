import React from 'react';
import { HeartPulse, CheckCircle2, ShieldCheck, ExternalLink, Globe, Sparkles, Award, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Membership() {
  const benefits = [
    "Unlimited access to IEEE Xplore Digital Library biomedical research papers",
    "Substantial discounts on IEEE global conferences and symposium registrations",
    "Eligibility for IEEE EMBS student travel grants & research awards",
    "Direct networking with global leaders in medical technology and clinical AI",
    "Access to IEEE Collabratec research portal, webinars, and career mentors",
    "Leadership opportunities in chapter executive committee and project leads"
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 text-slate-800 min-h-screen">
      
      {/* Hero Header */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-sky-500/5 to-transparent pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-xs font-mono font-bold text-clinical-green shadow-sm">
            <HeartPulse className="w-4 h-4 animate-pulse text-clinical-green" />
            <span>Join the Global Biomedical Engineering Community</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Become an IEEE EMBS Member
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Connect with the world's premier society of biomedical engineers, medical technologists, and clinical computational scientists.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Benefits Grid */}
        <div className="bright-card rounded-3xl p-8 sm:p-12 space-y-8 shadow-bright">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-embs-blue uppercase tracking-widest block font-bold">
              Member Privileges
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Why Join IEEE EMBS?</h2>
            <p className="text-slate-600 text-sm">Key advantages available to registered student members.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-clinical-green flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps to Join Card */}
        <div className="bright-card rounded-3xl p-8 sm:p-12 space-y-8 shadow-bright">
          <h2 className="text-2xl font-extrabold text-center text-slate-900">3 Steps to Complete Membership</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-embs-blue text-white font-black flex items-center justify-center mx-auto text-lg shadow-sm">1</div>
              <h4 className="font-bold text-base text-slate-900">Visit IEEE Portal</h4>
              <p className="text-xs text-slate-600">Go to official ieee.org membership portal.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-embs-purple text-white font-black flex items-center justify-center mx-auto text-lg shadow-sm">2</div>
              <h4 className="font-bold text-base text-slate-900">Select Student Plan</h4>
              <p className="text-xs text-slate-600">Choose Student Member + EMBS Society add-on.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-warm-orange text-white font-black flex items-center justify-center mx-auto text-lg shadow-sm">3</div>
              <h4 className="font-bold text-base text-slate-900">Enter Vardhaman SB</h4>
              <p className="text-xs text-slate-600">Select Vardhaman College of Engineering as your Student Branch.</p>
            </div>
          </div>

          <div className="text-center pt-4">
            <a
              href="https://www.ieee.org/membership/join/index.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-embs-blue via-embs-purple to-warm-orange shadow-md hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              <span>Proceed to Official IEEE Join Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </section>

    </div>
  );
}

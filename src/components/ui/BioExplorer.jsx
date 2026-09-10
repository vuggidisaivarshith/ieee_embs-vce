import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, HeartPulse, Activity, Shield, Sparkles, Dna, Info, ChevronRight, Eye, Focus, RefreshCw } from 'lucide-react';
import TiltCard from './TiltCard';

export default function BioExplorer() {
  const [selectedEntity, setSelectedEntity] = useState('rbc');
  const [isFocusing, setIsFocusing] = useState(false);
  const [magnification, setMagnification] = useState('1000× Oil Immersion');
  const [ecgPoints, setEcgPoints] = useState([]);

  const entities = [
    {
      id: 'rbc',
      name: 'Erythrocyte (RBC)',
      tag: 'Gas Transport & Laminar Flow',
      mag: '1000× Confocal',
      icon: HeartPulse,
      color: 'from-rose-500 to-red-600',
      textColor: 'text-bio-red',
      borderColor: 'border-bio-red/40',
      details: {
        morphology: 'Biconcave disc (~7.8 μm diameter, 2.6 μm edge, 0.8 μm center)',
        function: 'Maximizes surface-area-to-volume ratio for high-flux O₂ and CO₂ diffusion via hemoglobin tetramers.',
        physics: 'Undergoes shear deformation in capillary microvasculature, exhibiting laminar parabolic velocity profiles.',
        biomedicalApplication: 'Microfluidic red cell deformability assays and optical stretcher telemetry for hematologic disease screening.'
      }
    },
    {
      id: 'wbc',
      name: 'Leukocyte (WBC / Neutrophil)',
      tag: 'Immune Defense & Amoeboid Chemotaxis',
      mag: '1500× Fluorescence',
      icon: Shield,
      color: 'from-sky-400 to-blue-600',
      textColor: 'text-embs-blue',
      borderColor: 'border-embs-blue/40',
      details: {
        morphology: 'Multi-lobed dense chromatin nucleus with granular enzyme-rich cytoplasm (~12–15 μm).',
        function: 'Phagocytosis of pathogens, cytokine signaling cascades, and endothelial extravasation (diapedesis).',
        physics: 'Amoeboid motility driven by actin-myosin cytoskeleton polymerization toward chemoattractant gradients.',
        biomedicalApplication: 'Automated differential cell counting via deep learning neural networks on digital blood smears.'
      }
    },
    {
      id: 'platelet',
      name: 'Thrombocyte (Platelet)',
      tag: 'Hemostasis & Fibrin Clotting',
      mag: '2500× SEM',
      icon: Sparkles,
      color: 'from-amber-400 to-orange-500',
      textColor: 'text-warm-amber',
      borderColor: 'border-warm-amber/40',
      details: {
        morphology: 'Small discoid anucleated fragments (2–4 μm) with dense and alpha storage granules.',
        function: 'Adheres to exposed subendothelial collagen, activates GP IIb/IIIa receptors, and cross-links fibrin polymers.',
        physics: 'Fluid shear-induced activation and localized aggregation forming stable hemostatic plugs.',
        biomedicalApplication: 'Impedance aggregometry and microfluidic thrombosis-on-a-chip diagnostics.'
      }
    },
    {
      id: 'ecg',
      name: 'Cardiac Bio-Potential (ECG)',
      tag: 'Electrophysiology & Telemetry',
      mag: '1000 Hz Telemetry',
      icon: Activity,
      color: 'from-teal-400 to-emerald-600',
      textColor: 'text-clinical-green',
      borderColor: 'border-clinical-green/40',
      details: {
        morphology: 'P wave (atrial depolarization), QRS complex (ventricular depolarization), T wave (repolarization).',
        function: 'Synchronized electromechanical cardiac conduction from SA node through Purkinje fibers.',
        physics: 'Volume conductor electric field propagation detected via non-invasive Ag/AgCl surface electrodes.',
        biomedicalApplication: 'Real-time telemetry, arrhythmia classification algorithms, and wearable biometric monitoring.'
      }
    }
  ];

  const handleSelectEntity = (id) => {
    if (id === selectedEntity) return;
    setIsFocusing(true);
    const target = entities.find(e => e.id === id);
    if (target) setMagnification(target.mag);
    
    // Lens defocus -> aperture rotation -> refocus sequence
    setTimeout(() => {
      setSelectedEntity(id);
      setTimeout(() => {
        setIsFocusing(false);
      }, 150);
    }, 200);
  };

  const current = entities.find(e => e.id === selectedEntity) || entities[0];
  const IconComp = current.icon;

  return (
    <div className="bright-card rounded-3xl p-6 sm:p-10 space-y-8 shadow-bright relative overflow-hidden border border-slate-200">
      
      {/* Header with Microscope Lens Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-embs-blue border border-slate-200 text-xs font-mono font-bold mb-2">
            <Microscope className="w-3.5 h-3.5 animate-pulse text-embs-blue" />
            <span>Interactive Microscopic Specimen Explorer</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Living Biological & Telemetry Architectures
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Rotate through specimen slides to calibrate objective focus, morphology, fluid physics, and clinical AI applications.
          </p>
        </div>

        {/* Objective Lens Indicator */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-slate-900 text-white font-mono text-xs flex items-center gap-2 shadow-inner border border-slate-800">
            <Focus className={`w-3.5 h-3.5 text-embs-cyan ${isFocusing ? 'animate-spin' : ''}`} />
            <div>
              <span className="text-[10px] text-slate-400 block leading-none">Objective Lens</span>
              <span className="font-bold text-sky-400">{magnification}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Entity Selection Tabs (Microscope Slide Turret) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {entities.map(e => {
          const TabIcon = e.icon;
          const isSelected = selectedEntity === e.id;
          return (
            <button
              key={e.id}
              onClick={() => handleSelectEntity(e.id)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 border relative ${
                isSelected 
                  ? `bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]` 
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className={`p-2 rounded-xl border ${
                isSelected 
                  ? 'bg-slate-800 border-slate-700 ' + e.textColor 
                  : 'bg-white border-slate-200 text-slate-500'
              }`}>
                <TabIcon className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className={`text-xs font-bold block truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                  {e.name.split(' ')[0]}
                </span>
                <span className={`text-[10px] font-mono block truncate ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                  {e.mag}
                </span>
              </div>
              {isSelected && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-clinical-green animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Microscope Slide Chamber / Detail Inspection View */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-6 sm:p-10 border border-slate-800 shadow-2xl">
        
        {/* Optical Lens Vignette & Focus Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.7)_90%)] pointer-events-none z-10"></div>
        <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-[10px] text-slate-400 z-20">
          <span className="w-1.5 h-1.5 rounded-full bg-clinical-green"></span>
          <span>CALIBRATED FOCUS: 99.4%</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ 
              opacity: isFocusing ? 0.3 : 1, 
              scale: isFocusing ? 0.96 : 1, 
              filter: isFocusing ? 'blur(6px)' : 'blur(0px)' 
            }}
            exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 relative z-20"
          >
            {/* Specimen Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${current.color} text-white shadow-lg`}>
                  <IconComp className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl sm:text-2xl font-extrabold text-white">{current.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 border border-white/15 text-sky-300">
                      {current.mag}
                    </span>
                  </div>
                  <p className={`text-xs font-mono font-semibold ${current.textColor} pt-0.5`}>{current.tag}</p>
                </div>
              </div>
            </div>

            {/* 4 Precision Scientific Data Pillars with Staggered Transitions & TiltCard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <TiltCard maxTilt={4} className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1.5 hover:border-sky-400/40 transition-colors h-full">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold block flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                    1. Structural Morphology
                  </span>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{current.details.morphology}</p>
                </TiltCard>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <TiltCard maxTilt={4} className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1.5 hover:border-rose-400/40 transition-colors h-full">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold block flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    2. Physiological Function
                  </span>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{current.details.function}</p>
                </TiltCard>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <TiltCard maxTilt={4} className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1.5 hover:border-amber-400/40 transition-colors h-full">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    3. Micro-Fluid Dynamics
                  </span>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{current.details.physics}</p>
                </TiltCard>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <TiltCard maxTilt={4} className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1.5 hover:border-emerald-400/40 transition-colors h-full">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-clinical-green font-bold block flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-clinical-green"></span>
                    4. Biomedical Engineering & AI
                  </span>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{current.details.biomedicalApplication}</p>
                </TiltCard>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

    </div>
  );
}

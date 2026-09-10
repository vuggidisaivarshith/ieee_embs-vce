import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, HeartPulse, Activity, Shield, Sparkles, Dna, Info, ChevronRight } from 'lucide-react';

export default function BioExplorer() {
  const [selectedEntity, setSelectedEntity] = useState('rbc');

  const entities = [
    {
      id: 'rbc',
      name: 'Erythrocyte (RBC)',
      tag: 'Gas Transport & Laminar Flow',
      icon: HeartPulse,
      color: 'from-rose-500 to-red-600',
      textColor: 'text-rose-400',
      borderColor: 'border-rose-500/40',
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
      icon: Shield,
      color: 'from-sky-400 to-blue-600',
      textColor: 'text-sky-400',
      borderColor: 'border-sky-500/40',
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
      icon: Sparkles,
      color: 'from-amber-400 to-orange-500',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/40',
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
      icon: Activity,
      color: 'from-teal-400 to-emerald-600',
      textColor: 'text-teal-400',
      borderColor: 'border-teal-500/40',
      details: {
        morphology: 'P wave (atrial depolarization), QRS complex (ventricular depolarization), T wave (repolarization).',
        function: 'Synchronized electromechanical cardiac conduction from SA node through Purkinje fibers.',
        physics: 'Volume conductor electric field propagation detected via non-invasive Ag/AgCl surface electrodes.',
        biomedicalApplication: 'Real-time telemetry, arrhythmia classification algorithms, and wearable biometric monitoring.'
      }
    }
  ];

  const current = entities.find(e => e.id === selectedEntity) || entities[0];
  const IconComp = current.icon;

  return (
    <div className="specular-card rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-mono mb-2">
            <Microscope className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Microscopic Specimen Explorer</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Living Biological & Telemetry Architectures
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Click a biological specimen to inspect its morphology, fluid physics, and biomedical engineering applications.
          </p>
        </div>

        {/* Live Active Pill */}
        <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-slate-900 border border-emerald-500/40 text-emerald-400 flex items-center gap-2 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Microscopy Sensor Online</span>
        </span>
      </div>

      {/* Entity Selection Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {entities.map(e => {
          const TabIcon = e.icon;
          const isSelected = selectedEntity === e.id;
          return (
            <button
              key={e.id}
              onClick={() => setSelectedEntity(e.id)}
              className={`p-3.5 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 border ${
                isSelected 
                  ? `bg-slate-900 ${e.borderColor} shadow-lg shadow-sky-500/10 scale-[1.02]` 
                  : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className={`p-2 rounded-xl bg-slate-900 border border-white/10 ${e.textColor}`}>
                <TabIcon className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className={`text-xs font-bold block truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {e.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-500 font-mono block truncate">
                  {e.id.toUpperCase()}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail Inspection Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-white/15 space-y-6 shadow-xl"
        >
          {/* Specimen Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${current.color} text-white shadow-lg`}>
                <IconComp className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-white">{current.name}</h4>
                <p className={`text-xs font-mono font-semibold ${current.textColor}`}>{current.tag}</p>
              </div>
            </div>
          </div>

          {/* 4 Precision Scientific Data Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                1. Structural Morphology
              </span>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{current.details.morphology}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                2. Physiological Function
              </span>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{current.details.function}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                3. Micro-Fluid Dynamics
              </span>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{current.details.physics}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                4. Biomedical Engineering & AI
              </span>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{current.details.biomedicalApplication}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

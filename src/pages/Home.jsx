import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Users, Award, Clock, ArrowRight, Activity, 
  Sparkles, CheckCircle2, Megaphone, ChevronRight, Shield, HeartPulse, Info,
  Cpu, Dna, Microscope, Radio, Image as ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs, doc, getDoc, query, orderBy, limit } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import { resolveImage } from '../utils/resolveImage';
import EventCarousel from '../components/ui/EventCarousel';
import SpeakerModal from '../components/ui/SpeakerModal';
import BioExplorer from '../components/ui/BioExplorer';
import { eventSlide1, eventSlide2, eventSlide3 } from '../assets/images';

export default function Home() {
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_DATA.siteSettings);
  const [featuredEvent, setFeaturedEvent] = useState(DEFAULT_SITE_DATA.events[0]);
  const [latestAnnouncement, setLatestAnnouncement] = useState(DEFAULT_SITE_DATA.announcements[0]);
  const [loading, setLoading] = useState(true);
  const [speakerModalOpen, setSpeakerModalOpen] = useState(false);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const settingsSnap = await getDoc(doc(db, 'siteSettings', 'singletonDoc'));
        if (settingsSnap.exists()) {
          setSiteSettings(prev => ({ ...prev, ...settingsSnap.data() }));
        }

        const eventsSnap = await getDocs(collection(db, 'events'));
        if (!eventsSnap.empty) {
          const eventsList = eventsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          const feat = eventsList.find(e => e.featured) || eventsList[0];
          setFeaturedEvent(feat);
        }

        const annSnap = await getDocs(query(collection(db, 'announcements'), orderBy('date', 'desc'), limit(1)));
        if (!annSnap.empty) {
          setLatestAnnouncement({ id: annSnap.docs[0].id, ...annSnap.docs[0].data() });
        }
      } catch (err) {
        console.log("Using default fallback data for Home page:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = resolveImage('/assets/embs-logo.png');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const speakerData = {
    name: featuredEvent?.speaker || "Dr. Ajit Kumar",
    role: featuredEvent?.speakerRole || "Associate Professor of Information Systems, XIMB (XIM University)",
    photoUrl: resolveImage(featuredEvent?.posterUrl || '/assets/speaker.jpeg'),
    bio: featuredEvent?.speakerBio || `Associate Professor of Information Systems at Xavier Institute of Management (XIMB), XIM University, Bhubaneswar. Obtained Ph.D. in Medical Informatics from Taipei Medical University, Taiwan, and completed a Postdoctoral Fellowship at National Central University, Taiwan. Has over 18 years of combined industry and academic experience across Health IT, Telemedicine, Electronic Medical Records (EMR) standards (SNOMED), and AI adoption frameworks in healthcare.`,
    education: featuredEvent?.speakerEducation || [
      "Ph.D. in Medical Informatics — Taipei Medical University, Taiwan",
      "Postdoctoral Fellowship in HCI — Taiwan",
      "MCA (Master of Computer Applications) — India",
      "B.Sc. in Computer Science — India"
    ],
    focusAreas: featuredEvent?.speakerFocusAreas || [
      "Digital Health & Telemedicine Architectures",
      "Electronic Medical Records (EMR) & SNOMED Adoption",
      "Frameworks for Adopting Artificial Intelligence in Healthcare",
      "Academic Integrity & Health Informatics Policy"
    ],
    linkedin: featuredEvent?.speakerLinkedin || "https://www.linkedin.com/in/drajitkumar-ai-dt/?originalSubdomain=in",
    university: featuredEvent?.speakerUniversity || "https://ximb.edu.in/faculty-research/faculty-profile/prof-ajit-kumar/"
  };

  const eventSlides = [
    { url: eventSlide1, caption: "Dr. Ajit Kumar presenting Digital Health & Telemedicine Architectures" },
    { url: eventSlide2, caption: "Interactive session on Healthcare AI & Remote Patient Monitoring" },
    { url: eventSlide3, caption: "IEEE EMBS Vardhaman student felicitation & interactive Q&A" }
  ];

  const innovationPillars = [
    {
      icon: HeartPulse,
      title: "Bio-Signal Processing",
      desc: "Real-time ECG, EEG, and EMG diagnostic telemetry, algorithmic signal filtering, and wearable sensor telemetry.",
      color: "text-rose-400",
      border: "hover:border-rose-500/40"
    },
    {
      icon: Cpu,
      title: "Healthcare Artificial Intelligence",
      desc: "Deep neural networks for medical imaging segmentation, predictive diagnostics, and clinical decision support.",
      color: "text-sky-400",
      border: "hover:border-sky-500/40"
    },
    {
      icon: Dna,
      title: "Bioinformatics & Genomic Computing",
      desc: "Computational genomics, molecular modeling, biomaterial engineering, and sequence alignment algorithms.",
      color: "text-purple-400",
      border: "hover:border-purple-500/40"
    },
    {
      icon: Radio,
      title: "Telemedicine & IoT Healthcare",
      desc: "Cloud-connected remote patient telemetry, SNOMED EMR standards, and digital health delivery frameworks.",
      color: "text-emerald-400",
      border: "hover:border-emerald-500/40"
    }
  ];

  return (
    <div className="pt-20">

      {/* Speaker Bio Modal */}
      <SpeakerModal 
        isOpen={speakerModalOpen}
        onClose={() => setSpeakerModalOpen(false)}
        speakerData={speakerData}
      />
      
      {/* Announcement Banner Ticker */}
      {latestAnnouncement && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-950/80 backdrop-blur-md border-b border-white/10 text-slate-200 py-2.5 px-4 text-xs sm:text-sm font-medium shadow-sm relative z-20"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="bg-sky-500/20 text-sky-300 border border-sky-500/30 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0">
                <Megaphone className="w-3.5 h-3.5" /> Announcement
              </span>
              <p className="truncate font-semibold">{latestAnnouncement.title}</p>
            </div>
            <Link to="/announcements" className="hidden sm:flex items-center gap-1 font-bold text-sky-400 hover:text-sky-300 transition whitespace-nowrap ml-4">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Hero Section: Living Bloodstream Intravascular Environment */}
      <section className="relative overflow-hidden text-white py-20 lg:py-28">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            
            {/* Left Hero Column */}
            <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Frontier-Tech Category Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/15 backdrop-blur-md text-xs font-semibold text-sky-300 shadow-sm">
                <Microscope className="w-4 h-4 text-vardhaman-orange animate-pulse" />
                <span>IEEE Engineering in Medicine and Biology Society</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Advancing Biomedical Engineering & <span className="text-sky-400">Living Health Innovation</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                Advancing biomedical engineering, healthcare AI, and clinical technology innovation at Vardhaman College of Engineering. Exploring the living intersection of technology and human health.
              </p>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/events"
                  className="px-6 py-3.5 rounded-xl font-extrabold text-sm text-white bg-ieee-blue hover:bg-ieee-dark shadow-lg shadow-ieee-blue/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 hover:scale-105 border border-sky-400/40"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Explore Events</span>
                </Link>

                <Link
                  to="/gallery"
                  className="px-6 py-3.5 rounded-xl font-extrabold text-sm text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/15 backdrop-blur-md transition-all flex items-center gap-2 transform hover:scale-105"
                >
                  <ImageIcon className="w-4 h-4 text-sky-400" />
                  <span>Event Photo Gallery</span>
                </Link>
              </div>

              {/* Bio-Telemetry Status Metric Counters */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-center lg:text-left">
                <div className="p-3 bg-slate-900/40 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-sky-400">{siteSettings.membersCount}+</div>
                  <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Active Members</div>
                </div>
                <div className="p-3 bg-slate-900/40 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-rose-400">{siteSettings.eventsCount}+</div>
                  <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Events Hosted</div>
                </div>
                <div className="p-3 bg-slate-900/40 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">{siteSettings.yearsActive} Yrs</div>
                  <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Chapter Active</div>
                </div>
              </div>

            </motion.div>

            {/* Right Hero Column: Cinematic Event Showcase */}
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <div className="specular-card rounded-3xl p-6 space-y-4 hover-card-lift">
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Completed Session
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-400" /> 13 AUG 2026
                  </span>
                </div>

                {/* Cinematic 3-Screenshot Carousel */}
                <EventCarousel slides={eventSlides} title="Expert Talk by Dr. Ajit Kumar (13 Aug 2026)" />

                <div>
                  <span className="text-[11px] font-bold text-sky-400 uppercase tracking-widest font-mono">Digital Health Keynote</span>
                  <h3 className="text-lg font-bold text-white mt-1">Digital Health & Telemedicine Innovations</h3>
                  <p className="text-slate-300 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    Comprehensive expert talk by Dr. Ajit Kumar (XIMB) on remote healthcare architectures, SNOMED clinical terminology, and AI adoption in modern medicine.
                  </p>
                </div>

                {/* Separated Action Buttons */}
                <div className="pt-3 flex items-center justify-between gap-3 border-t border-white/10">
                  <button
                    onClick={() => setSpeakerModalOpen(true)}
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold text-sky-300 bg-white/10 hover:bg-white/20 border border-white/15 transition flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>About Speaker</span>
                  </button>

                  <Link
                    to="/gallery"
                    className="flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-ieee-blue to-embs-purple hover:shadow-lg transition flex items-center justify-center gap-1.5 border border-sky-400/30"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Event Gallery</span>
                  </Link>
                </div>

              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Biomedical Innovation Pillars Section */}
      <section className="py-20 bg-slate-950/60 border-t border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="px-3 py-1 rounded-full bg-ieee-blue/20 text-sky-400 border border-sky-400/30 text-xs font-mono uppercase tracking-widest">
              Biomedical Frontiers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Pillars of Health & Technology Innovation
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Explore the multidisciplinary fields advancing medical diagnosis, clinical treatment, and human healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {innovationPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`specular-card p-6 rounded-3xl space-y-4 hover-card-lift border ${pillar.border}`}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/10 ${pillar.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Microscopic Specimen Explorer */}
          <div className="mt-16">
            <BioExplorer />
          </div>

        </div>
      </section>

      {/* Chapter Overview & Coordinator Quote */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ieee-blue/20 text-sky-400 border border-sky-400/30 text-xs font-bold">
                <Activity className="w-4 h-4" />
                <span>About Our Student Branch Chapter</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Empowering Students to Engineer the Future of Medicine
              </h2>

              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {siteSettings.welcomeText}
              </p>

              <div className="space-y-3">
                {[
                  "Hands-on Workshops in Medical Signal Processing & AI",
                  "Expert Guest Lectures by Healthcare Industry Pioneers",
                  "National Symposia & Hackathon Competitions",
                  "Access to IEEE Xplore Digital Library & Global Grants"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link 
                  to="/about"
                  className="inline-flex items-center gap-2 font-bold text-sm text-sky-400 hover:text-sky-300 hover:underline"
                >
                  <span>Learn more about our chapter history & leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Coordinator Specimen Card */}
            <div className="lg:col-span-6">
              <div className="specular-card rounded-3xl p-8 space-y-6 hover-card-lift">
                <div className="flex items-center gap-4">
                  <img 
                    src={resolveImage(siteSettings.facultyPhoto || '/assets/faculty.jpeg')} 
                    alt={siteSettings.facultyName} 
                    onError={handleImgError}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-400 shadow-md"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-white">{siteSettings.facultyName}</h4>
                    <p className="text-xs font-semibold text-sky-400">{siteSettings.facultyRole}</p>
                    <p className="text-xs text-slate-400">{siteSettings.facultyDept}</p>
                  </div>
                </div>

                <blockquote className="text-slate-300 text-sm italic leading-relaxed border-l-2 border-sky-400/50 pl-4">
                  "{siteSettings.facultyQuote}"
                </blockquote>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  );
}

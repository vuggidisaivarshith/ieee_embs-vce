import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, Award, ChevronRight, CheckCircle2, Megaphone, Zap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { collection, getDocs, doc, getDoc, query, orderBy, limit } from "firebase/firestore";
import { db, DEFAULT_SITE_DATA } from "../firebase/config";
import { resolveImage } from "../utils/resolveImage";
import EventCarousel from "../components/ui/EventCarousel";
import SpeakerModal from "../components/ui/SpeakerModal";
import useMousePosition from "../utils/useMousePosition";
import MagneticButton from "../components/ui/MagneticButton";
import TiltCard from "../components/ui/TiltCard";
import InteractiveBioSignal from "../components/ui/InteractiveBioSignal";

import { eventSlide1, eventSlide2, eventSlide3 } from "../assets/images";

/* ── Subtle SVG scientific waveform (hero decoration) ── */
function HeroWaveform() {
  return (
    <svg
      viewBox="0 0 560 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto opacity-70"
      aria-hidden="true"
    >
      {/* Grid lines */}
      {[0,30,60,90,120,150,180].map(y => (
        <line key={y} x1="0" y1={y} x2="560" y2={y} stroke="#DDE4E1" strokeWidth="0.5" />
      ))}
      {[0,80,160,240,320,400,480,560].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="180" stroke="#DDE4E1" strokeWidth="0.5" />
      ))}

      {/* ECG-style waveform — primary teal */}
      <motion.path
        d="M0 90 L60 90 L75 90 L80 40 L85 130 L90 90 L140 90 L155 90 L160 30 L165 145 L170 90 L240 90 L255 90 L260 50 L265 135 L270 90 L360 90 L375 90 L380 45 L385 138 L390 90 L460 90 L475 90 L480 35 L485 142 L490 90 L560 90"
        stroke="#087F8C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Secondary faint trace */}
      <motion.path
        d="M0 110 Q70 95 140 115 Q210 128 280 108 Q350 90 420 115 Q490 130 560 108"
        stroke="#E76F51"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.45 }}
        transition={{ duration: 2.0, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Measurement tick marks */}
      {[80, 160, 260, 380, 480].map((x, i) => (
        <motion.line
          key={i}
          x1={x} y1="85" x2={x} y2="95"
          stroke="#087F8C"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.8 + i * 0.1 }}
        />
      ))}
    </svg>
  );
}

/* ── Section heading with teal rule ── */
function SectionHeading({ label, title, subtitle, align = "left" }) {
  return (
    <div className={`space-y-3 ${align === "center" ? "text-center" : ""}`}>
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <div className="w-8 h-0.5 bg-[#087F8C] rounded-full" />
        <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">{label}</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold text-[#172121] tracking-tight leading-tight">{title}</h2>
      {subtitle && <p className="text-[#647070] text-base leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  );
}

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } }
};

export default function Home() {
  const mouse = useMousePosition();
  const [siteSettings, setSiteSettings]         = useState(DEFAULT_SITE_DATA.siteSettings);
  const [featuredEvent, setFeaturedEvent]       = useState(DEFAULT_SITE_DATA.events[0]);
  const [latestAnnouncement, setLatestAnnouncement] = useState(DEFAULT_SITE_DATA.announcements[0]);
  const [loading, setLoading]                   = useState(true);
  const [speakerModalOpen, setSpeakerModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const settingsSnap = await getDoc(doc(db, "siteSettings", "singletonDoc"));
        if (settingsSnap.exists()) setSiteSettings(prev => ({ ...prev, ...settingsSnap.data() }));

        const eventsSnap = await getDocs(collection(db, "events"));
        if (!eventsSnap.empty) {
          const list = eventsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
          setFeaturedEvent(list.find(e => e.featured) || list[0]);
        }

        const annSnap = await getDocs(query(collection(db, "announcements"), orderBy("date", "desc"), limit(1)));
        if (!annSnap.empty) setLatestAnnouncement({ id: annSnap.docs[0].id, ...annSnap.docs[0].data() });
      } catch { /* fallback to defaults */ } finally { setLoading(false); }
    }
    load();
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = resolveImage("/assets/embs-logo.png");
  };

  const speakerData = {
    name: featuredEvent?.speaker || "Dr. Ajit Kumar",
    role: featuredEvent?.speakerRole || "Associate Professor of Information Systems, XIMB (XIM University)",
    photoUrl: resolveImage(featuredEvent?.posterUrl || "/assets/speaker.jpeg"),
    bio: featuredEvent?.speakerBio || "Associate Professor of Information Systems at Xavier Institute of Management (XIMB), XIM University. Ph.D. in Medical Informatics from Taipei Medical University, Taiwan. Over 18 years across Health IT, Telemedicine, Electronic Medical Records (EMR), and AI adoption frameworks in healthcare.",
    education: featuredEvent?.speakerEducation || ["Ph.D. in Medical Informatics — Taipei Medical University, Taiwan", "Postdoctoral Fellowship in HCI — Taiwan", "MCA — India", "B.Sc. in Computer Science — India"],
    focusAreas: featuredEvent?.speakerFocusAreas || ["Digital Health & Telemedicine Architectures", "Electronic Medical Records (EMR) & SNOMED Adoption", "AI Adoption Frameworks in Healthcare", "Academic Integrity & Health Informatics Policy"],
    linkedin: featuredEvent?.speakerLinkedin || "https://www.linkedin.com/in/drajitkumar-ai-dt/",
    university: featuredEvent?.speakerUniversity || "https://ximb.edu.in/faculty-research/faculty-profile/prof-ajit-kumar/"
  };

  const eventSlides = [
    { url: eventSlide1, caption: "Dr. Ajit Kumar presenting Digital Health & Telemedicine Architectures" },
    { url: eventSlide2, caption: "Interactive session on Healthcare AI & Remote Patient Monitoring" },
    { url: eventSlide3, caption: "IEEE EMBS Vardhaman student felicitation & Q&A" }
  ];

  const pillars = [
    { num: "01", title: "Bio-Signal Processing", desc: "Real-time ECG, EEG, and EMG diagnostic telemetry, algorithmic signal filtering, and wearable biomedical sensors.", tag: "Signal Analysis" },
    { num: "02", title: "Healthcare Artificial Intelligence", desc: "Deep neural networks for medical imaging segmentation, predictive diagnostics, and clinical decision support systems.", tag: "Clinical AI" },
    { num: "03", title: "Bioinformatics & Genomics", desc: "Computational genomics, molecular modeling, biomaterial engineering, and biological sequence alignment algorithms.", tag: "Genomics" },
    { num: "04", title: "Telemedicine & IoT Healthcare", desc: "Cloud-connected remote patient monitoring, SNOMED clinical standards, and digital healthcare delivery infrastructure.", tag: "Connected Health" }
  ];

  return (
    <div style={{ backgroundColor: "transparent" }}>

      {/* Speaker modal */}
      <SpeakerModal isOpen={speakerModalOpen} onClose={() => setSpeakerModalOpen(false)} speakerData={speakerData} />

      {/* ── OptiForge Full-Width Announcement Banner (immediately above the fold, offset for fixed navbar) ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden pt-16"
        style={{ background: "linear-gradient(135deg, #071A2B 0%, #0D2844 45%, #071A2B 100%)" }}
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[320px] h-[160px] rounded-full animate-glow-pulse"
            style={{ background:"radial-gradient(ellipse, rgba(0,140,149,0.38) 0%, transparent 70%)", filter:"blur(35px)" }} />
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[280px] h-[140px] rounded-full animate-glow-pulse"
            style={{ background:"radial-gradient(ellipse, rgba(0,102,204,0.30) 0%, transparent 70%)", filter:"blur(35px)", animationDelay:"1s" }} />
          <div className="absolute inset-0 animate-shimmer"
            style={{ backgroundImage:"linear-gradient(105deg, transparent 35%, rgba(0,184,217,0.06) 50%, transparent 65%)" }} />
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage:"linear-gradient(rgba(0,184,217,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,184,217,0.6) 1px, transparent 1px)", backgroundSize:"40px 40px" }} />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
            {/* Left: Event Identity */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background:"rgba(0,140,149,0.22)", border:"1px solid rgba(0,184,217,0.45)", boxShadow:"0 0 20px rgba(0,184,217,0.35)" }}>
                <Zap className="w-5 h-5 animate-pulse" style={{ color:"#00B8D9" }} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                    style={{ background:"rgba(0,184,217,0.18)", border:"1px solid rgba(0,184,217,0.40)", color:"#00B8D9" }}>
                    ★ Major Hackathon · 30 Sep 2026
                  </span>
                  <span className="hidden sm:inline-block text-[11px] font-mono text-white/40">9:00 AM – 4:00 PM · VCE Campus</span>
                </div>
                <p className="font-black text-lg sm:text-2xl tracking-tight mt-1" style={{ fontFamily:"Sora,Outfit,sans-serif" }}>
                  <span style={{ color:"#FFFFFF" }}>OPTI</span>
                  <span style={{ color:"#008C95" }}>FORGE</span>
                  <span className="font-bold text-sm ml-2" style={{ color:"rgba(255,255,255,0.4)" }}>2026</span>
                  <span className="ml-2 font-normal text-sm hidden md:inline" style={{ color:"rgba(255,255,255,0.65)" }}>
                    — Hackathon & Algorithm Design Challenge
                  </span>
                </p>
              </div>
            </div>

            {/* Right: CTAs */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <MagneticButton
                to="/optiforge"
                strength={0.3}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white transition-all whitespace-nowrap shadow-lg"
                style={{ background:"linear-gradient(135deg, #008C95 0%, #0066CC 100%)", boxShadow:"0 4px 20px rgba(0,140,149,0.5), inset 0 1px 0 rgba(255,255,255,0.3)" }}
              >
                <span>Explore & Register</span> <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton
                href="https://optiforge-2026.vercel.app/register"
                target="_blank"
                rel="noreferrer"
                strength={0.25}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold text-white/90 hover:text-white transition-all border"
                style={{ background:"rgba(255,255,255,0.08)", borderColor:"rgba(255,255,255,0.2)", backdropFilter:"blur(12px)" }}
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#00B8D9]" /> Direct Portal
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background:"linear-gradient(90deg, transparent, rgba(0,184,217,0.7), rgba(0,140,149,0.8), rgba(0,102,204,0.6), transparent)" }} />
      </motion.div>

      {/* Chapter notices ticker */}
      {latestAnnouncement && (
        <div className="border-b py-2 px-4 text-xs" style={{ background:"rgba(255,255,255,0.70)", backdropFilter:"blur(16px)", borderColor:"rgba(221,228,225,0.6)" }}>
          <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="flex-shrink-0 text-[10px] font-bold font-mono uppercase tracking-widest text-[#008C95] border border-[#008C95]/30 px-2 py-0.5 rounded-full bg-[#008C95]/10">Notice</span>
              <p className="truncate text-[#17202A] font-medium">{latestAnnouncement.title}</p>
            </div>
            <Link to="/announcements" className="flex-shrink-0 flex items-center gap-1 text-[#008C95] font-semibold hover:underline text-xs whitespace-nowrap">
              View <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative pt-8 sm:pt-12 pb-20 overflow-hidden" style={{ backgroundColor: "transparent" }}>
        {/* Subtle Apple mesh gradient top */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2F8FA]/60 via-white/40 to-transparent pointer-events-none" />

        {/* Thin teal top border accent */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#008C95] to-transparent opacity-30" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Editorial headline with mouse parallax */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="space-y-8 transition-transform duration-500 ease-out"
              style={{ transform: mouse.x ? `translate3d(${mouse.nX * 8}px, ${mouse.nY * 8}px, 0)` : undefined }}
            >
              {/* Chapter label */}
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <div className="w-8 h-0.5 bg-[#087F8C]" />
                <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">
                  IEEE · Engineering in Medicine & Biology Society
                </span>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#172121] tracking-tight leading-[1.05]"
                style={{ fontFamily: "Sora, Outfit, sans-serif" }}
              >
                Engineering<br />
                <span style={{ color: "#087F8C" }}>Medicine</span> &{" "}
                <span style={{ color: "#E76F51" }}>Biology</span><br />
                at Vardhaman
              </motion.h1>

              {/* Body */}
              <motion.p variants={fadeUp} className="text-[#647070] text-lg leading-relaxed max-w-lg">
                A student chapter connecting frontier biomedical engineering with real clinical practice. Workshops, research, keynotes, and community — at Vardhaman College of Engineering, Hyderabad.
              </motion.p>

              {/* CTAs with Magnetic Pull */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <MagneticButton
                  to="/events"
                  strength={0.3}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md"
                  style={{ background: "linear-gradient(160deg, #0A8F9C 0%, #087F8C 100%)", boxShadow: "0 4px 16px rgba(8,127,140,0.35)" }}
                >
                  Explore Events
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton
                  to="/about"
                  strength={0.2}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all glass-card text-[#172121]"
                >
                  About EMBS VCE
                </MagneticButton>
              </motion.div>

              {/* Stats — horizontal editorial band */}
              <motion.div variants={fadeUp} className="pt-4 border-t border-[#DDE4E1] grid grid-cols-3 gap-6">
                {[
                  { val: siteSettings.membersCount + "+", label: "Active Members" },
                  { val: siteSettings.eventsCount + "+",  label: "Events Hosted" },
                  { val: siteSettings.yearsActive + " Yrs", label: "Active Chapter" }
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl sm:text-3xl font-bold text-[#172121]">{s.val}</div>
                    <div className="text-[11px] font-mono uppercase tracking-wide text-[#647070] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* OptiForge Hackathon Glass Teaser */}
              <motion.div
                variants={fadeUp}
                className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
                style={{
                  background: "linear-gradient(135deg, rgba(7,26,43,0.96) 0%, rgba(13,40,68,0.94) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,184,217,0.35)",
                  boxShadow: "0 10px 30px -5px rgba(7,26,43,0.3), 0 0 20px -5px rgba(0,140,149,0.3), inset 0 1px 0 rgba(255,255,255,0.15)"
                }}
              >
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(0,184,217,0.25) 0%, transparent 70%)", filter: "blur(20px)" }} />
                  <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(0,102,204,0.2) 0%, transparent 70%)", filter: "blur(20px)" }} />
                </div>
                <div className="relative z-10 px-5 py-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00B8D9] animate-pulse" />
                      <span className="text-[10px] font-black font-mono uppercase tracking-widest text-[#00B8D9]">Flagship Hackathon · 30 Sep 2026</span>
                    </div>
                    <p className="text-white font-black text-lg mt-0.5 tracking-tight" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>
                      OPTI<span style={{ color: "#008C95" }}>FORGE</span>{" "}
                      <span className="text-white/40 font-semibold text-sm">2026</span>
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">Hackathon & Algorithm Design Challenge · IEEE EMBS × CIS</p>
                  </div>
                  <MagneticButton
                    to="/optiforge"
                    strength={0.3}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black text-white whitespace-nowrap transition-all shadow-md"
                    style={{ background: "linear-gradient(135deg, #008C95 0%, #0066CC 100%)", boxShadow: "0 2px 14px rgba(0,140,149,0.4), inset 0 1px 0 rgba(255,255,255,0.3)" }}
                  >
                    Register <ArrowRight className="w-3.5 h-3.5" />
                  </MagneticButton>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Keynote showcase card with mouse parallax */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 transition-transform duration-500 ease-out"
              style={{ transform: mouse.x ? `translate3d(${mouse.nX * -8}px, ${mouse.nY * -8}px, 0)` : undefined }}
            >
              {/* Live Interactive Bio-Signal Telemetry Monitor */}
              <div className="glass-card rounded-2xl p-5 overflow-hidden transition-all duration-300">
                <InteractiveBioSignal />
              </div>

              {/* Keynote event card with 3D Tilt */}
              <TiltCard maxTilt={4} className="rounded-2xl">
                <div className="glass-card rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-[#087F8C]/8 text-[#087F8C] border border-[#087F8C]/15">Completed Keynote</span>
                    <span className="text-[11px] font-mono text-[#647070]">13 Aug 2026</span>
                  </div>

                  <EventCarousel slides={eventSlides} title="Expert Talk by Dr. Ajit Kumar" />

                <div>
                  <p className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Digital Health Keynote</p>
                  <h3 className="text-base font-bold text-[#172121] mt-1">Digital Health & Telemedicine Innovations</h3>
                  <p className="text-[#647070] text-xs mt-1.5 leading-relaxed line-clamp-2">
                    Expert talk by Dr. Ajit Kumar (XIMB) on remote healthcare architectures, SNOMED clinical terminology, and AI adoption in modern medicine.
                  </p>
                </div>

                <div className="pt-3 flex items-center gap-2.5 border-t border-[#DDE4E1]">
                  <button
                    onClick={() => setSpeakerModalOpen(true)}
                    className="flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold text-[#647070] bg-[#F8F7F2] hover:bg-[#EEF6F7] hover:text-[#087F8C] border border-[#DDE4E1] transition-colors"
                  >
                    About Speaker
                  </button>
                  <Link
                    to="/gallery"
                    className="flex-1 py-2.5 px-3 rounded-lg text-xs font-bold text-center text-white bg-[#087F8C] hover:bg-[#075E61] transition-colors"
                  >
                    View Gallery
                  </Link>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          </div>
        </div>
      </section>

      {/* ── Section divider ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="h-px bg-[#DDE4E1]" />
      </div>

      {/* ── Innovation Pillars ── */}
      <section className="py-20" style={{ background:"transparent" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left sticky label */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
              <SectionHeading
                label="Research Domains"
                title="Pillars of Health & Technology Innovation"
                subtitle="The multidisciplinary fields advancing medical diagnosis, clinical treatment, and human healthcare at Vardhaman."
              />
              <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-semibold text-[#087F8C] hover:underline">
                Explore Research Resources <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: Pillar list */}
            <div className="lg:col-span-8 space-y-3">
              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-card group flex items-start gap-6 p-6 rounded-xl cursor-default"
                >
                  <div className="flex-shrink-0 text-[11px] font-black font-mono text-[#DDE4E1] group-hover:text-[#087F8C] transition-colors pt-0.5">{p.num}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1.5">
                      <h3 className="text-base font-bold text-[#172121] group-hover:text-[#087F8C] transition-colors">{p.title}</h3>
                      <span className="flex-shrink-0 text-[10px] font-mono font-bold text-[#087F8C] bg-[#087F8C]/6 border border-[#087F8C]/12 px-2.5 py-0.5 rounded uppercase tracking-wide">{p.tag}</span>
                    </div>
                    <p className="text-[#647070] text-sm leading-relaxed">{p.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#DDE4E1] group-hover:text-[#087F8C] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>




      {/* ── Chapter welcome & Faculty quote ── */}
      <section className="py-20" style={{ background:"transparent" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            <div className="lg:col-span-7 space-y-6">
              <SectionHeading label="Chapter Overview" title="Empowering Students to Engineer the Future of Medicine" />
              <p className="text-[#647070] leading-relaxed">{siteSettings.welcomeText}</p>
              <div className="space-y-3 pt-2">
                {[
                  "Hands-on Workshops in Medical Signal Processing & AI",
                  "Expert Keynote Lectures by Healthcare Industry Pioneers",
                  "National Symposia & Healthcare Hackathon Competitions",
                  "Direct Access to IEEE Xplore Digital Library & Research Grants"
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#087F8C] flex-shrink-0 mt-0.5" />
                    <span className="text-[#172121] text-sm font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[#087F8C] hover:underline">
                Learn more about our chapter <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Faculty card */}
            <div className="lg:col-span-5">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card-strong rounded-xl p-7 space-y-5">
                <div className="flex items-center gap-4">
                  <img src={resolveImage(siteSettings.facultyPhoto || "/assets/faculty.jpeg")} alt={siteSettings.facultyName}
                    onError={handleImgError} className="w-14 h-14 rounded-lg object-cover border border-white/40 flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-bold text-[#172121]">{siteSettings.facultyName}</h4>
                    <p className="text-xs font-semibold text-[#087F8C]">{siteSettings.facultyRole}</p>
                    <p className="text-xs text-[#647070]">{siteSettings.facultyDept}</p>
                  </div>
                </div>
                <div className="h-px bg-black/6" />
                <blockquote className="text-[#647070] text-sm leading-relaxed italic border-l-2 border-[#E76F51] pl-4">
                  "{siteSettings.facultyQuote}"
                </blockquote>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[#172121] py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Ready to join IEEE EMBS?</h2>
              <p className="text-[#8A9E9A] text-sm mt-2 max-w-md">Connect with the global biomedical engineering community and unlock research resources, IEEE Xplore access, and leadership opportunities.</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <MagneticButton
                to="/membership"
                strength={0.25}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-[#172121] bg-[#E9C46A] hover:bg-[#D4B050] transition-colors shadow-md"
              >
                Join EMBS <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton
                to="/contact"
                strength={0.2}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white border border-white/20 hover:border-white/40 transition-colors"
              >
                Contact Us
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

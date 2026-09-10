import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Search, ChevronRight, User, Image as ImageIcon, Info, Activity, Zap, Radio } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db, DEFAULT_SITE_DATA } from "../firebase/config";
import { resolveImage } from "../utils/resolveImage";
import CountdownTimer from "../components/ui/CountdownTimer";
import Skeleton from "../components/ui/Skeleton";
import TiltCard from "../components/ui/TiltCard";

/* Bio signal waveform SVG drawn inline */
function BioSignalWaveform() {
  const pts = [];
  const W = 1200, H = 60;
  const segments = 24;
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * W;
    const t = i / segments;
    /* ECG-like: flat baseline with QRS spikes at every 6th segment */
    let y = H / 2;
    const phase = i % 6;
    if (phase === 0) y = H / 2 - 22;
    else if (phase === 1) y = H / 2 + 10;
    else if (phase === 2) y = H / 2 - 40;
    else if (phase === 3) y = H / 2 + 14;
    else if (phase === 4) y = H / 2 - 8;
    pts.push(`${x},${y}`);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-12 opacity-20 pointer-events-none">
      <polyline points={pts.join(" ")} fill="none" stroke="url(#ecgGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <linearGradient id="ecgGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00629B" />
          <stop offset="50%" stopColor="#00A8C6" />
          <stop offset="100%" stopColor="#772583" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.10, delayChildren: 0.05 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Events() {
  const [events, setEvents] = useState(DEFAULT_SITE_DATA.events);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const snap = await getDocs(collection(db, "events"));
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          setEvents(list);
        }
      } catch (err) {
        console.log("Using default events dataset:", err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = resolveImage("/assets/embs-logo.png");
  };

  const filteredEvents = events.filter(e => {
    const matchesFilter = filter === "all" || e.status === filter;
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      (e.topic && e.topic.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B16] text-slate-800 dark:text-slate-100">

      {/* Cinematic Hero */}
      <section ref={heroRef} className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/8 via-clinical-green/4 to-transparent pointer-events-none" />
        {/* ECG decorative rings */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 70, ease: "linear", repeat: Infinity }} className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full border border-embs-blue/8 pointer-events-none" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 100, ease: "linear", repeat: Infinity }} className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full border border-clinical-green/6 pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6 max-w-4xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/90 border border-emerald-300/40 dark:border-emerald-500/20 backdrop-blur-md text-xs font-mono font-bold text-clinical-green shadow-sm">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Bio-Signal Diagnostics · Waveform Telemetry · Event Timeline</span>
              <span className="w-1.5 h-1.5 rounded-full bg-clinical-green animate-ping" />
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06]">
              <span className="text-slate-900 dark:text-white">Events &</span>{" "}
              <span className="bg-gradient-to-r from-embs-blue via-embs-cyan to-clinical-green bg-clip-text text-transparent">Technical Seminars</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-slate-600 dark:text-slate-300 text-base sm:text-xl leading-relaxed max-w-2xl font-light">
              Explore hands-on workshops, expert keynote talks, hackathons, and medical symposia hosted by{" "}
              <span className="font-semibold text-slate-800 dark:text-white">IEEE EMBS Vardhaman</span>.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Biological signal waveform divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <BioSignalWaveform />
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm w-full md:w-auto">
            {["all", "upcoming", "past"].map(tab => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(tab)}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition ${
                  filter === tab
                    ? "bg-embs-blue text-white shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {tab === "all" ? "All Events" : tab === "upcoming" ? "Upcoming Events" : "Past Events"}
              </motion.button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events by title or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-embs-blue shadow-sm"
            />
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="bright-card dark:bg-slate-900/80 rounded-3xl p-6 space-y-4">
                <Skeleton className="h-48 w-full rounded-2xl bg-slate-200 dark:bg-slate-700" />
                <Skeleton className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700" />
                <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 bright-card dark:bg-slate-900/80 rounded-3xl p-8">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Events Found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Try adjusting your filter or search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard maxTilt={5} className="bright-card dark:bg-slate-900/80 rounded-3xl overflow-hidden shadow-bright hover:shadow-bright-hover flex flex-col group border border-slate-200/80 dark:border-white/10 transition-all h-full">
                  {/* Poster Image with status ribbon */}
                  <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={resolveImage(event.posterUrl || "/assets/embs-logo.png")}
                      alt={event.title}
                      onError={handleImgError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md ${
                      event.status === "upcoming"
                        ? "bg-clinical-green text-white"
                        : "bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-white border border-slate-200 dark:border-white/10"
                    }`}>
                      {event.status === "past" ? "Completed" : event.status}
                    </span>
                    {/* Bio-signal indicator line at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-embs-blue/60 to-embs-cyan/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-embs-blue" />
                        <span className="text-xs font-bold text-embs-blue uppercase tracking-wider font-mono">{event.topic || "Biomedical Engineering"}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-embs-blue dark:group-hover:text-sky-400 transition-colors line-clamp-2">{event.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed">{event.description}</p>
                    </div>

                    {event.status === "upcoming" && event.date && (
                      <div className="pt-2">
                        <CountdownTimer targetDate={event.date} eventTitle={event.title} />
                      </div>
                    )}

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-embs-blue" />
                        <span className="font-medium">{event.date} {event.time && `• ${event.time}`}</span>
                      </div>
                      {event.venue && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-warm-orange" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                      )}
                      {event.speaker && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-embs-purple" />
                          <span className="truncate font-semibold text-slate-700 dark:text-slate-300">{event.speaker}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <Link to={`/events/${event.id}`} className="flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold text-center text-white bg-embs-blue hover:bg-ieee-dark shadow-sm flex items-center justify-center gap-1.5 transition-all">
                        <Info className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </Link>
                      <Link to="/gallery" className="flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold text-center text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-embs-purple hover:text-white border border-slate-200 dark:border-white/10 shadow-sm flex items-center justify-center gap-1.5 transition-all">
                        <ImageIcon className="w-3.5 h-3.5 text-embs-purple" />
                        <span>Event Gallery</span>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

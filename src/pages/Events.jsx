import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Search, ChevronRight, User, Image as ImageIcon, Info, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import { resolveImage } from '../utils/resolveImage';
import CountdownTimer from '../components/ui/CountdownTimer';
import Skeleton from '../components/ui/Skeleton';

export default function Events() {
  const [events, setEvents] = useState(DEFAULT_SITE_DATA.events);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const snap = await getDocs(collection(db, 'events'));
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
    e.currentTarget.src = resolveImage('/assets/embs-logo.png');
  };

  const filteredEvents = events.filter(e => {
    const matchesFilter = filter === 'all' || e.status === filter;
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || 
                          (e.topic && e.topic.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20">
      
      {/* Hero Header Banner */}
      <section className="py-16 text-white text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-400/30 text-xs font-mono text-emerald-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Bio-Signal Diagnostics & Waveform Telemetry</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold">Events & Technical Seminars</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore hands-on workshops, expert keynote talks, hackathons, and medical symposia hosted by IEEE EMBS Vardhaman.
          </p>
        </motion.div>
      </section>

      {/* Main Listing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md w-full md:w-auto">
            {['all', 'upcoming', 'past'].map(tab => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(tab)}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition ${
                  filter === tab 
                    ? 'bg-ieee-blue text-white shadow-md border border-sky-400/30' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Events' : tab === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
              </motion.button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events by title or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-md"
            />
          </div>

        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="specular-card rounded-3xl p-6 space-y-4">
                <Skeleton className="h-48 w-full rounded-2xl bg-slate-800" />
                <Skeleton className="h-6 w-3/4 bg-slate-800" />
                <Skeleton className="h-4 w-full bg-slate-800" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 specular-card rounded-3xl p-8">
            <Calendar className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Events Found</h3>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your filter or search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, idx) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="specular-card rounded-3xl overflow-hidden shadow-xl hover-card-lift flex flex-col group"
              >
                {/* Poster Image */}
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img 
                    src={resolveImage(event.posterUrl || '/assets/embs-logo.png')} 
                    alt={event.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    event.status === 'upcoming' 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : 'bg-slate-950/80 text-slate-300 border border-white/20'
                  }`}>
                    {event.status === 'past' ? 'Completed' : event.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block font-mono">
                      {event.topic || 'Biomedical Engineering'}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Countdown Timer for Upcoming Events */}
                  {event.status === 'upcoming' && event.date && (
                    <div className="pt-2">
                      <CountdownTimer targetDate={event.date} eventTitle={event.title} />
                    </div>
                  )}

                  {/* Metadata */}
                  <div className="space-y-2 text-xs text-slate-400 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Calendar className="w-4 h-4 text-sky-400" />
                      <span>{event.date} {event.time && `• ${event.time}`}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin className="w-4 h-4 text-vardhaman-orange" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    )}
                    {event.speaker && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <User className="w-4 h-4 text-purple-400" />
                        <span className="truncate">{event.speaker}</span>
                      </div>
                    )}
                  </div>

                  {/* Separated Action Buttons (Details & Event Gallery) */}
                  <div className="pt-2 flex items-center gap-2">
                    <Link
                      to={`/events/${event.id}`}
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold text-center text-white bg-ieee-blue hover:bg-ieee-dark shadow-md flex items-center justify-center gap-1.5 transition-all border border-sky-400/30"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>

                    <Link
                      to="/gallery"
                      className="flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold text-center text-slate-200 bg-slate-900 hover:bg-embs-purple hover:text-white border border-white/15 shadow-md flex items-center justify-center gap-1.5 transition-all"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                      <span>Event Gallery</span>
                    </Link>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </section>

    </div>
  );
}

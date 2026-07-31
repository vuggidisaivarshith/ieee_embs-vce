import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Search, ChevronRight, User } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
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
    e.currentTarget.src = "/assets/embs-logo.png";
  };

  const filteredEvents = events.filter(e => {
    const matchesFilter = filter === 'all' || e.status === filter;
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || 
                          (e.topic && e.topic.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 animate-fade-in">
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange text-white py-16 animate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 animate-slide-up">
          <h1 className="text-3xl sm:text-5xl font-extrabold">Events & Activities</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto">
            Explore upcoming workshops, expert seminars, guest lectures, and student hackathons hosted by IEEE EMBS Vardhaman.
          </p>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl w-full md:w-auto">
            {['all', 'upcoming', 'past'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition ${
                  filter === tab 
                    ? 'bg-ieee-blue text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-ieee-blue'
                }`}
              >
                {tab === 'all' ? 'All Events' : tab === 'upcoming' ? 'Upcoming Events' : 'Past Events'}
              </button>
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ieee-blue"
            />
          </div>

        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-white dark:bg-slate-800 rounded-3xl p-6 space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Events Found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your filter or search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <div 
                key={event.id}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-lg hover-card-lift flex flex-col group"
              >
                {/* Poster Image */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img 
                    src={event.posterUrl || "/assets/embs-logo.png"} 
                    alt={event.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  />
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    event.status === 'upcoming' 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : 'bg-slate-900/80 text-slate-300 border border-white/20'
                  }`}>
                    {event.status}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-ieee-blue dark:text-sky-400 uppercase tracking-wider block">
                      {event.topic || 'Biomedical Engineering'}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-ieee-blue transition line-clamp-2">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-ieee-blue" />
                      <span>{event.date} {event.time && `• ${event.time}`}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-vardhaman-orange" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    )}
                    {event.speaker && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-embs-purple" />
                        <span className="truncate">{event.speaker}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link
                      to={`/events/${event.id}`}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center text-white bg-ieee-blue hover:bg-ieee-dark shadow-md flex items-center justify-center gap-1.5 transition"
                    >
                      <span>View Details & Register</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

    </div>
  );
}

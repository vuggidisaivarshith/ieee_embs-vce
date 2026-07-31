import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, ArrowLeft, ExternalLink, Download, CheckCircle, Share2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        if (id) {
          const docSnap = await getDoc(doc(db, 'events', id));
          if (docSnap.exists()) {
            setEvent({ id: docSnap.id, ...docSnap.data() });
            setLoading(false);
            return;
          }
        }
        // Fallback search
        const fallback = DEFAULT_SITE_DATA.events.find(e => e.id === id) || DEFAULT_SITE_DATA.events[0];
        setEvent(fallback);
      } catch (err) {
        console.log("Using default fallback event detail:", err);
        setEvent(DEFAULT_SITE_DATA.events[0]);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ieee-blue"></div>
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Back Button */}
      <Link 
        to="/events"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-ieee-blue mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events</span>
      </Link>

      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl space-y-8 p-6 sm:p-10">
        
        {/* Event Header Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-ieee-blue/10 text-ieee-blue dark:bg-ieee-blue/20 dark:text-sky-400 uppercase tracking-wider">
              {event.topic || 'IEEE EMBS Event'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {event.title}
            </h1>
            
            {/* Metadata Pills */}
            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600 dark:text-slate-300 pt-2">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 rounded-xl">
                <Calendar className="w-4 h-4 text-ieee-blue" />
                <span>{event.date}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 rounded-xl">
                  <Clock className="w-4 h-4 text-embs-purple" />
                  <span>{event.time}</span>
                </div>
              )}
              {event.venue && (
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/50 px-3 py-2 rounded-xl">
                  <MapPin className="w-4 h-4 text-vardhaman-orange" />
                  <span>{event.venue}</span>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-5">
            <img 
              src={event.posterUrl || "/assets/speaker.jpeg"} 
              alt={event.title}
              className="w-full h-64 object-cover rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700" 
            />
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-slate-100 dark:border-slate-700 pt-6 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">About the Event</h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
            {event.description}
          </p>
        </div>

        {/* Speaker Profile */}
        {event.speaker && (
          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="text-xs font-bold text-ieee-blue uppercase tracking-wider">Featured Speaker</h4>
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-embs-purple" />
              <p className="text-lg font-bold text-slate-900 dark:text-white">{event.speaker}</p>
            </div>
          </div>
        )}

        {/* Agenda */}
        {event.agenda && event.agenda.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Event Schedule</h3>
            <div className="space-y-2">
              {event.agenda.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registration CTA */}
        {event.registrationLink && (
          <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Ready to Participate?</p>
              <p className="text-xs text-slate-500">Secure your spot for this session today.</p>
            </div>
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              <span>Register via Google Form</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

      </div>

    </div>
  );
}

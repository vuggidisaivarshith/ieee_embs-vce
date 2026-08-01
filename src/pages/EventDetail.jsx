import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, User, ArrowLeft, ExternalLink, 
  Download, CheckCircle, Share2, Info, Linkedin, BookOpen 
} from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import { resolveImage } from '../utils/resolveImage';
import CountdownTimer from '../components/ui/CountdownTimer';
import SpeakerModal from '../components/ui/SpeakerModal';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [speakerModalOpen, setSpeakerModalOpen] = useState(false);

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

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = resolveImage('/assets/embs-logo.png');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ieee-blue"></div>
      </div>
    );
  }

  if (!event) return null;

  const speakerData = {
    name: event.speaker || "Dr. Ajit Kumar",
    role: event.speakerRole || "Associate Professor of Information Systems, XIMB (XIM University)",
    photoUrl: resolveImage(event.posterUrl || '/assets/speaker.jpeg'),
    bio: event.speakerBio || `Associate Professor of Information Systems at Xavier Institute of Management (XIMB), XIM University, Bhubaneswar. Obtained Ph.D. in Medical Informatics from Taipei Medical University, Taiwan, and completed a Postdoctoral Fellowship at National Central University, Taiwan. Has over 18 years of combined industry and academic experience across Health IT, Telemedicine, Electronic Medical Records (EMR) standards (SNOMED), and AI adoption frameworks in healthcare.`,
    education: event.speakerEducation || [
      "Ph.D. in Medical Informatics — Taipei Medical University, Taiwan",
      "Postdoctoral Fellowship in HCI — Taiwan",
      "MCA (Master of Computer Applications) — India",
      "B.Sc. in Computer Science — India"
    ],
    focusAreas: event.speakerFocusAreas || [
      "Digital Health & Telemedicine Architectures",
      "Electronic Medical Records (EMR) & SNOMED Adoption",
      "Frameworks for Adopting Artificial Intelligence in Healthcare",
      "Academic Integrity & Health Informatics Policy"
    ],
    linkedin: event.speakerLinkedin || "https://www.linkedin.com/in/drajitkumar-ai-dt/?originalSubdomain=in",
    university: event.speakerUniversity || "https://ximb.edu.in/faculty-research/faculty-profile/prof-ajit-kumar/"
  };

  return (
    <div className="pt-24 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Speaker Bio Modal */}
      <SpeakerModal 
        isOpen={speakerModalOpen}
        onClose={() => setSpeakerModalOpen(false)}
        speakerData={speakerData}
      />

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

            {/* Countdown Timer for Upcoming Events */}
            {event.date && (
              <div className="pt-3 max-w-sm">
                <CountdownTimer targetDate={event.date} eventTitle={event.title} />
              </div>
            )}
          </div>

          <div className="md:col-span-5">
            <img 
              src={resolveImage(event.posterUrl || '/assets/speaker.jpeg')} 
              alt={event.title}
              onError={handleImgError}
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

        {/* Featured Speaker Card with "About Speaker" Button & Links */}
        {event.speaker && (
          <div className="bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 dark:from-slate-800 dark:via-slate-750 dark:to-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ieee-blue dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-4 h-4" /> Keynote Speaker Profile
              </span>
              
              {/* About Speaker Button */}
              <button
                onClick={() => setSpeakerModalOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-ieee-blue hover:bg-ieee-dark shadow-md flex items-center gap-1.5 transition transform hover:scale-105"
              >
                <Info className="w-4 h-4" />
                <span>About Speaker</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img 
                src={resolveImage(event.posterUrl || '/assets/speaker.jpeg')} 
                alt={event.speaker}
                onError={handleImgError}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-ieee-blue shadow-md flex-shrink-0"
              />
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">{event.speaker}</h4>
                <p className="text-xs font-semibold text-ieee-blue dark:text-sky-400">{speakerData.role}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 pt-1">{speakerData.bio}</p>
                
                {/* External Links */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-3">
                  {speakerData.linkedin && (
                    <a
                      href={speakerData.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A66C2] hover:underline"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {speakerData.university && (
                    <a
                      href={speakerData.university}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-embs-purple hover:underline"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>XIMB Faculty Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
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
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 transform hover:scale-105"
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

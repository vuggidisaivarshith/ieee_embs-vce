import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, User, ArrowLeft, ExternalLink, 
  CheckCircle, Share2, Info, Linkedin, BookOpen, Image as ImageIcon, Activity 
} from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import { resolveImage } from '../utils/resolveImage';
import EventCarousel from '../components/ui/EventCarousel';
import SpeakerModal from '../components/ui/SpeakerModal';
import { eventSlide1, eventSlide2, eventSlide3 } from '../assets/images';

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
      <div className="min-h-screen pt-32 flex justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-embs-blue"></div>
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

  const eventSlides = [
    { url: eventSlide1, caption: "Dr. Ajit Kumar delivering expert keynote session on Digital Health & Telemedicine" },
    { url: eventSlide2, caption: "Interactive presentation on Telemedicine & Healthcare AI Architectures" },
    { url: eventSlide3, caption: "IEEE EMBS student interactive Q&A and felicitation" }
  ];

  const isPastEvent = event.status === 'past' || new Date(event.date) < new Date();

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Speaker Bio Modal */}
        <SpeakerModal 
          isOpen={speakerModalOpen}
          onClose={() => setSpeakerModalOpen(false)}
          speakerData={speakerData}
        />

        {/* Back Button */}
        <Link 
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-embs-blue mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </Link>

        <div className="bright-card rounded-3xl overflow-hidden p-6 sm:p-10 space-y-8 shadow-bright">
          
          {/* Event Header Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-sky-50 text-embs-blue border border-sky-200 uppercase tracking-wider inline-block">
                {event.topic || 'IEEE EMBS Event'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
                {event.title}
              </h1>
              
              {/* Metadata Pills */}
              <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-600 pt-2">
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                  <Calendar className="w-4 h-4 text-embs-blue" />
                  <span className="font-semibold">{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                    <Clock className="w-4 h-4 text-embs-purple" />
                    <span>{event.time}</span>
                  </div>
                )}
                {event.venue && (
                  <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
                    <MapPin className="w-4 h-4 text-warm-orange" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-5">
              <img 
                src={resolveImage(event.posterUrl || '/assets/speaker.jpeg')} 
                alt={event.title}
                onError={handleImgError}
                className="w-full h-64 object-cover rounded-2xl shadow-md border border-slate-200" 
              />
            </div>
          </div>

          {/* Cinematic Screenshots Banner Carousel */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-slate-900">Live Session Highlights</h3>
              <span className="text-xs font-mono font-bold text-embs-blue">13 AUG 2026</span>
            </div>
            <EventCarousel slides={eventSlides} title={event.title} />
          </div>

          {/* Description */}
          <div className="border-t border-slate-100 pt-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">About the Event</h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Featured Speaker Card with "About Speaker" Button & Links */}
          {event.speaker && (
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-embs-blue uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <User className="w-4 h-4" /> Keynote Speaker Profile
                </span>
                
                {/* About Speaker Button */}
                <button
                  onClick={() => setSpeakerModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-embs-blue hover:bg-ieee-dark shadow-sm flex items-center gap-1.5 transition transform hover:scale-105"
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
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-embs-blue shadow-md flex-shrink-0"
                />
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-xl font-extrabold text-slate-900">{event.speaker}</h4>
                  <p className="text-xs font-semibold text-embs-blue">{speakerData.role}</p>
                  <p className="text-xs text-slate-600 line-clamp-2 pt-1">{speakerData.bio}</p>
                  
                  {/* External Links */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-3">
                    {speakerData.linkedin && (
                      <a
                        href={speakerData.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-embs-blue hover:underline"
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

          {/* Separated Action Buttons (Event Gallery & About Speaker) */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-slate-900">
                {isPastEvent ? "Session Completed on 13 Aug 2026" : "Ready to Participate?"}
              </p>
              <p className="text-xs text-slate-500">
                {isPastEvent ? "Explore event session screenshots and speaker details." : "Secure your spot for this session today."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setSpeakerModalOpen(true)}
                className="flex-1 sm:flex-initial px-5 py-3 rounded-xl text-xs font-extrabold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-sm flex items-center justify-center gap-1.5 transition"
              >
                <Info className="w-4 h-4 text-embs-blue" />
                <span>About Speaker</span>
              </button>

              <Link
                to="/gallery"
                className="flex-1 sm:flex-initial px-6 py-3 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-embs-blue via-embs-purple to-warm-orange shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Event Gallery</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Users, Award, Clock, ArrowRight, Activity, 
  Sparkles, CheckCircle2, Megaphone, ChevronRight, Shield 
} from 'lucide-react';
import { collection, getDocs, doc, getDoc, query, orderBy, limit } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../firebase/config';
import Skeleton from '../components/ui/Skeleton';

export default function Home() {
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_DATA.siteSettings);
  const [featuredEvent, setFeaturedEvent] = useState(DEFAULT_SITE_DATA.events[0]);
  const [latestAnnouncement, setLatestAnnouncement] = useState(DEFAULT_SITE_DATA.announcements[0]);
  const [loading, setLoading] = useState(true);

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
    e.currentTarget.src = "/assets/embs-logo.png";
  };

  return (
    <div className="pt-20 animate-fade-in">
      
      {/* Announcement Banner Ticker */}
      {latestAnnouncement && (
        <div className="bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange text-white py-2.5 px-4 text-xs sm:text-sm font-medium shadow-sm animate-gradient">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0">
                <Megaphone className="w-3.5 h-3.5" /> Announcement
              </span>
              <p className="truncate font-semibold">{latestAnnouncement.title}</p>
            </div>
            <Link to="/announcements" className="hidden sm:flex items-center gap-1 font-bold underline hover:opacity-90 transition whitespace-nowrap ml-4">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-neutralDark to-slate-950 text-white py-20 lg:py-28 animate-gradient">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#00629B_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold text-sky-300">
                <Sparkles className="w-4 h-4 text-vardhaman-orange animate-pulse" />
                <span>IEEE EMBS Vardhaman Student Branch Chapter</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Advancing <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-emerald-300 to-amber-300">Healthcare</span> Technology & Innovation
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {siteSettings.heroDescription}
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/events"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-ieee-blue hover:bg-ieee-dark shadow-lg shadow-ieee-blue/30 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Explore Events</span>
                </Link>

                <Link
                  to="/about"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <span>About Our Chapter</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-bold text-sky-400">{siteSettings.membersCount}+</div>
                  <div className="text-xs text-slate-400 font-medium">Active Members</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-400">{siteSettings.eventsCount}+</div>
                  <div className="text-xs text-slate-400 font-medium">Events Hosted</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">{siteSettings.yearsActive} Years</div>
                  <div className="text-xs text-slate-400 font-medium">Active Chapter</div>
                </div>
              </div>

            </div>

            {/* Right Featured Event Highlight Card */}
            <div className="lg:col-span-5 animate-slide-up">
              <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-sky-500/30 via-purple-500/20 to-orange-500/30 shadow-2xl hover-card-lift">
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-[22px] p-6 border border-white/10 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                      Featured Event
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {featuredEvent?.date}
                    </span>
                  </div>

                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 border border-white/10">
                    <img 
                      src={featuredEvent?.posterUrl || "/assets/speaker.jpeg"} 
                      alt={featuredEvent?.title}
                      onError={handleImgError}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                  </div>

                  <div>
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">{featuredEvent?.topic}</span>
                    <h3 className="text-xl font-bold text-white mt-1 line-clamp-2">{featuredEvent?.title}</h3>
                    <p className="text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">{featuredEvent?.description}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10">
                    <div className="text-xs text-slate-300">
                      <span className="font-semibold block text-slate-400">Speaker:</span>
                      <span className="font-medium text-white">{featuredEvent?.speaker}</span>
                    </div>
                    <Link
                      to={`/events/${featuredEvent?.id || 'digital-health-talk'}`}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-vardhaman-orange to-amber-500 hover:shadow-lg transition flex items-center gap-1"
                    >
                      <span>Register Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Chapter Welcome & Overview */}
      <section className="py-20 bg-neutralLight dark:bg-slate-900 transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ieee-blue/10 text-ieee-blue dark:bg-ieee-blue/20 dark:text-sky-400 text-xs font-bold">
                <Activity className="w-4 h-4" />
                <span>About Our Student Branch Chapter</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Connecting Engineering with Healthcare Innovation
              </h2>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
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
                    <CheckCircle2 className="w-5 h-5 text-embs-teal flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link 
                  to="/about"
                  className="inline-flex items-center gap-2 font-bold text-sm text-ieee-blue dark:text-sky-400 hover:underline"
                >
                  <span>Learn more about our chapter history & leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Coordinator Quote Card */}
            <div className="lg:col-span-6 animate-slide-up">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 relative hover-card-lift">
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={siteSettings.facultyPhoto} 
                    alt={siteSettings.facultyName} 
                    onError={handleImgError}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-ieee-blue shadow-md"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">{siteSettings.facultyName}</h4>
                    <p className="text-xs font-semibold text-ieee-blue dark:text-sky-400">{siteSettings.facultyRole}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{siteSettings.facultyDept}</p>
                  </div>
                </div>

                <blockquote className="text-slate-600 dark:text-slate-300 text-sm italic leading-relaxed relative z-10">
                  "{siteSettings.facultyQuote}"
                </blockquote>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange text-white animate-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="p-4 hover-card-lift">
              <div className="text-4xl sm:text-5xl font-black mb-2">{siteSettings.membersCount}+</div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">Student Members</div>
            </div>

            <div className="p-4 hover-card-lift">
              <div className="text-4xl sm:text-5xl font-black mb-2">{siteSettings.eventsCount}+</div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">Events & Workshops</div>
            </div>

            <div className="p-4 hover-card-lift">
              <div className="text-4xl sm:text-5xl font-black mb-2">{siteSettings.yearsActive}+</div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">Years Active</div>
            </div>

            <div className="p-4 hover-card-lift">
              <div className="text-4xl sm:text-5xl font-black mb-2">{siteSettings.awardsCount}+</div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">Recognitions & Awards</div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

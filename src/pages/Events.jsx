import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, User, Info, Image as ImageIcon, Search } from "lucide-react";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db, DEFAULT_SITE_DATA } from "../firebase/config";
import { resolveImage } from "../utils/resolveImage";
import CountdownTimer from "../components/ui/CountdownTimer";
import Skeleton from "../components/ui/Skeleton";

export default function Events() {
  const [events, setEvents]   = useState(DEFAULT_SITE_DATA.events);
  const [filter, setFilter]   = useState("all");
  const [search, setSearch]   = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(collection(db, "events"))
      .then(snap => { if (!snap.empty) setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() }))); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleImgError = e => { e.currentTarget.onerror = null; e.currentTarget.src = resolveImage("/assets/embs-logo.png"); };

  const filtered = events.filter(e => {
    const matchFilter = filter === "all" || e.status === filter;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || (e.topic || "").toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{ backgroundColor: "#F8F7F2", minHeight: "100vh" }}>

      {/* Hero */}
      <section className="pt-32 pb-16 bg-white border-b border-[#DDE4E1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-[#087F8C]" />
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Technical Programme · IEEE EMBS VCE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#172121] tracking-tight" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>Events &amp; Workshops</h1>
          <p className="text-[#647070] text-lg max-w-2xl leading-relaxed">
            Hands-on technical workshops, expert keynote lectures, biomedical hackathons, and symposia hosted by IEEE EMBS Vardhaman College of Engineering.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-8 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Filter tabs */}
          <div className="flex items-center gap-0 border border-[#DDE4E1] rounded-lg overflow-hidden bg-white shadow-card">
            {["all", "upcoming", "past"].map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2.5 text-xs font-semibold capitalize transition-colors border-r border-[#DDE4E1] last:border-r-0 ${filter === tab ? "bg-[#087F8C] text-white" : "text-[#647070] hover:text-[#172121] hover:bg-[#F8F7F2]"}`}
              >
                {tab === "all" ? "All Events" : tab === "upcoming" ? "Upcoming" : "Past"}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#647070]" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#DDE4E1] rounded-lg text-[#172121] placeholder-[#647070] focus:outline-none focus:ring-2 focus:ring-[#087F8C]/30 focus:border-[#087F8C] shadow-card transition"
            />
          </div>
        </div>
      </section>

      {/* Event Grid */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(n => (
              <div key={n} className="bg-white border border-[#DDE4E1] rounded-xl p-5 space-y-3">
                <Skeleton className="h-44 w-full rounded-lg bg-[#DDE4E1]" />
                <Skeleton className="h-5 w-3/4 bg-[#DDE4E1]" />
                <Skeleton className="h-4 w-full bg-[#DDE4E1]" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#DDE4E1] rounded-xl p-8">
            <Calendar className="w-10 h-10 text-[#DDE4E1] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#172121]">No Events Found</h3>
            <p className="text-[#647070] text-sm mt-1">Adjust your filter or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-white border border-[#DDE4E1] rounded-xl overflow-hidden hover:border-[#087F8C]/35 hover:shadow-card-hover transition-all flex flex-col"
              >
                {/* Poster */}
                <div className="relative h-44 overflow-hidden bg-[#F8F7F2]">
                  <img
                    src={resolveImage(event.posterUrl || "/assets/embs-logo.png")}
                    alt={event.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {/* Status badge */}
                  <span className={`absolute top-3 right-3 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${event.status === "upcoming" ? "bg-[#E76F51] text-white" : "bg-white/90 text-[#647070] border border-[#DDE4E1]"}`}>
                    {event.status === "past" ? "Completed" : event.status}
                  </span>
                  {/* Teal left accent on hover */}
                  <div className="absolute inset-y-0 left-0 w-0.5 bg-[#087F8C] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div>
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#087F8C]">{event.topic || "Biomedical Engineering"}</span>
                    <h3 className="text-base font-bold text-[#172121] mt-1 leading-snug line-clamp-2 group-hover:text-[#087F8C] transition-colors">{event.title}</h3>
                    <p className="text-[#647070] text-xs mt-1.5 line-clamp-3 leading-relaxed">{event.description}</p>
                  </div>

                  {event.status === "upcoming" && event.date && (
                    <div className="py-2">
                      <CountdownTimer targetDate={event.date} eventTitle={event.title} />
                    </div>
                  )}

                  {/* Meta */}
                  <div className="space-y-1.5 text-xs text-[#647070] pt-2 border-t border-[#DDE4E1]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#087F8C] flex-shrink-0" />
                      <span>{event.date}{event.time && ` · ${event.time}`}</span>
                    </div>
                    {event.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#E76F51] flex-shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    )}
                    {event.speaker && (
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-[#647070] flex-shrink-0" />
                        <span className="truncate font-semibold text-[#172121]">{event.speaker}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <Link to={`/events/${event.id}`} className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-center text-white bg-[#087F8C] hover:bg-[#075E61] transition-colors flex items-center justify-center gap-1.5">
                      <Info className="w-3.5 h-3.5" /> Details
                    </Link>
                    <Link to="/gallery" className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-center text-[#647070] bg-[#F8F7F2] hover:bg-[#EEF6F7] hover:text-[#087F8C] border border-[#DDE4E1] transition-colors flex items-center justify-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" /> Gallery
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

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Mail, MapPin, Phone, ExternalLink, Globe, 
  Linkedin, Instagram, Youtube, Sparkles, Activity, Shield 
} from 'lucide-react';
import { collegeLogo, embsLogo, vardhamanLogo } from '../../assets/images';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = embsLogo;
  };

  return (
    <footer className="relative bg-slate-950/90 border-t border-white/10 text-slate-400 text-sm overflow-hidden z-20 backdrop-blur-xl">
      
      {/* Subtle Bioluminescent Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-white/15 w-fit shadow-inner">
              <img 
                src={collegeLogo} 
                alt="Vardhaman College of Engineering" 
                onError={handleImgError}
                className="h-8 w-auto object-contain flex-shrink-0" 
              />
              <div className="h-5 w-px bg-slate-700"></div>
              <img 
                src={embsLogo} 
                alt="IEEE EMBS" 
                onError={handleImgError}
                className="h-8 w-auto object-contain flex-shrink-0" 
              />
              <div className="h-5 w-px bg-slate-700"></div>
              <img 
                src={vardhamanLogo} 
                alt="Vardhaman SB" 
                onError={handleImgError}
                className="h-8 w-auto object-contain flex-shrink-0" 
              />
            </div>
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              IEEE Engineering in Medicine and Biology Society (EMBS) Student Branch Chapter at Vardhaman College of Engineering, Hyderabad. Dedicated to advancing biomedical engineering, healthcare AI, and medical technology innovation.
            </p>

            {/* Live Bio-Telemetry Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Telemetry: Biological Motion Active</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-sky-400 transition">About Chapter</Link></li>
              <li><Link to="/events" className="hover:text-sky-400 transition">Events & Workshops</Link></li>
              <li><Link to="/team" className="hover:text-sky-400 transition">Executive Committee</Link></li>
              <li><Link to="/gallery" className="hover:text-sky-400 transition">Event Gallery</Link></li>
              <li><Link to="/announcements" className="hover:text-sky-400 transition">Announcements</Link></li>
            </ul>
          </div>

          {/* Resources & Society */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/membership" className="hover:text-sky-400 transition">Join IEEE EMBS</Link></li>
              <li><Link to="/resources" className="hover:text-sky-400 transition">Research & Papers</Link></li>
              <li><Link to="/achievements" className="hover:text-sky-400 transition">Awards & Honors</Link></li>
              <li>
                <a 
                  href="https://www.embs.org" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-sky-400 transition"
                >
                  <span>IEEE EMBS Global</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://vardhaman.org" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-sky-400 transition"
                >
                  <span>Vardhaman College</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Location & Inquiries</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-vardhaman-orange flex-shrink-0 mt-0.5" />
                <span>Kacharam, Shamshabad, Hyderabad, Telangana 501218</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a href="mailto:embs@vardhaman.org" className="hover:text-white transition">embs@vardhaman.org</a>
              </div>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-900 border border-white/15 hover:bg-ieee-blue transition"
                >
                  <span>Send Contact Form</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400 text-center sm:text-left">
            © {currentYear} IEEE EMBS Vardhaman College of Engineering Student Branch Chapter. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="flex items-center gap-1 text-slate-400 hover:text-sky-400 transition">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

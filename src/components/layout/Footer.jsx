import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, ShieldCheck, Heart } from 'lucide-react';
import { embsLogo, collegeLogo } from '../../assets/images';

export default function Footer() {
  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = embsLogo;
  };

  return (
    <footer className="bg-neutralDark text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Chapter Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={embsLogo} 
                alt="IEEE EMBS" 
                onError={handleImgError}
                className="h-10 w-auto bg-white/10 p-1.5 rounded-lg object-contain" 
              />
              <img 
                src={collegeLogo} 
                alt="Vardhaman College" 
                onError={handleImgError}
                className="h-10 w-auto bg-white/10 p-1.5 rounded-lg object-contain" 
              />
            </div>
            <h4 className="text-lg font-bold text-white">IEEE EMBS Chapter</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Vardhaman College of Engineering Student Branch Chapter. Connecting engineering students with healthcare technologies and digital health innovations.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.instagram.com/ieee_embs_vce" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-embs-purple text-slate-300 hover:text-white rounded-xl transition transform hover:-translate-y-0.5"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/vuggidisaivarshith/" 
                target="_blank" 
                rel="noreferrer"
                className="p-2.5 bg-slate-800 hover:bg-ieee-blue text-slate-300 hover:text-white rounded-xl transition transform hover:-translate-y-0.5"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-l-4 border-ieee-blue pl-3">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-ieee-blue transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-ieee-blue transition">About Us & Mission</Link></li>
              <li><Link to="/events" className="hover:text-ieee-blue transition">Events & Workshops</Link></li>
              <li><Link to="/team" className="hover:text-ieee-blue transition">Office Bearers & Team</Link></li>
              <li><Link to="/gallery" className="hover:text-ieee-blue transition">Photo Gallery</Link></li>
              <li><Link to="/achievements" className="hover:text-ieee-blue transition">Chapter Achievements</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources & Membership */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-l-4 border-embs-purple pl-3">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/resources" className="hover:text-embs-purple transition">IEEE Digital Library & Papers</Link></li>
              <li><Link to="/membership" className="hover:text-embs-purple transition">How to Join IEEE EMBS</Link></li>
              <li><Link to="/announcements" className="hover:text-embs-purple transition">Latest News & Feed</Link></li>
              <li><a href="https://www.embs.org/" target="_blank" rel="noreferrer" className="hover:text-embs-purple transition">IEEE EMBS Parent Society</a></li>
              <li><a href="https://vardhaman.org" target="_blank" rel="noreferrer" className="hover:text-embs-purple transition">Vardhaman College Portal</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-base font-bold text-white mb-4 border-l-4 border-vardhaman-orange pl-3">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-vardhaman-orange flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">Vardhaman College of Engineering, Kacharam, Shamshabad, Hyderabad, Telangana 501218</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-vardhaman-orange flex-shrink-0" />
                <a href="mailto:swethabharath27@vardhaman.org" className="text-slate-400 hover:text-white transition">swethabharath27@vardhaman.org</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-vardhaman-orange flex-shrink-0" />
                <span className="text-slate-400">+91 9059573313 / +91 7993136780</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} IEEE EMBS Student Branch Chapter - Vardhaman College of Engineering.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Healthcare Innovation</span>
            <span className="text-slate-700">|</span>
            <Link to="/admin/login" className="text-slate-400 hover:text-white flex items-center gap-1.5 transition font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-ieee-blue" />
              <span>Admin Portal Login</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

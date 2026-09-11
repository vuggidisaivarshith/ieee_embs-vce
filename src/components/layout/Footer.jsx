import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, ExternalLink, Shield } from "lucide-react";
import { collegeLogo, embsLogo, vardhamanLogo } from "../../assets/images";

export default function Footer() {
  const year = new Date().getFullYear();
  const handleImgError = (e) => { e.currentTarget.style.display = "none"; };

  const navCol1 = [
    { label: "About Chapter",       path: "/about" },
    { label: "Events & Workshops",  path: "/events" },
    { label: "Executive Committee", path: "/team" },
    { label: "Photo Gallery",       path: "/gallery" },
    { label: "Announcements",       path: "/announcements" },
  ];
  const navCol2 = [
    { label: "Join IEEE EMBS",      path: "/membership" },
    { label: "Research Resources",  path: "/resources" },
    { label: "Awards & Honours",    path: "/achievements" },
    { label: "Contact Us",          path: "/contact" },
  ];

  return (
    <footer className="bg-[#172121] text-[#A8B8B4]" aria-label="Site footer">
      {/* Top rule */}
      <div className="h-px bg-[#087F8C]/40" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <img src={collegeLogo}    alt="Vardhaman College" onError={handleImgError} className="h-8 w-auto object-contain" />
              <div className="h-5 w-px bg-white/15" />
              <img src={embsLogo}       alt="IEEE EMBS"         onError={handleImgError} className="h-8 w-auto object-contain" />
              <div className="h-5 w-px bg-white/15" />
              <img src={vardhamanLogo}  alt="Vardhaman SB"      onError={handleImgError} className="h-8 w-auto object-contain" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-[#8A9E9A]">
              IEEE Engineering in Medicine and Biology Society — Student Branch Chapter at Vardhaman College of Engineering, Hyderabad. Advancing biomedical engineering, healthcare AI, and medical technology innovation.
            </p>
            <div className="space-y-1.5 text-xs text-[#8A9E9A]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#087F8C]" />
                <span>Kacharam, Shamshabad, Hyderabad 501218</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-[#087F8C]" />
                <a href="mailto:swethabharath27@vardhaman.org" className="hover:text-white transition-colors">swethabharath27@vardhaman.org</a>
              </div>
            </div>
          </div>

          {/* Nav col 1 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#DDE4E1] font-mono">Navigation</h4>
            <ul className="space-y-2.5">
              {navCol1.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-[#8A9E9A] hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav col 2 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#DDE4E1] font-mono">Resources</h4>
            <ul className="space-y-2.5">
              {navCol2.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-[#8A9E9A] hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#DDE4E1] font-mono">Society</h4>
            <ul className="space-y-2.5">
              {[
                { label: "IEEE EMBS Global", href: "https://www.embs.org" },
                { label: "IEEE.org",         href: "https://www.ieee.org" },
                { label: "Vardhaman College",href: "https://vardhaman.org" },
                { label: "IEEE Xplore",      href: "https://ieeexplore.ieee.org" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#8A9E9A] hover:text-white transition-colors group">
                    <span>{label}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-70 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom rule + copyright */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#647070]">
          <p>© {year} IEEE EMBS Vardhaman College of Engineering. All rights reserved.</p>
          <Link to="/admin/login" className="inline-flex items-center gap-1.5 hover:text-[#8A9E9A] transition-colors">
            <Shield className="w-3.5 h-3.5" /> Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}

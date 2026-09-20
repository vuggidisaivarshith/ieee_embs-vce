import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { embsLogo, vardhamanLogo } from "../../assets/images";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background:"rgba(23,33,33,0.97)", backdropFilter:"blur(24px)", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src={embsLogo} alt="IEEE EMBS" className="h-8 w-auto object-contain" />
              <img src={vardhamanLogo} alt="VCE" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <p className="text-[13px] font-black text-white tracking-wide">IEEE EMBS</p>
              <p className="text-xs text-white/45">Vardhaman College of Engineering Student Chapter</p>
            </div>
            <p className="text-xs text-white/40 leading-relaxed max-w-xs">
              The IEEE Engineering in Medicine and Biology Society chapter — connecting students with the global biomedical engineering community.
            </p>
            <div className="space-y-1.5 text-xs text-white/40">
              <div className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#087F8C]" /><span>Vardhaman College of Engineering, Shamshabad, Hyderabad — 501218</span></div>
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#087F8C]" /><a href="mailto:ieeevce@vardhaman.org" className="hover:text-white transition-colors">ieeevce@vardhaman.org</a></div>
            </div>
          </div>

          {/* Nav groups */}
          {[
            { title:"Chapter", links:[{t:"About Us",p:"/about"},{t:"Team",p:"/team"},{t:"Achievements",p:"/achievements"},{t:"Announcements",p:"/announcements"}] },
            { title:"Programs", links:[{t:"Events",p:"/events"},{t:"Gallery",p:"/gallery"},{t:"Resources",p:"/resources"},{t:"Membership",p:"/membership"}] },
            { title:"Connect", links:[{t:"Contact",p:"/contact"},{t:"OptiForge 2026",p:"/optiforge"},{t:"IEEE EMBS Global",p:"https://www.embs.org",ext:true},{t:"IEEE Vardhaman SB",p:"https://www.ieee.org",ext:true}] },
          ].map(({ title, links }) => (
            <div key={title} className="space-y-4">
              <p className="text-[11px] font-black font-mono uppercase tracking-widest text-white/25">{title}</p>
              <div className="space-y-2.5">
                {links.map(({ t, p, ext }) => (
                  ext
                    ? <a key={t} href={p} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-white/45 hover:text-white transition-colors">{t}<ExternalLink className="w-3 h-3" /></a>
                    : <Link key={t} to={p} className="block text-xs text-white/45 hover:text-white transition-colors">{t}</Link>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/25">© {year} IEEE EMBS Vardhaman College of Engineering Student Chapter. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#087F8C] animate-pulse" />
            <p className="text-[11px] text-white/25">Student Branch · Hyderabad, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

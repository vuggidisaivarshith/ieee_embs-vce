import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { collegeLogo, embsLogo, vardhamanLogo } from "../../assets/images";

const navLinks = [
  { name: "Home",          path: "/" },
  { name: "About",         path: "/about" },
  { name: "Events",        path: "/events" },
  { name: "Team",          path: "/team" },
  { name: "Gallery",       path: "/gallery" },
  { name: "Announcements", path: "/announcements" },
  { name: "Achievements",  path: "/achievements" },
  { name: "Resources",     path: "/resources" },
  { name: "Membership",    path: "/membership" },
  { name: "Contact",       path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);
  useEffect(() => { document.body.style.overflow = mobileOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [mobileOpen]);

  const isActive = (path) => path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
  const handleImgError = (e) => { e.currentTarget.style.display = "none"; };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(242,248,250,0.88)"
            : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(24px) saturate(200%)",
          WebkitBackdropFilter: "blur(24px) saturate(200%)",
          borderBottom: scrolled ? "1px solid rgba(8,127,140,0.10)" : "1px solid rgba(255,255,255,0.5)",
          boxShadow: scrolled
            ? "0 2px 20px rgba(0,0,0,0.06), inset 0 -1px 0 rgba(8,127,140,0.06)"
            : "0 1px 0 rgba(255,255,255,0.8), 0 4px 16px rgba(0,0,0,0.02)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">

          {/* Brand logos */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0" aria-label="IEEE EMBS Vardhaman — Home">
            <img src={collegeLogo} alt="Vardhaman" onError={handleImgError} className="h-7 w-auto object-contain" />
            <div className="h-4 w-px bg-[#DDE4E1] mx-0.5" />
            <img src={embsLogo} alt="IEEE EMBS" onError={handleImgError} className="h-7 w-auto object-contain" />
            <div className="h-4 w-px bg-[#DDE4E1] mx-0.5" />
            <img src={vardhamanLogo} alt="VCE" onError={handleImgError} className="h-7 w-auto object-contain" />
            <div className="hidden xl:flex flex-col ml-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#087F8C] leading-tight">IEEE EMBS</span>
              <span className="text-[10px] font-semibold text-[#647070] leading-tight">Vardhaman Chapter</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={[
                    "relative px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-150 whitespace-nowrap rounded-lg",
                    active ? "text-[#172121] font-semibold" : "text-[#647070] hover:text-[#172121] hover:bg-black/4"
                  ].join(" ")}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#087F8C]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Admin */}
            <Link to="/admin/login"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#647070] hover:text-[#172121] rounded-lg border border-black/8 hover:border-black/16 transition-all"
              style={{ background:"rgba(0,0,0,0.03)" }}>
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Admin</span>
            </Link>

            {/* OptiForge gradient pill */}
            <Link to="/optiforge"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-black rounded-full text-white whitespace-nowrap transition-all hover:scale-105 hover:brightness-110 active:scale-95"
              style={{ background:"linear-gradient(135deg, #008C95 0%, #0066CC 100%)", boxShadow:"0 2px 12px rgba(0,140,149,0.35), inset 0 1px 0 rgba(255,255,255,0.25)" }}>
              <Zap className="w-3 h-3" /> OptiForge 2026
            </Link>

            {/* Join EMBS */}
            <Link to="/membership"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white rounded-full transition-all hover:scale-105 hover:brightness-110 active:scale-95"
              style={{ background:"linear-gradient(160deg,#0A8F9C 0%,#087F8C 100%)", boxShadow:"0 2px 10px rgba(8,127,140,0.30), inset 0 1px 0 rgba(255,255,255,0.25)" }}>
              Join EMBS
            </Link>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl border border-black/8 hover:border-black/16 text-[#647070] hover:text-[#172121] transition-all"
              style={{ background:"rgba(0,0,0,0.04)" }} aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.18}}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background:"rgba(23,33,33,0.35)", backdropFilter:"blur(4px)" }} />

            <motion.div
              initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
              transition={{duration:.22,ease:[0.22,1,.36,1]}}
              className="fixed inset-x-3 top-[72px] z-50 lg:hidden max-h-[calc(100vh-88px)] overflow-y-auto rounded-2xl"
              style={{ background:"rgba(255,255,255,0.92)", backdropFilter:"blur(28px) saturate(200%)", WebkitBackdropFilter:"blur(28px) saturate(200%)", border:"1px solid rgba(255,255,255,0.7)", boxShadow:"0 24px 60px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9)" }}>

              <nav className="px-3 py-3 space-y-0.5" aria-label="Mobile navigation">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                      className={["flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        active ? "bg-[#087F8C]/10 text-[#087F8C] font-semibold" : "text-[#647070] hover:text-[#172121] hover:bg-black/4"
                      ].join(" ")}>
                      {link.name}
                      {active && <div className="w-1.5 h-1.5 rounded-full bg-[#087F8C]" />}
                    </Link>
                  );
                })}
              </nav>

              <div className="px-3 pb-4 pt-2 border-t border-black/6 flex flex-col gap-2">
                <Link to="/optiforge" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black text-white transition-all"
                  style={{ background:"linear-gradient(135deg,#008C95 0%,#0066CC 100%)", boxShadow:"0 4px 16px rgba(0,140,149,0.35), inset 0 1px 0 rgba(255,255,255,0.25)" }}>
                  <Zap className="w-4 h-4" /> OptiForge 2026 — Register Now
                </Link>
                <Link to="/admin/login" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-[#647070] border border-black/8 transition-colors"
                  style={{ background:"rgba(0,0,0,0.03)" }}>
                  <Shield className="w-4 h-4" /> Admin Portal
                </Link>
                <Link to="/membership" onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background:"linear-gradient(160deg,#0A8F9C 0%,#087F8C 100%)", boxShadow:"0 2px 10px rgba(8,127,140,0.30)" }}>
                  Join IEEE EMBS
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, ArrowRight } from "lucide-react";
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
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const handleImgError = (e) => { e.currentTarget.style.display = "none"; };

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/97 backdrop-blur-sm border-b border-[#DDE4E1] shadow-sm"
            : "bg-[#F8F7F2]/90 backdrop-blur-sm border-b border-transparent"
        ].join(" ")}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">

          {/* Brand logos */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group" aria-label="IEEE EMBS Vardhaman — Home">
            <img src={collegeLogo} alt="Vardhaman College" onError={handleImgError} className="h-7 w-auto object-contain" />
            <div className="h-5 w-px bg-[#DDE4E1] mx-0.5" />
            <img src={embsLogo}    alt="IEEE EMBS"         onError={handleImgError} className="h-7 w-auto object-contain" />
            <div className="h-5 w-px bg-[#DDE4E1] mx-0.5" />
            <img src={vardhamanLogo} alt="Vardhaman SB"   onError={handleImgError} className="h-7 w-auto object-contain" />
            <div className="hidden xl:flex flex-col ml-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#087F8C] leading-tight">IEEE EMBS</span>
              <span className="text-[10px] font-semibold text-[#647070] leading-tight">Vardhaman Chapter</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0 relative" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={[
                    "relative px-3 py-1.5 text-[12.5px] font-medium transition-colors duration-150 whitespace-nowrap",
                    active ? "text-[#172121] font-semibold" : "text-[#647070] hover:text-[#172121]"
                  ].join(" ")}
                >
                  {link.name}
                  {/* Active teal underline — spring-morphs between links */}
                  {active && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#087F8C]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  {/* Hover underline (non-active) */}
                  {!active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[1px] rounded-full bg-[#087F8C] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right utilities */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Admin */}
            <Link
              to="/admin/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#647070] hover:text-[#172121] border border-[#DDE4E1] hover:border-[#B8C5C0] rounded-lg transition-all"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Admin</span>
            </Link>

            {/* Join EMBS CTA */}
            <Link
              to="/membership"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#087F8C] hover:bg-[#075E61] rounded-lg transition-colors"
            >
              Join EMBS
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg border border-[#DDE4E1] hover:border-[#B8C5C0] text-[#647070] hover:text-[#172121] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#172121]/40 z-40 lg:hidden"
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-16 z-50 bg-white border-b border-[#DDE4E1] shadow-card lg:hidden max-h-[calc(100vh-64px)] overflow-y-auto"
            >
              <nav className="px-4 py-4 space-y-0.5" aria-label="Mobile navigation">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={[
                        "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        active
                          ? "bg-[#087F8C]/8 text-[#087F8C] font-semibold"
                          : "text-[#647070] hover:text-[#172121] hover:bg-[#F8F7F2]"
                      ].join(" ")}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${active ? "translate-x-0.5 text-[#087F8C]" : "opacity-30"}`} />
                    </Link>
                  );
                })}
              </nav>

              <div className="px-4 pb-5 pt-3 border-t border-[#DDE4E1] flex flex-col gap-2">
                <Link
                  to="/admin/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-[#647070] border border-[#DDE4E1] hover:border-[#087F8C] transition-colors"
                >
                  <Shield className="w-4 h-4" /> Admin Portal
                </Link>
                <Link
                  to="/membership"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white bg-[#087F8C] hover:bg-[#075E61] transition-colors"
                >
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

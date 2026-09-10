import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, HeartPulse, ChevronRight, Shield, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { collegeLogo, embsLogo, vardhamanLogo } from '../../assets/images';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Scroll listener for glass navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Auto-close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Resources', path: '/resources' },
    { name: 'Membership', path: '/membership' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = embsLogo;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl shadow-2xl py-2.5 border-b border-white/10' 
          : 'bg-slate-950/50 backdrop-blur-lg py-3.5 border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Brand Logos */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-white/15 shadow-inner">
              <img 
                src={collegeLogo} 
                alt="Vardhaman College" 
                onError={handleImgError}
                className="h-6 sm:h-7.5 w-auto object-contain flex-shrink-0" 
              />
              <div className="h-4 w-px bg-slate-700"></div>
              <img 
                src={embsLogo} 
                alt="IEEE EMBS" 
                onError={handleImgError}
                className="h-6 sm:h-7.5 w-auto object-contain flex-shrink-0" 
              />
              <div className="h-4 w-px bg-slate-700"></div>
              <img 
                src={vardhamanLogo} 
                alt="Vardhaman SB" 
                onError={handleImgError}
                className="h-6 sm:h-7.5 w-auto object-contain flex-shrink-0" 
              />
            </div>
            <div className="hidden 2xl:block text-left">
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-400 block leading-tight">IEEE EMBS</span>
              <span className="text-[10px] font-bold text-slate-300 block leading-tight">Vardhaman Chapter</span>
            </div>
          </Link>

          {/* Desktop Navigation Links (lg+: 1024px+) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-white font-bold bg-gradient-to-r from-ieee-blue/80 to-embs-purple/80 shadow-[0_0_15px_rgba(0,98,155,0.4)] border border-sky-400/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-300" />}
            </motion.button>

            {/* Admin Login Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/admin/login"
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-900/80 border border-white/15 hover:bg-ieee-blue hover:text-white transition-all shadow-sm"
                title="Admin Portal Login"
              >
                <Shield className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden xl:inline">Admin Login</span>
              </Link>
            </motion.div>

            {/* Join IEEE CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/membership"
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange hover:shadow-bio-glow transition-all shadow-md border border-white/20"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                <span>Join EMBS</span>
              </Link>
            </motion.div>

            {/* Mobile/Tablet Menu Toggle Button (<1024px) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-200 bg-slate-900 border border-white/15 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>

        </div>

        {/* Mobile/Tablet Overlay Drawer Container */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Semi-Transparent Backdrop Scrim */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40 lg:hidden"
              />

              {/* Opaque Overlay Menu Drawer */}
              <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="lg:hidden fixed inset-x-0 top-[58px] bg-slate-950 border-b border-white/15 p-5 shadow-2xl z-50 max-h-[calc(100vh-65px)] overflow-y-auto"
              >
                <div className="flex flex-col gap-1.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                        isActive(link.path)
                          ? 'bg-ieee-blue text-white font-bold shadow-lg border border-sky-400/30'
                          : 'text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive(link.path) ? 'text-white' : 'text-slate-500'}`} />
                    </Link>
                  ))}
                  
                  <div className="pt-4 mt-3 border-t border-slate-800 space-y-2.5">
                    <Link
                      to="/admin/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-extrabold text-white bg-slate-900 border border-white/15 shadow-sm"
                    >
                      <Shield className="w-4 h-4 text-sky-400" />
                      <span>Admin Portal Login</span>
                    </Link>

                    <Link
                      to="/membership"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-ieee-blue to-embs-purple shadow-lg border border-white/20"
                    >
                      <HeartPulse className="w-4 h-4" />
                      <span>Join IEEE EMBS Chapter</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, HeartPulse, ChevronRight, Shield, Activity, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { collegeLogo, embsLogo, vardhamanLogo } from '../../assets/images';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', accent: '#00629B', dotColor: 'bg-embs-blue' },
    { name: 'About', path: '/about', accent: '#772583', dotColor: 'bg-embs-purple' },
    { name: 'Events', path: '/events', accent: '#F4B942', dotColor: 'bg-warm-accent' },
    { name: 'Team', path: '/team', accent: '#007DAE', dotColor: 'bg-embs-blueAlt' },
    { name: 'Gallery', path: '/gallery', accent: '#00A8C6', dotColor: 'bg-embs-cyan' },
    { name: 'Announcements', path: '/announcements', accent: '#2E9B68', dotColor: 'bg-clinical-green' },
    { name: 'Achievements', path: '/achievements', accent: '#F4B942', dotColor: 'bg-warm-accent' },
    { name: 'Resources', path: '/resources', accent: '#00A8C6', dotColor: 'bg-embs-cyan' },
    { name: 'Membership', path: '/membership', accent: '#2E9B68', dotColor: 'bg-clinical-green' },
    { name: 'Contact', path: '/contact', accent: '#0D9488', dotColor: 'bg-embs-teal' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isDarkWorld = location.pathname === '/' || location.pathname === '/gallery';

  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = embsLogo;
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? isDarkWorld 
            ? 'bg-slate-950/90 backdrop-blur-xl shadow-2xl py-2.5 border-b border-white/10'
            : 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl shadow-md py-2.5 border-b border-slate-200 dark:border-white/10'
          : isDarkWorld
            ? 'bg-slate-950/60 backdrop-blur-lg py-3.5 border-b border-white/5'
            : 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-md py-3.5 border-b border-slate-200/60 dark:border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Brand Logos */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className={`flex items-center gap-1.5 p-1.5 rounded-xl border shadow-inner transition-colors ${
              isDarkWorld 
                ? 'bg-slate-900/90 border-white/15' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <img 
                src={collegeLogo} 
                alt="Vardhaman College" 
                onError={handleImgError}
                className="h-6 sm:h-7.5 w-auto object-contain flex-shrink-0" 
              />
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
              <img 
                src={embsLogo} 
                alt="IEEE EMBS" 
                onError={handleImgError}
                className="h-6 sm:h-7.5 w-auto object-contain flex-shrink-0" 
              />
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
              <img 
                src={vardhamanLogo} 
                alt="Vardhaman SB" 
                onError={handleImgError}
                className="h-6 sm:h-7.5 w-auto object-contain flex-shrink-0" 
              />
            </div>
            <div className="hidden 2xl:block text-left">
              <span className="text-[11px] font-black uppercase tracking-wider text-embs-blue block leading-tight">IEEE EMBS</span>
              <span className={`text-[10px] font-bold block leading-tight ${isDarkWorld ? 'text-slate-300' : 'text-slate-600'}`}>Vardhaman Chapter</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-2xl border backdrop-blur-md ${
            isDarkWorld 
              ? 'bg-slate-900/60 border-white/10' 
              : 'bg-slate-50/80 border-slate-200/80 shadow-sm'
          }`}>
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-2.5 xl:px-3 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap group ${
                    active
                      ? isDarkWorld 
                        ? 'text-white font-bold bg-white/10 shadow-sm' 
                        : 'text-slate-900 font-bold bg-white shadow-sm border border-slate-200/80'
                      : isDarkWorld 
                        ? 'text-slate-300 hover:text-white hover:bg-white/5' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {/* Small Biological Indicator Dot */}
                  <span className={`w-1.5 h-1.5 rounded-full transition-transform duration-200 ${link.dotColor} ${
                    active ? 'scale-125' : 'opacity-40 group-hover:opacity-80'
                  }`}></span>
                  
                  <span>{link.name}</span>

                  {/* Animated Subtle Underline Indicator on Active Tab */}
                  {active && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ backgroundColor: link.accent }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors ${
                isDarkWorld 
                  ? 'bg-slate-900/80 text-slate-300 hover:text-white border-white/10 hover:bg-slate-800' 
                  : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 shadow-sm'
              }`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-500" />}
            </motion.button>

            {/* Admin Login Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/admin/login"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm border ${
                  isDarkWorld 
                    ? 'bg-slate-900/80 text-slate-200 border-white/15 hover:bg-embs-blue hover:text-white' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-embs-blue hover:text-white'
                }`}
                title="Admin Portal Login"
              >
                <Shield className="w-3.5 h-3.5 text-embs-cyan" />
                <span className="hidden xl:inline">Admin</span>
              </Link>
            </motion.div>

            {/* Join IEEE CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/membership"
                className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-embs-blue via-embs-purple to-warm-orange hover:shadow-md transition-all shadow-sm border border-white/20"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
                <span>Join EMBS</span>
              </Link>
            </motion.div>

            {/* Mobile Menu Toggle Button (<1024px) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl border transition ${
                isDarkWorld 
                  ? 'bg-slate-900 text-slate-200 border-white/15' 
                  : 'bg-white text-slate-700 border-slate-200 shadow-sm'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-rose-500" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>

        </div>

        {/* Mobile Overlay Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-40 lg:hidden"
              />

              <motion.div 
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="lg:hidden fixed inset-x-0 top-[58px] bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-white/15 p-5 shadow-2xl z-50 max-h-[calc(100vh-65px)] overflow-y-auto"
              >
                <div className="flex flex-col gap-1.5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                        isActive(link.path)
                          ? 'bg-embs-blue text-white font-bold shadow-md'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${link.dotColor}`}></span>
                        <span>{link.name}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isActive(link.path) ? 'text-white' : 'text-slate-400'}`} />
                    </Link>
                  ))}
                  
                  <div className="pt-4 mt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                    <Link
                      to="/admin/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/15"
                    >
                      <Shield className="w-4 h-4 text-embs-cyan" />
                      <span>Admin Portal Login</span>
                    </Link>

                    <Link
                      to="/membership"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-embs-blue to-embs-purple shadow-md"
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

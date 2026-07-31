import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, HeartPulse, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg py-3' 
        : 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm py-4 border-b border-slate-200/50 dark:border-slate-800/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logos */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700">
            <img src="/assets/college-logo.jpeg" alt="Vardhaman College" className="h-8 w-auto object-contain" />
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
            <img src="/assets/embs-logo.png" alt="IEEE EMBS" className="h-8 w-auto object-contain" />
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
            <img src="/assets/vardhaman-logo.png" alt="Vardhaman SB" className="h-8 w-auto object-contain" />
          </div>
          <div className="hidden sm:block">
            <span className="text-xs font-bold uppercase tracking-wider text-ieee-blue dark:text-sky-400 block">IEEE EMBS</span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 block">Vardhaman Chapter</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive(link.path)
                  ? 'bg-ieee-blue/10 dark:bg-ieee-blue/20 text-ieee-blue dark:text-sky-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-ieee-blue dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action Utilities */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Join IEEE CTA */}
          <Link
            to="/membership"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <HeartPulse className="w-4 h-4 animate-pulse" />
            <span>Join EMBS</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 p-4 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive(link.path)
                    ? 'bg-ieee-blue text-white font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800">
              <Link
                to="/membership"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-ieee-blue to-embs-purple shadow-md"
              >
                <HeartPulse className="w-4 h-4" />
                <span>Join IEEE EMBS Chapter</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

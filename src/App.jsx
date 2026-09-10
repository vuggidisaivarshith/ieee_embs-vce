import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BiologicalBackground from './components/biology/BiologicalBackground';
import BiologicalCursor from './components/biology/BiologicalCursor';

import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import Announcements from './pages/Announcements';
import Achievements from './pages/Achievements';
import Resources from './pages/Resources';
import Membership from './pages/Membership';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#070B16] text-slate-100 selection:bg-ieee-blue selection:text-white relative">
      {/* Living Microscopic Biological Simulation Canvas */}
      <BiologicalBackground />
      
      {/* Interactive Micro-Fluid Cursor Overlay */}
      <BiologicalCursor />

      {/* Global Precision Navigation */}
      <Navbar />

      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Routes location={location}>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/team" element={<Team />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

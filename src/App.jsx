import React, { useRef, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Team from "./pages/Team";
import Gallery from "./pages/Gallery";
import Announcements from "./pages/Announcements";
import Achievements from "./pages/Achievements";
import Resources from "./pages/Resources";
import Membership from "./pages/Membership";
import Contact from "./pages/Contact";
import OptiForge from "./pages/OptiForge";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import InteractiveCursor from "./components/ui/InteractiveCursor";
import InteractiveMeshCanvas from "./components/ui/InteractiveMeshCanvas";

export default function App() {
  const location = useLocation();

  // Global mouse-light: use a ref + RAF so it NEVER causes React re-renders
  const mouseLightRef = useRef(null);
  useEffect(() => {
    const isPointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isPointer || isReduced) return;

    let rafId;
    let mx = -1000, my = -1000;
    let scheduled = false;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(() => {
          if (mouseLightRef.current) {
            mouseLightRef.current.style.background =
              `radial-gradient(700px circle at ${mx}px ${my}px, rgba(255,255,255,0.55), transparent 45%)`;
            mouseLightRef.current.style.opacity = "1";
          }
          scheduled = false;
        });
      }
    };
    const onLeave = () => {
      if (mouseLightRef.current) mouseLightRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen selection:bg-[#008C95] selection:text-white relative overflow-x-hidden" style={{ backgroundColor: "#F2F8FA" }}>
      {/* Global Mouse Light — ref-driven, zero React re-renders */}
      <div
        ref={mouseLightRef}
        className="fixed inset-0 pointer-events-none z-40 mix-blend-soft-light"
        style={{ opacity: 0, willChange: "opacity, background", transition: "opacity 0.3s ease" }}
      />

      {/* Interactive Neural/Particle Mesh Canvas */}
      <InteractiveMeshCanvas />

      {/* Fluid Interactive Cursor */}
      <InteractiveCursor />

      <Navbar />

      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
          >
            <Routes location={location}>
              {/* Public Routes */}
              <Route path="/"              element={<Home />} />
              <Route path="/about"         element={<About />} />
              <Route path="/events"        element={<Events />} />
              <Route path="/events/:id"    element={<EventDetail />} />
              <Route path="/team"          element={<Team />} />
              <Route path="/gallery"       element={<Gallery />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/achievements"  element={<Achievements />} />
              <Route path="/resources"     element={<Resources />} />
              <Route path="/membership"    element={<Membership />} />
              <Route path="/contact"       element={<Contact />} />
              <Route path="/optiforge"     element={<OptiForge />} />

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

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

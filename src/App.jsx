import React from "react";
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

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen selection:bg-[#008C95] selection:text-white" style={{ backgroundColor: "#F2F8FA" }}>
      <Navbar />

      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.988, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.008, filter: "blur(3px)" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
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

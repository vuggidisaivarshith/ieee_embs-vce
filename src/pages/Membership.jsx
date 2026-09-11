import React from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  "Unlimited access to IEEE Xplore Digital Library — thousands of biomedical research papers",
  "Significant discounts on IEEE global conferences, symposia, and workshop registrations",
  "Eligibility for IEEE EMBS student travel grants and research awards",
  "Direct networking with global leaders in medical technology and clinical AI",
  "Access to IEEE Collabratec research portal, webinars, and career mentors",
  "Leadership opportunities in the chapter executive committee and project leads"
];

const steps = [
  { num: "1", title: "Visit IEEE Portal", desc: "Navigate to the official ieee.org membership registration portal." },
  { num: "2", title: "Select Student Plan", desc: "Choose Student Member + IEEE EMBS Society add-on during checkout." },
  { num: "3", title: "Choose Vardhaman SB", desc: "Select Vardhaman College of Engineering as your Student Branch." }
];

export default function Membership() {
  return (
    <div style={{ backgroundColor: "#F8F7F2", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white border-b border-[#DDE4E1]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-[#087F8C]" />
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Join the Global Biomedical Engineering Community</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#172121] tracking-tight" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>Become an IEEE EMBS Member</h1>
          <p className="text-[#647070] text-lg max-w-2xl leading-relaxed">
            Connect with the world's premier society of biomedical engineers, medical technologists, and clinical computational scientists.
          </p>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-14 space-y-10">

        {/* Benefits */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white border border-[#DDE4E1] rounded-xl p-8 sm:p-12 shadow-card space-y-8"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-[#087F8C]" />
              <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Member Privileges</span>
            </div>
            <h2 className="text-2xl font-bold text-[#172121]">Why Join IEEE EMBS?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {benefits.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 p-4 bg-[#F8F7F2] border border-[#DDE4E1] rounded-lg"
              >
                <CheckCircle2 className="w-4.5 h-4.5 text-[#087F8C] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#172121] leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white border border-[#DDE4E1] rounded-xl p-8 sm:p-12 shadow-card space-y-8"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 bg-[#087F8C]" />
              <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Enrollment Process</span>
            </div>
            <h2 className="text-2xl font-bold text-[#172121]">3 Steps to Join</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="p-6 bg-[#F8F7F2] border border-[#DDE4E1] rounded-lg space-y-3">
                <div className="w-9 h-9 rounded-lg bg-[#087F8C] text-white font-black text-sm flex items-center justify-center">{s.num}</div>
                <h4 className="font-bold text-[#172121]">{s.title}</h4>
                <p className="text-sm text-[#647070] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="https://www.ieee.org/membership/join/index.html"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold text-white transition-colors"
              style={{ backgroundColor: "#087F8C" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#075E61"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#087F8C"}
            >
              Proceed to IEEE Membership Portal
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

      </section>
    </div>
  );
}

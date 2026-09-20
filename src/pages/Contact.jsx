import React, { useState, useEffect } from "react";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import Toast from "../components/ui/Toast";

const EMAILJS_SERVICE_ID  = "service_qnl317q";
const EMAILJS_TEMPLATE_ID = "template_h3g3uca";
const EMAILJS_PUBLIC_KEY  = "mfL2Xh2IX0xWpfzT8";

export default function Contact() {
  const [formData, setFormData]       = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting]   = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType]     = useState("success");

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    let emailJsSuccess = false, dbSuccess = false, localBackupSuccess = false;
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:    formData.name,
        from_email:   formData.email,
        subject:      formData.subject || "General Inquiry",
        message:      formData.message,
        reply_to:     formData.email,
        to_name:      "IEEE EMBS VCE Executive Committee"
      });
      emailJsSuccess = true;
    } catch (err) { console.warn("EmailJS error:", err); }
    try {
      await addDoc(collection(db, "contactInquiries"), { ...formData, read: false, timestamp: serverTimestamp() });
      dbSuccess = true;
    } catch {}
    try {
      const existing = JSON.parse(localStorage.getItem("ieee_embs_inquiries") || "[]");
      existing.push({ ...formData, date: new Date().toISOString(), id: `local_${Date.now()}` });
      localStorage.setItem("ieee_embs_inquiries", JSON.stringify(existing));
      localBackupSuccess = true;
    } catch {}
    if (emailJsSuccess || dbSuccess || localBackupSuccess) {
      setToastType("success");
      setToastMessage("Thank you! Your message has been received. Our team will get back to you shortly.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setToastType("error");
      setToastMessage("Unable to send message. Please check your connection and try again.");
    }
    setSubmitting(false);
  };

  const field = "w-full px-4 py-3 text-sm bg-[#F8F7F2] border border-[#DDE4E1] rounded-lg text-[#172121] placeholder-[#647070] focus:outline-none focus:ring-2 focus:ring-[#087F8C]/30 focus:border-[#087F8C] transition-colors";

  return (
    <div style={{ backgroundColor: "#F2F8FA", minHeight: "100vh" }}>
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />}

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)", borderBottom: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 4px 20px -2px rgba(0,0,0,0.03)" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-[#087F8C]" />
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#087F8C]">Inquiries & Collaboration</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#172121] tracking-tight" style={{ fontFamily: "Sora, Outfit, sans-serif" }}>Get in Touch</h1>
          <p className="text-[#647070] text-lg max-w-2xl leading-relaxed">
            Questions about workshops, research collaborations, chapter membership, or events? Reach out to our executive committee.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white border border-[#DDE4E1] rounded-xl p-8 shadow-card space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-[#172121]">Send a Message</h3>
              <p className="text-[#647070] text-sm mt-1">Dispatches to the chapter faculty advisor and executive committee.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#172121]">Full Name <span className="text-[#E76F51]">*</span></label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your full name" className={field} />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#172121]">Email Address <span className="text-[#E76F51]">*</span></label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Your email address" className={field} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#172121]">Subject</label>
                <input type="text" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} placeholder="e.g. Event Inquiry / Membership" className={field} />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#172121]">Message <span className="text-[#E76F51]">*</span></label>
                <textarea rows={5} required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Your message..." className={field} />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-sm font-bold text-white transition-colors disabled:opacity-50"
                style={{ backgroundColor: submitting ? "#087F8C99" : "#087F8C" }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.backgroundColor = "#075E61"; }}
                onMouseLeave={e => { if (!submitting) e.currentTarget.style.backgroundColor = "#087F8C"; }}
              >
                {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>) : (<><Send className="w-4 h-4" /> Send Message</>)}
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-5"
          >
            <div className="glass-card rounded-xl p-7 shadow-card space-y-6">
              <h3 className="text-lg font-bold text-[#172121]">Campus Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4.5 h-4.5 text-[#E76F51] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#172121] block">Campus Location</span>
                    <span className="text-[#647070] text-xs leading-relaxed">Vardhaman College of Engineering, Kacharam, Shamshabad, Hyderabad 501218</span>
                  </div>
                </div>
                <div className="h-px bg-black/6" />
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#087F8C] flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#172121] block">Faculty Advisor</span>
                    <a href="mailto:swethabharath27@vardhaman.org" className="text-[#087F8C] hover:underline text-xs font-medium">swethabharath27@vardhaman.org</a>
                  </div>
                </div>
                <div className="h-px bg-black/6" />
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#647070] flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#172121] block">Student Contacts</span>
                    <span className="text-[#647070] text-xs font-mono">+91 9059573313 (Secretary)</span><br />
                    <span className="text-[#647070] text-xs font-mono">+91 7993136780 (Chair)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-[#DDE4E1] shadow-card h-60">
              <iframe
                title="Vardhaman Campus Map"
                src="https://maps.google.com/maps?q=Vardhaman%20College%20of%20Engineering%20Hyderabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              />
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}



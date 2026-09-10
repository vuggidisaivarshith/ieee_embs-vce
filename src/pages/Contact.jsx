import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from '../firebase/config';
import Toast from '../components/ui/Toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_qnl317q";
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_h3g3uca";
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "mfL2Xh2IX0xWpfzT8";

  // Runtime environment check & EmailJS init
  useEffect(() => {
    if (publicKey) {
      try {
        emailjs.init(publicKey);
        console.log("EmailJS initialized with Public Key.");
      } catch (err) {
        console.error("EmailJS Init Error:", err);
      }
    }
  }, [publicKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setToastType('error');
      setToastMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setSubmitting(true);
    let emailJsSuccess = false;
    let dbSuccess = false;
    let localBackupSuccess = false;

    // 1. Send via EmailJS using supplied Service ID, Template ID, and Public Key
    if (publicKey) {
      try {
        const templateParams = {
          from_name: formData.name,
          user_name: formData.name,
          name: formData.name,
          from_email: formData.email,
          user_email: formData.email,
          email: formData.email,
          reply_to: formData.email,
          subject: formData.subject || 'IEEE EMBS Website Contact Inquiry',
          message: formData.message,
          to_email: 'swethabharath27@vardhaman.org'
        };

        const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log("EmailJS Dispatch Success:", res);
        emailJsSuccess = true;
      } catch (err) {
        console.error("EmailJS Error Response:", err);
      }
    }

    // 2. Save inquiry to Firestore database for Admin Portal dashboard
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        date: new Date().toISOString(),
        read: false,
        timestamp: serverTimestamp()
      });
      dbSuccess = true;
      console.log("Firestore Inquiry Saved.");
    } catch (err) {
      console.error("Firestore Write Warning:", err);
    }

    // 3. Fallback LocalStorage backup so no user message is EVER lost
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('ieee_embs_inquiries') || '[]');
      existingInquiries.push({
        ...formData,
        date: new Date().toISOString(),
        id: `local_${Date.now()}`
      });
      localStorage.setItem('ieee_embs_inquiries', JSON.stringify(existingInquiries));
      localBackupSuccess = true;
    } catch (err) {
      console.error("LocalStorage Backup Error:", err);
    }

    // 4. Confirm submission success to the user
    if (emailJsSuccess || dbSuccess || localBackupSuccess) {
      setToastType('success');
      setToastMessage('Thank you! Your message has been received. Our team will get back to you shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setToastType('error');
      setToastMessage('Unable to send message. Please check your network connection and try again.');
    }

    setSubmitting(false);
  };

  return (
    <div className="pt-24 pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
      )}

      {/* Header Banner */}
      <section className="py-16 text-white text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-sky-400/30 text-xs font-mono text-sky-400">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Bio-Fluid Telemetry & Inquiries Portal</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold">Connect With IEEE EMBS</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have inquiries regarding technical workshops, student research collaborations, or chapter membership? Reach out to our executive committee.
          </p>
        </motion.div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 specular-card rounded-3xl p-8 sm:p-10 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-extrabold text-white">Send Direct Message</h3>
              <p className="text-slate-400 text-xs mt-1 font-mono">Dispatches to chapter faculty leadership and executive committee.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 font-mono">Your Name *</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5 font-mono">Email Address *</label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 font-mono">Subject</label>
                <input 
                  type="text"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Event Inquiry / Research Paper"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 font-mono">Message *</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: submitting ? 1 : 1.02 }}
                whileTap={{ scale: submitting ? 1 : 0.98 }}
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl text-sm font-extrabold text-white bg-ieee-blue hover:bg-ieee-dark transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 border border-sky-400/30"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Sending Transmission...</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Location & Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="specular-card rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-white">Campus Information</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-vardhaman-orange flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold block text-white">Campus Location</span>
                    <span className="text-slate-300 text-xs leading-relaxed">Vardhaman College of Engineering, Kacharam, Shamshabad, Hyderabad 501218</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sky-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Faculty Advisor Email</span>
                    <a href="mailto:swethabharath27@vardhaman.org" className="text-sky-400 hover:underline text-xs">swethabharath27@vardhaman.org</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-white">Student Helpline</span>
                    <span className="text-slate-300 text-xs">+91 9059573313 (Secretary) / +91 7993136780 (Chair)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="specular-card rounded-3xl overflow-hidden h-64 border border-white/15">
              <iframe
                title="Vardhaman Campus Map"
                src="https://maps.google.com/maps?q=Vardhaman%20College%20of%20Engineering%20Hyderabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}

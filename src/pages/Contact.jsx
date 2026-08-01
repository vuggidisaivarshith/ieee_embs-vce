import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
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

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Runtime environment check & EmailJS init
  useEffect(() => {
    if (!serviceId || !templateId || !publicKey) {
      console.warn(
        "EmailJS Warning: One or more environment variables are undefined (VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY). Email notifications will fall back to database logging."
      );
    } else {
      try {
        emailjs.init(publicKey);
      } catch (err) {
        console.error("EmailJS Init Error:", err);
      }
    }
  }, [serviceId, templateId, publicKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setToastType('error');
      setToastMessage('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    let emailJsSuccess = false;
    let dbSuccess = false;
    let emailJsErrorDetails = null;

    // 1. Try sending via EmailJS if configured
    if (serviceId && templateId && publicKey) {
      try {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || 'IEEE EMBS Website Contact Inquiry',
          message: formData.message,
          to_email: 'swethabharath27@vardhaman.org'
        };
        const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log("EmailJS Sent Successfully:", res);
        emailJsSuccess = true;
      } catch (err) {
        emailJsErrorDetails = err;
        console.error("EmailJS Error Response:", err);
      }
    }

    // 2. Save inquiry to Firestore database
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        date: new Date().toISOString(),
        read: false,
        timestamp: serverTimestamp()
      });
      dbSuccess = true;
    } catch (err) {
      console.error("Firestore Database Inquiry Error:", err);
    }

    // 3. User feedback evaluation
    if (emailJsSuccess || dbSuccess) {
      setToastType('success');
      setToastMessage('Your message has been sent successfully! Our team will respond shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setToastType('error');
      if (emailJsErrorDetails) {
        if (emailJsErrorDetails.status === 400 || emailJsErrorDetails.status === 401) {
          setToastMessage('Email service configuration error. Message logged to admin database.');
        } else if (!navigator.onLine) {
          setToastMessage('Network failure detected. Please check your internet connection and try again.');
        } else {
          setToastMessage(`Failed to send message (${emailJsErrorDetails.text || 'Service Error'}). Please try again later.`);
        }
      } else {
        setToastMessage('Failed to submit message. Please try again later.');
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="pt-24 pb-20">
      
      {/* Toast */}
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
      )}

      {/* Header */}
      <section className="bg-gradient-to-r from-ieee-blue via-embs-purple to-vardhaman-orange text-white py-16 text-center animate-gradient">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4"
        >
          <h1 className="text-3xl sm:text-5xl font-extrabold">Contact Us</h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto">
            Have questions about upcoming events, membership, or research collaborations? Send us a message!
          </p>
        </motion.div>
      </section>

      {/* Form + Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6"
          >
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Send a Message</h3>
              <p className="text-slate-500 text-xs mt-1">Submissions are delivered directly to the chapter administration.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Your Name *</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ieee-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Email Address *</label>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ieee-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Subject</label>
                <input 
                  type="text"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Event Inquiry / Membership"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ieee-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Message *</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ieee-blue"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: submitting ? 1 : 1.03 }}
                whileTap={{ scale: submitting ? 1 : 0.97 }}
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl text-sm font-extrabold text-white bg-ieee-blue hover:bg-ieee-dark transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right Location & Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-vardhaman-orange flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white">Campus Location</span>
                    <span className="text-slate-500 dark:text-slate-400">Vardhaman College of Engineering, Kacharam, Shamshabad, Hyderabad 501218</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-ieee-blue flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white">Faculty Email</span>
                    <a href="mailto:swethabharath27@vardhaman.org" className="text-ieee-blue dark:text-sky-400 hover:underline">swethabharath27@vardhaman.org</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-embs-purple flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white">Student Helpline</span>
                    <span className="text-slate-500 dark:text-slate-400">+91 9059573313 (Secretary) / +91 7993136780 (Chair)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Campus Map */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 h-64">
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

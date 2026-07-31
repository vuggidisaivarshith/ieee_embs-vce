import React, { useState, useEffect } from 'react';
import { Save, FileText } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../../firebase/config';
import Toast from '../../components/ui/Toast';

export default function SiteContentManager() {
  const [content, setContent] = useState({
    membershipPageText: "Joining IEEE EMBS opens doors to global conferences, digital libraries, and professional networking in biomedical engineering.",
    contactEmail: "swethabharath27@vardhaman.org",
    contactPhone: "+91 9059573313 / +91 7993136780",
    collegeAddress: "Vardhaman College of Engineering, Kacharam, Shamshabad, Hyderabad, Telangana 501218"
  });
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    async function loadContent() {
      try {
        const snap = await getDoc(doc(db, 'siteSettings', 'singletonDoc'));
        if (snap.exists()) {
          setContent(prev => ({ ...prev, ...snap.data() }));
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadContent();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'siteSettings', 'singletonDoc'), content, { merge: true });
      setToastMessage('Page content updated successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />}

      <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
        <div>
          <h2 className="text-xl font-extrabold text-white">Page Content & Contact Details</h2>
          <p className="text-xs text-slate-300">Edit static page intro blocks, contact emails, and address strings.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border-2 border-slate-300 dark:border-slate-600 shadow-2xl space-y-6">
        
        <div>
          <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Membership Page Intro Text</label>
          <textarea 
            rows={3} 
            value={content.membershipPageText} 
            onChange={e => setContent({ ...content, membershipPageText: e.target.value })} 
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Official Contact Email</label>
            <input 
              type="email" 
              value={content.contactEmail} 
              onChange={e => setContent({ ...content, contactEmail: e.target.value })} 
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Contact Phone Numbers</label>
            <input 
              type="text" 
              value={content.contactPhone} 
              onChange={e => setContent({ ...content, contactPhone: e.target.value })} 
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">College Campus Address</label>
          <textarea 
            rows={2} 
            value={content.collegeAddress} 
            onChange={e => setContent({ ...content, collegeAddress: e.target.value })} 
            className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
          <button type="submit" className="px-6 py-3 rounded-xl font-extrabold text-xs text-white bg-ieee-blue hover:bg-ieee-dark transition shadow-xl flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Page Content
          </button>
        </div>

      </form>
    </div>
  );
}

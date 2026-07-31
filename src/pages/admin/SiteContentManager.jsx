import React, { useState, useEffect } from 'react';
import { Save, FileText } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../../firebase/config';
import Toast from '../../components/ui/Toast';

export default function SiteContentManager() {
  const [siteSettings, setSiteSettings] = useState(DEFAULT_SITE_DATA.siteSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const snap = await getDoc(doc(db, 'siteSettings', 'singletonDoc'));
        if (snap.exists()) {
          setSiteSettings(prev => ({ ...prev, ...snap.data() }));
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'siteSettings', 'singletonDoc'), siteSettings, { merge: true });
      setToastMessage('Home & About page content updated live!');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Page Content Editor</h2>
          <p className="text-xs text-slate-500">Edit hero banner text, mission statement, and faculty coordinator bio live.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6">
        
        {/* Hero Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-ieee-blue uppercase tracking-wider border-b pb-2">Home Hero Banner</h3>
          
          <div>
            <label className="block text-xs font-bold mb-1">Hero Description</label>
            <textarea
              rows={3}
              value={siteSettings.heroDescription}
              onChange={e => setSiteSettings({ ...siteSettings, heroDescription: e.target.value })}
              className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm"
            ></textarea>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-embs-purple uppercase tracking-wider border-b pb-2">Welcome & About Chapter</h3>
          
          <div>
            <label className="block text-xs font-bold mb-1">Welcome Text</label>
            <textarea
              rows={3}
              value={siteSettings.welcomeText}
              onChange={e => setSiteSettings({ ...siteSettings, welcomeText: e.target.value })}
              className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Chapter Mission Statement</label>
            <textarea
              rows={3}
              value={siteSettings.missionStatement}
              onChange={e => setSiteSettings({ ...siteSettings, missionStatement: e.target.value })}
              className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm"
            ></textarea>
          </div>
        </div>

        {/* Coordinator Bio */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-vardhaman-orange uppercase tracking-wider border-b pb-2">Faculty Coordinator Info</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Faculty Name</label>
              <input type="text" value={siteSettings.facultyName} onChange={e => setSiteSettings({ ...siteSettings, facultyName: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Faculty Role</label>
              <input type="text" value={siteSettings.facultyRole} onChange={e => setSiteSettings({ ...siteSettings, facultyRole: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Coordinator Quote</label>
            <textarea rows={3} value={siteSettings.facultyQuote} onChange={e => setSiteSettings({ ...siteSettings, facultyQuote: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-ieee-blue hover:bg-ieee-dark shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Content Live
          </button>
        </div>

      </form>
    </div>
  );
}

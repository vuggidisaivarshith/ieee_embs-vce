import React, { useState, useEffect } from 'react';
import { Save, Settings } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../../firebase/config';
import Toast from '../../components/ui/Toast';

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState(DEFAULT_SITE_DATA.siteSettings);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const snap = await getDoc(doc(db, 'siteSettings', 'singletonDoc'));
        if (snap.exists()) {
          setSettings(prev => ({ ...prev, ...snap.data() }));
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'siteSettings', 'singletonDoc'), settings, { merge: true });
      setToastMessage('Site settings & statistics updated!');
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Site Settings & Stats</h2>
          <p className="text-xs text-slate-500">Update social links, contact info, and site stats counters.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-6">
        
        {/* Stats */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-ieee-blue uppercase tracking-wider border-b pb-2">Home Page Stats Counters</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Active Members</label>
              <input type="number" value={settings.membersCount} onChange={e => setSettings({ ...settings, membersCount: parseInt(e.target.value) || 0 })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Events Hosted</label>
              <input type="number" value={settings.eventsCount} onChange={e => setSettings({ ...settings, eventsCount: parseInt(e.target.value) || 0 })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Years Active</label>
              <input type="number" value={settings.yearsActive} onChange={e => setSettings({ ...settings, yearsActive: parseInt(e.target.value) || 0 })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Awards</label>
              <input type="number" value={settings.awardsCount} onChange={e => setSettings({ ...settings, awardsCount: parseInt(e.target.value) || 0 })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-embs-purple uppercase tracking-wider border-b pb-2">Social Media & Contact Links</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Instagram Profile URL</label>
              <input type="url" value={settings.instagram} onChange={e => setSettings({ ...settings, instagram: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">LinkedIn Profile URL</label>
              <input type="url" value={settings.linkedin} onChange={e => setSettings({ ...settings, linkedin: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Contact Email</label>
              <input type="email" value={settings.contactEmail} onChange={e => setSettings({ ...settings, contactEmail: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Contact Phone</label>
              <input type="text" value={settings.contactPhone} onChange={e => setSettings({ ...settings, contactPhone: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-ieee-blue hover:bg-ieee-dark shadow-lg flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>

      </form>
    </div>
  );
}

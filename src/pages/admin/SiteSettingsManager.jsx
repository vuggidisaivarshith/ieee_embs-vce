import React, { useState, useEffect } from 'react';
import { Save, Settings } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../../firebase/config';
import Toast from '../../components/ui/Toast';

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState(DEFAULT_SITE_DATA.siteSettings);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const snap = await getDoc(doc(db, 'siteSettings', 'singletonDoc'));
        if (snap.exists()) {
          setSettings(prev => ({ ...prev, ...snap.data() }));
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'siteSettings', 'singletonDoc'), settings);
      setToastMessage('Site settings updated live!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />}

      <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
        <div>
          <h2 className="text-xl font-extrabold text-white">Global Site Settings</h2>
          <p className="text-xs text-slate-300">Update chapter stats, faculty information, and landing page content.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border-2 border-slate-300 dark:border-slate-600 shadow-2xl space-y-6">
        
        {/* Chapter Stats */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-700">
            Chapter Live Statistics Counter
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Members Count</label>
              <input 
                type="number" 
                value={settings.membersCount} 
                onChange={e => setSettings({ ...settings, membersCount: parseInt(e.target.value) || 0 })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Events Count</label>
              <input 
                type="number" 
                value={settings.eventsCount} 
                onChange={e => setSettings({ ...settings, eventsCount: parseInt(e.target.value) || 0 })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Years Active</label>
              <input 
                type="number" 
                value={settings.yearsActive} 
                onChange={e => setSettings({ ...settings, yearsActive: parseInt(e.target.value) || 0 })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Awards Count</label>
              <input 
                type="number" 
                value={settings.awardsCount} 
                onChange={e => setSettings({ ...settings, awardsCount: parseInt(e.target.value) || 0 })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
              />
            </div>
          </div>
        </div>

        {/* Faculty Co-ordinator Info */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-700">
            Faculty Co-ordinator Profile
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Faculty Name</label>
              <input 
                type="text" 
                value={settings.facultyName} 
                onChange={e => setSettings({ ...settings, facultyName: e.target.value })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Role / Title</label>
              <input 
                type="text" 
                value={settings.facultyRole} 
                onChange={e => setSettings({ ...settings, facultyRole: e.target.value })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Department</label>
              <input 
                type="text" 
                value={settings.facultyDept} 
                onChange={e => setSettings({ ...settings, facultyDept: e.target.value })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Faculty Quote</label>
            <textarea 
              rows={2} 
              value={settings.facultyQuote} 
              onChange={e => setSettings({ ...settings, facultyQuote: e.target.value })} 
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
            />
          </div>
        </div>

        {/* Hero & Mission Statements */}
        <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-700">
            Landing Hero & Mission Statements
          </h3>
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Hero Paragraph</label>
            <textarea 
              rows={2} 
              value={settings.heroDescription} 
              onChange={e => setSettings({ ...settings, heroDescription: e.target.value })} 
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Welcome Overview Text</label>
            <textarea 
              rows={3} 
              value={settings.welcomeText} 
              onChange={e => setSettings({ ...settings, welcomeText: e.target.value })} 
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
          <button type="submit" className="px-6 py-3 rounded-xl font-extrabold text-xs text-white bg-ieee-blue hover:bg-ieee-dark transition shadow-xl flex items-center gap-2">
            <Save className="w-4 h-4" /> Save All Site Settings
          </button>
        </div>

      </form>
    </div>
  );
}

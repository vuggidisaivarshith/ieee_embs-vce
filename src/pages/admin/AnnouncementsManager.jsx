import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Pin } from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../../firebase/config';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';

export default function AnnouncementsManager() {
  const [announcements, setAnnouncements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const snap = await getDocs(collection(db, 'announcements'));
      if (!snap.empty) {
        setAnnouncements(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setAnnouncements(DEFAULT_SITE_DATA.announcements);
      }
    } catch (err) {
      setAnnouncements(DEFAULT_SITE_DATA.announcements);
    }
  }

  const handleOpenCreate = () => {
    setCurrent({
      id: Date.now().toString(),
      title: '',
      body: '',
      date: new Date().toISOString().split('T')[0],
      isPinned: false
    });
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'announcements', current.id), current);
      setToastMessage('Announcement saved!');
      setIsEditing(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!targetToDelete) return;
    try {
      await deleteDoc(doc(db, 'announcements', targetToDelete.id));
      setToastMessage('Announcement deleted.');
      setDeleteModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />}

      <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
        <div>
          <h2 className="text-xl font-extrabold text-white">Announcements</h2>
          <p className="text-xs text-slate-300">Post update notices and pin important announcements.</p>
        </div>
        <button 
          onClick={handleOpenCreate} 
          className="px-4 py-2.5 rounded-xl font-extrabold text-xs text-white bg-ieee-blue hover:bg-ieee-dark transition flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Notice
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border-2 border-slate-300 dark:border-slate-600 shadow-2xl space-y-5">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-700">
            {current.id ? 'Edit Announcement' : 'New Announcement'}
          </h3>
          
          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Announcement Title *</label>
            <input 
              type="text" 
              required 
              value={current.title} 
              onChange={e => setCurrent({ ...current, title: e.target.value })} 
              placeholder="Enter headline..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ieee-blue" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Body Details *</label>
            <textarea 
              rows={4} 
              required 
              value={current.body} 
              onChange={e => setCurrent({ ...current, body: e.target.value })} 
              placeholder="Type announcement body content..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ieee-blue" 
            />
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
            <input 
              type="checkbox" 
              id="pinned" 
              checked={current.isPinned} 
              onChange={e => setCurrent({ ...current, isPinned: e.target.checked })} 
              className="w-4 h-4 rounded text-ieee-blue focus:ring-ieee-blue" 
            />
            <label htmlFor="pinned" className="text-xs font-bold text-slate-900 dark:text-slate-100 cursor-pointer">
              Pin to top of news feed
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)} 
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-ieee-blue hover:bg-ieee-dark transition shadow-lg"
            >
              Save Notice
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden divide-y divide-slate-700 shadow-md">
          {announcements.map(a => (
            <div key={a.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-750 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {a.isPinned && <Pin className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  <h4 className="text-sm font-bold text-white">{a.title}</h4>
                </div>
                <p className="text-xs text-slate-300 line-clamp-1">{a.body}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => { setCurrent(a); setIsEditing(true); }} 
                  className="p-2 text-slate-300 hover:text-sky-400 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => { setTargetToDelete(a); setDeleteModalOpen(true); }} 
                  className="p-2 text-slate-300 hover:text-rose-400 bg-slate-700 rounded-lg hover:bg-slate-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={deleteModalOpen} 
        title="Delete Notice?" 
        message={`Are you sure you want to delete "${targetToDelete?.title}"?`} 
        confirmText="Delete Notice" 
        isDanger={true} 
        onConfirm={handleDelete} 
        onClose={() => setDeleteModalOpen(false)} 
      />
    </div>
  );
}

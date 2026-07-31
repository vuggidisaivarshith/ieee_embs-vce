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

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Announcements</h2>
          <p className="text-xs text-slate-500">Post update notices and pin important announcements.</p>
        </div>
        <button onClick={handleOpenCreate} className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-ieee-blue hover:bg-ieee-dark transition flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Notice
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-base font-bold">Edit Announcement</h3>
          <div>
            <label className="block text-xs font-bold mb-1">Title</label>
            <input type="text" required value={current.title} onChange={e => setCurrent({ ...current, title: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Body Text</label>
            <textarea rows={4} required value={current.body} onChange={e => setCurrent({ ...current, body: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="pinned" checked={current.isPinned} onChange={e => setCurrent({ ...current, isPinned: e.target.checked })} className="rounded text-ieee-blue" />
            <label htmlFor="pinned" className="text-xs font-semibold">Pin to top of news feed</label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-700">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-ieee-blue">Save Notice</button>
          </div>
        </form>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700">
          {announcements.map(a => (
            <div key={a.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  {a.isPinned && <Pin className="w-3.5 h-3.5 text-ieee-blue fill-ieee-blue" />}
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{a.title}</h4>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">{a.body}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setCurrent(a); setIsEditing(true); }} className="p-2 text-slate-500 hover:text-ieee-blue"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => { setTargetToDelete(a); setDeleteModalOpen(true); }} className="p-2 text-slate-500 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={deleteModalOpen} title="Delete Notice?" message={`Delete "${targetToDelete?.title}"?`} confirmText="Delete" isDanger={true} onConfirm={handleDelete} onClose={() => setDeleteModalOpen(false)} />
    </div>
  );
}

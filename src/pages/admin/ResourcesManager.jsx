import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Link2 } from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../../firebase/config';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';

export default function ResourcesManager() {
  const [resources, setResources] = useState([]);
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
      const snap = await getDocs(collection(db, 'resources'));
      if (!snap.empty) {
        setResources(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setResources(DEFAULT_SITE_DATA.resources);
      }
    } catch (err) {
      setResources(DEFAULT_SITE_DATA.resources);
    }
  }

  const handleOpenCreate = () => {
    setCurrent({
      id: Date.now().toString(),
      title: '',
      category: 'Research & Papers',
      description: '',
      url: ''
    });
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'resources', current.id), current);
      setToastMessage('Resource saved!');
      setIsEditing(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!targetToDelete) return;
    try {
      await deleteDoc(doc(db, 'resources', targetToDelete.id));
      setToastMessage('Resource deleted.');
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Resources</h2>
          <p className="text-xs text-slate-500">Manage downloadable PDFs, IEEE library links, and portal URLs.</p>
        </div>
        <button onClick={handleOpenCreate} className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-ieee-blue hover:bg-ieee-dark transition flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Resource
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-base font-bold">Edit Resource</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Resource Title</label>
              <input type="text" required value={current.title} onChange={e => setCurrent({ ...current, title: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Category</label>
              <input type="text" value={current.category} onChange={e => setCurrent({ ...current, category: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">URL Link</label>
            <input type="url" required value={current.url} onChange={e => setCurrent({ ...current, url: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Description</label>
            <textarea rows={2} value={current.description} onChange={e => setCurrent({ ...current, description: e.target.value })} className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-700">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-ieee-blue">Save Resource</button>
          </div>
        </form>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden divide-y divide-slate-100 dark:divide-slate-700">
          {resources.map(r => (
            <div key={r.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{r.title}</h4>
                <p className="text-xs text-ieee-blue dark:text-sky-400 font-semibold">{r.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setCurrent(r); setIsEditing(true); }} className="p-2 text-slate-500 hover:text-ieee-blue"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => { setTargetToDelete(r); setDeleteModalOpen(true); }} className="p-2 text-slate-500 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={deleteModalOpen} title="Delete Resource?" message={`Delete "${targetToDelete?.title}"?`} confirmText="Delete" isDanger={true} onConfirm={handleDelete} onClose={() => setDeleteModalOpen(false)} />
    </div>
  );
}

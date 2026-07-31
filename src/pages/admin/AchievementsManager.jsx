import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Award } from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db, DEFAULT_SITE_DATA } from '../../firebase/config';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';

export default function AchievementsManager() {
  const [achievements, setAchievements] = useState([]);
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
      const snap = await getDocs(collection(db, 'achievements'));
      if (!snap.empty) {
        setAchievements(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setAchievements(DEFAULT_SITE_DATA.achievements);
      }
    } catch (err) {
      setAchievements(DEFAULT_SITE_DATA.achievements);
    }
  }

  const handleOpenCreate = () => {
    setCurrent({
      id: Date.now().toString(),
      title: '',
      description: '',
      category: 'Section Award',
      categoryColor: '#00629B',
      date: new Date().toISOString().split('T')[0]
    });
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'achievements', current.id), current);
      setToastMessage('Achievement saved!');
      setIsEditing(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!targetToDelete) return;
    try {
      await deleteDoc(doc(db, 'achievements', targetToDelete.id));
      setToastMessage('Achievement removed.');
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
          <h2 className="text-xl font-extrabold text-white">Achievements</h2>
          <p className="text-xs text-slate-300">Manage awards, hackathon recognitions, and paper publications.</p>
        </div>
        <button onClick={handleOpenCreate} className="px-4 py-2.5 rounded-xl font-extrabold text-xs text-white bg-ieee-blue hover:bg-ieee-dark transition flex items-center gap-1.5 shadow-md">
          <Plus className="w-4 h-4" /> Add Achievement
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border-2 border-slate-300 dark:border-slate-600 shadow-2xl space-y-5">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-700">
            {current.id ? 'Edit Achievement' : 'New Achievement'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Achievement Title *</label>
              <input 
                type="text" required 
                value={current.title} 
                onChange={e => setCurrent({ ...current, title: e.target.value })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Category Badge Text</label>
              <input 
                type="text" 
                value={current.category} 
                onChange={e => setCurrent({ ...current, category: e.target.value })} 
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Description *</label>
            <textarea 
              rows={3} 
              value={current.description} 
              onChange={e => setCurrent({ ...current, description: e.target.value })} 
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium" 
            />
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
              Save Achievement
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden divide-y divide-slate-700 shadow-md">
          {achievements.map(a => (
            <div key={a.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-750 transition">
              <div>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded text-white bg-ieee-blue uppercase">{a.category}</span>
                <h4 className="text-sm font-bold text-white mt-1">{a.title}</h4>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { setCurrent(a); setIsEditing(true); }} className="p-2 text-slate-300 hover:text-sky-400 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => { setTargetToDelete(a); setDeleteModalOpen(true); }} className="p-2 text-slate-300 hover:text-rose-400 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={deleteModalOpen} title="Delete Achievement?" message={`Delete "${targetToDelete?.title}"?`} confirmText="Delete" isDanger={true} onConfirm={handleDelete} onClose={() => setDeleteModalOpen(false)} />
    </div>
  );
}

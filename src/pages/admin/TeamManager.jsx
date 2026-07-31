import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, UserPlus } from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, DEFAULT_SITE_DATA } from '../../firebase/config';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';

export default function TeamManager() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(null);

  useEffect(() => {
    loadTeam();
  }, []);

  async function loadTeam() {
    try {
      const snap = await getDocs(collection(db, 'team'));
      if (!snap.empty) {
        setTeam(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setTeam(DEFAULT_SITE_DATA.teamMembers);
      }
    } catch (err) {
      console.log(err);
      setTeam(DEFAULT_SITE_DATA.teamMembers);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setCurrentMember({
      id: Date.now().toString(),
      name: '',
      role: '',
      department: 'IT Dept',
      year: '4th Year',
      email: '',
      phone: '',
      linkedin: '',
      photoUrl: '',
      category: 'student',
      order: team.length + 1,
      active: true
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (m) => {
    setCurrentMember(m);
    setIsEditing(true);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const storageRef = ref(storage, `team/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setCurrentMember(prev => ({ ...prev, photoUrl: url }));
      setToastType('success');
      setToastMessage('Photo uploaded!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentMember.name || !currentMember.role) return;

    try {
      await setDoc(doc(db, 'team', currentMember.id), currentMember);
      setToastType('success');
      setToastMessage('Team member saved!');
      setIsEditing(false);
      loadTeam();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!targetToDelete) return;
    try {
      await deleteDoc(doc(db, 'team', targetToDelete.id));
      setToastType('success');
      setToastMessage('Member removed.');
      setDeleteModalOpen(false);
      loadTeam();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Team & Office Bearers</h2>
          <p className="text-xs text-slate-500">Manage chapter officers, advisors, and committee hierarchy.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-ieee-blue hover:bg-ieee-dark transition flex items-center gap-1.5"
        >
          <UserPlus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-lg font-bold">Edit Member Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Full Name *</label>
              <input 
                type="text" required
                value={currentMember.name}
                onChange={e => setCurrentMember({ ...currentMember, name: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Role / Designation *</label>
              <input 
                type="text" required
                value={currentMember.role}
                onChange={e => setCurrentMember({ ...currentMember, role: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Category</label>
              <select
                value={currentMember.category}
                onChange={e => setCurrentMember({ ...currentMember, category: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm"
              >
                <option value="faculty">Faculty</option>
                <option value="student">Student Leader</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Department</label>
              <input 
                type="text"
                value={currentMember.department}
                onChange={e => setCurrentMember({ ...currentMember, department: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Display Order</label>
              <input 
                type="number"
                value={currentMember.order}
                onChange={e => setCurrentMember({ ...currentMember, order: parseInt(e.target.value) || 1 })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1">Email</label>
              <input 
                type="email"
                value={currentMember.email}
                onChange={e => setCurrentMember({ ...currentMember, email: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Phone</label>
              <input 
                type="text"
                value={currentMember.phone}
                onChange={e => setCurrentMember({ ...currentMember, phone: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">LinkedIn URL</label>
              <input 
                type="url"
                value={currentMember.linkedin}
                onChange={e => setCurrentMember({ ...currentMember, linkedin: e.target.value })}
                className="w-full p-2.5 rounded-xl border bg-slate-50 dark:bg-slate-700 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1">Profile Photo</label>
            <input 
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-ieee-blue file:text-white"
            />
            {currentMember.photoUrl && (
              <img src={currentMember.photoUrl} alt="" className="w-16 h-16 rounded-xl object-cover mt-2 border" />
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-700">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-ieee-blue">Save Member</button>
          </div>
        </form>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {team.map(m => (
              <div key={m.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={m.photoUrl || "/assets/embs-logo.png"} alt="" className="w-10 h-10 rounded-full object-cover border" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{m.name}</h4>
                    <p className="text-xs text-ieee-blue dark:text-sky-400 font-semibold">{m.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenEdit(m)} className="p-2 text-slate-500 hover:text-ieee-blue"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => { setTargetToDelete(m); setDeleteModalOpen(true); }} className="p-2 text-slate-500 hover:text-rose-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={deleteModalOpen}
        title="Remove Member?"
        message={`Remove "${targetToDelete?.name}" from team listing?`}
        confirmText="Remove"
        isDanger={true}
        onConfirm={handleDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
}

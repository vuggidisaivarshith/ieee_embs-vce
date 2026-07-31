import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle2 } from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const snap = await getDocs(collection(db, 'inquiries'));
      if (!snap.empty) {
        setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleMarkRead = async (msg) => {
    try {
      await setDoc(doc(db, 'inquiries', msg.id), { ...msg, read: true });
      setToastMessage('Marked as read.');
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!targetToDelete) return;
    try {
      await deleteDoc(doc(db, 'inquiries', targetToDelete.id));
      setToastMessage('Inquiry deleted.');
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
          <h2 className="text-xl font-extrabold text-white">Contact Form Inquiries</h2>
          <p className="text-xs text-slate-300">View and manage messages submitted through the public Contact page.</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16 bg-slate-800 rounded-2xl border border-slate-700 p-8">
          <Mail className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Contact Inquiries Yet</h3>
          <p className="text-xs text-slate-400 mt-1">Submitted messages from visitors will appear here.</p>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden divide-y divide-slate-700 shadow-md">
          {messages.map(m => (
            <div key={m.id} className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${m.read ? 'opacity-75' : 'bg-slate-750'}`}>
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{m.name}</h4>
                  <span className="text-xs font-semibold text-sky-400">&lt;{m.email}&gt;</span>
                </div>
                <p className="text-xs font-semibold text-amber-300">{m.subject}</p>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700">{m.message}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!m.read && (
                  <button onClick={() => handleMarkRead(m)} className="p-2 text-xs font-bold text-emerald-400 bg-emerald-950/50 border border-emerald-800 rounded-lg hover:bg-emerald-900/50 transition flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Mark Read
                  </button>
                )}
                <button onClick={() => { setTargetToDelete(m); setDeleteModalOpen(true); }} className="p-2 text-slate-300 hover:text-rose-400 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={deleteModalOpen} title="Delete Inquiry?" message={`Delete message from "${targetToDelete?.name}"?`} confirmText="Delete" isDanger={true} onConfirm={handleDelete} onClose={() => setDeleteModalOpen(false)} />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      const snap = await getDocs(query(collection(db, 'contactMessages'), orderBy('timestamp', 'desc')));
      if (!snap.empty) {
        setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.log(err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }

  const toggleReadStatus = async (msg) => {
    try {
      await updateDoc(doc(db, 'contactMessages', msg.id), { isRead: !msg.isRead });
      setToastMessage('Message status updated.');
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!targetToDelete) return;
    try {
      await deleteDoc(doc(db, 'contactMessages', targetToDelete.id));
      setToastMessage('Message deleted.');
      setDeleteModalOpen(false);
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Form Inquiries</h2>
          <p className="text-xs text-slate-500">Read and respond to contact submissions sent from the website.</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl border p-8">
          <Mail className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="text-sm font-bold">No Contact Messages Yet</h4>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`p-6 rounded-2xl border transition ${
                msg.isRead 
                  ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-80' 
                  : 'bg-sky-50/50 dark:bg-slate-800/90 border-sky-300 dark:border-sky-700 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{msg.name}</h4>
                  <p className="text-xs text-ieee-blue font-semibold">{msg.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReadStatus(msg)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      msg.isRead ? 'bg-slate-200 dark:bg-slate-700 text-slate-600' : 'bg-emerald-500 text-white'
                    }`}
                  >
                    {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button
                    onClick={() => { setTargetToDelete(msg); setDeleteModalOpen(true); }}
                    className="p-2 text-slate-500 hover:text-rose-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {msg.subject && (
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Subject: {msg.subject}</p>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={deleteModalOpen} title="Delete Message?" message="Delete this message entry permanently?" confirmText="Delete" isDanger={true} onConfirm={handleDelete} onClose={() => setDeleteModalOpen(false)} />
    </div>
  );
}

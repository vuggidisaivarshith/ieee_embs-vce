import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Upload, Image as ImageIcon, User, Linkedin, BookOpen } from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, DEFAULT_SITE_DATA } from '../../firebase/config';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';

export default function EventsManager() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const snap = await getDocs(collection(db, 'events'));
      if (!snap.empty) {
        setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } else {
        setEvents(DEFAULT_SITE_DATA.events);
      }
    } catch (err) {
      console.log(err);
      setEvents(DEFAULT_SITE_DATA.events);
    } finally {
      setLoading(false);
    }
  }

  const handleOpenCreate = () => {
    setCurrentEvent({
      id: Date.now().toString(),
      title: '',
      topic: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '6:00 PM IST',
      venue: '',
      speaker: '',
      speakerRole: '',
      speakerBio: '',
      speakerLinkedin: '',
      speakerUniversity: '',
      posterUrl: '',
      registrationLink: '',
      status: 'upcoming',
      featured: false
    });
    setImagePreview('');
    setIsEditing(true);
  };

  const handleOpenEdit = (evt) => {
    setCurrentEvent(evt);
    setImagePreview(evt.posterUrl || '');
    setIsEditing(true);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setToastType('error');
      setToastMessage('Image size must be under 5MB.');
      return;
    }
    
    setImagePreview(URL.createObjectURL(file));
    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `events/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setCurrentEvent(prev => ({ ...prev, posterUrl: url }));
      setToastType('success');
      setToastMessage('Poster uploaded successfully!');
    } catch (err) {
      console.error(err);
      setToastType('error');
      setToastMessage('Image upload failed.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentEvent.title) return;

    try {
      await setDoc(doc(db, 'events', currentEvent.id), currentEvent);
      setToastType('success');
      setToastMessage('Event saved successfully!');
      setIsEditing(false);
      loadEvents();
    } catch (err) {
      console.error(err);
      setToastType('error');
      setToastMessage('Failed to save event.');
    }
  };

  const handleDelete = async () => {
    if (!targetToDelete) return;
    try {
      await deleteDoc(doc(db, 'events', targetToDelete.id));
      setToastType('success');
      setToastMessage('Event deleted.');
      setDeleteModalOpen(false);
      loadEvents();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />}

      <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
        <div>
          <h2 className="text-xl font-extrabold text-white">Manage Events</h2>
          <p className="text-xs text-slate-300">Add, edit, or remove upcoming and past chapter events.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl font-extrabold text-xs text-white bg-ieee-blue hover:bg-ieee-dark transition flex items-center gap-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border-2 border-slate-300 dark:border-slate-600 shadow-2xl space-y-5">
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-700">
            {currentEvent.id ? 'Edit Event' : 'New Event'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Event Title *</label>
              <input 
                type="text" required
                value={currentEvent.title || ''}
                onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ieee-blue"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Topic / Category</label>
              <input 
                type="text"
                value={currentEvent.topic || ''}
                onChange={e => setCurrentEvent({ ...currentEvent, topic: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ieee-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Description *</label>
            <textarea
              rows={3}
              value={currentEvent.description || ''}
              onChange={e => setCurrentEvent({ ...currentEvent, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ieee-blue"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Date</label>
              <input 
                type="date"
                value={currentEvent.date || ''}
                onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Time</label>
              <input 
                type="text"
                value={currentEvent.time || ''}
                onChange={e => setCurrentEvent({ ...currentEvent, time: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Status</label>
              <select
                value={currentEvent.status || 'upcoming'}
                onChange={e => setCurrentEvent({ ...currentEvent, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium"
              >
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Venue</label>
              <input 
                type="text"
                value={currentEvent.venue || ''}
                onChange={e => setCurrentEvent({ ...currentEvent, venue: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Speaker Name</label>
              <input 
                type="text"
                value={currentEvent.speaker || ''}
                onChange={e => setCurrentEvent({ ...currentEvent, speaker: e.target.value })}
                placeholder="e.g. Dr. Ajit Kumar"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium"
              />
            </div>
          </div>

          {/* Detailed Speaker Profile Section */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-700/40 border border-slate-300 dark:border-slate-600 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-ieee-blue dark:text-sky-400 flex items-center gap-1.5">
              <User className="w-4 h-4" /> Detailed Speaker Profile (Admin Editable)
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">Speaker Role / Designation</label>
              <input 
                type="text"
                value={currentEvent.speakerRole || ''}
                onChange={e => setCurrentEvent({ ...currentEvent, speakerRole: e.target.value })}
                placeholder="e.g. Associate Professor, Information Systems, XIMB"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">Speaker Biography & Research Overview</label>
              <textarea
                rows={3}
                value={currentEvent.speakerBio || ''}
                onChange={e => setCurrentEvent({ ...currentEvent, speakerBio: e.target.value })}
                placeholder="Full biography, research focus, education background..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1">
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" /> LinkedIn Profile URL
                </label>
                <input 
                  type="url"
                  value={currentEvent.speakerLinkedin || ''}
                  onChange={e => setCurrentEvent({ ...currentEvent, speakerLinkedin: e.target.value })}
                  placeholder="https://www.linkedin.com/in/drajitkumar-ai-dt/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-embs-purple" /> University Profile URL
                </label>
                <input 
                  type="url"
                  value={currentEvent.speakerUniversity || ''}
                  onChange={e => setCurrentEvent({ ...currentEvent, speakerUniversity: e.target.value })}
                  placeholder="https://ximb.edu.in/faculty-research/faculty-profile/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Registration Link (Google Form URL)</label>
            <input 
              type="url"
              value={currentEvent.registrationLink || ''}
              onChange={e => setCurrentEvent({ ...currentEvent, registrationLink: e.target.value })}
              placeholder="https://forms.gle/..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Poster Image Upload (Max 5MB)</label>
            <input 
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageFileChange}
              className="block w-full text-xs text-slate-600 dark:text-slate-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-ieee-blue file:text-white"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="h-32 mt-2 rounded-xl object-cover border-2 border-slate-300" />
            )}
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
            <input
              type="checkbox"
              id="featured"
              checked={currentEvent.featured || false}
              onChange={e => setCurrentEvent({ ...currentEvent, featured: e.target.checked })}
              className="w-4 h-4 rounded text-ieee-blue focus:ring-ieee-blue"
            />
            <label htmlFor="featured" className="text-xs font-bold text-slate-900 dark:text-slate-100 cursor-pointer">
              Feature on Home Page Hero Card
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
              disabled={uploadingImage}
              className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-white bg-ieee-blue hover:bg-ieee-dark transition shadow-lg"
            >
              Save Event
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden divide-y divide-slate-700 shadow-md">
          {events.map(evt => (
            <div key={evt.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-750 transition">
              <div className="flex items-center gap-4">
                <img src={evt.posterUrl || "/assets/embs-logo.png"} alt={evt.title} className="w-12 h-12 rounded-xl object-cover border border-slate-600" />
                <div>
                  <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                  <p className="text-xs text-slate-300">{evt.date} • <span className="capitalize font-bold text-sky-400">{evt.status}</span></p>
                  {evt.speaker && <p className="text-[11px] text-slate-400">Speaker: {evt.speaker}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(evt)} className="p-2 text-slate-300 hover:text-sky-400 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => { setTargetToDelete(evt); setDeleteModalOpen(true); }} className="p-2 text-slate-300 hover:text-rose-400 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={deleteModalOpen}
        title="Delete Event?"
        message={`Are you sure you want to delete "${targetToDelete?.title}"?`}
        confirmText="Delete Event"
        isDanger={true}
        onConfirm={handleDelete}
        onClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
}

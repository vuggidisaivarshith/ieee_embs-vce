import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage, DEFAULT_SITE_DATA } from '../../firebase/config';
import Modal from '../../components/ui/Modal';
import Toast from '../../components/ui/Toast';

export default function GalleryManager() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState('success');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(null);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      const snap = await getDocs(collection(db, 'gallery'));
      if (!snap.empty) {
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setAlbums(list);
        if (!selectedAlbum && list.length > 0) setSelectedAlbum(list[0]);
      } else {
        setAlbums(DEFAULT_SITE_DATA.gallery);
        if (!selectedAlbum) setSelectedAlbum(DEFAULT_SITE_DATA.gallery[0]);
      }
    } catch (err) {
      console.log(err);
      setAlbums(DEFAULT_SITE_DATA.gallery);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (!newAlbumTitle) return;
    const newAlbum = {
      id: `album_${Date.now()}`,
      title: newAlbumTitle,
      date: new Date().toISOString().split('T')[0],
      images: []
    };
    try {
      await setDoc(doc(db, 'gallery', newAlbum.id), newAlbum);
      setNewAlbumTitle('');
      setToastType('success');
      setToastMessage('Album created!');
      loadGallery();
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedAlbum) return;
    if (file.size > 5 * 1024 * 1024) {
      setToastType('error');
      setToastMessage('File size exceeds 5MB limit.');
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `gallery/${selectedAlbum.id}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      const newImg = {
        id: `img_${Date.now()}`,
        url,
        caption: caption || file.name
      };

      const updatedImages = [...(selectedAlbum.images || []), newImg];
      const updatedAlbum = { ...selectedAlbum, images: updatedImages };

      await setDoc(doc(db, 'gallery', selectedAlbum.id), updatedAlbum);
      setSelectedAlbum(updatedAlbum);
      setCaption('');
      setToastType('success');
      setToastMessage('Image uploaded to album!');
      loadGallery();
    } catch (err) {
      console.error(err);
      setToastType('error');
      setToastMessage('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imgId) => {
    if (!selectedAlbum) return;
    const imgToDelete = selectedAlbum.images.find(i => i.id === imgId);
    const updatedImages = selectedAlbum.images.filter(i => i.id !== imgId);
    const updatedAlbum = { ...selectedAlbum, images: updatedImages };

    try {
      await setDoc(doc(db, 'gallery', selectedAlbum.id), updatedAlbum);
      setSelectedAlbum(updatedAlbum);
      setToastType('success');
      setToastMessage('Image deleted.');
      loadGallery();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />}

      <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
        <div>
          <h2 className="text-xl font-extrabold text-white">Gallery & Albums</h2>
          <p className="text-xs text-slate-300">Organize photo albums and upload event photos.</p>
        </div>
      </div>

      {/* New Album Form */}
      <form onSubmit={handleCreateAlbum} className="flex gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border-2 border-slate-300 dark:border-slate-600 shadow-md">
        <input 
          type="text"
          value={newAlbumTitle}
          onChange={e => setNewAlbumTitle(e.target.value)}
          placeholder="New Album Title (e.g. Hackathon 2026)"
          className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
        />
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-ieee-blue hover:bg-ieee-dark text-white text-xs font-extrabold shadow-md">
          Create Album
        </button>
      </form>

      {/* Album Selector */}
      <div className="flex flex-wrap gap-2">
        {albums.map(album => (
          <button
            key={album.id}
            onClick={() => setSelectedAlbum(album)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition border ${
              selectedAlbum?.id === album.id 
                ? 'bg-ieee-blue text-white border-ieee-blue shadow-md' 
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {album.title} ({album.images?.length || 0})
          </button>
        ))}
      </div>

      {/* Upload area */}
      {selectedAlbum && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border-2 border-slate-300 dark:border-slate-600 shadow-2xl space-y-4">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-700">
            Upload Photo to "{selectedAlbum.title}"
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Caption</label>
              <input 
                type="text"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                placeholder="Photo caption..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">Select Image File (Max 5MB)</label>
              <input 
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-xs text-slate-600 dark:text-slate-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-ieee-blue file:text-white"
              />
            </div>
          </div>

          {/* Existing Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            {selectedAlbum.images?.map(img => (
              <div key={img.id} className="relative group h-32 rounded-xl overflow-hidden bg-slate-900 border border-slate-600">
                <img src={img.url || img.imageUrl} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute top-2 right-2 p-1.5 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition shadow-md"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

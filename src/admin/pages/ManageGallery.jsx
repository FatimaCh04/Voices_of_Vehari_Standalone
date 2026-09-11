import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Eye, EyeOff, Upload } from 'lucide-react';

const EMPTY = { title: '', caption: '', image_url: '', category: '', is_published: true, sort_order: 0 };

export default function ManageGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const fileRef = useRef();

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('gallery').select('*').order('sort_order');
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileName = `gallery/${Date.now()}-${file.name}`;
    const { error: upErr } = await supabase.storage.from('images').upload(fileName, file, { upsert: true });
    if (upErr) { setError('Upload failed: ' + upErr.message); setUploading(false); return; }
    const { data } = supabase.storage.from('images').getPublicUrl(fileName);
    setForm(prev => ({ ...prev, image_url: data.publicUrl }));
    setUploading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.image_url) { setError('Image URL is required. Upload an image or paste a URL.'); return; }
    setSaving(true);
    setError('');
    const { error: err } = await supabase.from('gallery').insert([form]);
    setSaving(false);
    if (err) { setError(err.message); return; }
    showToast('Added to gallery.');
    setShowForm(false);
    setForm(EMPTY);
    load();
  };

  const handleDelete = async (id, imageUrl) => {
    if (!window.confirm('Delete this image?')) return;
    await supabase.from('gallery').delete().eq('id', id);
    showToast('Deleted.');
    load();
  };

  const togglePublish = async (item) => {
    await supabase.from('gallery').update({ is_published: !item.is_published }).eq('id', item.id);
    load();
  };

  const iStyle = { display: 'block', width: '100%', marginTop: '4px', padding: '10px 12px', border: '1px solid #dfe8f1', borderRadius: '8px', fontFamily: 'inherit', boxSizing: 'border-box' };

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#073b7a', color: 'white', padding: '12px 20px', borderRadius: '10px', zIndex: 999, fontWeight: 700 }}>{toast}</div>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#073b7a' }}>Gallery</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#073b7a', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}>
          <Plus size={16} /> Add Image
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 20px', color: '#073b7a' }}>Add New Image</h3>
          {error && <div style={{ padding: '10px', background: '#fff0f0', border: '1px solid #f0aeae', borderRadius: '8px', color: '#7a1f1f', marginBottom: '14px', fontSize: '13px' }}>{error}</div>}
          <form onSubmit={handleSave}>
            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d', display: 'block', marginBottom: '8px' }}>Image Upload or URL</span>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
                <button type="button" onClick={() => fileRef.current.click()} disabled={uploading}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', border: '1px solid #dfe8f1', borderRadius: '8px', background: 'white', cursor: 'pointer', fontWeight: 700 }}>
                  <Upload size={15} /> {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
                <span style={{ color: '#60708a', fontSize: '13px' }}>or paste URL below</span>
              </div>
              <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://..." style={{ ...iStyle, marginTop: '8px' }} />
              {form.image_url && <img src={form.image_url} alt="preview" style={{ marginTop: '8px', maxHeight: '120px', borderRadius: '8px', border: '1px solid #dfe8f1' }} />}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <label style={{ display: 'block' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Title</span><input name="title" value={form.title} onChange={handleChange} style={iStyle} /></label>
              <label style={{ display: 'block' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Category</span><input name="category" value={form.category} onChange={handleChange} placeholder="e.g. Events" style={iStyle} /></label>
            </div>
            <label style={{ display: 'block', marginTop: '14px' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Caption</span><input name="caption" value={form.caption} onChange={handleChange} style={iStyle} /></label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', cursor: 'pointer' }}>
              <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} />
              <span style={{ fontSize: '14px', fontWeight: 700 }}>Published</span>
            </label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" disabled={saving || uploading} style={{ padding: '10px 20px', background: '#073b7a', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={() => { setShowForm(false); setForm(EMPTY); setError(''); }} style={{ padding: '10px 20px', background: 'white', color: '#073b7a', border: '1px solid #dfe8f1', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p style={{ color: '#60708a' }}>Loading...</p> : items.length === 0 ? (
        <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#60708a' }}>No images in gallery yet.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '14px' }}>
          {items.map(item => (
            <div key={item.id} style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '14px', overflow: 'hidden' }}>
              <img src={item.image_url} alt={item.title || 'Gallery'} style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '10px 12px' }}>
                <p style={{ margin: '0 0 4px', fontWeight: 700, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title || 'Untitled'}</p>
                {item.category && <p style={{ margin: '0 0 8px', fontSize: '11px', color: '#60708a' }}>{item.category}</p>}
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button title={item.is_published ? 'Unpublish' : 'Publish'} onClick={() => togglePublish(item)} style={{ padding: '5px', background: 'none', border: '1px solid #dfe8f1', borderRadius: '6px', cursor: 'pointer' }}>{item.is_published ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                  <button title="Delete" onClick={() => handleDelete(item.id, item.image_url)} style={{ padding: '5px', background: 'none', border: '1px solid #fcc', borderRadius: '6px', cursor: 'pointer', color: '#c00' }}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

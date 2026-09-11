import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';

const EMPTY = { title: '', slug: '', guest_name: '', description: '', audio_url: '', transcript_url: '', tags: '', is_published: false };

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ManagePodcasts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('podcasts').select('*').order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openNew = () => { setForm(EMPTY); setEditing(null); setShowForm(true); setError(''); };
  const openEdit = (item) => {
    setForm({ ...item, tags: Array.isArray(item.tags) ? item.tags.join(', ') : '' });
    setEditing(item.id); setShowForm(true); setError('');
  };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(EMPTY); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const v = type === 'checkbox' ? checked : value;
    const updates = { [name]: v };
    if (name === 'title' && !editing) updates.slug = slugify(value);
    setForm(prev => ({ ...prev, ...updates }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required.'); return; }
    setSaving(true);
    setError('');
    const tags = form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    const payload = { ...form, tags, updated_at: new Date().toISOString() };
    let err;
    if (editing) {
      const { error: e } = await supabase.from('podcasts').update(payload).eq('id', editing);
      err = e;
    } else {
      const { error: e } = await supabase.from('podcasts').insert([payload]);
      err = e;
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    showToast(editing ? 'Updated successfully.' : 'Created successfully.');
    closeForm(); load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this podcast?')) return;
    await supabase.from('podcasts').delete().eq('id', id);
    showToast('Deleted.'); load();
  };

  const togglePublish = async (item) => {
    await supabase.from('podcasts').update({ is_published: !item.is_published }).eq('id', item.id);
    load();
  };

  const iStyle = { display: 'block', width: '100%', marginTop: '4px', padding: '10px 12px', border: '1px solid #dfe8f1', borderRadius: '8px', fontFamily: 'inherit', boxSizing: 'border-box' };

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#073b7a', color: 'white', padding: '12px 20px', borderRadius: '10px', zIndex: 999, fontWeight: 700 }}>{toast}</div>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#073b7a' }}>Podcasts</h2>
        <button onClick={openNew} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#073b7a', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}>
          <Plus size={16} /> Add New
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 20px', color: '#073b7a' }}>{editing ? 'Edit Podcast' : 'New Podcast'}</h3>
          {error && <div style={{ padding: '10px', background: '#fff0f0', border: '1px solid #f0aeae', borderRadius: '8px', color: '#7a1f1f', marginBottom: '14px', fontSize: '13px' }}>{error}</div>}
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <label style={{ display: 'block' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Title *</span><input name="title" value={form.title} onChange={handleChange} required style={iStyle} /></label>
              <label style={{ display: 'block' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Slug</span><input name="slug" value={form.slug} onChange={handleChange} style={iStyle} /></label>
              <label style={{ display: 'block' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Guest Name</span><input name="guest_name" value={form.guest_name} onChange={handleChange} style={iStyle} /></label>
              <label style={{ display: 'block' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Tags (comma-separated)</span><input name="tags" value={form.tags} onChange={handleChange} placeholder="Education, Culture" style={iStyle} /></label>
              <label style={{ display: 'block' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Audio URL</span><input name="audio_url" value={form.audio_url} onChange={handleChange} placeholder="https://..." style={iStyle} /></label>
              <label style={{ display: 'block' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Transcript URL</span><input name="transcript_url" value={form.transcript_url} onChange={handleChange} placeholder="https://..." style={iStyle} /></label>
            </div>
            <label style={{ display: 'block', marginTop: '14px' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Description</span><textarea name="description" value={form.description} onChange={handleChange} rows={3} style={{ ...iStyle, resize: 'vertical' }} /></label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', cursor: 'pointer' }}>
              <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} />
              <span style={{ fontSize: '14px', fontWeight: 700 }}>Published</span>
            </label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" disabled={saving} style={{ padding: '10px 20px', background: '#073b7a', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={closeForm} style={{ padding: '10px 20px', background: 'white', color: '#073b7a', border: '1px solid #dfe8f1', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', overflow: 'hidden' }}>
        {loading ? <p style={{ padding: '24px', color: '#60708a' }}>Loading...</p> : items.length === 0 ? (
          <p style={{ padding: '24px', color: '#60708a' }}>No podcasts yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead><tr style={{ background: '#f3f7fa' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#073b7a' }}>Title</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#073b7a' }}>Guest</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#073b7a' }}>Status</th>
              <th style={{ textAlign: 'right', padding: '12px 16px', color: '#073b7a' }}>Actions</th>
            </tr></thead>
            <tbody>{items.map(item => (
              <tr key={item.id} style={{ borderTop: '1px solid #dfe8f1' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>{item.title}</td>
                <td style={{ padding: '12px 16px', color: '#60708a' }}>{item.guest_name || '—'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, background: item.is_published ? '#eaf7f4' : '#f3f7fa', color: item.is_published ? '#1f7a48' : '#60708a' }}>
                    {item.is_published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button title={item.is_published ? 'Unpublish' : 'Publish'} onClick={() => togglePublish(item)} style={{ padding: '6px', background: 'none', border: '1px solid #dfe8f1', borderRadius: '8px', cursor: 'pointer' }}>{item.is_published ? <EyeOff size={15} /> : <Eye size={15} />}</button>
                    <button title="Edit" onClick={() => openEdit(item)} style={{ padding: '6px', background: 'none', border: '1px solid #dfe8f1', borderRadius: '8px', cursor: 'pointer' }}><Pencil size={15} /></button>
                    <button title="Delete" onClick={() => handleDelete(item.id)} style={{ padding: '6px', background: 'none', border: '1px solid #fcc', borderRadius: '8px', cursor: 'pointer', color: '#c00' }}><Trash2 size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const EMPTY = { name: '', role: '', image_url: '', type: 'leadership', sort_order: 0 };

export default function ManageTeam() {
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
    const { data } = await supabase.from('team').select('*').order('sort_order', { ascending: true });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openNew = () => { setForm(EMPTY); setEditing(null); setShowForm(true); setError(''); };
  const openEdit = (item) => { setForm(item); setEditing(item.id); setShowForm(true); setError(''); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(EMPTY); };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Name is required.'); return; }
    setSaving(true);
    setError('');
    let err;
    if (editing) {
      const { error: e } = await supabase.from('team').update(form).eq('id', editing);
      err = e;
    } else {
      const { error: e } = await supabase.from('team').insert([form]);
      err = e;
    }
    setSaving(false);
    if (err) { setError(err.message); return; }
    showToast(editing ? 'Updated successfully.' : 'Created successfully.');
    closeForm(); load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    await supabase.from('team').delete().eq('id', id);
    showToast('Deleted.'); load();
  };

  const iStyle = { display: 'block', width: '100%', marginTop: '4px', padding: '10px 12px', border: '1px solid #dfe8f1', borderRadius: '8px', fontFamily: 'inherit', boxSizing: 'border-box' };

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#073b7a', color: 'white', padding: '12px 20px', borderRadius: '10px', zIndex: 999, fontWeight: 700 }}>{toast}</div>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#073b7a' }}>Team Members</h2>
        <button onClick={openNew} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: '#073b7a', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}>
          <Plus size={16} /> Add Member
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 20px', color: '#073b7a' }}>{editing ? 'Edit Member' : 'New Member'}</h3>
          {error && <div style={{ padding: '10px', background: '#fff0f0', border: '1px solid #f0aeae', borderRadius: '8px', color: '#7a1f1f', marginBottom: '14px', fontSize: '13px' }}>{error}</div>}
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <label style={{ display: 'block' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Name *</span><input name="name" value={form.name} onChange={handleChange} required style={iStyle} /></label>
              <label style={{ display: 'block' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Role</span><input name="role" value={form.role} onChange={handleChange} style={iStyle} /></label>
              <label style={{ display: 'block' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Type (Group)</span>
                <select name="type" value={form.type} onChange={handleChange} style={iStyle}>
                  <option value="leadership">Leadership</option>
                  <option value="mentors">Mentors</option>
                  <option value="students">Students</option>
                  <option value="contributors">Contributors</option>
                </select>
              </label>
              <label style={{ display: 'block' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Sort Order</span><input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} style={iStyle} /></label>
            </div>
            <label style={{ display: 'block', marginTop: '14px' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Image URL</span><input name="image_url" value={form.image_url} onChange={handleChange} placeholder="https://..." style={iStyle} /></label>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button type="submit" disabled={saving} style={{ padding: '10px 20px', background: '#073b7a', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={closeForm} style={{ padding: '10px 20px', background: 'white', color: '#073b7a', border: '1px solid #dfe8f1', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', overflow: 'hidden' }}>
        {loading ? <p style={{ padding: '24px', color: '#60708a' }}>Loading...</p> : items.length === 0 ? (
          <p style={{ padding: '24px', color: '#60708a' }}>No team members yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead><tr style={{ background: '#f3f7fa' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#073b7a' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#073b7a' }}>Role</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', color: '#073b7a' }}>Group</th>
              <th style={{ textAlign: 'right', padding: '12px 16px', color: '#073b7a' }}>Actions</th>
            </tr></thead>
            <tbody>{items.map(item => (
              <tr key={item.id} style={{ borderTop: '1px solid #dfe8f1' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>{item.name}</td>
                <td style={{ padding: '12px 16px', color: '#60708a' }}>{item.role || '—'}</td>
                <td style={{ padding: '12px 16px', textTransform: 'capitalize' }}>{item.type}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
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

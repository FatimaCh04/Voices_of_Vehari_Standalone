import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Eye } from 'lucide-react';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    setMessages(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openMessage = async (msg) => {
    setSelected(msg);
    if (!msg.is_read) {
      await supabase.from('contact_messages').update({ is_read: true }).eq('id', msg.id);
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await supabase.from('contact_messages').delete().eq('id', id);
    if (selected?.id === id) setSelected(null);
    showToast('Deleted.');
    load();
  };

  const unread = messages.filter(m => !m.is_read).length;

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#073b7a', color: 'white', padding: '12px 20px', borderRadius: '10px', zIndex: 999, fontWeight: 700 }}>{toast}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#073b7a' }}>Messages</h2>
        {unread > 0 && <span style={{ padding: '4px 10px', background: '#078f92', color: 'white', borderRadius: '99px', fontSize: '12px', fontWeight: 700 }}>{unread} unread</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '20px' }}>
        <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', overflow: 'hidden' }}>
          {loading ? <p style={{ padding: '24px', color: '#60708a' }}>Loading...</p> : messages.length === 0 ? (
            <p style={{ padding: '24px', color: '#60708a' }}>No messages yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead><tr style={{ background: '#f3f7fa' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#073b7a' }}>From</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#073b7a' }}>Subject</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#073b7a' }}>Date</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', color: '#073b7a' }}>Actions</th>
              </tr></thead>
              <tbody>{messages.map(msg => (
                <tr key={msg.id} style={{ borderTop: '1px solid #dfe8f1', background: selected?.id === msg.id ? '#f0f7ff' : 'white', cursor: 'pointer' }} onClick={() => openMessage(msg)}>
                  <td style={{ padding: '12px 16px', fontWeight: msg.is_read ? 400 : 800 }}>{msg.name}</td>
                  <td style={{ padding: '12px 16px', color: '#60708a' }}>{msg.subject || '—'}</td>
                  <td style={{ padding: '12px 16px', color: '#60708a', fontSize: '12px' }}>{new Date(msg.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button title="View" onClick={() => openMessage(msg)} style={{ padding: '6px', background: 'none', border: '1px solid #dfe8f1', borderRadius: '8px', cursor: 'pointer' }}><Eye size={14} /></button>
                      <button title="Delete" onClick={() => handleDelete(msg.id)} style={{ padding: '6px', background: 'none', border: '1px solid #fcc', borderRadius: '8px', cursor: 'pointer', color: '#c00' }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>

        {selected && (
          <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#073b7a' }}>Message</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: '1px solid #dfe8f1', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer', fontSize: '13px' }}>Close</button>
            </div>
            <p style={{ margin: '0 0 6px' }}><strong>From:</strong> {selected.name} ({selected.email})</p>
            <p style={{ margin: '0 0 6px' }}><strong>Subject:</strong> {selected.subject || '—'}</p>
            <p style={{ margin: '0 0 16px', fontSize: '12px', color: '#60708a' }}>{new Date(selected.created_at).toLocaleString()}</p>
            <div style={{ background: '#f3f7fa', borderRadius: '12px', padding: '16px', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: 1.7 }}>{selected.message}</div>
            <button onClick={() => handleDelete(selected.id)} style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'none', border: '1px solid #fcc', borderRadius: '8px', color: '#c00', cursor: 'pointer', fontWeight: 700 }}>
              <Trash2 size={14} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

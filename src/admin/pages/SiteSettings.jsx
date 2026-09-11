import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const EMPTY = { site_name: 'Voices of Vehari', contact_email: '', contact_phone: '', address: '', facebook_url: '', twitter_url: '', instagram_url: '', footer_text: '' };

export default function SiteSettings() {
  const [form, setForm] = useState(EMPTY);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.from('site_settings').select('*').limit(1).maybeSingle().then(({ data }) => {
      if (data) { setForm(data); setId(data.id); }
      setLoading(false);
    });
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = { ...form, updated_at: new Date().toISOString() };
    let err;
    if (id) {
      const { error: e } = await supabase.from('site_settings').update(payload).eq('id', id);
      err = e;
    } else {
      const { data, error: e } = await supabase.from('site_settings').insert([payload]).select().single();
      if (!e && data) setId(data.id);
      err = e;
    }
    setSaving(false);
    if (err) { setError(err.message); } else { showToast('Settings saved.'); }
  };

  const iStyle = { display: 'block', width: '100%', marginTop: '4px', padding: '10px 12px', border: '1px solid #dfe8f1', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' };
  const lStyle = { display: 'block', marginBottom: '18px' };
  const labelStyle = { fontSize: '13px', fontWeight: 700, color: '#12233d' };

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#073b7a', color: 'white', padding: '12px 20px', borderRadius: '10px', zIndex: 999, fontWeight: 700 }}>{toast}</div>}
      <h2 style={{ margin: '0 0 24px', color: '#073b7a' }}>Site Settings</h2>
      {loading ? <p style={{ color: '#60708a' }}>Loading...</p> : (
        <form onSubmit={handleSave}>
          {error && <div style={{ padding: '10px', background: '#fff0f0', border: '1px solid #f0aeae', borderRadius: '8px', color: '#7a1f1f', marginBottom: '20px', fontSize: '13px' }}>{error}</div>}

          <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '15px', color: '#073b7a' }}>General</h3>
            <label style={lStyle}><span style={labelStyle}>Site Name</span><input name="site_name" value={form.site_name} onChange={handleChange} required style={iStyle} /></label>
            <label style={lStyle}><span style={labelStyle}>Footer Text</span><input name="footer_text" value={form.footer_text} onChange={handleChange} style={iStyle} /></label>
          </div>

          <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '15px', color: '#073b7a' }}>Contact Information</h3>
            <label style={lStyle}><span style={labelStyle}>Email</span><input name="contact_email" type="email" value={form.contact_email} onChange={handleChange} style={iStyle} /></label>
            <label style={lStyle}><span style={labelStyle}>Phone</span><input name="contact_phone" value={form.contact_phone} onChange={handleChange} style={iStyle} /></label>
            <label style={lStyle}><span style={labelStyle}>Address</span><textarea name="address" value={form.address} onChange={handleChange} rows={3} style={{ ...iStyle, resize: 'vertical' }} /></label>
          </div>

          <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', padding: '24px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 20px', fontSize: '15px', color: '#073b7a' }}>Social Media Links</h3>
            <label style={lStyle}><span style={labelStyle}>Facebook URL</span><input name="facebook_url" value={form.facebook_url} onChange={handleChange} placeholder="https://facebook.com/..." style={iStyle} /></label>
            <label style={lStyle}><span style={labelStyle}>Twitter / X URL</span><input name="twitter_url" value={form.twitter_url} onChange={handleChange} placeholder="https://twitter.com/..." style={iStyle} /></label>
            <label style={lStyle}><span style={labelStyle}>Instagram URL</span><input name="instagram_url" value={form.instagram_url} onChange={handleChange} placeholder="https://instagram.com/..." style={iStyle} /></label>
          </div>

          <button type="submit" disabled={saving} style={{ padding: '12px 28px', background: '#073b7a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      )}
    </div>
  );
}

import { useState } from 'react';
import { supabase } from '../lib/supabase';

const SUBJECTS = ['Suggest a guest', 'Share a story', 'Suggest a topic', 'Collaborate', 'Participate', 'Ask a question'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const { error } = await supabase.from('contact_messages').insert([form]);
    setLoading(false);
    if (error) {
      setStatus({ type: 'error', msg: 'Something went wrong. Please try again.' });
    } else {
      setStatus({ type: 'success', msg: 'Your message has been sent. Thank you!' });
      setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' });
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contact &amp; get involved</span>
          <h1>Bring another voice into the conversation.</h1>
          <p>Suggest a guest, share a story, propose a topic or explore collaboration with Voices of Vehari.</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <span className="eyebrow">Project location</span>
            <h2>COMSATS University Islamabad — Vehari Campus</h2>
            <p>Mailsi Road, Off Multan Road<br />Peer Murad, Vehari<br />Punjab, Pakistan</p>
            <div className="callout">
              <h3>Project contacts</h3>
              <p>Use the verified contact details supplied by the project team when the production website is published.</p>
              <p><strong>Principal Investigator:</strong> Dr. Muhammad Imran Saeed</p>
              <p><strong>Co-PI:</strong> Nazish Malik</p>
            </div>
          </div>
          <div className="card">
            <h3>Get involved</h3>
            {status && (
              <div style={{ padding: '12px', borderRadius: '10px', marginBottom: '16px', background: status.type === 'success' ? '#eaf7f3' : '#fff0f0', border: `1px solid ${status.type === 'success' ? '#aed9cc' : '#f0aeae'}`, color: status.type === 'success' ? '#1f7a48' : '#7a1f1f' }}>
                {status.msg}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <label style={{ display: 'block', marginBottom: '14px' }}>
                Name<br />
                <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--line)', borderRadius: '10px', fontFamily: 'inherit', marginTop: '4px' }} />
              </label>
              <label style={{ display: 'block', marginBottom: '14px' }}>
                Email<br />
                <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid var(--line)', borderRadius: '10px', fontFamily: 'inherit', marginTop: '4px' }} />
              </label>
              <label style={{ display: 'block', marginBottom: '14px' }}>
                I want to...<br />
                <select name="subject" value={form.subject} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid var(--line)', borderRadius: '10px', fontFamily: 'inherit', marginTop: '4px' }}>
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label style={{ display: 'block', marginBottom: '14px' }}>
                Message<br />
                <textarea name="message" value={form.message} onChange={handleChange} rows={6} required style={{ width: '100%', padding: '12px', border: '1px solid var(--line)', borderRadius: '10px', fontFamily: 'inherit', marginTop: '4px', resize: 'vertical' }} />
              </label>
              <button className="btn primary" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container three-col">
          <div className="card"><h3>🎙 Suggest a guest</h3><p>Know someone with a meaningful story or expertise relevant to Vehari?</p></div>
          <div className="card"><h3>📖 Share a story</h3><p>Help document a local tradition, experience or community narrative.</p></div>
          <div className="card"><h3>🤝 Collaborate</h3><p>Teachers, researchers and community organizations can explore partnership opportunities.</p></div>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f3f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '18px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 18px 50px rgba(8,45,90,.10)', border: '1px solid #dfe8f1' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎙️</div>
          <h1 style={{ margin: '0 0 6px', fontSize: '24px', color: '#073b7a' }}>Voices of Vehari</h1>
          <p style={{ margin: 0, color: '#60708a', fontSize: '14px' }}>Admin Panel</p>
        </div>
        {error && (
          <div style={{ padding: '12px', background: '#fff0f0', border: '1px solid #f0aeae', borderRadius: '10px', color: '#7a1f1f', marginBottom: '18px', fontSize: '14px' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Email address</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ display: 'block', width: '100%', marginTop: '6px', padding: '12px 14px', border: '1px solid #dfe8f1', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="admin@example.com"
            />
          </label>
          <label style={{ display: 'block', marginBottom: '24px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#12233d' }}>Password</span>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ display: 'block', width: '100%', marginTop: '6px', padding: '12px 14px', border: '1px solid #dfe8f1', borderRadius: '10px', fontFamily: 'inherit', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="Your password"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '13px', background: '#073b7a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p style={{ marginTop: '24px', fontSize: '12px', color: '#60708a', textAlign: 'center' }}>
          This panel is for authorized administrators only.
        </p>
      </div>
    </div>
  );
}

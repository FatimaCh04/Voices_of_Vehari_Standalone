import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Newspaper, Mic2, Image, MessageSquare, CheckCircle, Clock } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 14px rgba(8,45,90,.05)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
      <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: color || '#eef3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={22} color={color ? 'white' : '#073b7a'} />
      </div>
      <div>
        <div style={{ fontSize: '28px', fontWeight: 900, color: '#073b7a', lineHeight: 1 }}>{value ?? '...'}</div>
        <div style={{ fontSize: '13px', color: '#60708a', marginTop: '2px' }}>{label}</div>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [news, podcasts, gallery, msgs, unread] = await Promise.all([
        supabase.from('news_events').select('id, is_published'),
        supabase.from('podcasts').select('id, is_published'),
        supabase.from('gallery').select('id, is_published'),
        supabase.from('contact_messages').select('id, name, subject, is_read, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('contact_messages').select('id').eq('is_read', false),
      ]);
      setStats({
        news: news.data?.length || 0,
        newsPublished: news.data?.filter(n => n.is_published).length || 0,
        podcasts: podcasts.data?.length || 0,
        podcastsPublished: podcasts.data?.filter(p => p.is_published).length || 0,
        gallery: gallery.data?.length || 0,
        messages: msgs.data?.length || 0,
        unreadMessages: unread.data?.length || 0,
      });
      setMessages(msgs.data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <h2 style={{ margin: '0 0 24px', color: '#073b7a' }}>Dashboard</h2>
      {loading ? (
        <p style={{ color: '#60708a' }}>Loading statistics...</p>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(210px,1fr))', gap: '16px', marginBottom: '32px' }}>
            <StatCard icon={Newspaper} label="News & Events" value={stats.news} />
            <StatCard icon={Mic2} label="Podcasts" value={stats.podcasts} />
            <StatCard icon={Image} label="Gallery Items" value={stats.gallery} />
            <StatCard icon={MessageSquare} label="Messages" value={stats.messages} />
            <StatCard icon={CheckCircle} label="Published News" value={stats.newsPublished} color="#073b7a" />
            <StatCard icon={Clock} label="Unread Messages" value={stats.unreadMessages} color="#078f92" />
          </div>

          <div style={{ background: 'white', border: '1px solid #dfe8f1', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ margin: '0 0 16px', color: '#073b7a', fontSize: '16px' }}>Recent Messages</h3>
            {messages.length === 0 ? (
              <p style={{ color: '#60708a', fontSize: '14px' }}>No messages yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #dfe8f1' }}>
                    <th style={{ textAlign: 'left', padding: '8px 12px', color: '#073b7a', fontWeight: 700 }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', color: '#073b7a', fontWeight: 700 }}>Subject</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', color: '#073b7a', fontWeight: 700 }}>Date</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', color: '#073b7a', fontWeight: 700 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(m => (
                    <tr key={m.id} style={{ borderBottom: '1px solid #dfe8f1' }}>
                      <td style={{ padding: '10px 12px', fontWeight: m.is_read ? 400 : 700 }}>{m.name}</td>
                      <td style={{ padding: '10px 12px', color: '#60708a' }}>{m.subject}</td>
                      <td style={{ padding: '10px 12px', color: '#60708a' }}>{new Date(m.created_at).toLocaleDateString()}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, background: m.is_read ? '#f3f7fa' : '#eaf7f4', color: m.is_read ? '#60708a' : '#1f7a48' }}>
                          {m.is_read ? 'Read' : 'Unread'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

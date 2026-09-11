import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const STATIC_NEWS = [
  { title: 'Student Mentor Training', tag: 'Planned', description: 'Document the training of undergraduate student mentors who will support English learning through local languages.' },
  { title: 'University Practice Sessions', tag: 'Planned', description: 'Six group sessions at the university where participants listen, speak English and discuss local stories.' },
  { title: 'Community Practice Sessions', tag: 'Planned', description: 'Six sessions at community centres to extend the learning intervention beyond campus.' },
  { title: 'Podcast Releases', tag: 'Planned', description: 'Publish new conversations and stories with their transcripts and learning activities.' },
  { title: 'University Dissemination Event', tag: 'Planned', description: 'Present project results to students, teachers and other stakeholders.' },
  { title: 'Community Dissemination Event', tag: 'Planned', description: "Share the project's learning, stories and results with the wider community." },
];

export default function News() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('news_events')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setItems(data?.length ? data : STATIC_NEWS);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">News &amp; events</span>
          <h1>Follow the project as it grows.</h1>
          <p>A living record of training, podcast production, practice sessions, research progress and dissemination.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <p style={{ color: 'var(--muted)' }}>Loading...</p>
          ) : (
            <div className="cards">
              {items.map((item, i) => (
                <div key={item.id || i} className="card">
                  <span className="tag">{item.tag || item.type || 'News'}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.event_date && <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{new Date(item.event_date).toLocaleDateString()}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section alt">
        <div className="container callout">
          <span className="eyebrow">Research updates</span>
          <h2>Journal article &amp; conference presentation</h2>
          <p>The proposal identifies a journal article and a local or regional conference presentation as intended research outputs. Links will be added when the outputs are available.</p>
        </div>
      </section>
    </>
  );
}

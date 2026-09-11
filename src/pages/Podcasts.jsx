import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const STATIC_PODCASTS = [
  { id: 'ep1', title: 'Women Education in Vehari', guest_name: 'Dr. Asma Kashif Shehzad', description: 'A conversation about women\'s education, opportunities and challenges in the Vehari context.', tags: ['Education', 'Urdu'], category: 'education' },
  { id: 'ep2', title: 'Food of Vehari', guest_name: 'Hassan Raza · Host: Abdullah', description: 'A local food and culture conversation exploring tastes, traditions and the stories connected with food in Vehari.', tags: ['Food', 'Culture'], category: 'food culture' },
];

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    supabase
      .from('podcasts')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setPodcasts(data?.length ? data : STATIC_PODCASTS);
        setLoading(false);
      });
  }, []);

  const filters = ['all', 'education', 'culture', 'food'];
  const filtered = filter === 'all' ? podcasts : podcasts.filter(p => (p.category || '').toLowerCase().includes(filter) || (p.tags || []).some(t => t.toLowerCase().includes(filter)));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Podcast</span>
          <h1>Real conversations. Local voices. Language learning.</h1>
          <p>Explore the podcast series as it grows. Each episode can connect a local topic with vocabulary, questions, speaking practice and a transcript.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filters">
            {filters.map(f => (
              <button key={f} className={`filter${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <p style={{ color: 'var(--muted)' }}>Loading podcasts...</p>
          ) : (
            <div className="cards">
              {filtered.map((pod) => (
                <div key={pod.id} className="card media-card">
                  {pod.image_url ? (
                    <img src={pod.image_url} alt={pod.title} />
                  ) : (
                    <div style={{ width: '100%', height: '220px', background: 'linear-gradient(135deg,#eef8f5,#dbeaf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '48px' }}>🎙️</span>
                    </div>
                  )}
                  <div className="body">
                    {(pod.tags || []).map(t => <span key={t} className="tag">{t}</span>)}
                    <h3>{pod.title}</h3>
                    {pod.guest_name && <p><strong>Guest:</strong> {pod.guest_name}</p>}
                    <p>{pod.description}</p>
                    {pod.audio_url ? (
                      <div className="audio">
                        <div className="audio-row">
                          <audio controls src={pod.audio_url} style={{ width: '100%' }} />
                        </div>
                      </div>
                    ) : (
                      <div className="audio">
                        <div className="audio-row">
                          <div>
                            <strong>Audio placeholder</strong>
                            <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Connect the final recording here</div>
                          </div>
                          <div className="wave"></div>
                        </div>
                      </div>
                    )}
                    <div className="actions">
                      <Link className="btn ghost" to="/audio-transcripts">Transcript</Link>
                      <Link className="btn primary" to="/learning">Learn from it</Link>
                    </div>
                  </div>
                </div>
              ))}
              <div className="card media-card">
                <div style={{ width: '100%', height: '220px', background: 'linear-gradient(135deg,#f0f4f8,#e8f0f8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '48px' }}>🔜</span>
                </div>
                <div className="body">
                  <span className="tag">Culture</span>
                  <span className="tag">Multilingual</span>
                  <h3>Upcoming Local Voices</h3>
                  <p>Future episodes can feature folktales, local customs, rural experiences, youth perspectives and community stories.</p>
                  <div className="notice">Episode details will be added as recordings are produced.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section alt">
        <div className="container two-col">
          <div>
            <span className="eyebrow">Episode format</span>
            <h2>Every podcast can become a lesson.</h2>
          </div>
          <div>
            <p>Each podcast is designed around simple questions, vocabulary training and speaking suggestions, so the media content can also support structured English practice.</p>
            <Link className="btn ghost" to="/learning">Explore Learning Resources</Link>
          </div>
        </div>
      </section>
    </>
  );
}

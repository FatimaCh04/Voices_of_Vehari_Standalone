import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const PLACEHOLDER_IMGS = [
  { alt: 'Voices of Vehari project poster' },
  { alt: 'Illustration representing podcasting and storytelling' },
  { alt: 'COMSATS Vehari project visual' },
  { alt: 'Illustration of student podcast contributors' },
  { alt: 'Project poster visual' },
  { alt: 'Podcast and storytelling illustration' },
];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('gallery')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        setImages(data || []);
        setLoading(false);
      });
  }, []);

  const emojis = ['🎙️', '📸', '🌍', '📚', '🏢', '🎓'];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Gallery</span>
          <h1>The project in pictures.</h1>
          <p>Use this space as the visual archive of podcast recording, training, practice sessions, community engagement and dissemination events.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <p style={{ color: 'var(--muted)' }}>Loading gallery...</p>
          ) : images.length > 0 ? (
            <div className="gallery">
              {images.map((img) => (
                <img key={img.id} src={img.image_url} alt={img.title || img.caption || 'Gallery image'} />
              ))}
            </div>
          ) : (
            <div className="gallery">
              {PLACEHOLDER_IMGS.map((img, i) => (
                <div key={i} style={{ width: '100%', height: '280px', background: 'linear-gradient(135deg,#eef8f5,#dbeaf8)', borderRadius: '18px', border: '4px solid white', boxShadow: '0 8px 28px rgba(8,45,90,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '48px' }}>{emojis[i]}</span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{img.alt}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section alt">
        <div className="container three-col">
          {[['Podcast Recording','Add real recording-session photographs here.'],['University Sessions','Document student practice, mentor training and learning activities.'],['Community Sessions','Document the six planned community-centre practice sessions and engagement activities.'],['Behind the Scenes','Show planning, interviewing, editing and resource creation.'],['Events','Add photographs from the university and community dissemination events.'],['Campus & Community','Capture the places and people that give the project its local identity.']].map(([t,d]) => (
            <div key={t} className="card">
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

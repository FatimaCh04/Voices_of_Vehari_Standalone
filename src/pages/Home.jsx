import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    supabase
      .from('dynamic_sections')
      .select('*')
      .eq('section_id', 'hero')
      .maybeSingle()
      .then(({ data }) => { if (data) setHero(data); });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="kicker">A research &amp; community storytelling initiative</span>
            <h1>{hero?.title || 'Voices of Vehari'}</h1>
            <p className="lead">
              <strong>Enhancing English Proficiency through Multilingual Podcasting and Cultural Storytelling.</strong>
            </p>
            <p className="lead">A context-based learning project that brings English, local languages, community voices and the cultural heritage of Vehari together through simple, accessible podcasts and stories.</p>
            <div className="actions">
              <Link className="btn primary" to="/podcasts">Explore Podcasts</Link>
              <Link className="btn ghost" to="/learning">Start Learning</Link>
            </div>
          </div>
          <div className="hero-art">
            <div style={{ width: '100%', maxHeight: '610px', background: 'linear-gradient(135deg,#eef8f5,#dbeaf8)', borderRadius: '28px', boxShadow: 'var(--shadow)', border: '8px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
              <span style={{ fontSize: '80px' }}>🎙️</span>
            </div>
            <div className="logo-float">
              <span style={{ fontWeight: 900, fontSize: '14px', color: 'var(--navy)' }}>Voices of Vehari</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Idea Cards */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">The idea</span>
              <h2>Listen. Learn. Share. Research.</h2>
            </div>
            <p>Voices of Vehari connects English language development with the languages, stories and lived experiences of a multilingual community.</p>
          </div>
          <div className="cards">
            <div className="card">
              <div className="icon">🎙️</div>
              <h3>Multilingual Podcasting</h3>
              <p>Use simple podcasts with English alongside local languages such as Punjabi and Saraiki to provide authentic, accessible language input.</p>
            </div>
            <div className="card">
              <div className="icon">📖</div>
              <h3>Cultural Storytelling</h3>
              <p>Use local folklore, historical narration, customs and rural experiences as meaningful contexts for language learning.</p>
            </div>
            <div className="card">
              <div className="icon">📚</div>
              <h3>English Learning</h3>
              <p>Turn every conversation into opportunities to practise listening, speaking and vocabulary through questions, word lists and speaking prompts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Project at a glance</span>
              <h2>A 12-month applied research project</h2>
            </div>
            <p>The proposal describes a mixed-methods intervention combining language-proficiency assessment with participant perspectives.</p>
          </div>
          <div className="stat-grid">
            <div className="stat"><strong>12</strong><span>Months of project activity</span></div>
            <div className="stat"><strong>20</strong><span>University students in the podcast intervention</span></div>
            <div className="stat"><strong>15</strong><span>Community participants</span></div>
            <div className="stat"><strong>12</strong><span>Practice group sessions</span></div>
          </div>
          <div className="notice" style={{ marginTop: '18px' }}>The proposal also describes an initial needs assessment involving 30 university students and 15 community members before the intervention. Final website statistics should be updated as the research is completed.</div>
        </div>
      </section>

      {/* Featured Podcast */}
      <section className="section">
        <div className="container two-col">
          <div>
            <span className="eyebrow">Featured conversation</span>
            <h2>Women Education in Vehari</h2>
            <p className="lead">A podcast conversation exploring women's education, opportunities and challenges in the local context.</p>
            <p>
              <span className="tag">Urdu</span>
              <span className="tag">Education</span>
              <span className="tag">Community</span>
            </p>
            <Link className="btn primary" to="/podcasts">View Podcast</Link>
          </div>
          <div className="callout">
            <h3>Guest</h3>
            <p><strong>Dr. Asma Kashif Shehzad</strong></p>
            <p>Humanities educator and featured guest for the Women Education in Vehari conversation.</p>
            <hr />
            <h3>Learning connection</h3>
            <p>Use the episode transcript, vocabulary and discussion prompts to turn a local conversation into an English-learning activity.</p>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="section alt">
        <div className="container two-col">
          <div style={{ background: 'linear-gradient(135deg,#eaf7f4,#eef5fc)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            <span style={{ fontSize: '80px' }}>🌍</span>
          </div>
          <div>
            <span className="eyebrow">Why it matters</span>
            <h2>Culture is part of the classroom.</h2>
            <p>The project responds to the need for English learning that is interesting, context-based and culturally meaningful in a multilingual setting.</p>
            <p>It aims to help learners connect local identity with wider opportunities for communication while developing listening, speaking, vocabulary, learner autonomy and intercultural awareness.</p>
            <Link className="btn ghost" to="/about">About the Project</Link>
          </div>
        </div>
      </section>
    </>
  );
}

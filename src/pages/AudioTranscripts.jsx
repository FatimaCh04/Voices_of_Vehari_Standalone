import { useState } from 'react';
import { Link } from 'react-router-dom';

const EPISODES = [
  { tags: ['Urdu', 'Education'], title: 'Women Education in Vehari', guest: 'Dr. Asma Kashif Shehzad' },
  { tags: ['Food', 'Culture'], title: 'Food of Vehari', guest: 'Hassan Raza · Host: Abdullah' },
];

export default function AudioTranscripts() {
  const [search, setSearch] = useState('');
  const filtered = EPISODES.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.guest.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Audio &amp; transcripts</span>
          <h1>Listen to the voice. Read the words. Practise the language.</h1>
          <p>Pair every recording with an accessible transcript and learning layer.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="searchbox">
            <input
              placeholder="Search episodes, guests or topics"
              aria-label="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="btn primary" type="button">Search</button>
          </div>
          <div style={{ marginTop: '26px', display: 'grid', gap: '18px' }}>
            {filtered.map((ep) => (
              <div key={ep.title} className="card">
                {ep.tags.map(t => <span key={t} className="tag">{t}</span>)}
                <h3>{ep.title}</h3>
                <p>Guest: {ep.guest}</p>
                <div className="audio">
                  <div className="audio-row">
                    <div>
                      <strong>Recording placeholder</strong>
                      <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Add MP3/WAV URL when available</div>
                    </div>
                    <div className="wave"></div>
                  </div>
                </div>
                <div className="actions">
                  <a className="btn ghost" href="#transcript">Open transcript</a>
                  <Link className="btn ghost" to="/learning">Learning activity</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="transcript">
        <div className="container two-col">
          <div>
            <span className="eyebrow">Transcript model</span>
            <h2>One episode, four learning layers.</h2>
            <ol>
              <li><strong>Original conversation</strong> — preserve the authentic exchange.</li>
              <li><strong>English version</strong> — support comprehension and comparison.</li>
              <li><strong>Vocabulary</strong> — highlight useful words and phrases.</li>
              <li><strong>Practice</strong> — add listening, speaking and reflection activities.</li>
            </ol>
          </div>
          <div className="callout">
            <h3>Publishing note</h3>
            <p>Full transcripts should be added after recordings are finalized and checked by the project team. The demo intentionally uses placeholders rather than inventing dialogue.</p>
          </div>
        </div>
      </section>
    </>
  );
}

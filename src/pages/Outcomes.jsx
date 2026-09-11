export default function Outcomes() {
  const outcomes = [
    { n: '01', t: 'Better English', d: 'Improvement in English speaking, listening and vocabulary among the 20 university students, assessed before, during and after podcast sessions.' },
    { n: '02', t: 'Community confidence', d: 'Evidence of increased confidence in using English among 15 community participants through group discussions and practice sessions.' },
    { n: '03', t: 'Online resource collection', d: 'A free collection of podcasts, word lists and bilingual stories accessible to students, teachers and community members.' },
    { n: '04', t: 'Research output', d: 'A journal article and a presentation at a local or regional conference to share the project\'s findings.' },
    { n: '05', t: 'Repeatable teaching plan', d: 'An accessible guide showing how teachers and community leaders can use podcasts and local stories to teach English.' },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Outcomes &amp; impact</span>
          <h1>From activity to evidence.</h1>
          <p>This page should evolve as the project produces evidence. The demo separates planned outcomes from results that are not yet available.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards">
            {outcomes.map(o => (
              <div key={o.n} className="card">
                <span className="eyebrow">{o.n}</span>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <span className="eyebrow">Results dashboard</span>
          <h2>Evidence will be added here after assessment.</h2>
          <div className="two-col" style={{ marginTop: '22px' }}>
            <div className="callout">
              <h3>Before → During → After</h3>
              <p>Use verified project data to show change in listening, speaking and vocabulary performance.</p>
            </div>
            <div className="callout">
              <h3>Participant perspectives</h3>
              <p>Summarize themes from students, teachers and community participants after qualitative analysis is complete.</p>
            </div>
          </div>
          <div className="notice" style={{ marginTop: '18px' }}>No improvement percentages or findings are invented in this demo. Replace this section with the project\'s actual analyzed results.</div>
        </div>
      </section>
    </>
  );
}

export default function Research() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Research</span>
          <h1>Researching technology-enhanced, culturally relevant language learning.</h1>
          <p>A mixed-methods research project examining language outcomes and participant perspectives in a multilingual EFL setting.</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <span className="eyebrow">Project brief</span>
            <h2>Voices of Vehari</h2>
            <p className="lead">Enhancing English Proficiency through Multilingual Podcasting and Cultural Storytelling</p>
          </div>
          <div className="card">
            <p><strong>Nature:</strong> Applied Basic Research</p>
            <p><strong>Duration:</strong> 12 months</p>
            <p><strong>Proposed start:</strong> August 2025</p>
            <p><strong>Department:</strong> Humanities, Vehari Campus</p>
            <p><strong>Area:</strong> Computer Assisted Language Learning and ELT</p>
            <p><strong>Estimated / requested grant:</strong> Rs. 300,000</p>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Research objectives</span>
              <h2>Four questions the project is designed to address</h2>
            </div>
          </div>
          <div className="cards">
            {[{n:'01',t:'Listening & speaking',d:'Assess the impact of multilingual podcasting on improving English listening and speaking proficiency among EFL learners in Vehari.'},{n:'02',t:'Vocabulary & culture',d:'Evaluate the role of cultural storytelling in enhancing vocabulary acquisition and cultural awareness.'},{n:'03',t:'Perceptions',d:'Explore students\' and teachers\' perceptions of multilingual podcasts as a tool for English language instruction.'},{n:'04',t:'Scalable model',d:'Develop a scalable model for integrating podcasting and cultural storytelling into EFL curricula in multilingual settings.'}].map(o => (
              <div key={o.n} className="card">
                <div className="icon">{o.n}</div>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Research design</span>
          <h2>Mixed methods</h2>
          <div className="two-col" style={{ marginTop: '24px' }}>
            <div className="card">
              <h3>Quantitative component</h3>
              <p>Simple language-proficiency assessments before, during and after podcast sessions, with emphasis on speaking, listening and vocabulary.</p>
            </div>
            <div className="card">
              <h3>Qualitative component</h3>
              <p>Participant perspectives and experiences gathered through discussions and practice sessions to understand how learners and teachers perceive the approach.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <span className="eyebrow">Academic foundations</span>
          <h2>Selected references</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr><th>Author</th><th>Contribution to the project context</th></tr>
              </thead>
              <tbody>
                {[['Rosell-Aguilar (2013)','Podcasting for language learning and its potential in technology-supported instruction.'],['Hassan & Hoon (2013)','Review of podcast applications in language learning.'],['Cenoz & Gorter (2013)','Plurilingual approaches and flexible boundaries between languages.'],['Creese & Blackledge (2010)','Translanguaging as a pedagogy for multilingual classrooms.'],['Byram (1997)','Intercultural communicative competence and learning across cultural differences.'],['Kramsch (1993)','Context and culture in language teaching.'],['Vandergrift & Goh (2012)','Teaching and learning second-language listening.'],['Yeh, Chang & Yeh (2021)','Mobile-assisted language learning and listening skill development.']].map(([a,c]) => (
                  <tr key={a}><td>{a}</td><td>{c}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

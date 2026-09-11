import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">About the project</span>
          <h1>English learning rooted in the voices of Vehari.</h1>
          <p>Voices of Vehari explores how multilingual podcasting and cultural storytelling can create an engaging, context-based learning environment for EFL learners in Vehari, Pakistan.</p>
        </div>
      </section>

      <section className="section">
        <div className="container two-col">
          <div>
            <span className="eyebrow">What is it?</span>
            <h2>A culturally anchored approach to English learning.</h2>
          </div>
          <div>
            <p className="lead">The project brings Punjabi, Saraiki and English into podcast-based learning while using local stories as contexts for listening, speaking, vocabulary and cultural awareness.</p>
            <p>Rather than treating English as an abstract subject, the project connects learning activities with the realities, stories and identities of the community.</p>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Why this project?</span>
              <h2>The challenge we are responding to</h2>
            </div>
          </div>
          <div className="cards">
            <div className="card">
              <h3>Conventional learning</h3>
              <p>Rote learning, grammar drills and standard textbooks may not always sustain learner attention or support cultural and linguistic identities.</p>
            </div>
            <div className="card">
              <h3>Limited authentic input</h3>
              <p>In EFL contexts, learners can have few opportunities to hear and use English naturally outside class.</p>
            </div>
            <div className="card">
              <h3>Underexplored context</h3>
              <p>The proposal identifies a need for more empirical research on podcasting in multilingual, rural and culturally specific settings such as Vehari.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Vision &amp; mission</span>
          <div className="two-col" style={{ marginTop: '16px' }}>
            <div className="callout">
              <h3>Vision</h3>
              <p>Develop a culturally meaningful, multilingual and scalable approach to English language learning through podcasting and storytelling.</p>
            </div>
            <div className="callout">
              <h3>Mission</h3>
              <ul>
                <li>Improve English listening, speaking and vocabulary.</li>
                <li>Encourage multilingual expression.</li>
                <li>Connect local culture with language learning.</li>
                <li>Develop confidence and learner autonomy.</li>
                <li>Create resources that teachers and communities can reuse.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <span className="eyebrow">Project identity</span>
          <h2>One Voice. Many Stories. Stronger Community.</h2>
          <p className="lead">The project combines technology with cultural relevance so learners can develop English while valuing the languages and stories that shape their community.</p>
        </div>
      </section>
    </>
  );
}

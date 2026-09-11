export default function Learning() {
  const resources = [
    { icon: '🎧', title: 'Listening Practice', desc: 'Listen to a podcast, identify key ideas and answer comprehension questions.', items: ['Main-idea questions', 'Detail questions', 'Listening reflection'] },
    { icon: '🗣️', title: 'Speaking Practice', desc: 'Use episode questions and local topics to encourage guided English conversation.', items: ['Opinion prompts', 'Follow-up questions', 'Short speaking tasks'] },
    { icon: '📖', title: 'Vocabulary', desc: 'Build practical word lists from authentic conversations and cultural stories.', items: ['English word', 'Local-language meaning', 'Example sentence'] },
    { icon: '💬', title: 'Conversation Guides', desc: 'Simple support for introducing guests, asking questions, following up and closing interviews.', items: [] },
    { icon: '🌍', title: 'Multilingual Learning', desc: 'Use Punjabi, Saraiki and other familiar linguistic resources to support understanding while developing English.', items: [] },
    { icon: '👩‍🏫', title: 'Teacher Resources', desc: 'Lesson ideas, discussion questions, vocabulary activities, assessment templates and the future how-to guide.', items: [] },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Learning resources</span>
          <h1>Turn every story and podcast into an English-learning experience.</h1>
          <p>A free resource collection for students, teachers and community participants.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cards">
            {resources.map((r) => (
              <div key={r.title} className="card">
                <div className="icon">{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                {r.items.length > 0 && <ul>{r.items.map(i => <li key={i}>{i}</li>)}</ul>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <span className="eyebrow">Sample activity</span>
          <h2>Learn from “Women Education in Vehari”</h2>
          <div className="two-col" style={{ marginTop: '24px' }}>
            <div className="card">
              <h3>Before listening</h3>
              <ol>
                <li>What does educational opportunity mean to you?</li>
                <li>What challenges can affect access to education?</li>
                <li>Write three words you expect to hear.</li>
              </ol>
            </div>
            <div className="card">
              <h3>After listening</h3>
              <ol>
                <li>Summarize the main ideas in English.</li>
                <li>Select five new vocabulary items.</li>
                <li>Discuss one question with a partner.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">For mentors</span>
          <h2>Simple, reusable teaching support</h2>
          <p className="lead">The project intends to train undergraduate student mentors and create accessible resources that teachers and community leaders can use beyond the project period.</p>
        </div>
      </section>
    </>
  );
}

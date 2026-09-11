export default function Stories() {
  const storyCards = [
    { tag: 'Folklore', title: 'Voices from local folklore', desc: 'Short bilingual stories rooted in the oral traditions of Vehari, followed by English vocabulary and discussion prompts.' },
    { tag: 'Customs', title: 'Local customs & traditions', desc: 'Stories that explain how community practices, celebrations and everyday traditions are experienced and remembered.' },
    { tag: 'Rural life', title: 'Stories of rural life', desc: 'Context-rich narratives about work, family, community and the environments in which learners live.' },
    { tag: 'History', title: 'Historical narration', desc: 'Locally relevant historical accounts presented in accessible language and connected to English learning activities.' },
    { tag: 'Food', title: 'Food & cultural memory', desc: 'Food stories that connect language with tastes, places, family traditions and local identity.' },
    { tag: 'Youth', title: 'Young voices', desc: 'Student and youth perspectives that document aspirations, learning experiences and life in contemporary Vehari.' },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Stories</span>
          <h1>Documenting the culture and everyday voices of Vehari.</h1>
          <p>Stories provide the cultural context through which English learning becomes familiar, meaningful and connected to real life.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Story collection</span>
              <h2>What we can preserve and share</h2>
            </div>
            <p>As fieldwork progresses, replace the placeholders below with verified community stories and photographs.</p>
          </div>
          <div className="cards">
            {storyCards.map((s) => (
              <div key={s.title} className="card">
                <span className="tag">{s.tag}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container callout">
          <span className="eyebrow">Story format</span>
          <h2>Local language → English → Learning</h2>
          <p>Each published story can include the original/local-language version, an English version, audio narration, key vocabulary, comprehension questions and speaking prompts.</p>
        </div>
      </section>
    </>
  );
}

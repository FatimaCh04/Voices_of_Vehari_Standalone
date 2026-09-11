import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const STATIC_TEAM = {
  leadership: [
    { initials: 'IS', name: 'Dr. Muhammad Imran Saeed', role: 'Principal Investigator · Principal Author' },
    { initials: 'NM', name: 'Nazish Malik', role: 'Co-Principal Investigator · Co-author' },
  ],
  mentors: [
    { initials: 'MS', name: 'Muhammad Shoaib', role: 'Mentor' },
    { initials: 'MR', name: 'Muhammad Rashid', role: 'Mentor' },
    { initials: 'MI', name: 'Muhammad Irshad', role: 'Mentor' },
  ],
  students: [
    { initials: 'KS', name: 'Khansa Saeed', role: 'Student Team' },
    { initials: 'MA', name: 'Maha Anwar', role: 'Student Team' },
    { initials: 'MS', name: 'Muhammad Suleman', role: 'Student Team' },
    { initials: 'NF', name: 'Noor Fatima', role: 'Student Team' },
    { initials: 'NN', name: 'Noreen Nehsat', role: 'Student Team' },
    { initials: 'AK', name: 'Aleeza Khadim', role: 'Student Team' },
    { initials: 'BS', name: 'Bassri Sattar', role: 'Student Team' },
  ],
  contributors: [
    { initials: 'AA', name: 'Abdullah', role: 'Podcast Host' },
    { initials: 'HR', name: 'Hassan Raza', role: 'Featured Guest · Food & Culture' },
    { initials: 'AK', name: 'Dr. Asma Kashif Shehzad', role: "Featured Guest · Women's Education" },
  ],
};

function PersonCard({ initials, name, role, imageUrl }) {
  return (
    <div className="person">
      {imageUrl ? (
        <img src={imageUrl} alt={name} style={{ width: '58px', height: '58px', borderRadius: '16px', objectFit: 'cover', flexShrink: 0 }} />
      ) : (
        <div className="avatar">{initials}</div>
      )}
      <div>
        <h3 style={{ fontSize: '16px', margin: 0 }}>{name}</h3>
        <p>{role}</p>
      </div>
    </div>
  );
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    supabase
      .from('team')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => { if (data?.length) setTeamMembers(data); });
  }, []);

  const hasDbData = teamMembers.length > 0;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Team</span>
          <h1>The people behind the voices.</h1>
          <p>Academic leadership, mentors and student contributors supporting the research, learning and storytelling work.</p>
        </div>
      </section>

      {hasDbData ? (
        <section className="section">
          <div className="container">
            <span className="eyebrow">Project team</span>
            <h2>Our team</h2>
            <div className="team-grid" style={{ marginTop: '22px' }}>
              {teamMembers.map(m => <PersonCard key={m.id} initials={m.name.split(' ').map(n=>n[0]).join('').slice(0,2)} name={m.name} role={m.role} imageUrl={m.image_url} />)}
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="section">
            <div className="container">
              <span className="eyebrow">Project leadership</span>
              <h2>Leadership</h2>
              <div className="team-grid" style={{ marginTop: '22px' }}>
                {STATIC_TEAM.leadership.map(m => <PersonCard key={m.name} {...m} />)}
              </div>
            </div>
          </section>
          <section className="section alt">
            <div className="container">
              <span className="eyebrow">Mentors</span>
              <h2>Mentors</h2>
              <div className="team-grid" style={{ marginTop: '22px' }}>
                {STATIC_TEAM.mentors.map(m => <PersonCard key={m.name} {...m} />)}
              </div>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <span className="eyebrow">Student team</span>
              <h2>Student contributors</h2>
              <div className="team-grid" style={{ marginTop: '22px' }}>
                {STATIC_TEAM.students.map(m => <PersonCard key={m.name} {...m} />)}
              </div>
            </div>
          </section>
          <section className="section alt">
            <div className="container">
              <span className="eyebrow">Featured contributors</span>
              <h2>Podcast &amp; media contributors</h2>
              <div className="team-grid" style={{ marginTop: '22px' }}>
                {STATIC_TEAM.contributors.map(m => <PersonCard key={m.name} {...m} />)}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

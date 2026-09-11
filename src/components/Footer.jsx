export default function Footer() {
  return (
    <footer style={{ background: '#071e3c', color: '#cfe0f2', padding: '40px 0 20px' }}>
      <div className="container">
        <p style={{ margin: '0 0 8px' }}>
          <strong style={{ color: 'white' }}>Voices of Vehari</strong> · COMSATS University Islamabad, Vehari Campus
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: '#93b2d0' }}>
          Enhancing English Proficiency through Multilingual Podcasting and Cultural Storytelling.
        </p>
        <p style={{ margin: '16px 0 0', fontSize: '12px', borderTop: '1px solid rgba(255,255,255,.15)', paddingTop: '16px', color: '#6b90b5' }}>
          © {new Date().getFullYear()} Voices of Vehari · COMSATS University Islamabad
        </p>
      </div>
    </footer>
  );
}

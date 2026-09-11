import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link className="btn primary" to="/">Return to Home</Link>
      </div>
    </section>
  );
}

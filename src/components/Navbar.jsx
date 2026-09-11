import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/research', label: 'Research' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/podcasts', label: 'Podcasts' },
  { to: '/stories', label: 'Stories' },
  { to: '/learning', label: 'Learning' },
  { to: '/audio-transcripts', label: 'Audio & Transcripts' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/team', label: 'Team' },
  { to: '/outcomes', label: 'Impact' },
  { to: '/news', label: 'News & Events' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="brand">
          <NavLink to="/">
            <span style={{ fontWeight: 900, fontSize: '20px', color: 'var(--navy)', letterSpacing: '-0.03em' }}>
              Voices of Vehari
            </span>
          </NavLink>
        </div>
        <div className="menu">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="mobile-menu open">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, Newspaper, Mic2, Image, MessageSquare,
  Settings, LogOut, Menu, X, Globe
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/news', icon: Newspaper, label: 'News & Events' },
  { to: '/admin/podcasts', icon: Mic2, label: 'Podcasts' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const sidebarStyle = {
    width: '240px', background: '#073b7a', color: 'white', display: 'flex',
    flexDirection: 'column', flexShrink: 0, height: '100vh', position: 'sticky', top: 0
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f7fa' }}>
      {/* Sidebar */}
      <aside style={{ ...sidebarStyle, display: sidebarOpen || window.innerWidth > 768 ? 'flex' : 'none' }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>🎙️</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '13px' }}>Voices of Vehari</div>
              <div style={{ fontSize: '11px', opacity: 0.6 }}>Admin Panel</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px', marginBottom: '2px',
                color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: 600,
                background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent'
              })}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} />{label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <a href="/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', color: 'white', fontSize: '14px', fontWeight: 600, textDecoration: 'none', marginBottom: '4px' }}>
            <Globe size={18} /> View Site
          </a>
          <button
            onClick={handleSignOut}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'transparent', border: 'none', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <header style={{ background: 'white', borderBottom: '1px solid #dfe8f1', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 10 }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ display: 'block', background: 'none', border: '1px solid #dfe8f1', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer' }}
            aria-label="Toggle sidebar"
          >
            <Menu size={18} />
          </button>
          <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#073b7a' }}>Admin Panel</h1>
          <div style={{ marginLeft: 'auto', fontSize: '13px', color: '#60708a' }}>
            {user?.email}
          </div>
        </header>
        <main style={{ flex: 1, padding: '28px 24px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

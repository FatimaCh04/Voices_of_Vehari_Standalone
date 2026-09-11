import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './admin/components/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Research from './pages/Research';
import Methodology from './pages/Methodology';
import Podcasts from './pages/Podcasts';
import Stories from './pages/Stories';
import Learning from './pages/Learning';
import AudioTranscripts from './pages/AudioTranscripts';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Outcomes from './pages/Outcomes';
import News from './pages/News';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Pages
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import ManageNews from './admin/pages/ManageNews';
import ManagePodcasts from './admin/pages/ManagePodcasts';
import ManageGallery from './admin/pages/ManageGallery';
import ManageTeam from './admin/pages/ManageTeam';
import ManageMessages from './admin/pages/ManageMessages';
import SiteSettings from './admin/pages/SiteSettings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="research" element={<Research />} />
            <Route path="methodology" element={<Methodology />} />
            <Route path="podcasts" element={<Podcasts />} />
            <Route path="stories" element={<Stories />} />
            <Route path="learning" element={<Learning />} />
            <Route path="audio-transcripts" element={<AudioTranscripts />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="team" element={<Team />} />
            <Route path="outcomes" element={<Outcomes />} />
            <Route path="news" element={<News />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="news" element={<ManageNews />} />
            <Route path="podcasts" element={<ManagePodcasts />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="team" element={<ManageTeam />} />
            <Route path="messages" element={<ManageMessages />} />
            <Route path="settings" element={<SiteSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// --- COMPONENTS ---
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Impact from './components/Impact';
import JoinForm from './components/JoinForm';
import Donate from './components/Donate';
import Footer from './components/Footer';
import QRCodeModal from './components/QRCodeModal';
import MissionGallery from './components/MissionGallery';
import TeamPage from './components/TeamPage';

// --- ADMIN & AUTH ---
import Login from './components/Login';
import Dashboard from './admin/Dashboard'; 

// --- HOME PAGE LAYOUT ---
function HomeLayout({ openModal }) {
  const navigate = useNavigate();

  const handleOpenGallery = () => {
    navigate('/explore');
  };

  return (
    <>
      <Hero onOpenDonate={openModal} onOpenGallery={handleOpenGallery} />
      <section id="vision"><About /></section>
      <section id="impact"><Impact onOpenGallery={handleOpenGallery} /></section>
      
      <section id="join-section" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-black text-[#1e293b] uppercase tracking-tighter mb-4">
            Become a Youth Leader
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            We are looking for students to lead our 2040 Vision for Literacy and Arogya.
          </p>
        </div>
        <JoinForm /> 
      </section>

      <Donate onOpenDonate={openModal} />
    </>
  );
}

// --- APP CONTENT WRAPPER (For Location Checking) ---
function AppContent({ isModalOpen, openModal, closeModal }) {
  const location = useLocation();
  
  // Check karega ki user admin ya login page par toh nahi hai
  const isAdminPage = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Agar admin ya login page nahi hai, tabhi public Navbar dikhao */}
      {!isAdminPage && <Navbar onOpenDonate={openModal} />}
      
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/explore" element={<MissionGallery />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/" element={<HomeLayout openModal={openModal} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Agar admin ya login page nahi hai, tabhi public Footer dikhao */}
      {!isAdminPage && <Footer />}
      
      <QRCodeModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

// --- MAIN APP COMPONENT ---
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <AppContent 
        isModalOpen={isModalOpen} 
        openModal={openModal} 
        closeModal={closeModal} 
      />
    </Router>
  );
}

export default App;
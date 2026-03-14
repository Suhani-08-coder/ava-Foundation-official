import React from 'react';
import { LayoutDashboard, Users, Target, Image as ImageIcon, LogOut, ShieldCheck, Settings, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'stats', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'volunteers', label: 'Workforce', icon: <Users size={18} /> },
    { id: 'donations', label: 'Donations', icon: <Heart size={18} /> },
    { id: 'missions', label: 'Missions', icon: <Target size={18} /> },
    { id: 'reports', label: 'Media Gallery', icon: <ImageIcon size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }, 
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to exit the secure portal?')) {
      localStorage.removeItem('avaf_token');
      localStorage.removeItem('avaf_user');
      navigate('/login');
    }
  };

  return (
    <aside className="bg-[#0a1f44] text-white h-full p-8 flex flex-col shadow-2xl">
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 bg-white/10 rounded-xl">
          <ShieldCheck size={24} className="text-[#00A859]" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold uppercase leading-none tracking-wide">AVAF Admin</h2>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Secure Portal</p>
        </div>
      </div>

      <nav className="space-y-3 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-4 w-full p-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-[#0052AD] text-white shadow-lg shadow-blue-900/50 translate-x-1' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white transition-colors'}`}>
              {item.icon}
            </span>
            {item.label}
            {activeTab === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full p-4 text-rose-400 text-[10px] font-bold uppercase tracking-widest hover:bg-rose-500/10 rounded-xl transition-all group">
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> Exit System
        </button>
        <p className="text-[8px] text-slate-600 text-center mt-6 font-mono">Ver: 2.4.0 (Stable)</p>
      </div>
    </aside>
  );
};

export default Sidebar;
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, X, Play, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MissionGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState('all'); 
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch('http://localhost:5000/api/media')
      .then(res => res.json())
      .then(data => setGallery(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching gallery:", err));
  }, []);

  
  const tabs = [
    { id: 'all', label: 'All Archive' },
    { id: 'vidya', label: 'Vidya (Education)' },
    { id: 'arogya', label: 'Arogya (Health)' },
    { id: 'mission', label: 'Mission' }
  ];

  const filteredGallery = gallery.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const getMediaUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0052AD] selection:text-white">
      <nav className="p-6 border-b border-slate-50 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#0052AD] transition-colors"
          >
            <ChevronLeft size={16} /> Back to Home
          </button>

          <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 overflow-x-auto max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                  ? 'bg-white text-[#0052AD] shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
            <input 
              type="text"
              placeholder="Filter missions..."
              className="w-full pl-11 pr-10 py-2.5 bg-slate-50 rounded-xl text-[11px] font-bold outline-none border border-transparent focus:border-[#0052AD]/10 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X 
                size={14} 
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-300 hover:text-slate-500" 
                onClick={() => setSearchQuery("")} 
              />
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e293b] tracking-tighter uppercase mb-2">
            Mission <span className="text-[#0052AD]">Archive</span>
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
            Visual Evidence of Change • {activeTab === 'all' ? 'Universal' : activeTab}
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence mode='popLayout'>
            {filteredGallery.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item._id} 
                className="relative break-inside-avoid group rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm bg-slate-50"
              >
                {item.type === 'video' ? (
                  <div className="relative">
                    <video 
                      muted 
                      loop 
                      playsInline 
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onMouseOver={e => e.target.play()}
                      onMouseOut={e => e.target.pause()}
                    >
                      <source src={getMediaUrl(item.url)} type="video/mp4" />
                    </video>
                    <div className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                      <Play size={14} fill="white" />
                    </div>
                  </div>
                ) : (
                  <img 
                    src={getMediaUrl(item.url)} 
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={item.title} 
                    loading="lazy"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                  />
                )}

                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[#0052AD] text-[9px] font-black uppercase tracking-widest shadow-sm">
                  {item.category || 'Mission'}
                </div>

                <div className="p-8 bg-white">
                  <h3 className="text-[#1e293b] text-lg font-bold tracking-tight mb-1">{item.title}</h3>
                  <div className="flex items-center gap-2">
                      <div className={`h-1 w-1 rounded-full ${item.type === 'video' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                      <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">{item.type}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredGallery.length === 0 && (
          <div className="py-40 text-center">
            <div className="inline-flex p-6 bg-slate-50 rounded-full mb-6">
              <Filter className="text-slate-300" size={32} />
            </div>
            <h4 className="text-slate-400 font-bold uppercase text-xs tracking-widest">No matching media found.</h4>
          </div>
        )}
      </main>
    </div>
  );
};

export default MissionGallery;
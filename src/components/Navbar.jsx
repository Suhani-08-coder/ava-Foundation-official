import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Heart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/Logo.jpg'; 

const Navbar = ({ onOpenDonate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  
  const [liveStats, setLiveStats] = useState([
    { text: 'Loading...', icon: <Heart size={14} className="fill-white" /> },
    { text: 'AVAF Live', icon: <Globe size={14} /> },
    { text: 'Donate Now', icon: <Heart size={14} className="fill-white" /> }
  ]);

  const fetchLiveImpact = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const [volRes, missionRes] = await Promise.all([
        fetch(`${baseUrl}/api/admin/volunteers`),
        fetch(`${baseUrl}/api/missions`)
      ]);
      
      if (!volRes.ok || !missionRes.ok) throw new Error("API Error");
      
      const volunteers = await volRes.json();
      const missions = await missionRes.json();

      setLiveStats([
        { text: `${volunteers.length || 0}+ Lives`, icon: <Heart size={14} className="fill-white" /> },
        { text: `${missions.length || 0}+ Missions`, icon: <Globe size={14} /> },
        { text: 'Support Us', icon: <Heart size={14} className="fill-white" /> }
      ]);
    } catch (err) {
      console.error("Impact Ticker Sync Error:", err);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    fetchLiveImpact();
    
    const tickerTimer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % liveStats.length);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(tickerTimer);
    };
  }, [liveStats.length]);

  const navLinks = [
    { name: 'Mission 2040', href: 'vision' },
    { name: 'Impact Report', href: 'impact' },
    { name: 'Our Team', href: 'team' }, 
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 py-4 ${
      scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-md' : 'bg-white/10 backdrop-blur-sm lg:bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Branding Section */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative">
            <img 
              src={logo} 
              alt="AVAF Logo" 
              className="h-10 w-10 rounded-xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform" 
            />
            <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
              <ShieldCheck size={12} className="text-[#00A859]" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#1e293b] font-bold text-lg tracking-tight uppercase leading-none">
              AVAF <span className="text-[#0052AD]">Foundation</span>
            </h1>
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#00A859] mt-0.5">Niti Aayog Verified</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={`#${link.href}`} 
                className="text-slate-800 font-bold text-[11px] uppercase tracking-widest hover:text-[#0052AD] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00A859] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
          
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />

          {/* Join Network Button */}
          <button 
            onClick={() => {
              const element = document.getElementById('join-section');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-[#1e293b] hover:text-[#0052AD] transition-all text-[11px] font-bold uppercase tracking-widest group"
          >
            <Globe 
              size={14} 
              className="text-[#0052AD] group-hover:rotate-12 transition-transform duration-300" 
            />
            <span>Join Network</span>
          </button>
                  
          {/* Live Impact Ticker CTA */}
          <button 
            onClick={onOpenDonate}
            className="relative bg-[#0a1f44] text-white w-44 h-11 rounded-full font-bold text-[10px] uppercase tracking-[0.15em] shadow-lg overflow-hidden flex items-center justify-center hover:bg-[#06142e] transition-all"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={tickerIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-2 pointer-events-none"
              >
                {liveStats[tickerIndex].icon}
                <span>{liveStats[tickerIndex].text}</span>
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-slate-900 p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 p-8 flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={`#${link.href}`} 
                onClick={() => setIsOpen(false)}
                className="text-[#1e293b] font-bold uppercase text-xs tracking-widest"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => {
                const element = document.getElementById('join-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
                }
              }}
              className="text-[#1e293b] font-bold uppercase text-xs tracking-widest text-left"
            >
              Join Network
            </button>
            <button 
              onClick={() => { onOpenDonate(); setIsOpen(false); }}
              className="w-full bg-[#0a1f44] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              Support Impact
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
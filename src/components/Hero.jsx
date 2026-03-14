import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, ShieldCheck, ArrowUpRight, Globe, Users, PlayCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getEndpoint } from '../config'; 

const Hero = ({ onOpenDonate }) => {
  const [gallery, setGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  // 1. Fixed URL syntax and added fallback
  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
    fetch(`${apiBase}/api/media`) 
      .then(res => res.json())
      .then(data => {
        // Sirf wahi media dikhayein jo active missions ya exploration ke liye hain
        const missionMedia = data.filter(item => item.category === 'mission' || item.category === 'explore');
        setGallery(missionMedia);
      })
      .catch(err => {
        console.error("Hero Fetch Error:", err);
        // Fallback placeholder data if API fails
        setGallery([{ _id: 'default', type: 'photo', url: '/assets/fallback.jpg', title: 'AVAF Impact' }]);
      });
  }, []);

  // 2. Smooth Slider Logic
  useEffect(() => {
    if (gallery.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % gallery.length);
      }, 4000); // 4 seconds is better for readability
      return () => clearInterval(timer);
    }
  }, [gallery]);

  const pushedMedia = gallery[currentIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (showGallery) {
    return (
      <section className="min-h-screen bg-white pt-32 px-6 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.button 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowGallery(false)}
            className="mb-12 text-[10px] font-black uppercase tracking-[0.3em] text-[#0052AD] hover:text-[#00A859] transition-colors flex items-center gap-2 group"
          >
            <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> 
            Back to Sanctuary
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
            <h2 className="text-5xl md:text-8xl font-black text-[#1e293b] tracking-tighter leading-none mb-6">
              Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A859] to-[#0052AD]">Chronicles.</span>
            </h2>
            <p className="text-slate-400 max-w-xl font-bold uppercase text-[11px] tracking-[0.2em] border-l-2 border-[#00A859] pl-6">
              A verifiable visual archive of grassroots movement in education and healthcare.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {gallery.map((item) => (
              <motion.div key={item._id} variants={itemVariants} className="break-inside-avoid relative bg-slate-50 rounded-[2.5rem] overflow-hidden group cursor-pointer border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden aspect-auto">
                  {item.type === 'video' ? (
                    <div className="relative">
                      <video className="w-full grayscale group-hover:grayscale-0 transition-all duration-700" muted>
                        <source src={getEndpoint(item.url)} type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                         <PlayCircle className="text-white/80 group-hover:scale-110 transition-transform" size={48} />
                      </div>
                    </div>
                  ) : (
                    <img src={getEndpoint(item.url)} className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={item.title} loading="lazy" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <span className="text-[9px] font-black text-[#00A859] uppercase tracking-widest mb-2">Active Mission</span>
                    <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-tighter">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-20 overflow-hidden bg-[#fafafa]">
      {/* Background Decorative Circles */}
      <div className="absolute top-1/4 -left-20 w-[45rem] h-[45rem] bg-[#00A859]/5 blur-[160px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-[40rem] h-[40rem] bg-[#0052AD]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 px-6 py-2.5 rounded-full mb-10 shadow-sm">
            <Globe size={14} className="text-[#0052AD]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">National Social Impact Initiative</span>
          </div>
          <h1 className="text-6xl md:text-[clamp(4.5rem,9vw,7.5rem)] font-black text-[#1e293b] leading-[0.85] tracking-tighter mb-10">
            Sustainable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A859] to-[#0052AD]">Health & Literacy.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg font-medium mb-14">
            International standards of community development to ensure every marginalized child has access to quality care by <span className="text-white bg-[#00A859] px-2 py-0.5 rounded ml-1 font-black">2040</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <button onClick={onOpenDonate} className="bg-[#0052AD] text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-blue-200 hover:bg-[#003d82] hover:-translate-y-1 transition-all flex items-center gap-3">
              Support Mission <ArrowUpRight size={18} />
            </button>
            <button onClick={() => setShowGallery(true)} className="flex items-center gap-3 text-[#1e293b] font-black text-[11px] uppercase tracking-widest group border-b-2 border-transparent hover:border-[#00A859] transition-all pb-1">
              Explore<ChevronRight size={16} className="text-[#00A859] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Live Feed Container */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex justify-center items-center">
          <div className="relative w-full aspect-square max-w-[42rem] rounded-[5.5rem] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden border-[12px] border-white group">
            <AnimatePresence mode="wait">
              {pushedMedia ? (
                <motion.div key={pushedMedia._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full">
                  {pushedMedia.type === 'video' ? (
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                      <source src={getEndpoint(pushedMedia.url)} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={getEndpoint(pushedMedia.url)} className="w-full h-full object-cover" alt="AVAF Impact" />
                  )}
                </motion.div>
              ) : (
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                  <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Awaiting Live Feed...</p>
                </div>
              )}
            </AnimatePresence>

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute bottom-10 left-8 right-8 bg-white/95 backdrop-blur-md px-10 py-8 rounded-[3rem] flex items-center gap-6 z-30 border border-white/20 shadow-2xl">
              <div className="h-16 w-16 bg-[#00A859]/10 rounded-3xl flex items-center justify-center border border-[#00A859]/20">
                <ShieldCheck size={36} className="text-[#00A859]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transparency Report</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-base font-black text-[#1e293b] leading-none uppercase tracking-tighter">Niti Aayog Verified NGO</p>
              </div>
            </motion.div>
          </div>

          <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -top-4 -right-4 bg-white px-8 py-5 rounded-3xl shadow-xl border border-slate-50 flex items-center gap-4 z-30">
            <div className="h-10 w-10 bg-[#0052AD]/10 rounded-2xl flex items-center justify-center">
              <Users size={20} className="text-[#0052AD]" />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Workforce</p>
              <p className="text-sm font-black text-[#1e293b] uppercase tracking-tighter">Active Network</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
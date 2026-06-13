import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Activity, ChevronRight, Plus, Minus, CheckCircle2 
} from 'lucide-react';

const Impact = ({ onOpenGallery }) => {
  
  const [impactData, setImpactData] = useState({ literacyImpact: 0, arogyaReach: 0 });
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const fetchLiveMetrics = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/admin/impact-stats');
        const data = await res.json();
        if (data) {
          setImpactData({
            literacyImpact: data.literacyImpact || 0,
            arogyaReach: data.arogyaReach || 0
          });
        }
      } catch (err) {
        console.error("Impact Sync Error:", err);
      }
    };
    fetchLiveMetrics();
  }, []);

  const impactDetails = {
    vidya: {
      id: 'vidya',
      title: 'Vidya Mission',
      tagline: 'Education for All',
      summary: 'Providing books and learning tools to children in rural areas.',
      lines: [
        "Distributing basic study kits to village children.",
        "Setting up small community learning centers.",
        "Helping kids reconnect with formal schooling.",
        "Providing mentorship from university students."
      ],
      color: '#0052AD',
      lightBg: 'bg-blue-50/50',
      icon: <BookOpen size={32} />
    },
    arogya: {
      id: 'arogya',
      title: 'Arogya Mission',
      tagline: 'Healthcare & Hygiene',
      summary: 'Conducting health camps and spreading hygiene awareness.',
      lines: [
        "Monthly health checkups for underserved families.",
        "Teaching proper handwashing and sanitization steps.",
        "Distributing hygiene and first-aid kits.",
        "Guidance on clean drinking water and nutrition."
      ],
      color: '#00A859',
      lightBg: 'bg-emerald-50/50',
      icon: <Activity size={32} />
    }
  };

  return (
    <section id="impact" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto text-left">
        <div className="mb-20">
          <h3 className="text-4xl md:text-6xl font-extrabold text-[#1e293b] tracking-tighter mb-4">
            Our <span className="text-[#0052AD]">Ground Reality.</span>
          </h3>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">
            Transparent Reporting • Mission 2040
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(impactDetails).map((card) => (
            <motion.div
              key={card.id}
              layout
              onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
              className={`relative overflow-hidden rounded-[2.5rem] border transition-all duration-500 cursor-pointer p-8 md:p-12 ${
                activeCard === card.id 
                ? `${card.lightBg} border-slate-200 shadow-inner` 
                : 'bg-white border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50'
              }`}
            >
              <motion.div layout className="relative z-10">
                <div className="flex justify-between items-center mb-10">
                  <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-50" style={{ color: card.color }}>
                    {card.icon}
                  </div>
                  <div className={`p-2 rounded-full border ${activeCard === card.id ? 'bg-white border-transparent' : 'border-slate-100 text-slate-300'}`}>
                    {activeCard === card.id ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </div>

                <motion.h4 layout className="text-2xl font-bold text-[#1e293b] uppercase tracking-tight mb-1">
                  {card.title}
                </motion.h4>
                
                <motion.p layout className="font-bold text-[9px] uppercase tracking-[0.2em] mb-6" style={{ color: card.color }}>
                  {card.tagline}
                </motion.p>

                <AnimatePresence mode="wait">
                  {activeCard === card.id ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mb-8"
                    >
                      <ul className="space-y-4 mb-10">
                        {card.lines.map((line, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                            <CheckCircle2 size={16} style={{ color: card.color }} className="shrink-0" />
                            {line}
                          </li>
                        ))}
                      </ul>
                      
                      <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          onOpenGallery(); 
                        }}
                        className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest py-3 px-6 rounded-xl bg-white border border-slate-200 hover:border-[#00A859] hover:text-[#00A859] transition-all group/btn shadow-sm active:scale-95"
                      >
                        See Mission Photos 
                        <ChevronRight 
                          size={14} 
                          className="text-[#00A859] group-hover/btn:translate-x-1 transition-transform" 
                        />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.p layout className="text-slate-500 text-sm font-medium leading-relaxed max-w-xs">
                      {card.summary}
                    </motion.p>
                  )}
                </AnimatePresence>

                <div className="mt-8 pt-8 border-t border-slate-100/50 space-y-3">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    <span>Current Impact</span>
                    <span style={{ color: card.color }}>
                      {card.id === 'vidya' ? impactData.literacyImpact : impactData.arogyaReach}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${card.id === 'vidya' ? impactData.literacyImpact : impactData.arogyaReach}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: card.color }}
                    />
                  </div>
                </div>
              </motion.div>

              
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none" style={{ color: card.color }}>
                {React.cloneElement(card.icon, { size: 240 })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
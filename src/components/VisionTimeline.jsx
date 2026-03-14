import React from 'react';
import { Flag, Rocket, Globe, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const VisionTimeline = () => {
  const milestones = [
    {
      year: "2026",
      title: "Foundation & Growth",
      desc: "Establishing verified digital infrastructure and expanding the volunteer network across North India.",
      icon: <Rocket size={20} />,
      status: "Active Phase",
      color: "text-[#0052AD]",
      bg: "bg-[#0052AD]"
    },
    {
      year: "2030",
      title: "Universal Digital Access",
      desc: "Achieving 100% digital literacy for students in our primary hubs with localized AI-driven learning tools.",
      icon: <Globe size={20} />,
      status: "Strategic Goal",
      color: "text-[#00A859]",
      bg: "bg-[#00A859]"
    },
    {
      year: "2035",
      title: "Preventive Health Network",
      desc: "Launching 50+ grassroots centers providing primary telemedicine and preventive care to rural clusters.",
      icon: <Flag size={20} />,
      status: "Pipeline",
      color: "text-[#0052AD]",
      bg: "bg-[#0052AD]"
    },
    {
      year: "2040",
      title: "The Vision Realized",
      desc: "Full integration of education and healthcare systems, ensuring zero marginalized children are left behind.",
      icon: <CheckCircle size={20} />,
      status: "Target",
      color: "text-[#00A859]",
      bg: "bg-[#00A859]"
    }
  ];

  return (
    <section id="vision" className="py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#0052AD] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Mission Roadmap</span>
          </div>
          <h3 className="text-4xl md:text-6xl font-bold text-[#1e293b] tracking-tighter mb-4">
            Our Path to <span className="text-[#0052AD]">2040</span>
          </h3>
          <p className="text-slate-500 text-sm max-w-xl mx-auto font-medium">
            A strategic multi-decade commitment to transforming the grassroots landscape of India.
          </p>
        </div>

        

        <div className="relative">
          
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2" />
          
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '25%' }}
            className="hidden lg:block absolute top-1/2 left-0 h-0.5 bg-[#0052AD] -translate-y-1/2 z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-20 lg:gap-12 relative z-10">
            {milestones.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col items-center"
              >
                
                <div className="relative z-20">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-8 border-white shadow-2xl transition-transform hover:scale-110 duration-500 ${
                    item.status === 'Active Phase' ? 'bg-[#0052AD] text-white' : 'bg-slate-50 text-slate-300'
                  }`}>
                    <span className="font-bold text-[13px] tracking-tight">{item.year}</span>
                  </div>
                </div>

                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className={`mt-8 lg:absolute w-full p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05)] text-left group ${
                    index % 2 === 0 ? 'lg:-top-56' : 'lg:top-20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${item.color} bg-slate-50 p-2.5 rounded-xl`}>
                      {item.icon}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      item.status === 'Active Phase' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-[#1e293b] tracking-tight mb-2 group-hover:text-[#0052AD] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    {item.desc}
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-bold uppercase text-slate-400">Read Strategy</span>
                    <ChevronRight size={14} className="text-[#0052AD]" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionTimeline;
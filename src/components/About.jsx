import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="relative py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- IDENTITY & COMPLIANCE CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto p-10 md:p-16 rounded-[3.5rem] bg-slate-50 border border-slate-100 shadow-sm overflow-hidden"
        >
         
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00A859]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-[#0052AD]/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Trust Badge */}
            <div className="flex items-center gap-3 mb-8 bg-white px-6 py-2.5 rounded-full border border-[#00A859]/20 shadow-sm">
              <ShieldCheck size={20} className="text-[#00A859] stroke-[2.5px]" />
              <span className="text-[#00A859] text-[10px] font-bold uppercase tracking-[0.4em]">
                Institutional Trust
              </span>
            </div>

            <div className="max-w-2xl mb-12">
              <h4 className="text-2xl md:text-4xl font-bold text-[#1e293b] leading-tight tracking-tight mb-8">
                Registered under 
                <span className="inline-block mx-2 text-[#00A859] underline decoration-[#0052AD] decoration-4 underline-offset-8">
                  Section 8
                </span> 
                of the Companies Act, 2013.
              </h4>
              
              {/* Charitable Status Tag */}
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/20 transition-transform hover:scale-105 duration-500 cursor-default">
                <div className="w-3 h-3 rounded-full bg-[#0052AD] animate-pulse" />
                <p className="text-slate-700 text-[11px] md:text-sm font-bold uppercase tracking-[0.2em]">
                  Purely charitable • 
                  <span className="text-[#0052AD] ml-2 font-extrabold">Zero Profit Distribution</span>
                </p>
              </div>
            </div>

            
            <div className="w-full pt-10 border-t border-slate-200">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl italic text-slate-500 font-medium leading-relaxed font-serif"
              >
                "Inclusive Education and Health for Every Child by 2040"
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* ---  BRAND TAGLINE --- */}
        <div className="mt-16 text-center">
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.5em]">
            Awadh Vidya Arogya Foundation • Non-Profit Organization
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;
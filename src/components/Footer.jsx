import React from 'react';
import { ShieldCheck, Mail, Globe, Instagram, Phone, ArrowUpRight } from 'lucide-react';
import logo from '../assets/Logo.jpg'; 

const Footer = () => {
  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  
  const footerNav = [
    { name: 'Mission 2040', href: 'VisionTimeLine' },
    { name: 'Impact Report', href: 'Impact' },
    { name: 'Our Team', href: 'TeamPage' },
    { name: 'Join Network', href: 'JoinForm' }
  ];

  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12 px-6 relative overflow-hidden">
     
      <div className="absolute bottom-0 left-0 w-30rem h-30rem bg-[#00A859]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Core Branding */}
          <div className="lg:col-span-1">
            <div 
              className="flex items-center gap-3 mb-8 cursor-pointer group"
              onClick={scrollUp}
            >
              <img src={logo} alt="AVAF Logo" className="h-12 w-12 rounded-xl object-cover border-2 border-white shadow-xl" />
              <div>
                <h2 className="text-[#1e293b] font-bold text-xl tracking-tighter uppercase leading-none">
                  AVA <span className="text-[#0052AD]">Foundation</span>
                </h2>
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#00A859] mt-1">Niti Aayog Verified</p>
              </div>
            </div>
            <p className="text-slate-500 font-serif italic text-xl leading-relaxed mb-8 border-l-4 border-[#00A859] pl-5">
              "Education and Health for Every Child by 2040"
            </p>
          </div>

          {/*  Legal Trust & Compliance */}
          <div>
            <h3 className="text-[#00A859] font-black text-[10px] uppercase tracking-[0.3em] mb-8">
              Legal Trust
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="h-8 w-8 rounded-lg bg-[#00A859]/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#00A859]/20">
                  <ShieldCheck size={16} className="text-[#00A859]" />
                </div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-tight leading-snug">
                  Section 8 <br />
                  <span className="text-slate-400 font-medium lowercase">Non-Profit Entity</span>
                </p>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="h-8 w-8 rounded-lg bg-[#0052AD]/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#0052AD]/20">
                  <Globe size={16} className="text-[#0052AD]" />
                </div>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-tight leading-snug">
                  MCA21 <br />
                  <span className="text-slate-400 font-medium lowercase">Compliant Foundation</span>
                </p>
              </li>
            </ul>
          </div>

          {/*  Navigation */}
          <div>
            <h3 className="text-[#0052AD] font-black text-[10px] uppercase tracking-[0.3em] mb-8">
              Platform
            </h3>
            <ul className="space-y-4">
              {footerNav.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-slate-500 text-[11px] font-bold uppercase tracking-widest hover:text-[#0052AD] flex items-center gap-2 group transition-colors"
                  >
                    {link.name}
                    <ArrowUpRight 
                      size={12} 
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/*  Contact */}
          <div>
            <h3 className="text-[#1e293b] font-black text-[10px] uppercase tracking-[0.3em] mb-8">
              Contact
            </h3>
            <div className="space-y-4">
              <a 
                href="mailto:Ava@awadfoundation.org" 
                className="flex items-center gap-4 group bg-slate-50 p-3 rounded-2xl border border-transparent hover:border-[#0052AD]/20 hover:bg-white transition-all overflow-hidden"
              >
                <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[#0052AD] transition-colors shrink-0">
                  <Mail size={16} className="text-[#0052AD] group-hover:text-white" />
                </div>
                <span className="text-[11px] font-bold text-slate-600 truncate">Ava@awadfoundation.org</span>
              </a>
              
              <div className="flex gap-4 mt-6">
                <a 
                  href="tel:+91986543210" 
                  className="h-12 w-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#0052AD] hover:border-[#0052AD] transition-all"
                  aria-label="Phone"
                >
                  <Phone size={18} />
                </a>
                <a 
                  href="https://instagram.com/ava_foundation_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-12 w-12 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#fb7185] hover:border-[#fb7185] transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/*  Clean & Minimal */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 md:gap-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              © 2026 Awadh Vidya Arogya Foundation
            </p>
            <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#00A859]/20" />
            <p className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Section 8 Social Enterprise
            </p>
          </div>
          
          <div className="flex gap-10">
            <a href="#" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#0052AD] transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#0052AD] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
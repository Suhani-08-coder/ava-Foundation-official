import React, { useState } from 'react';
import { Heart, ShieldCheck, QrCode, ArrowRight, Sparkles } from 'lucide-react';

const Donate = ({ onOpenDonate }) => {
  const [amount, setAmount] = useState('1000');
  const presets = ['500', '1000', '2500', '5000'];

  return (
    <section id="donate" className="relative py-24 md:py-32 bg-white px-6 overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-[#0052AD]/5 blur-[140px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
        
        <div className="lg:pr-10">
          <div className="inline-flex items-center gap-2 bg-[#00A859]/10 text-[#00A859] px-4 py-1.5 rounded-full mb-8 border border-[#00A859]/20">
            <Heart size={14} className="fill-[#00A859]" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">Support the Mission</span>
          </div>
          
          <h3 className="text-5xl md:text-6xl font-bold text-[#1e293b] mb-8 tracking-tight leading-[1.1]">
            Empower the <br /> 
            <span className="text-[#0052AD]">2040 Vision.</span>
          </h3>
          
          <p className="text-slate-500 text-lg leading-relaxed mb-12 max-w-lg font-medium">
            Your generous contribution allows the <span className="text-[#1e293b] font-semibold underline decoration-[#00A859]/30 underline-offset-4">AVAF Foundation</span> to sustain vital programs in rural literacy and community health.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all group hover:border-[#0052AD]/10">
              <div className="h-12 w-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0052AD] transition-colors duration-300">
                <ShieldCheck className="text-[#0052AD] group-hover:text-white transition-colors" size={24} />
              </div>
              <p className="text-[#1e293b] font-bold text-xs uppercase tracking-wide mb-2">Legal Compliance</p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">Section 8 Registered NGO. Transparency in every rupee.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all group hover:border-[#00A859]/10">
              <div className="h-12 w-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#00A859] transition-colors duration-300">
                <Sparkles className="text-[#00A859] group-hover:text-white transition-colors" size={24} />
              </div>
              <p className="text-[#1e293b] font-bold text-xs uppercase tracking-wide mb-2">Impact Direct</p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">100% charitable. Zero profit distribution model.</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative">
          <h4 className="text-[#1e293b] font-semibold text-lg mb-8 tracking-tight">Select your contribution (₹)</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {presets.map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`py-4 rounded-xl font-bold text-[13px] transition-all border-2 tracking-wide ${
                  amount === val 
                  ? 'bg-[#0052AD] border-[#0052AD] text-white shadow-lg' 
                  : 'bg-white border-slate-100 text-slate-500 hover:border-[#0052AD]/20 hover:text-[#0052AD]'
                }`}
              >
                ₹{val}
              </button>
            ))}
          </div>

          <div className="relative mb-10">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-6 px-8 text-[#1e293b] font-bold text-2xl focus:border-[#0052AD]/30 focus:bg-white outline-none transition-all pl-14 shadow-inner"
              placeholder="0"
            />
            <span className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-2xl">₹</span>
          </div>

          <button 
            onClick={onOpenDonate}
            className="w-full flex items-center justify-center gap-3 bg-[#0a1f44] text-white py-6 rounded-2xl font-bold text-[13px] uppercase tracking-[0.15em] transition-all hover:bg-[#0052AD] hover:-translate-y-1 shadow-lg active:scale-[0.98]"
          >
            Initialize Impact <ArrowRight size={16} />
          </button>

          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <QrCode size={18} className="text-[#0052AD]" />
               <span className="text-[11px] font-semibold text-slate-400">Secure UPI Checkout</span>
            </div>
            <button 
              onClick={onOpenDonate}
              className="text-[#00A859] text-[11px] font-bold uppercase tracking-wider hover:text-[#0052AD] transition-colors"
            >
              Show QR Code
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Donate;
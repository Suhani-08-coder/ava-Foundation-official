import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, School, Heart, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { getEndpoint } from '../config';

const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    interest: 'Education'
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      
      const response = await fetch(getEndpoint('/api/volunteers/signup'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus({ type: 'success', message: 'Welcome to the movement! Check your email soon.' });
        setFormData({ name: '', email: '', college: '', interest: 'Education' });
      } else {
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Server is offline. Try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 max-w-xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A859]/5 blur-3xl rounded-full -mr-16 -mt-16" />
      <div className="relative z-10">
        <h3 className="text-3xl font-black text-[#1e293b] mb-2 uppercase tracking-tighter">
          Join the <span className="text-[#0052AD]">Workforce</span>
        </h3>
        <p className="text-slate-500 mb-10 text-sm font-medium">Become a verified leader in the 2040 Vision.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0052AD] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#0052AD]/10 focus:bg-white transition-all text-sm font-semibold outline-none text-slate-700"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0052AD] transition-colors" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#0052AD]/10 focus:bg-white transition-all text-sm font-semibold outline-none text-slate-700"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="relative group">
            <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0052AD] transition-colors" size={18} />
            <input
              type="text"
              placeholder="College/University Name"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#0052AD]/10 focus:bg-white transition-all text-sm font-semibold outline-none text-slate-700"
              value={formData.college}
              onChange={(e) => setFormData({...formData, college: e.target.value})}
              required
            />
          </div>
          <div className="relative group">
            <Heart className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00A859] transition-colors" size={18} />
            <select 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-[#00A859]/10 focus:bg-white transition-all text-sm font-bold text-slate-500 outline-none appearance-none cursor-pointer"
              value={formData.interest}
              onChange={(e) => setFormData({...formData, interest: e.target.value})}
            >
              <option value="Education">Literacy & Education</option>
              <option value="Healthcare">Arogya (Healthcare)</option>
              <option value="Environment">Environmental Action</option>
              <option value="Admin">Management & Admin</option>
            </select>
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-[#0a1f44] text-white font-black py-5 rounded-2xl hover:bg-[#0052AD] transition-all uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 disabled:opacity-70 group">
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <>Submit Application <Send size={14} /></>}
          </button>
          <AnimatePresence>
            {status.message && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`flex items-center gap-3 justify-center p-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest ${status.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {status.message}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};
export default JoinForm;
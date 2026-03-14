import React, { useState } from 'react';
import { X, Copy, CheckCircle, ShieldCheck, Send } from 'lucide-react';
import axios from 'axios';
import { UPI_ID, getEndpoint } from '../config';

const QRCodeModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', amount: '', transactionId: '' });
  const [status, setStatus] = useState('idle'); 

  if (!isOpen) return null;

  const handleCopy = () => {
  navigator.clipboard.writeText(UPI_ID); 
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      
      const res = await axios.post(getEndpoint('/api/donate'), formData);
      if(res.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', amount: '', transactionId: '' });
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center px-4">
     
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Main Box */}
      <div className="relative bg-white rounded-3xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-slate-100 hover:bg-slate-200 rounded-full">
          <X size={20} />
        </button>

        {/* ---  QR CODE --- */}
        <div className="w-full md:w-5/12 bg-slate-50 p-8 flex flex-col items-center justify-center border-r border-slate-100">
          <h4 className="text-xl font-bold text-slate-800 mb-2">Scan & Donate</h4>
          <p className="text-[#0052AD] text-xs font-bold uppercase tracking-widest mb-6">Awadh Vidya Arogya Foundation</p>
          
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col items-center">
             {/* UPDATED IMAGE NAME HERE */}
             {/* Make sure AVAF_QR.jfif is inside your 'public' folder */}
             <img 
               src="/AVAF_QR.jfif" 
               alt="Scan QR to Pay" 
               className="w-48 h-48 object-contain"
               onError={(e) => {e.target.style.display='none'; e.target.parentElement.innerText='Image Not Found in public folder'}} 
             />
             <p className="text-[10px] text-slate-400 mt-2 font-semibold">Accepted: GPay / PhonePe / Paytm</p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 w-full max-w-280px">
            <div className="flex-1 min-w-0">
               <p className="text-[9px] text-slate-400 font-bold uppercase">Official UPI ID</p>
               {/* Display ID text */}
              <p className="text-slate-800 text-xs font-bold truncate">{UPI_ID}</p>
            </div>
            <button onClick={handleCopy} className="text-[#0052AD] p-1 hover:bg-slate-50 rounded-lg" title="Copy UPI ID">
              {copied ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
          </div>
        </div>

        {/* ---  FORM --- */}
        <div className="w-full md:w-7/12 p-8 md:p-10">
          
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Thank You!</h3>
              <p className="text-slate-500 mt-2">Your receipt has been sent to your email.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-[#0052AD] font-bold underline">
                Donate Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 text-[#00A859] mb-4">
                <ShieldCheck size={18} />
                <span className="text-xs font-black uppercase tracking-wider">Get Instant Tax Receipt</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-6">Payment Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Your Name</label>
                  <input required type="text" placeholder="Full Name" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#0052AD]"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Amount (₹)</label>
                  <input required type="number" placeholder="1000" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#0052AD]"
                    value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                <input required type="email" placeholder="To receive receipt" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-[#0052AD]"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">UPI Transaction ID / UTR</label>
                <input required type="text" placeholder="e.g. 403819228..." 
                  className="w-full bg-white border-2 border-dashed border-slate-300 rounded-xl px-4 py-3 font-mono text-sm outline-none focus:border-[#0052AD]"
                  value={formData.transactionId} onChange={(e) => setFormData({...formData, transactionId: e.target.value})}
                />
              </div>

              <button disabled={status === 'loading'} className="w-full bg-[#0052AD] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs mt-4 flex items-center justify-center gap-2 hover:bg-[#003d82] transition-colors">
                {status === 'loading' ? 'Generating Receipt...' : <>Confirm & Get Receipt <Send size={16} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
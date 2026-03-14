import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, BarChart3 } from 'lucide-react';
import { getEndpoint } from '../config';

const ImpactManager = () => {
  const [stats, setStats] = useState({ literacy: 0, arogya: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    fetch(getEndpoint('/api/admin/impact-stats'))
      .then(res => res.json())
      .then(data => setStats({ 
        literacy: data.literacyImpact || 0, 
        arogya: data.arogyaReach || 0 
      }))
      .catch(err => console.error(err));
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      
      const res = await fetch(getEndpoint('/api/admin/update-impact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vidyaImpact: Number(stats.literacy),
          arogyaReach: Number(stats.arogya)
        })
      });
      if (res.ok) {
        alert("AVAF Website Updated Successfully!");
      } else {
        alert(" Update failed on server.");
      }
    } catch (err) {
      alert(" Connection failed. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mb-8 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-[#C5A059]/10 rounded-2xl text-[#C5A059]">
          <BarChart3 size={20} />
        </div>
        <div>
          <h3 className="text-lg font-black text-[#1e293b] leading-none uppercase tracking-tight">Mission Control</h3>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Live Website Metrics</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Vidya Impact (%)</label>
          <div className="relative">
            <input 
              type="number" 
              value={stats.literacy}
              onChange={(e) => setStats({...stats, literacy: e.target.value})}
              className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#C5A059] focus:bg-white transition-all outline-none font-bold text-[#1e293b]"
            />
            <span className="absolute right-4 top-4 text-slate-300 font-bold">%</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Arogya Reach (%)</label>
          <div className="relative">
            <input 
              type="number" 
              value={stats.arogya}
              onChange={(e) => setStats({...stats, arogya: e.target.value})}
              className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all outline-none font-bold text-[#1e293b]"
            />
            <span className="absolute right-4 top-4 text-slate-300 font-bold">%</span>
          </div>
        </div>

        <button 
          onClick={handleUpdate}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-[#1e293b] text-white p-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#C5A059] transition-all disabled:opacity-50 h-56px"
        >
          {loading ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
          {loading ? 'Syncing...' : 'Push Updates Live'}
        </button>
      </div>
    </div>
  );
};

export default ImpactManager;
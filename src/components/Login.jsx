import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, Loader2 } from 'lucide-react'; 
import { getEndpoint } from '../config'; 

const Login = () => {
  const [credentials, setCredentials] = useState({ userid: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setError('');

    try {
      
      const response = await fetch(getEndpoint('/api/auth/login'), { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials), 
      });

      const data = await response.json(); 

      if (response.ok) {
        localStorage.setItem('avaf_token', data.token);
        localStorage.setItem('avaf_user', JSON.stringify(data.user));
        navigate('/admin'); 
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#1e293b] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#C5A059] p-4 rounded-3xl mb-4 shadow-lg shadow-[#C5A059]/30">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-[#1e293b] uppercase tracking-tighter">Worker Access</h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2">AVAF Encrypted Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-300" size={18} />
            <input
              type="text"
              placeholder="Worker UserID"
              className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-[#C5A059] font-bold text-sm"
              onChange={(e) => setCredentials({...credentials, userid: e.target.value})}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-300" size={18} />
            <input
              type="password"
              placeholder="Encryption Key"
              className="w-full pl-12 p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-[#C5A059] font-bold text-sm"
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>

          {error && <p className="text-red-500 text-[10px] font-bold uppercase text-center">{error}</p>}

          <button 
            disabled={loading}
            className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#C5A059] transition-all mt-4 shadow-xl shadow-[#1e293b]/20 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Decrypt & Enter'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
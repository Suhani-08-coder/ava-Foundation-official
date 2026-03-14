import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ userid: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        
        localStorage.setItem('avaf_token', data.token);
        localStorage.setItem('avaf_user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Access Denied');
      }
    } catch (err) {
      setError('Server connection failed. Is your backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1f44] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-[#00A859] p-4 rounded-2xl mb-4">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1e293b] uppercase">AVAF Admin</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="ADMIN ID"
              className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl outline-none text-xs font-bold tracking-widest"
              value={formData.userid}
              onChange={(e) => setFormData({ ...formData, userid: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="password"
              placeholder="SECURE KEY"
              className="w-full pl-14 pr-6 py-5 bg-slate-50 rounded-2xl outline-none text-xs font-bold tracking-widest"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {error && <p className="text-rose-500 text-[10px] font-bold uppercase text-center">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-[#0a1f44] text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#0052AD] transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Verifying...' : 'Initialize System'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
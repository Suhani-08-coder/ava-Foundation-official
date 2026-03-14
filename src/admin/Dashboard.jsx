import React, { useState, useEffect } from 'react';
import { 
  Users, LayoutDashboard, LogOut, ShieldCheck, Image as ImageIcon, 
  Trash2, Award, Menu, Search, Target, Send, PlusCircle, Download,
  Settings, Lock, Bell, Server, Heart, IndianRupee, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import { motion, AnimatePresence } from 'framer-motion';
import ImpactManager from './ImpactManager';
import Sidebar from './sidebar';
import { getEndpoint } from '../config';


const StatCard = ({ title, value, icon, color, accent }) => (
  <div className="bg-white p-8 rounded-2rem border border-slate-100 shadow-sm flex items-center justify-between relative overflow-hidden">
    <div className={`absolute top-0 right-0 w-24 h-24 ${accent} opacity-10 rounded-full -mr-8 -mt-8`} />
    <div className="relative z-10">
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{title}</p>
      <h4 className="text-4xl font-extrabold text-[#1e293b] leading-none">{value}</h4>
    </div>
    <div className={`p-4 rounded-2xl ${color} text-white relative z-10`}>{icon}</div>
  </div>
);

const MediaHandle = () => { 
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchGallery = () => fetch(getEndpoint('/api/media')).then(res => res.json()).then(setGallery);
  useEffect(() => { fetchGallery(); }, []);
  const handlePush = async (e) => {
    e.preventDefault(); setLoading(true); const formData = new FormData(e.target);
    try {
      const res = await fetch(getEndpoint('/api/admin/upload-media'), { method: 'POST', body: formData });
      if (res.ok) { fetchGallery(); e.target.reset(); }
    } catch (err) { alert("Error"); } finally { setLoading(false); }
  };
  return (
    <div className="space-y-10">
      <form onSubmit={handlePush} className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm space-y-6 max-w-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold uppercase text-xs tracking-widest text-[#0052AD]">Push Media</h3>
          <Send size={18} className="text-slate-300" />
        </div>
        <input name="title" type="text" placeholder="Title" className="w-full p-5 bg-slate-50 rounded-2xl outline-none text-sm" required />
        <div className="grid grid-cols-2 gap-4">
          <select name="type" className="p-5 bg-slate-50 rounded-2xl outline-none text-sm font-bold">
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
          <select name="category" className="p-5 bg-slate-50 rounded-2xl outline-none text-sm font-bold text-[#00A859]">
            <option value="mission">Mission Gallery</option>
            <option value="vidya">Vidya (Education)</option>
            <option value="arogya">Arogya (Healthcare)</option>
            <option value="explore">Hero Explore Section</option>
          </select>
        </div>
        <input name="mediaFile" type="file" className="text-[10px] font-bold p-4 border-2 border-dashed rounded-2xl w-full" required />
        <button disabled={loading} className="w-full bg-[#0a1f44] text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
          {loading ? "Syncing..." : <>Publish to Website <Send size={14} /></>}
        </button>
      </form>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {gallery.map(item => (
          <div key={item._id} className="relative group rounded-2rem overflow-hidden aspect-square border border-slate-100">
            <img src={getEndpoint(item.url)} className="w-full h-full object-cover" alt={item.title} />
            <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 text-[8px] font-black uppercase rounded-full text-blue-600">{item.category}</div>
            <button 
              onClick={async () => { 
                if(window.confirm("Delete this media?")){ 
                  await fetch(getEndpoint(`/api/admin/media/${item._id}`), {method: 'DELETE'}); 
                  fetchGallery(); 
                }
              }} 
              className="absolute inset-0 bg-rose-600/90 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all"
            >
              <Trash2 size={24}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MissionControl = ({ onUpdate }) => {  
  const [missions, setMissions] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", progress: 0 });
  const fetchMissions = () => fetch(getEndpoint('/api/missions')).then(res => res.json()).then(setMissions);
  useEffect(() => { fetchMissions(); }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(getEndpoint('/api/admin/missions'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { fetchMissions(); setForm({ title: "", description: "", progress: 0 }); if(onUpdate) onUpdate(); } 
      else { alert("Failed to create mission"); }
    } catch (error) { alert("Server error"); }
  };
  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm space-y-6 max-w-2xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold uppercase text-xs tracking-widest text-[#0052AD]">New Mission</h3>
          <Target size={18} className="text-slate-300" />
        </div>
        <input type="text" placeholder="Title" className="w-full p-5 bg-slate-50 rounded-2xl outline-none" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input type="number" placeholder="Progress %" className="w-full p-5 bg-slate-50 rounded-2xl outline-none" value={form.progress} onChange={e => setForm({...form, progress: e.target.value})} />
        <textarea placeholder="Description" className="w-full p-5 bg-slate-50 rounded-2xl outline-none h-32" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
        <button className="w-full bg-[#0a1f44] text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
          Publish Mission <Send size={14} />
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {missions.map(m => (
          <div key={m._id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <Target className="text-[#0052AD] mb-4" size={24} />
            <h4 className="text-[#1e293b] font-bold uppercase text-lg">{m.title}</h4>
            <div className="mt-6">
              <div className="flex justify-between text-[9px] font-bold uppercase mb-2"><span>Progress</span><span>{m.progress}%</span></div>
              <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${m.progress}%` }}></div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

 /*SettingsManager  */ 
 const SettingsManager = ({ worker }) => {
  const [passData, setPassData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passData.newPassword !== passData.confirmPassword) return setMessage({ type: 'error', text: 'New passwords do not match.' });
    if (passData.newPassword.length < 6) return setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
    setLoading(true);
    try {
      const res = await fetch(getEndpoint('/api/admin/change-password'), {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: worker.userid, oldPassword: passData.oldPassword, newPassword: passData.newPassword })
      });
      const data = await res.json();
      if (res.ok) { setMessage({ type: 'success', text: 'Password successfully updated!' }); setPassData({ oldPassword: '', newPassword: '', confirmPassword: '' }); } 
      else { setMessage({ type: 'error', text: data.message || 'Failed to update password.' }); }
    } catch (err) { setMessage({ type: 'error', text: 'Server connection error.' }); } finally { setLoading(false); }
  };
  return (
    <div className="space-y-8">
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><Lock size={20} /></div>
          <div>
            <h3 className="text-lg font-black text-[#1e293b] uppercase tracking-tight">Security Credentials</h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Update access key for {worker.userid}</p>
          </div>
        </div>
        <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
          <input type="password" placeholder="Current Secure Key" required className="w-full p-4 bg-slate-50 border border-transparent focus:border-rose-200 rounded-2xl outline-none text-xs font-bold tracking-widest" value={passData.oldPassword} onChange={e => setPassData({...passData, oldPassword: e.target.value})} />
          <input type="password" placeholder="New Secure Key" required className="w-full p-4 bg-slate-50 border border-transparent focus:border-[#0052AD] rounded-2xl outline-none text-xs font-bold tracking-widest" value={passData.newPassword} onChange={e => setPassData({...passData, newPassword: e.target.value})} />
          <input type="password" placeholder="Confirm New Key" required className="w-full p-4 bg-slate-50 border border-transparent focus:border-[#0052AD] rounded-2xl outline-none text-xs font-bold tracking-widest" value={passData.confirmPassword} onChange={e => setPassData({...passData, confirmPassword: e.target.value})} />
          {message.text && (<p className={`text-[10px] font-black uppercase mt-2 ${message.type === 'error' ? 'text-rose-500' : 'text-emerald-500'}`}>{message.text}</p>)}
          <button disabled={loading} className="w-full bg-[#1e293b] text-white py-4 mt-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0a1f44] transition-all">
            {loading ? 'Processing...' : 'Update Credentials'}
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4"><div className="p-3 bg-blue-50 text-[#0052AD] rounded-2xl"><Bell size={20} /></div><div><h4 className="font-bold text-[#1e293b] text-sm uppercase tracking-tight">Email Alerts</h4><p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">New volunteer notifications</p></div></div>
          <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div></div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4"><div className="p-3 bg-slate-100 text-slate-400 rounded-2xl"><Server size={20} /></div><div><h4 className="font-bold text-slate-500 text-sm uppercase tracking-tight">Maintenance Mode</h4><p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Take website offline</p></div></div>
          <div className="w-12 h-6 bg-slate-200 rounded-full relative shadow-inner"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm"></div></div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN DASHBOARD COMPONENT ---
const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stats'); 
  const [volunteers, setVolunteers] = useState([]);
  const [donations, setDonations] = useState([]); 
  const [missionCount, setMissionCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [donationSearchTerm, setDonationSearchTerm] = useState(""); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [worker, setWorker] = useState({ name: 'Loading...', userid: '...' });

  const fetchData = async () => {
    try {
      const vRes = await fetch(getEndpoint('/api/admin/volunteers'));
      if (vRes.ok) setVolunteers(await vRes.json());
      
      const mRes = await fetch(getEndpoint('/api/missions'));
      if (mRes.ok) setMissionCount((await mRes.json()).length || 0);

      
      const dRes = await fetch(getEndpoint('/api/admin/donations'));
      if (dRes.ok) setDonations(await dRes.json());
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    const token = localStorage.getItem('avaf_token');
    const userData = localStorage.getItem('avaf_user');
    if (!token || !userData) { navigate('/login', { replace: true }); } 
    else { setWorker(JSON.parse(userData)); fetchData(); }
  }, [navigate]);

  const handleIssueCertificate = async (id) => {
    try {
      const res = await fetch(getEndpoint(`/api/admin/issue-cert/${id}`), { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      if (res.ok) fetchData();
    } catch (err) { alert("Action Failed"); }
  };

  const generatePDF = (v) => { 
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    doc.setDrawColor(10, 31, 68); doc.setLineWidth(2); doc.rect(10, 10, 277, 190);
    doc.setDrawColor(197, 160, 89); doc.setLineWidth(0.5); doc.rect(12, 12, 273, 186);
    doc.setTextColor(10, 31, 68); doc.setFontSize(32); doc.setFont("helvetica", "bold"); doc.text("AWADH VIDYA AROGYA FOUNDATION", 148, 45, { align: "center" });
    doc.setFontSize(14); doc.setTextColor(197, 160, 89); doc.text("NITI AAYOG VERIFIED NGO | SECTION 8 NON-PROFIT", 148, 55, { align: "center" });
    doc.setFontSize(22); doc.setTextColor(10, 31, 68); doc.text("CERTIFICATE OF APPRECIATION", 148, 80, { align: "center" });
    doc.setFontSize(14); doc.setFont("helvetica", "normal"); doc.text("This is to certify that", 148, 100, { align: "center" });
    doc.setFontSize(28); doc.setFont("helvetica", "bold"); doc.setTextColor(197, 160, 89); doc.text(v.name.toUpperCase(), 148, 115, { align: "center" });
    doc.setFontSize(13); doc.setTextColor(50, 50, 50); doc.setFont("helvetica", "normal");
    doc.text(`from ${v.college} has successfully contributed as a volunteer`, 148, 130, { align: "center" });
    doc.text(`in the domain of ${v.interest}. This certificate is proudly presented in recognition`, 148, 138, { align: "center" });
    doc.text(`of their exceptional dedication, hard work, and commitment to our Vision 2040`, 148, 146, { align: "center" });
    doc.text(`initiatives for universal equity in grassroots education and healthcare.`, 148, 154, { align: "center" });
    doc.setFontSize(11); doc.setTextColor(10, 31, 68); doc.setFont("helvetica", "bold"); doc.text(`Issued on: ${new Date().toLocaleDateString()}`, 148, 170, { align: "center" });
    doc.setDrawColor(10, 31, 68); doc.setLineWidth(0.5); doc.line(40, 180, 100, 180); doc.text("President / Director", 70, 186, { align: "center" });
    doc.line(196, 180, 256, 180); doc.text("Program Head", 226, 186, { align: "center" });
    doc.setDrawColor(197, 160, 89); doc.setLineWidth(0.8); doc.circle(148, 182, 12); doc.circle(148, 182, 10);
    doc.setFontSize(7); doc.setTextColor(197, 160, 89); doc.setFont("helvetica", "bold"); doc.text("VERIFIED", 148, 179, { align: "center" });
    doc.text("NGO", 148, 183, { align: "center" }); doc.setFontSize(5); doc.text("GOVT. OF INDIA", 148, 187, { align: "center" });
    doc.save(`${v.name}_AVAF_Certificate.pdf`);
  };

  const filteredVolunteers = volunteers.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.college.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  DONATIONS FILTER & TOTALS
  const filteredDonations = donations.filter(d => 
    d.name.toLowerCase().includes(donationSearchTerm.toLowerCase()) ||
    d.transactionId.toLowerCase().includes(donationSearchTerm.toLowerCase())
  );
  const totalFunds = donations.reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans">
      <div className={`fixed inset-y-0 left-0 z-110 w-72 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:sticky lg:h-screen shadow-2xl lg:shadow-none`}>
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }} />
      </div>

      <main className="flex-1 p-6 lg:p-12 overflow-y-auto w-full">
        <header className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-3 bg-white rounded-xl shadow-sm" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} className="text-[#0a1f44]" />
            </button>
            <div>
              <h1 className="text-4xl font-extrabold text-[#1e293b] uppercase leading-none mb-2">Welcome, {worker.name}</h1>
              <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md">
                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Node
                </div>
                <span>ID: {worker.userid}</span>
              </div>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            
            {activeTab === 'stats' && (
              <div className="space-y-10">
                <ImpactManager />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard title="Total Funds" value={`₹${totalFunds.toLocaleString()}`} icon={<IndianRupee size={20}/>} color="bg-[#C5A059]" accent="bg-amber-500" />
                  <StatCard title="Workforce" value={volunteers.length} icon={<Users size={20}/>} color="bg-[#0052AD]" accent="bg-blue-500" />
                  <StatCard title="Certified" value={volunteers.filter(v => v.certIssued).length} icon={<Award size={20}/>} color="bg-[#00A859]" accent="bg-emerald-500" />
                  <StatCard title="Missions" value={missionCount} icon={<Target size={20}/>} color="bg-[#0a1f44]" accent="bg-slate-500" />
                </div>
              </div>
            )}

            
            {activeTab === 'donations' && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2rem border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-black text-[#1e293b] uppercase tracking-tight flex items-center gap-2">
                    <Heart className="text-rose-500" size={20}/> Donation Ledger
                  </h2>
                  <div className="relative group w-full md:w-96">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" placeholder="Search by donor name or TxID..." 
                      className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent hover:border-slate-200 rounded-2xl outline-none text-xs font-bold tracking-widest focus:ring-2 focus:ring-[#0052AD]/10 transition-all"
                      value={donationSearchTerm} onChange={(e) => setDonationSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 overflow-x-auto">
                  <table className="w-full text-left min-w-800px">
                    <thead className="text-[10px] uppercase text-slate-400 font-bold border-b">
                      <tr>
                        <th className="pb-4 px-4">Date</th>
                        <th className="pb-4">Donor Name</th>
                        <th className="pb-4">Email</th>
                        <th className="pb-4">Amount</th>
                        <th className="pb-4">Transaction ID</th>
                        <th className="pb-4 text-right">Receipt Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDonations.length > 0 ? (
                        filteredDonations.map(d => (
                          <tr key={d._id} className="border-b last:border-0 hover:bg-slate-50/50 transition-colors">
                            <td className="py-6 px-4 text-slate-500 text-xs font-medium">{new Date(d.date).toLocaleDateString()}</td>
                            <td className="py-6 font-bold text-sm text-[#1e293b]">{d.name}</td>
                            <td className="py-6 text-slate-500 text-xs">{d.email}</td>
                            <td className="py-6 font-black text-[#00A859]">₹{d.amount.toLocaleString()}</td>
                            <td className="py-6"><span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-mono uppercase tracking-wider">{d.transactionId}</span></td>
                            <td className="py-6 text-right px-4">
                              {d.receiptSent ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-bold uppercase"><CheckCircle size={12}/> Sent</span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[9px] font-bold uppercase">Pending</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="6" className="text-center py-10 text-slate-400 font-bold text-xs uppercase tracking-widest">No donations found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VOLUNTEERS  */}
            {activeTab === 'volunteers' && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2rem border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-black text-[#1e293b] uppercase tracking-tight">Workforce Directory</h2>
                  <div className="relative group w-full md:w-96">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Search by name or college..." className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent hover:border-slate-200 rounded-2xl outline-none text-xs font-bold tracking-widest focus:ring-2 focus:ring-[#0052AD]/10 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 overflow-x-auto">
                  <table className="w-full text-left min-w-600px">
                    <thead className="text-[10px] uppercase text-slate-400 font-bold border-b">
                      <tr>
                        <th className="pb-4 px-4">Name</th><th className="pb-4">College</th><th className="pb-4">Domain</th><th className="pb-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVolunteers.length > 0 ? (
                        filteredVolunteers.map(v => (
                          <tr key={v._id} className="border-b last:border-0 group">
                            <td className="py-6 px-4 font-bold text-sm text-[#1e293b]">{v.name}</td>
                            <td className="py-6 text-slate-500 text-xs">{v.college}</td>
                            <td className="py-6"><span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[9px] font-bold uppercase">{v.interest}</span></td>
                            <td className="py-6 text-right px-4">
                              <div className="flex items-center justify-end gap-3">
                                {!v.certIssued ? (
                                  <button onClick={() => handleIssueCertificate(v._id)} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all"><PlusCircle size={14} /> Mark Certified</button>
                                ) : (
                                  <button onClick={() => generatePDF(v)} className="flex items-center gap-2 px-4 py-2 bg-[#0052AD] text-white rounded-xl text-[10px] font-black uppercase hover:bg-[#0a1f44] transition-all shadow-md"><Download size={14} /> Certificate</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4" className="text-center py-10 text-slate-400 font-bold text-xs uppercase tracking-widest">No volunteers found matching your search.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'missions' && <MissionControl onUpdate={fetchData} />}
            {activeTab === 'reports' && <MediaHandle />} 
            {activeTab === 'settings' && <SettingsManager worker={worker} />} 

          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
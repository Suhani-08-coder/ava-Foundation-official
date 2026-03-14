import React, { useState } from 'react';
import { 
  ShieldCheck, Globe, Mail,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import QRCodeModal from './QRCodeModal';

// --- 1. LEADERSHIP TEAM ---
const leadershipTeam = [
  {
    id: 1,
    name: "Brijesh Kumar Yadav",
    role: "Founder Director",
    description: "Leading the foundation's strategic vision. Passionate about bringing systemic changes to grassroots education and healthcare.",
    photo: "/team/brijesh.jpg", 
    
  },
  {
    id: 2,
    name: "Shivam Yadav",
    role: "CEO & Co-Founder",
    description: "Overseeing daily operations and volunteer coordination. Ensures that all on-ground missions run smoothly and ethically.",
    photo: "/team/shivam.jpeg", 
    
  },
  {
    id: 3,
    name: "Suhani Yadav",
    role: "Chief Technical Officer (CTO)",
    description: "Manages the digital infrastructure, AVAF platform development, and technical resource allocation for maximum foundation impact.",
    photo: "/team/suhani.jpeg", 
    
    
  },
  {
    id: 4,
    name: "Shresth Shukla",
    role: "Chief Marketing Officer (CMO)",
    description: "Leads marketing strategies and outreach programs to expand the foundation's visibility and engagement.",
    photo: "/team/shrestha.jpeg", 
    
  },
  {
    id: 5,
    name: "Shiv Vishvakarma",
    role: "Chief Regional Officer (CRO)",
    description: "Oversees regional operations and ensures effective implementation of foundation initiatives across different zones.",
    photo: "/team/shiv.jpeg", 
  },
  {
    id: 6,
    name: "Ayush Dixit",
    role: "Regional Head",
    description: "Coordinates regional activities and manages on-ground teams for efficient mission execution.",
    photo: "/team/ayush.jpg", 
  }
];


const TeamCard = ({ member, iconColor }) => (
  <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-[450px] border border-slate-100">
    
    <div className="absolute inset-0 w-full h-full">
      {member.photo ? (
        <img 
          src={member.photo} 
          alt={member.name} 
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
          onError={(e) => {
             e.target.onerror = null; 
             e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0a1f44&color=fff&size=512`;
          }}
        />
      ) : (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0a1f44&color=fff&size=512&font-size=0.33`} 
            alt={member.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
     
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
    </div>
    
    {/* Default Visible Info (Bottom) */}
    <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500 group-hover:translate-y-10 group-hover:opacity-0 z-10">
      <h3 className="text-2xl font-black text-white leading-tight mb-2 tracking-tight">{member.name}</h3>
      <div className="flex items-center gap-2">
         <div className="h-1 w-8 bg-[#C5A059] rounded-full"></div>
         <p className={`${iconColor} text-[10px] font-black uppercase tracking-widest text-slate-200`}>{member.role}</p>
      </div>
    </div>

    {/* Dropdown Hover Effect (Reveals Details) */}
    <div className="absolute inset-0 bg-[#0a1f44]/95 backdrop-blur-md p-8 flex flex-col justify-center items-start transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-20">
      <div className={`w-14 h-14 rounded-full border-2 ${iconColor === 'text-[#C5A059]' ? 'border-[#C5A059]' : 'border-white'} p-0.5 mb-6 overflow-hidden bg-white shadow-lg`}>
         {member.photo ? (
           <img src={member.photo} className="w-full h-full object-cover rounded-full" alt="avatar" />
         ) : (
           <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=C5A059&color=fff`} className="w-full h-full rounded-full" alt="avatar" />
         )}
      </div>

      <h4 className="text-white text-2xl font-black mb-1 leading-tight tracking-tight">{member.name}</h4>
      <p className={`${iconColor} text-[10px] font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4 w-full`}>
        {member.role}
      </p>

      <p className="text-slate-300 text-sm leading-relaxed mb-8">
        {member.description}
      </p>

      <div className="flex items-center gap-4 mt-auto w-full">
        {member.linkedin && (
          <a href={member.linkedin} className="p-3 bg-white/5 hover:bg-[#0052AD] text-white rounded-xl transition-colors">
            <Linkedin size={18} />
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`} className="p-3 bg-white/5 hover:bg-[#00A859] text-white rounded-xl transition-colors">
            <Mail size={18} />
          </a>
        )}
      </div>
    </div>
  </div>
);

const TeamPage = () => {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Navbar onOpenDonate={() => setIsDonateOpen(true)} />

      <main className="pt-32 pb-20">
       
        <section className="relative max-w-7xl mx-auto px-6 mb-20 text-center">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full mb-6 shadow-sm animate-fade-in-up">
              <ShieldCheck size={14} className="text-[#0052AD]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Board of Directors</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#1e293b] tracking-tighter mb-6">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052AD] to-[#00A859]">Leadership.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              The founding minds driving Awadh Vidya Arogya Foundation towards our Vision 2040. Committed to transparency, impact, and systemic change.
            </p>
          </div>
        </section>

        
        <section className="max-w-7xl mx-auto px-6 mb-24">
           
           <div className="text-center mb-12">
             <h2 className="text-2xl font-black text-[#1e293b] uppercase tracking-tight">Executive Core</h2>
             <div className="h-1 w-12 bg-[#0052AD] mx-auto mt-2 rounded-full"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
             {leadershipTeam.map(member => (
               <TeamCard key={member.id} member={member} iconColor="text-[#C5A059]" />
             ))}
           </div>
        </section>

        
        <section className="mt-32 max-w-7xl mx-auto px-6">
          <div className="bg-[#1e293b] rounded-[3rem] p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center shadow-2xl border-t border-slate-700">
             <Globe className="absolute -right-10 -bottom-10 text-white opacity-5" size={300} />
             <ShieldCheck size={48} className="text-[#C5A059] mb-6 relative z-10" />
             <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight relative z-10">
               100% Non-Profit Leadership
             </h2>
             <p className="text-slate-400 max-w-2xl text-lg relative z-10">
               Our core team operates on a strict zero-profit distribution policy. All funding goes directly toward educational and healthcare missions.
             </p>
          </div>
        </section>

      </main>

      <Footer />
      <QRCodeModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
    </div>
  );
};

export default TeamPage;
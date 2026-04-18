import React, { useState } from 'react';
import { 
  ShieldCheck, Globe, Mail, Linkedin, Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import QRCodeModal from './QRCodeModal';

// --- 1. LEADERSHIP TEAM DATA ---
const leadershipTeam = [
  {
    id: 1,
    name: "Brijesh Kumar Yadav",
    role: "Founder Director",
    description: "Leading the foundation's strategic vision. Passionate about bringing systemic changes to grassroots education and healthcare.",
    photo: "/team/BrijeshYadav.jpeg", 
  },
  {
    id: 2,
    name: "Shivam Yadav",
    role: "CEO & Co-Founder",
    description: "Overseeing daily operations and volunteer coordination. Ensures that all on-ground missions run smoothly and ethically.",
    photo: "/team/sh.jpeg", 
  },
  {
    id: 3,
    name: "Suhani Yadav",
    role: "Chief Technical Officer (CTO)",
    description: "Manages the digital infrastructure, AVAF platform development, and technical resource allocation for maximum foundation impact.",
    photo: "/team/su.jpeg", 
  },
  {
    id: 4,
    name: "Shresth Shukla",
    role: "Chief Marketing Officer (CMO)",
    description: "Leads marketing strategies and outreach programs to expand the foundation's visibility and engagement.",
    photo: "/team/shr.jpeg", 
  },
  {
    id: 5,
    name: "Shiv Vishvakarma",
    role: "Chief Regional Officer (CRO)",
    description: "Oversees regional operations and ensures effective implementation of foundation initiatives across different zones.",
    photo:"/team/sd.jpeg" , 
  },
  
];

const TeamCard = ({ member }) => (
  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-[420px] border border-slate-200">
    <div className="absolute inset-0 w-full h-full">
      {member.photo ? (
        <img 
          src={member.photo} 
          alt={member.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          onError={(e) => {
             e.target.onerror = null; 
             e.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0052AD&color=fff&size=512`;
          }}
        />
      ) : (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0052AD&color=fff&size=512`} 
            alt={member.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70"></div>
    </div>
    
    {/* Default Info */}
    <div className="absolute bottom-0 left-0 w-full p-6 transition-opacity duration-300 group-hover:opacity-0 z-10">
      <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
      <p className="text-[#00A859] text-[10px] font-bold uppercase tracking-widest">{member.role}</p>
    </div>

    {/* Hover Overlay */}
    <div className="absolute inset-0 bg-[#1e293b]/fb backdrop-blur-sm p-8 flex flex-col justify-center items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
      <h4 className="text-white text-xl font-bold mb-1">{member.name}</h4>
      <p className="text-[#00A859] text-[10px] font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-2 w-full">
        {member.role}
      </p>
      <p className="text-slate-300 text-sm leading-relaxed mb-6">
        {member.description}
      </p>
      <div className="flex gap-3 mt-auto">
        <button className="p-2 bg-white/10 hover:bg-[#0052AD] text-white rounded-lg transition-colors">
          <Mail size={16} />
        </button>
        <button className="p-2 bg-white/10 hover:bg-[#0052AD] text-white rounded-lg transition-colors">
          <Linkedin size={16} />
        </button>
      </div>
    </div>
  </div>
);

const TeamPage = () => {
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar onOpenDonate={() => setIsDonateOpen(true)} />

      <main className="pt-28 pb-20">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full mb-4">
            <ShieldCheck size={12} className="text-[#0052AD]" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">Our Leadership</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Meet the <span className="text-[#0052AD]">Visionaries.</span>
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The dedicated team behind AVAF, working tirelessly towards sustainable health and education in Prayagraj and beyond.
          </p>
        </section>

        {/* Team Grid */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map(member => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Trust Banner */}
        <section className="mt-24 max-w-5xl mx-auto px-6">
          <div className="bg-slate-50 rounded-2xl p-10 border border-slate-100 text-center">
            <Heart className="text-[#00A859] mx-auto mb-4" size={32} />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Volunteer-Led Excellence</h2>
            <p className="text-slate-500 text-sm">
              Our core team operates with 100% transparency. Every resource is directed toward ground-level impact.
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
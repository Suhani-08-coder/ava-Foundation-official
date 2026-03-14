import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Upload, Trash2, FileDown } from 'lucide-react';
import { getEndpoint } from '../config';

const DocumentManager = ({ userid }) => {
  
  const [documents, setDocuments] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [docRes, volRes] = await Promise.all([
        fetch(getEndpoint('/api/admin/documents')), 
        fetch(getEndpoint('/api/admin/volunteers'))
      ]);
      const docs = await docRes.json();
      const vols = await volRes.json();
      setDocuments(docs);
      setVolunteers(vols);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  
  const exportTeamCSV = () => {
    const headers = "Name,Email,College,Interest,JoinedDate\n";
    const rows = volunteers.map(v => 
      `${v.name},${v.email},${v.college},${v.interest},${new Date(v.joinedAt).toLocaleDateString()}`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AVAF_Team_Export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };


  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Please provide a title and select a file");

    const formData = new FormData();
    formData.append('document', file);
    formData.append('title', title);
    formData.append('userid', userid);

    try {
      
      const res = await fetch(getEndpoint('/api/admin/upload-doc'), {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setTitle("");
        setFile(null);
        fetchData();
      }
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div className="space-y-8">
     
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">System Management</h2>
        <button 
          onClick={exportTeamCSV}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all"
        >
          <FileDown size={14} /> Export Team CSV
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <form onSubmit={handleUpload} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059] mb-6">Scan New Document</h3>
            <input 
              type="text" 
              placeholder="Document Title"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-xs mb-4 outline-none focus:ring-2 focus:ring-[#C5A059]/20"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-slate-50 mb-4 transition-all">
              <Upload className="text-slate-400 mb-2" size={20} />
              <span className="text-[10px] font-bold text-slate-500 uppercase">{file ? file.name : "Tap to Scan / Upload"}</span>
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} capture="environment" />
            </label>
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#C5A059] transition-all">
              Secure Store
            </button>
          </form>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
             
             <div className="divide-y divide-slate-50">
              {documents.map((doc) => (
                <div key={doc._id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-all">
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{doc.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-medium">Uploaded by: {doc.uploadedBy}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                   
                    <a 
                      href={getEndpoint(doc.fileUrl)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 text-slate-400 hover:text-[#C5A059] hover:bg-[#C5A059]/5 rounded-xl transition-all"
                    >
                      <Eye size={18} />
                    </a>
                    <a 
                      href={getEndpoint(doc.fileUrl)} 
                      download
                      className="p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                    >
                      <Download size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
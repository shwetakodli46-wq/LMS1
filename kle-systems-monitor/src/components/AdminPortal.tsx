import React, { useState } from 'react';
import { ShieldAlert, Users, Server, Globe, Settings, Lock, UserPlus, ClipboardList, Activity } from 'lucide-react';
import { SystemModal } from './SystemModal';
import { Student, ContactRequest } from '../types';

interface AdminPortalProps {
  students?: Student[];
  contactRequests?: ContactRequest[];
  onAdmitStudent?: (requestId: string) => void;
  onDeleteRequest?: (requestId: string) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ 
  students = [], 
  contactRequests = [],
  onAdmitStudent,
  onDeleteRequest
}) => {
  const [selectedSystem, setSelectedSystem] = useState<{
    title: string;
    description: string;
    type: 'users' | 'infrastructure' | 'network';
  } | null>(null);
  const [activeView, setActiveView] = useState<'system' | 'admissions'>('system');

  const handleOpenSystem = (title: string, description: string, type: 'users' | 'infrastructure' | 'network') => {
    setSelectedSystem({ title, description, type });
  };
  return (
    <div className="bg-[#15151e] min-h-screen text-white font-sans selection:bg-[#e10600] selection:text-white">
      <div className="relative h-48 bg-[#e10600] flex items-center border-b-8 border-black">
        <div className="max-w-[1500px] mx-auto px-4 w-full flex items-end justify-between pb-8">
          <div className="flex items-center gap-6">
            <div className="bg-black p-4 rounded-full border-4 border-white">
              <ShieldAlert size={40} className="text-[#e10600]" />
            </div>
            <div>
              <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Administration</h1>
              <p className="text-[#ff9d99] text-xs font-black uppercase tracking-[0.2em] mt-2">Library Infrastructure Monitor</p>
            </div>
          </div>
          <div className="hidden lg:flex gap-6 items-center">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveView('system')}
                className={`text-[10px] font-black uppercase tracking-widest px-6 py-2 transition-all ${activeView === 'system' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
              >
                System Core
              </button>
              <button 
                onClick={() => setActiveView('admissions')}
                className={`text-[10px] font-black uppercase tracking-widest px-6 py-2 transition-all ${activeView === 'admissions' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
              >
                Admissions
              </button>
            </div>
             <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-8 bg-black/20 skew-x-[-20deg]" />
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-12">
        {/* Quick Stats Banner - Always Visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-black p-6 border-l-4 border-green-500 shadow-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Total Students</p>
              <h4 className="text-3xl font-black italic uppercase tracking-tighter">{students.length}</h4>
            </div>
            <UserPlus size={32} className="text-green-500 opacity-20" />
          </div>
          <div className="bg-black p-6 border-l-4 border-[#e10600] shadow-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Pending Admissions</p>
              <h4 className="text-3xl font-black italic uppercase tracking-tighter">{contactRequests.filter(r => r.status === 'pending').length}</h4>
            </div>
            <ClipboardList size={32} className="text-[#e10600] opacity-20" />
          </div>
          <div className="bg-black p-6 border-l-4 border-blue-500 shadow-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Active Queries</p>
              <h4 className="text-3xl font-black italic uppercase tracking-tighter">
                {Math.floor(students.length * 1.5) + contactRequests.length + 12}
              </h4>
            </div>
            <Activity size={32} className="text-blue-500 opacity-20" />
          </div>
          <div className="bg-black p-6 border-l-4 border-white shadow-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">System Load</p>
              <h4 className="text-3xl font-black italic uppercase tracking-tighter">
                {Math.min(5 + (students.length * 2) + Math.floor(contactRequests.length / 2), 99)}%
              </h4>
            </div>
            <Server size={32} className="text-white opacity-20" />
          </div>
        </div>

        {activeView === 'system' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div 
                className="bg-black p-8 rounded border-b-4 border-[#e10600] shadow-2xl relative overflow-hidden group cursor-pointer hover:translate-y-[-4px] transition-all"
                onClick={() => handleOpenSystem('User Management', 'Configure roles, permissions, and security protocols for students and staff.', 'users')}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#e10600] translate-x-12 -translate-y-12 rotate-45 group-hover:translate-x-10 group-hover:-translate-y-10 transition-transform" />
                <Users className="mb-6 text-[#e10600]" size={32} />
                <h3 className="text-2xl font-black italic uppercase italic tracking-tighter mb-2">User Management</h3>
                <p className="text-gray-500 text-sm font-medium">Configure roles, permissions, and security protocols for students and staff.</p>
                <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-[#e10600]">Manage Users →</div>
              </div>

              <div 
                className="bg-black p-8 rounded border-b-4 border-white shadow-2xl relative overflow-hidden group cursor-pointer hover:translate-y-[-4px] transition-all"
                onClick={() => handleOpenSystem('System Infrastructure', 'Monitor server load, database latency, and API endpoint health.', 'infrastructure')}
              >
                <Server className="mb-6 text-white" size={32} />
                <h3 className="text-2xl font-black italic uppercase italic tracking-tighter mb-2">System Infrastructure</h3>
                <p className="text-gray-500 text-sm font-medium">Monitor server load, database latency, and API endpoint health.</p>
                <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-white">System Health →</div>
              </div>

              <div 
                className="bg-black p-8 rounded border-b-4 border-blue-600 shadow-2xl relative overflow-hidden group cursor-pointer hover:translate-y-[-4px] transition-all"
                onClick={() => handleOpenSystem('Network Topology', 'Review global access logs and mitigate unauthorized entry attempts.', 'network')}
              >
                <Globe className="mb-6 text-blue-600" size={32} />
                <h3 className="text-2xl font-black italic uppercase italic tracking-tighter mb-2">Network Topology</h3>
                <p className="text-gray-500 text-sm font-medium">Review global access logs and mitigate unauthorized entry attempts.</p>
                <div className="mt-8 text-[10px] font-black uppercase tracking-widest text-blue-600">Traffic Logs →</div>
              </div>
            </div>

            <div className="mt-12 bg-black/50 p-8 rounded border border-gray-800">
               <div className="flex items-center gap-4 mb-8">
                 <Settings className="text-[#949498]" />
                 <h2 className="text-xl font-black uppercase italic tracking-tighter">Control Console</h2>
               </div>
               
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Cloud Firestore', value: 'ENTERPRISE', status: 'Online' },
                    { label: 'Authentication', value: 'GOOGLE_OAUTH', status: 'Online' },
                    { label: 'CDN Endpoints', value: 'GLOBAL_12', status: 'Online' },
                    { label: 'Auto-Backup', value: 'ENABLED', status: 'Standby' }
                  ].map(stat => (
                    <div key={stat.label} className="bg-black p-4 border border-gray-800 rounded">
                      <p className="text-[10px] uppercase text-gray-500 font-black tracking-widest mb-1">{stat.label}</p>
                      <p className="text-lg font-black italic uppercase">{stat.value}</p>
                      <div className="flex items-baseline gap-2 mt-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] uppercase font-bold text-green-500">{stat.status}</span>
                      </div>
                    </div>
                  ))}
               </div>

               <div className="mt-12 bg-gray-900 p-4 rounded font-mono text-xs text-green-400 border-l-2 border-green-500 overflow-x-auto">
                  <p>[05:40:52] SEC_AUDIT_DAEMON initialized: Success</p>
                  <p>[05:40:53] AUTH_PROVIDER connected: kle-college-firebase-auth</p>
                  <p>[05:40:54] DB_PULL: Inventory sync complete ({students.length + contactRequests.length} records indexed)</p>
                  <p>[05:41:00] NODE_HEALTH_CHECK: System status online</p>
                  <p className="animate-pulse">_</p>
               </div>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Admissions Queue */}
              <div className="flex-1 space-y-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-2 h-8 bg-[#e10600]" />
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">Admission Transmission Queue</h2>
                </div>

                {contactRequests.length === 0 ? (
                  <div className="bg-black p-12 text-center border-2 border-dashed border-gray-800">
                    <p className="text-gray-500 font-black uppercase italic tracking-widest">No Incoming Transmissions</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contactRequests.map(request => (
                      <div key={request.id} className="bg-black p-6 border-l-4 border-white hover:border-[#e10600] transition-all group">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                               <span className={`text-[8px] font-black uppercase px-2 py-0.5 tracking-widest ${request.status === 'pending' ? 'bg-blue-600/20 text-blue-400' : 'bg-green-600/20 text-green-400'}`}>
                                 {request.status}
                               </span>
                               <h4 className="text-xl font-black italic uppercase text-white mt-1">{request.name}</h4>
                               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{request.email}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[8px] text-gray-600 font-black uppercase">{request.id}</p>
                               <p className="text-[8px] text-gray-600 font-black uppercase">{new Date(request.timestamp).toLocaleDateString()}</p>
                            </div>
                         </div>
                         <div className="bg-white/5 p-4 text-[10px] text-gray-400 font-medium italic border-l border-white/10 mb-6">
                            "{request.message}"
                         </div>
                         <div className="flex gap-2">
                            {request.status === 'pending' && (
                              <button 
                                onClick={() => onAdmitStudent?.(request.id)}
                                className="bg-[#e10600] hover:bg-white hover:text-black text-white px-6 py-2 text-[9px] font-black uppercase italic tracking-widest transition-all transform hover:skew-x-[-10deg]"
                              >
                                Authorize Admission
                              </button>
                            )}
                            <button 
                              onClick={() => onDeleteRequest?.(request.id)}
                              className="bg-white/5 hover:bg-red-600 hover:text-white text-gray-500 px-6 py-2 text-[9px] font-black uppercase italic tracking-widest transition-all"
                            >
                              Discard
                            </button>
                         </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Secure Student Ledger */}
              <div className="w-full lg:w-1/3">
                <div className="bg-black p-8 border-t-4 border-green-500 shadow-2xl">
                   <div className="flex items-center gap-3 mb-8">
                      <Users size={20} className="text-green-500" />
                      <h3 className="text-xl font-black italic uppercase tracking-tighter">Registered Student Archive</h3>
                   </div>

                   {students.length === 0 ? (
                     <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest text-center py-12">Archive Empty - No Records Found</p>
                   ) : (
                     <div className="space-y-4">
                        {students.map(student => (
                          <div key={student.id} className="border-b border-white/5 pb-4">
                             <p className="text-white font-black uppercase italic text-sm">{student.name}</p>
                             <div className="flex justify-between items-center mt-1">
                                <span className="text-[8px] text-gray-500 font-bold uppercase">{student.email}</span>
                                <span className="text-[8px] text-green-500 font-black uppercase tracking-widest">ACTIVE</span>
                             </div>
                             <div className="flex justify-between items-center mt-3">
                                <span className="text-[7px] text-gray-600 font-black uppercase">UID: {student.id}</span>
                                <span className="text-[7px] text-gray-600 font-black uppercase">REG: {new Date(student.admissionDate).toLocaleDateString()}</span>
                             </div>
                          </div>
                        ))}
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="max-w-[1500px] mx-auto px-4 pb-20 text-center">
         <button className="inline-flex items-center gap-3 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-500/30 px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs transition-all">
           <Lock size={16} />
           Security Lockdown
         </button>
      </div>
      {selectedSystem && (
        <SystemModal
          isOpen={!!selectedSystem}
          onClose={() => setSelectedSystem(null)}
          title={selectedSystem.title}
          description={selectedSystem.description}
          type={selectedSystem.type}
        />
      )}
    </div>
  );
};

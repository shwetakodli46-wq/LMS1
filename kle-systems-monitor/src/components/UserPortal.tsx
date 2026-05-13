import React from 'react';
import { motion } from 'motion/react';
import { User, Book, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Student, Book as BookType } from '../types';
import { BookGrid } from './BookGrid';

interface UserPortalProps {
  user?: Student;
  borrowedBooks: BookType[];
}

export const UserPortal: React.FC<UserPortalProps> = ({ user, borrowedBooks }) => {
  if (!user) return (
    <div className="min-h-screen bg-[#15151e] flex flex-col items-center justify-center p-4">
      <AlertTriangle className="text-[#e10600] mb-6" size={64} />
      <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-4">No Identity Found</h2>
      <p className="text-gray-500 italic max-w-sm text-center mb-8">
        Your access footprint is not recognized by the current terminal. Please authenticate via the main portal.
      </p>
      <button className="bg-[#e10600] text-white px-8 py-4 font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all transform hover:skew-x-[-10deg]">
        Login to Matrix
      </button>
    </div>
  );

  return (
    <div className="bg-[#15151e] min-h-screen text-white font-sans">
      <div className="relative h-48 bg-blue-600 flex items-center border-b-8 border-black">
        <div className="max-w-[1500px] mx-auto px-4 w-full flex items-end justify-between pb-8">
          <div className="flex items-center gap-6">
            <div className="bg-black p-4 rounded-sm border-2 border-white overflow-hidden group">
              <User size={40} className="text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">{user.name}</h1>
              <p className="text-blue-200 text-xs font-black uppercase tracking-[0.2em] mt-2">Student Access ID: {user.id}</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4 bg-black/20 p-4 rounded-sm border border-white/10">
             <ShieldCheck className="text-blue-200" />
             <div className="text-[10px] font-black uppercase tracking-widest text-blue-100">
                Identity Verified
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Quick Info & Stats */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-black p-8 border-l-4 border-blue-600 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600 opacity-5 -translate-y-12 translate-x-12 rotate-45" />
               <h3 className="text-xl font-black italic uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                 <Clock className="text-blue-600" size={20} />
                 Temporal Status
               </h3>
               <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Registration Date</p>
                    <p className="text-xl font-black italic uppercase italic">{new Date(user.admissionDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Current Balance</p>
                    <p className="text-xl font-black italic uppercase italic">0.00 Credits</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">Active Borrows</p>
                    <p className="text-xl font-black italic uppercase italic">{borrowedBooks.length} VOLUMES</p>
                  </div>
               </div>
            </div>

            <div className="bg-zinc-900/50 p-8 border border-white/5 space-y-6">
               <h3 className="text-lg font-black italic uppercase italic tracking-tighter">Campus Permissions</h3>
               <div className="space-y-3">
                  {[
                    { label: 'Central Library', status: 'GRANTED' },
                    { icon: '', label: 'Tech Lab Alpha', status: 'GRANTED' },
                    { icon: '', label: 'Auditorium Access', status: 'PENDING' },
                    { icon: '', label: 'Admin Archive', status: 'RESTRICTED' }
                  ].map(perm => (
                    <div key={perm.label} className="flex justify-between items-center bg-black/40 p-3 border border-white/5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{perm.label}</span>
                      <span className={`text-[9px] font-black italic ${perm.status === 'GRANTED' ? 'text-green-500' : perm.status === 'PENDING' ? 'text-blue-500' : 'text-red-600'}`}>
                        {perm.status}
                      </span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <BookGrid 
              title="Borrows: Current Loadout" 
              books={borrowedBooks} 
              actionLabel="Request Renewal"
              onAction={(id) => console.log('Renew', id)}
            />
            {borrowedBooks.length === 0 && (
              <div className="bg-black p-20 text-center border-2 border-dashed border-white/5 opacity-50">
                <Book className="mx-auto mb-6 text-gray-700" size={48} />
                <p className="text-gray-600 font-black uppercase italic tracking-widest">No Active Borrows Detected</p>
                <button className="mt-8 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-white transition-colors">
                  BROWSE COLLECTION →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

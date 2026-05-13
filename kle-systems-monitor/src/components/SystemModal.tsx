import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Lock, ShieldAlert, Cpu } from 'lucide-react';

interface SystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  type: 'users' | 'infrastructure' | 'network';
}

export const SystemModal: React.FC<SystemModalProps> = ({ isOpen, onClose, title, description, type }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#1a1a24] border-2 border-white/10 shadow-[0_0_50px_rgba(225,6,0,0.1)] overflow-hidden"
          >
            {/* Brutalist Header Decoration */}
            <div className="h-2 bg-[#e10600] w-full" />
            <div className="absolute top-0 right-0 p-4 flex gap-2">
               <div className="w-2 h-2 bg-white/20 rounded-full" />
               <div className="w-2 h-2 bg-white/20 rounded-full" />
               <div className="w-2 h-2 bg-white/20 rounded-full" />
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-black border border-[#e10600] rounded-sm">
                    {type === 'users' && <Shield className="text-[#e10600]" size={24} />}
                    {type === 'infrastructure' && <Cpu className="text-[#e10600]" size={24} />}
                    {type === 'network' && <ShieldAlert className="text-[#e10600]" size={24} />}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">{title}</h2>
                    <p className="text-[#e10600] text-[10px] font-black uppercase tracking-[0.2em] mt-2">Access Level: Administrator</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 transition-colors rounded-full text-gray-500 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-black/50 p-6 border border-white/5 rounded">
                  <p className="text-gray-400 font-medium leading-relaxed italic">
                    "{description}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-black p-4 border-l-2 border-white/20">
                      <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest mb-1">Status</p>
                      <p className="text-white font-black italic uppercase">Operational</p>
                   </div>
                   <div className="bg-black p-4 border-l-2 border-white/20">
                      <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest mb-1">Secure Hash</p>
                      <p className="text-white font-mono text-[10px] opacity-60">SHA-256: 8F9D...E2A1</p>
                   </div>
                </div>

                <div className="pt-8 flex gap-4">
                   <button className="flex-1 bg-white text-black py-4 font-black uppercase italic tracking-widest hover:bg-[#e10600] hover:text-white transition-all transform hover:skew-x-[-4deg]">
                     Initialize Audit
                   </button>
                   <button className="flex-1 border border-white/10 text-gray-500 py-4 font-black uppercase italic tracking-widest hover:text-white hover:bg-white/5 transition-all">
                     View Logs
                   </button>
                </div>
              </div>
            </div>

            <div className="bg-black p-4 flex items-center justify-between border-t border-white/5">
               <div className="flex items-center gap-2 text-[10px] text-gray-600 font-black uppercase tracking-widest">
                  <Lock size={12} />
                  Secure Protocol Encrypted
               </div>
               <div className="text-[8px] text-gray-800 font-black uppercase">
                 KLE_SEC_MOD_V2.0.4
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

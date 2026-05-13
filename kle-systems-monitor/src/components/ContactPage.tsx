import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onSubmit: (data: { name: string, email: string, message: string }) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-[#15151e] min-h-screen text-white font-sans">
      <div className="max-w-[1500px] mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none mb-8">
                Request<br />Transmission
              </h1>
              <p className="text-gray-400 font-medium italic text-lg leading-relaxed max-w-sm">
                Open a secure channel to the administration. For enrollment, access requests, or system inquiries.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { icon: <MapPin size={20} />, label: 'Hub Location', val: 'PVYJ+6GQ, Vidya Nagar, Hubballi, Karnataka 580031' },
                { icon: <Phone size={20} />, label: 'Voice Link', val: '+91 836 237 8103' },
                { icon: <Mail size={20} />, label: 'Datalink', val: 'support@kle-tu.edu' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-[#e10600]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-black italic uppercase tracking-tighter text-white">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-black border-l-4 border-blue-600">
               <div className="flex items-center gap-3 mb-4">
                 <ShieldCheck className="text-blue-600" size={24} />
                 <h3 className="text-xl font-black italic uppercase tracking-tighter">Secure Protocol</h3>
               </div>
               <p className="text-gray-500 text-xs italic font-medium leading-relaxed">
                 All transmissions are encrypted via AES-256. Identity verification is required for high-access archival requests.
               </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black p-8 lg:p-16 border-t-8 border-[#e10600] shadow-2xl relative"
            >
              {isSent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-black/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                    <Send className="text-black" />
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Transmission Sent</h3>
                  <p className="text-gray-500 italic max-w-xs">Your data has been successfully queued for administrative review.</p>
                  <button 
                    onClick={() => setIsSent(false)}
                    className="mt-8 text-[10px] font-black uppercase tracking-widest text-[#e10600] hover:text-white transition-colors"
                  >
                    SEND ANOTHER →
                  </button>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Identity Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="NAME_SURNAME"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-900 border border-white/10 px-6 py-4 text-sm font-black italic uppercase italic focus:ring-1 focus:ring-[#e10600] outline-none transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Secure Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="IDENTITY@Datalink.COM"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-zinc-900 border border-white/10 px-6 py-4 text-sm font-black italic uppercase italic focus:ring-1 focus:ring-[#e10600] outline-none transition-all"
                      />
                   </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Transmission Content</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="DESCRIBE_YOUR_REQUEST_HERE..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-zinc-900 border border-white/10 px-6 py-4 text-sm font-black italic uppercase italic focus:ring-1 focus:ring-[#e10600] outline-none transition-all resize-none"
                  />
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                     <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                     SECURE NODE ACTIVE
                   </div>
                   <button 
                    type="submit"
                    className="w-full sm:w-auto bg-[#e10600] text-white px-12 py-5 font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all transform hover:skew-x-[-10deg] flex items-center justify-center gap-3"
                   >
                     EXECUTE SEND
                     <Send size={18} />
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

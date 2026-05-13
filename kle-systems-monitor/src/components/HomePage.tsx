import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Shield, Users, Landmark, Zap } from 'lucide-react';
import { PortalType, Book } from '../types';
import { BookGrid } from './BookGrid';
import { BookDetailModal } from './BookDetailModal';

interface HomePageProps {
  onNavigate: (portal: PortalType) => void;
  books: Book[];
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, books }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleOpenDetails = (id: string) => {
    const book = books.find(b => b.id === id);
    if (book) setSelectedBook(book);
  };
  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e10600] blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="max-w-[1500px] w-full z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-12 bg-[#e10600]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e10600]">KLE Technological University</span>
            <div className="h-[1px] w-12 bg-[#e10600]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12vw] lg:text-[10vw] font-black italic uppercase leading-[0.85] tracking-tighter mb-12 skew-x-[-4deg]"
          >
            Knowledge<br /><span className="text-transparent border-t-2 border-b-2 border-white/20 px-8">Unified</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl text-gray-500 font-medium text-lg lg:text-xl italic mb-12 px-4"
          >
            Access the campus information matrix. Real-time updates on library inventory, 
            academic records, and infrastructure security protocols.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <button 
              onClick={() => onNavigate('blog')}
              className="group flex items-center gap-3 bg-white text-black px-10 py-5 font-black uppercase italic tracking-widest hover:bg-[#e10600] hover:text-white transition-all transform hover:skew-x-[-10deg]"
            >
              Latest Updates
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-3 border border-white/20 hover:border-white px-10 py-5 font-black uppercase italic tracking-widest transition-all transform hover:skew-x-[10deg]"
            >
              Contact Registry
            </button>
          </motion.div>
        </div>
      </section>

      {/* Grid Menu Section */}
      <section className="max-w-[1500px] mx-auto px-4 py-32 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {[
            { id: 'user', label: 'Student Access', icon: <Users size={32} />, desc: 'Personal dash, borrowed books, and academic schedule.', color: 'border-blue-500' },
            { id: 'employee', label: 'Staff Portal', icon: <BookOpen size={32} />, desc: 'Manage catalog, track inventory, and resource requests.', color: 'border-green-500' },
            { id: 'admin', label: 'Admin Matrix', icon: <Shield size={32} />, desc: 'Security audit, user governance, and system health.', color: 'border-[#e10600]' },
            { id: 'blog', label: 'Tech News', icon: <Landmark size={32} />, desc: 'Latest campus tech news and library announcements.', color: 'border-white' }
          ].map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onNavigate(item.id as PortalType)}
              className={`bg-black p-12 border-t-4 ${item.color} group cursor-pointer hover:bg-zinc-900 transition-all flex flex-col justify-between h-[450px] shadow-2xl relative overflow-hidden`}
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-[#e10600]/10 transition-colors" />
              <div>
                <div className="text-gray-400 mb-8 transform group-hover:scale-110 group-hover:text-white transition-all origin-left">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-black italic uppercase italic tracking-tighter mb-4 text-white line-clamp-2">
                  {item.label}
                </h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed italic">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                ENTER PORTAL
                <div className="h-[1px] w-8 bg-gray-800 group-hover:bg-white transition-all group-hover:w-16" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Books Showcase Section */}
      <section className="max-w-[1500px] mx-auto px-4 py-32 border-t border-white/5 space-y-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
           <div>
             <div className="flex items-center gap-3 mb-4">
                <Zap className="text-[#e10600]" size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Live Inventory</span>
             </div>
             <h2 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter leading-none">
               Featured<br /><span className="text-[#e10600]">Acquisitions</span>
             </h2>
           </div>
           <button 
            onClick={() => onNavigate('search')}
            className="text-[10px] font-black uppercase tracking-widest text-[#e10600] border-b border-[#e10600] pb-2 hover:text-white hover:border-white transition-colors"
           >
             BROWSE FULL ARCHIVE →
           </button>
        </div>

        <div className="space-y-40">
           <BookGrid 
            title="Premium Literature" 
            books={books.filter(b => b.category === 'literature').slice(0, 4)} 
            onViewDetails={handleOpenDetails}
           />
           
           <BookGrid 
            title="Scientific Research & Academic" 
            books={books.filter(b => b.category === 'academic').slice(0, 4)} 
            onViewDetails={handleOpenDetails}
           />

           <BookGrid 
            title="Core Textbooks" 
            books={books.filter(b => b.category === 'textbook').slice(0, 4)} 
            onViewDetails={handleOpenDetails}
           />
        </div>
      </section>

      <BookDetailModal 
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        book={selectedBook}
      />

      {/* Stats Marquee (Simple CSS animation) */}
      <div className="bg-white text-black py-6 overflow-hidden border-y-4 border-black">
        <div className="whitespace-nowrap flex gap-12 animate-marquee-slow">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="text-4xl font-black uppercase italic tracking-tighter">KLE TECHNOLOGY</span>
              <span className="w-4 h-4 bg-[#e10600]" />
              <span className="text-4xl font-black uppercase italic tracking-tighter">SYSTEMS MONITOR</span>
              <span className="w-4 h-4 bg-blue-600" />
              <span className="text-4xl font-black uppercase italic tracking-tighter">EST. 1947</span>
              <span className="w-4 h-4 bg-green-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

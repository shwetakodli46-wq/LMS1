import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Book as BookIcon, Hash, User, Tag, ShieldCheck, Calendar, Info } from 'lucide-react';
import { Book } from '../types';

interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ isOpen, onClose, book }) => {
  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl bg-[#111118] border-2 border-white/10 shadow-[0_0_100px_rgba(225,6,0,0.15)] overflow-hidden"
          >
            <div className="h-3 bg-[#e10600] w-full" />
            
            <div className="flex flex-col md:flex-row">
              {/* Image Column */}
              <div className="md:w-2/5 p-8 bg-black">
                {book.coverImage ? (
                  <div className="aspect-[3/4] border-4 border-white/5 shadow-2xl overflow-hidden relative group">
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-zinc-900 border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-gray-700">
                    <BookIcon size={64} className="mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest">No Visual Data</p>
                  </div>
                )}
                <div className="mt-8 space-y-4">
                   <div className="flex items-center justify-between border-b border-white/5 pb-2">
                     <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Accession Code</span>
                     <span className="text-[10px] font-mono text-white opacity-60">ID-{book.id.toUpperCase()}</span>
                   </div>
                   <div className="flex items-center justify-between border-b border-white/5 pb-2">
                     <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Status</span>
                     <span className={`text-[10px] font-black uppercase tracking-widest ${book.available ? 'text-green-500' : 'text-[#e10600]'}`}>
                       {book.available ? 'ONLINE / AVAILABLE' : 'DEPLOYED / LOANED'}
                     </span>
                   </div>
                </div>
              </div>

              {/* Data Column */}
              <div className="flex-1 p-8 md:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-2 bg-[#e10600]/10 border border-[#e10600] inline-block">
                    <Info className="text-[#e10600]" size={20} />
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-white/10 text-gray-500 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-tight mb-4">
                  {book.title}
                </h2>
                
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-[2px] w-8 bg-[#e10600]" />
                  <p className="text-xl font-black italic uppercase text-gray-400">By {book.author}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#e10600] tracking-widest">
                      <Tag size={12} />
                      Classification
                    </div>
                    <p className="text-lg font-black italic uppercase text-white">{book.category}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#e10600] tracking-widest">
                      <Hash size={12} />
                      Serial Index (ISBN)
                    </div>
                    <p className="text-lg font-mono text-white opacity-80">{book.isbn || '000-0000000000'}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#e10600] tracking-widest">
                      <ShieldCheck size={12} />
                      Security Level
                    </div>
                    <p className="text-lg font-black italic uppercase text-white">General Access</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#e10600] tracking-widest">
                      <Calendar size={12} />
                      Archived Date
                    </div>
                    <p className="text-lg font-black italic uppercase text-white">2026.05.13</p>
                  </div>
                </div>

                <div className="mt-16 flex gap-4">
                  {book.available ? (
                    <button className="flex-1 bg-white text-black py-4 font-black uppercase italic tracking-widest hover:bg-[#e10600] hover:text-white transition-all transform hover:skew-x-[-4deg]">
                      Initiate Retrieval
                    </button>
                  ) : (
                    <button className="flex-1 bg-black border border-white/10 text-gray-600 py-4 font-black uppercase italic tracking-widest cursor-not-allowed">
                      Waiting List Entry
                    </button>
                  )}
                  <button className="px-8 border border-white/10 text-white font-black uppercase italic tracking-widest hover:bg-white/5 transition-all">
                    Bookmark
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-black/50 p-4 flex items-center justify-between border-t border-white/5">
               <div className="flex items-center gap-2 text-[8px] text-gray-600 font-black uppercase tracking-widest">
                  DATABASE TRANSMISSION SOURCE: KLE_MAIN_HUB_01
               </div>
               <div className="text-[10px] text-red-500 font-black italic uppercase animate-pulse">
                 // SYSTEM.V2.LIVE
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

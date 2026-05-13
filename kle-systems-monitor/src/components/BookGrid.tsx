import React from 'react';
import { Book, CheckCircle, XCircle, Tag } from 'lucide-react';
import { Book as BookType } from '../types';
import { motion } from 'motion/react';

interface BookGridProps {
  books: BookType[];
  title?: string;
  onUpdate?: (bookId: string) => void;
  onDelete?: (bookId: string) => void;
  onViewDetails?: (bookId: string) => void;
  onAction?: (bookId: string) => void;
  actionLabel?: string;
}

export const BookGrid: React.FC<BookGridProps> = ({ books, title, onUpdate, onDelete, onViewDetails, onAction, actionLabel }) => {
  return (
    <div className="space-y-6">
      {title && (
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-[#e10600]" />
          <h2 className="text-xl font-black italic uppercase tracking-tighter">{title}</h2>
          <span className="text-[10px] text-gray-500 font-bold ml-auto">{books.length} VOLUMES</span>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/40 border border-white/5 p-5 group hover:border-[#e10600]/50 transition-all flex flex-col h-full cursor-pointer"
            onClick={() => onViewDetails?.(book.id)}
          >
            <div className="flex justify-between items-start mb-4">
              {book.coverImage ? (
                <div className="w-12 h-16 bg-zinc-900 border border-white/10 overflow-hidden shrink-0">
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ) : (
                <div className="bg-[#e10600]/10 p-3 rounded-sm group-hover:bg-[#e10600]/20 transition-colors">
                  <Book className="text-[#e10600]" size={20} />
                </div>
              )}
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black uppercase text-gray-600 tracking-widest">{book.isbn || 'NO-ISBN'}</span>
                {book.available ? (
                  <div className="flex items-center gap-1 text-green-500">
                    <CheckCircle size={10} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Available</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-500">
                    <XCircle size={10} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Checked Out</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-black italic uppercase tracking-tighter group-hover:text-white transition-colors leading-tight">
                {book.title}
              </h3>
              <p className="text-gray-500 text-xs mt-1 font-medium italic">by {book.author}</p>
              
              <div className="mt-4 flex items-center gap-2">
                <Tag size={10} className="text-[#e10600]" />
                <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{book.category}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              {onViewDetails && (
                 <button
                  onClick={(e) => { e.stopPropagation(); onViewDetails(book.id); }}
                  className="flex-1 py-2 bg-[#e10600]/10 border border-[#e10600]/20 hover:bg-[#e10600] hover:text-white text-[9px] font-black uppercase italic tracking-widest transition-all"
                >
                  View Details
                </button>
              )}
              {onUpdate && (
                <button
                  onClick={(e) => { e.stopPropagation(); onUpdate(book.id); }}
                  className="flex-1 py-2 bg-white/5 hover:bg-white hover:text-black text-[9px] font-black uppercase italic tracking-widest transition-all"
                >
                  Update
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(book.id); }}
                  className="flex-1 py-2 bg-white/5 hover:bg-red-600 hover:text-white text-[9px] font-black uppercase italic tracking-widest transition-all"
                >
                  Delete
                </button>
              )}
            </div>

            {!onUpdate && !onDelete && onAction && (
              <button
                onClick={() => onAction(book.id)}
                className="mt-6 w-full py-2 bg-white/5 hover:bg-white hover:text-black text-[10px] font-black uppercase italic tracking-widest transition-all"
              >
                {actionLabel || 'Action'}
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

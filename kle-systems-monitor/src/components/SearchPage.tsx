import React, { useState } from 'react';
import { Search, Book as BookIcon, X } from 'lucide-react';
import { Book } from '../types';
import { BookGrid } from './BookGrid';
import { BookDetailModal } from './BookDetailModal';
import { motion, AnimatePresence } from 'motion/react';

interface SearchPageProps {
  books: Book[];
}

export const SearchPage: React.FC<SearchPageProps> = ({ books }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(query.toLowerCase()) || 
                          book.author.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === 'all' || book.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'literature', 'textbook', 'academic'];

  const handleOpenDetails = (id: string) => {
    const book = books.find(b => b.id === id);
    if (book) setSelectedBook(book);
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans pt-12">
      <div className="max-w-[1500px] mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-16"
        >
          <h1 className="text-5xl lg:text-7xl font-black italic uppercase tracking-tighter mb-8 text-center">
            Global<br /><span className="text-[#e10600]">Archive Search</span>
          </h1>
          
          <div className="w-full max-w-3xl relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#e10600]" size={24} />
            <input 
              type="text"
              autoFocus
              placeholder="SEARCH BY VOLUME TITLE, AUTHOR, OR ISBN_ID..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-black border-2 border-white/10 px-16 py-6 text-xl font-black italic uppercase italic focus:border-[#e10600] outline-none transition-all shadow-[0_0_30px_rgba(225,6,0,0.05)]"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest italic transition-all border-b-2 ${
                  activeCategory === cat 
                    ? 'border-[#e10600] text-white' 
                    : 'border-transparent text-gray-600 hover:text-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="py-12 border-t border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={query + activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {filteredBooks.length > 0 ? (
                <BookGrid 
                  books={filteredBooks} 
                  title={query || activeCategory !== 'all' ? `Search Results (${filteredBooks.length})` : "Archival Preview"}
                  onViewDetails={handleOpenDetails}
                />
              ) : (
                <div className="text-center py-20 bg-black/40 border border-dashed border-white/10">
                  <p className="text-gray-600 font-black uppercase italic tracking-widest">No matching volumes found in database</p>
                  <button 
                    onClick={() => {setQuery(''); setActiveCategory('all');}}
                    className="mt-6 text-[10px] text-[#e10600] font-black uppercase tracking-widest hover:text-white transition-colors"
                  >
                    CLEAR ALL FILTERS →
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <BookDetailModal 
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        book={selectedBook}
      />

      {/* Decorative Matrix Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-10">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e10600_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
    </div>
  );
};

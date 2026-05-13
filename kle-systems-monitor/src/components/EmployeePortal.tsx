import React, { useState } from 'react';
import { Briefcase, BookOpen, Layers, GraduationCap, PlusCircle, Search, Filter } from 'lucide-react';
import { Book, BookCategory } from '../types';
import { BookGrid } from './BookGrid';
import { BookModal } from './BookModal';

interface EmployeePortalProps {
  books: Book[];
  onAddBook?: (book: Omit<Book, 'id'>) => void;
  onUpdateBook?: (bookId: string, data: Partial<Book>) => void;
  onDeleteBook?: (bookId: string) => void;
}

export const EmployeePortal: React.FC<EmployeePortalProps> = ({ books, onAddBook, onUpdateBook, onDeleteBook }) => {
  const [activeCategory, setActiveCategory] = useState<BookCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create');
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);

  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingBook(undefined);
    setIsModalOpen(true);
  };

  const handleOpenUpdate = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    setModalMode('update');
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleSave = (bookData: Book | Omit<Book, 'id'>) => {
    if (modalMode === 'create') {
      onAddBook?.(bookData as Omit<Book, 'id'>);
    } else if (editingBook) {
      onUpdateBook?.(editingBook.id, bookData);
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesCategory = activeCategory === 'all' || book.category === activeCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: { id: BookCategory | 'all', label: string, icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Inventory', icon: <Briefcase size={16} /> },
    { id: 'literature', label: 'Literature', icon: <BookOpen size={16} /> },
    { id: 'textbook', label: 'Textbooks', icon: <Layers size={16} /> },
    { id: 'academic', label: 'Academic Journals', icon: <GraduationCap size={16} /> },
  ];

  return (
    <div className="bg-[#15151e] min-h-screen text-white font-sans">
      <div className="relative h-40 bg-zinc-900 flex items-center border-b-2 border-[#e10600]">
        <div className="max-w-[1500px] mx-auto px-4 w-full flex items-end justify-between pb-6">
          <div className="flex items-center gap-6">
            <div className="bg-[#e10600] p-4 rounded-sm border-2 border-black">
              <Briefcase size={32} className="text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Employee Portal</h1>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Inventory Control & Resource Management</p>
            </div>
          </div>
          
          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-[#e10600] hover:bg-white hover:text-black text-white px-6 py-3 text-[10px] font-black uppercase italic tracking-widest transition-all transform hover:skew-x-[-10deg]"
          >
            <PlusCircle size={16} />
            Add New Entry
          </button>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 space-y-8">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Navigation</p>
              <nav className="flex flex-col gap-1">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase italic tracking-wider transition-all border-l-2 ${
                      activeCategory === cat.id 
                        ? 'bg-[#e10600] text-white border-[#e10600]' 
                        : 'bg-black/40 text-gray-400 border-transparent hover:border-gray-700 hover:text-white'
                    }`}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-black/40 p-6 border border-white/5 space-y-4">
              <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Global Search</p>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input 
                  type="text"
                  placeholder="Search titles, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 px-10 py-3 text-xs focus:ring-1 focus:ring-[#e10600] outline-none transition-all"
                />
              </div>
            </div>

            <div className="bg-[#e10600]/10 p-6 border border-[#e10600]/20">
               <div className="flex items-center gap-2 mb-4">
                 <Filter size={14} className="text-[#e10600]" />
                 <p className="text-[10px] font-black uppercase text-[#e10600] tracking-widest">Active Filters</p>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                   <span className="text-gray-500">Category:</span>
                   <span className="text-white italic">{activeCategory.toUpperCase()}</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                   <span className="text-gray-500">Total Found:</span>
                   <span className="text-white italic">{filteredBooks.length}</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {activeCategory === 'all' || activeCategory === 'literature' ? (
              <BookGrid 
                title="Literature Collection" 
                books={filteredBooks.filter(b => b.category === 'literature')} 
                onUpdate={handleOpenUpdate}
                onDelete={onDeleteBook}
              />
            ) : null}

            {activeCategory === 'all' || activeCategory === 'textbook' ? (
              <BookGrid 
                title="Academic Textbooks" 
                books={filteredBooks.filter(b => b.category === 'textbook')} 
                onUpdate={handleOpenUpdate}
                onDelete={onDeleteBook}
              />
            ) : null}

            {activeCategory === 'all' || activeCategory === 'academic' ? (
              <BookGrid 
                title="Academic Journals & Papers" 
                books={filteredBooks.filter(b => b.category === 'academic')} 
                onUpdate={handleOpenUpdate}
                onDelete={onDeleteBook}
              />
            ) : null}

            {filteredBooks.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-white/5 bg-black/20">
                <p className="text-gray-600 font-black uppercase italic tracking-widest">No matching records found in system</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <BookModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingBook}
        mode={modalMode}
      />
    </div>
  );
};

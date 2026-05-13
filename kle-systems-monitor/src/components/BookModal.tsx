import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Box, Type, Feather, Image as ImageIcon } from 'lucide-react';
import { Book, BookCategory } from '../types';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bookData: Book | Omit<Book, 'id'>) => void;
  initialData?: Book;
  mode: 'create' | 'update';
}

export const BookModal: React.FC<BookModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData,
  mode 
}) => {
  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    category: 'literature',
    available: true,
    coverImage: '',
    isbn: ''
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData(initialData);
    } else if (!initialData && isOpen) {
      setFormData({
        title: '',
        author: '',
        category: 'literature',
        available: true,
        coverImage: '',
        isbn: ''
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Book);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
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
            className="relative w-full max-w-xl bg-[#1a1a24] border-2 border-white/10 shadow-2xl overflow-hidden"
          >
            <div className="h-2 bg-[#e10600] w-full" />
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-black border border-[#e10600]">
                    <Box className="text-[#e10600]" size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
                      {mode === 'create' ? 'Index New Volume' : 'Update Record'}
                    </h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
                       {mode === 'create' ? 'System Input Sequence' : `Modifying UID: ${initialData?.id}`}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 transition-colors rounded-full text-gray-500 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
                      <Type size={12} /> Book Title
                    </label>
                    <input 
                      required
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-black border border-white/10 px-4 py-3 text-sm font-black italic uppercase italic focus:ring-1 focus:ring-[#e10600] outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
                      <Feather size={12} /> Author Entity
                    </label>
                    <input 
                      required
                      type="text" 
                      value={formData.author}
                      onChange={(e) => setFormData({...formData, author: e.target.value})}
                      className="w-full bg-black border border-white/10 px-4 py-3 text-sm font-black italic uppercase italic focus:ring-1 focus:ring-[#e10600] outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest flex items-center gap-2">
                      <ImageIcon size={12} /> Cover Image URL
                    </label>
                    <input 
                      type="text" 
                      placeholder="https://..."
                      value={formData.coverImage}
                      onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                      className="w-full bg-black border border-white/10 px-4 py-3 text-sm font-black italic focus:ring-1 focus:ring-[#e10600] outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Category</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value as BookCategory})}
                        className="w-full bg-black border border-white/10 px-4 py-3 text-sm font-black italic uppercase italic focus:ring-1 focus:ring-[#e10600] outline-none appearance-none"
                      >
                        <option value="literature">Literature</option>
                        <option value="textbook">Textbook</option>
                        <option value="academic">Academic</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">ISBN Vector</label>
                      <input 
                        type="text" 
                        value={formData.isbn}
                        onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                        className="w-full bg-black border border-white/10 px-4 py-3 text-sm font-black italic uppercase italic focus:ring-1 focus:ring-[#e10600] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8 flex gap-4">
                   <button 
                    type="submit"
                    className="flex-1 bg-white text-black py-4 font-black uppercase italic tracking-widest hover:bg-[#e10600] hover:text-white transition-all transform hover:skew-x-[-4deg] flex items-center justify-center gap-3"
                   >
                     <Save size={18} />
                     Commit changes
                   </button>
                   <button 
                    type="button"
                    onClick={onClose}
                    className="flex-1 border border-white/10 text-gray-500 py-4 font-black uppercase italic tracking-widest hover:text-white hover:bg-white/5 transition-all"
                   >
                     Abort Sequence
                   </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

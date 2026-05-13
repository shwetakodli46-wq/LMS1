/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AdminPortal } from './components/AdminPortal';
import { HomePage } from './components/HomePage';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import { UserPortal } from './components/UserPortal';
import { EmployeePortal } from './components/EmployeePortal';
import { SearchPage } from './components/SearchPage';
import { Navigation } from './components/Navigation';
import { Student, ContactRequest, Book, BlogPost, PortalType } from './types';

export default function App() {
  const [currentPortal, setCurrentPortal] = useState<PortalType>('home');
  
  const [students, setStudents] = useState<Student[]>([
    {
      id: 'STU-001',
      name: 'Sushma CK',
      email: 'sushma.ck@kle.edu',
      admissionDate: '2026-01-15T09:00:00Z',
    },
    {
      id: 'STU-002',
      name: 'John Diggle',
      email: 'j.diggle@kle.edu',
      admissionDate: '2026-02-10T11:30:00Z',
    },
  ]);

  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([
    {
      id: 'REQ-XZ9',
      name: 'Oliver Queen',
      email: 'o.queen@external.com',
      message: 'Requesting access to the library high-security archives for historical research purposes.',
      status: 'pending',
      timestamp: '2026-05-12T14:20:00Z',
    },
  ]);

  const [books, setBooks] = useState<Book[]>([
    { id: '1', title: 'The Art of Computing', author: 'Donald Knuth', category: 'academic', available: true, isbn: '978-0201896831', coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=200' },
    { id: '2', title: 'Principles of Physics', author: 'Resnick Halliday', category: 'academic', available: true, isbn: '978-1118230725', coverImage: 'https://images.unsplash.com/photo-1532012197367-6849811fb7d2?q=80&w=200' },
    { id: '3', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'literature', available: false, isbn: '978-0061120084', coverImage: 'https://images.unsplash.com/photo-1543004218-ee141d8196ed?q=80&w=200' },
    { id: '4', title: 'Introduction to Algorithms', author: 'Cormen, Leiserson', category: 'textbook', available: true, isbn: '978-0262033848', coverImage: 'https://images.unsplash.com/photo-1510172951991-856a654063f9?q=80&w=200' },
    { id: '5', title: 'Macroeconomics', author: 'Gregory Mankiw', category: 'academic', available: true, isbn: '978-1464182891', coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=200' },
    { id: '6', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'literature', available: true, isbn: '978-0743273565', coverImage: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?q=80&w=200' },
    { id: '7', title: 'Organic Chemistry', author: 'Paula Y. Bruice', category: 'textbook', available: true, isbn: '978-0321803221', coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=200' },
    { id: '8', title: 'Brave New World', author: 'Aldous Huxley', category: 'literature', available: false, isbn: '978-0060850524', coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200' },
    { id: '9', title: 'One Hundred Years of Solitude', author: 'Gabriel García Márquez', category: 'literature', available: true, isbn: '978-0060883287', coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=200' },
    { id: '10', title: 'Database System Concepts', author: 'Abraham Silberschatz', category: 'textbook', available: true, isbn: '978-0073523323', coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=200' },
    { id: '11', title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'textbook', available: true, isbn: '978-1285741550', coverImage: 'https://images.unsplash.com/photo-1533327325824-76bc4e62d560?q=80&w=200' },
    { id: '12', title: 'Quantum Mechanics and Path Integrals', author: 'Richard Feynman', category: 'academic', available: true, isbn: '978-0486477220', coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=200' },
    { id: '13', title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'literature', available: true, isbn: '978-0316769488', coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=200' },
    { id: '14', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', category: 'textbook', available: true, isbn: '978-0136042594', coverImage: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=200' },
    { id: '15', title: 'Linear Algebra and Its Applications', author: 'Gilbert Strang', category: 'academic', available: true, isbn: '978-0030105678', coverImage: 'https://images.unsplash.com/photo-1454165833267-033f235ff27d?q=80&w=200' },
    { id: '16', title: 'The Old Man and the Sea', author: 'Ernest Hemingway', category: 'literature', available: true, isbn: '978-0684801223', coverImage: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=200' },
    { id: '17', title: 'Digital Design', author: 'M. Morris Mano', category: 'textbook', available: true, isbn: '978-0132774208', coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200' },
    { id: '18', title: 'Structure and Interpretation of Computer Programs', author: 'Abelson, Sussman', category: 'academic', available: true, isbn: '978-0262510875', coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=200' },
  ]);

  const [posts] = useState<BlogPost[]>([
    {
      id: 'P-001',
      title: 'Infrastructure Maintenance Protocol (May 2026)',
      excerpt: 'The campus mainframe will undergo scheduled maintenance to optimize archival processing speeds.',
      content: 'Detailed content here...',
      date: '2026-05-10T10:00:00Z',
      author: 'Admin Team',
      category: 'TECHNICAL'
    },
    {
      id: 'P-002',
      title: 'New Literature Archive Expansion',
      excerpt: 'We have acquired over 500 new volumes of contemporary literature for the central hub.',
      content: 'Detailed content here...',
      date: '2026-05-12T15:30:00Z',
      author: 'Chief Librarian',
      category: 'ANNOUNCEMENT'
    }
  ]);

  const handleAdmit = (requestId: string) => {
    const request = contactRequests.find((r) => r.id === requestId);
    if (!request) return;

    const newStudent: Student = {
      id: `STU-${Math.floor(Math.random() * 900) + 100}`,
      name: request.name,
      email: request.email,
      admissionDate: new Date().toISOString(),
    };

    setStudents([...students, newStudent]);
    setContactRequests(
      contactRequests.map((r) =>
        r.id === requestId ? { ...r, status: 'admitted' } : r
      )
    );
  };

  const handleDelete = (requestId: string) => {
    setContactRequests(contactRequests.filter((r) => r.id !== requestId));
  };

  const handleContactSubmit = (data: { name: string, email: string, message: string }) => {
    const newRequest: ContactRequest = {
      id: `REQ-${Math.random().toString(36).substring(2, 5).toUpperCase()}`,
      name: data.name,
      email: data.email,
      message: data.message,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    setContactRequests([newRequest, ...contactRequests]);
  };

  const handleDeleteBook = (bookId: string) => {
    setBooks(books.filter(b => b.id !== bookId));
  };

  const handleAddBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: Math.random().toString(36).substring(2, 9),
    };
    setBooks([newBook, ...books]);
  };

  const handleUpdateBook = (bookId: string, data: Partial<Book>) => {
    setBooks(books.map(b => 
      b.id === bookId ? { ...b, ...data } : b
    ));
  };

  const renderPortal = () => {
    switch (currentPortal) {
      case 'home': return <HomePage onNavigate={setCurrentPortal} books={books} />;
      case 'blog': return <BlogPage posts={posts} />;
      case 'search': return <SearchPage books={books} />;
      case 'contact': return <ContactPage onSubmit={handleContactSubmit} />;
      case 'user': return <UserPortal user={students[0]} borrowedBooks={books.filter(b => !b.available).slice(0, 2)} />;
      case 'employee': return (
        <EmployeePortal 
          books={books} 
          onAddBook={handleAddBook}
          onDeleteBook={handleDeleteBook}
          onUpdateBook={handleUpdateBook}
        />
      );
      case 'admin': return <AdminPortal students={students} contactRequests={contactRequests} onAdmitStudent={handleAdmit} onDeleteRequest={handleDelete} />;
      default: return <HomePage onNavigate={setCurrentPortal} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#15151e] pt-16">
      <Navigation currentPortal={currentPortal} onNavigate={setCurrentPortal} />
      <main>
        {renderPortal()}
      </main>
      
      {/* Footer Decoration */}
      <footer className="bg-black border-t border-white/5 py-12 px-4">
        <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-[#e10600] flex items-center justify-center font-black italic">K</div>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">KLE Systems Matrix © 2026</p>
          </div>
          <div className="flex gap-8">
            {['Protocol', 'Governance', 'Architecture', 'Security'].map(link => (
              <a key={link} href="#" className="text-[9px] font-black uppercase text-gray-700 hover:text-white transition-colors tracking-widest">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}


export interface Student {
  id: string;
  name: string;
  email: string;
  admissionDate: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'admitted';
  timestamp: string;
}

export type BookCategory = 'literature' | 'textbook' | 'academic';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  available: boolean;
  coverImage?: string;
  isbn?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
}

export type PortalType = 'home' | 'blog' | 'contact' | 'user' | 'admin' | 'employee' | 'search';

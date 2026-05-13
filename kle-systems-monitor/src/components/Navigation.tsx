import React from 'react';
import { ShieldAlert, Home, Rss, Mail, User, Briefcase, Settings, Search } from 'lucide-react';
import { PortalType } from '../types';
import { motion } from 'motion/react';

interface NavigationProps {
  currentPortal: PortalType;
  onNavigate: (portal: PortalType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPortal, onNavigate }) => {
  const navItems: { id: PortalType, label: string, icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'search', label: 'Search', icon: <Search size={18} /> },
    { id: 'blog', label: 'Blog', icon: <Rss size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
    { id: 'user', label: 'User', icon: <User size={18} /> },
    { id: 'employee', label: 'Employee', icon: <Briefcase size={18} /> },
    { id: 'admin', label: 'Admin', icon: <Settings size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1500px] mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="bg-[#e10600] p-1.5 rounded-sm transform group-hover:rotate-90 transition-transform duration-500">
            <ShieldAlert className="text-black" size={20} />
          </div>
          <span className="text-lg font-black italic uppercase tracking-tighter hidden sm:block">KLE Systems</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto no-scrollbar py-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest italic transition-all relative ${
                currentPortal === item.id 
                  ? 'text-[#e10600]' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <span className="opacity-70">{item.icon}</span>
              <span className="hidden md:block">{item.label}</span>
              {currentPortal === item.id && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#e10600]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-[8px] font-black uppercase tracking-widest text-gray-500 hidden lg:block">Matrix Online</span>
        </div>
      </div>
    </nav>
  );
};

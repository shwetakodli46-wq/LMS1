import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Rss } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogPageProps {
  posts: BlogPost[];
}

export const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans">
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[#e10600] mix-blend-multiply opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        
        <div className="max-w-[1500px] w-full px-4 z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-black border border-[#e10600] inline-block mb-6"
          >
            <Rss className="text-[#e10600]" size={32} />
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-6xl lg:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4"
          >
            System<br />Announcements
          </motion.h1>
          <p className="text-gray-500 font-medium italic tracking-wide uppercase text-xs">Technical updates, research insights, and library news</p>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-20">
            {posts.map((post, i) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="aspect-[4/5] bg-zinc-900 border-l-4 border-[#e10600] relative overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-center text-gray-800 font-black text-6xl italic uppercase opacity-20 select-none">
                         KLE UNIVERSITY
                       </div>
                       <div className="absolute bottom-0 left-0 p-4">
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-[#e10600] text-white px-2 py-1">
                           {post.category}
                         </span>
                       </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        {post.author}
                      </div>
                    </div>
                    
                    <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-6 group-hover:text-[#e10600] transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-400 font-medium italic mb-8 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#e10600] group/btn">
                      READ TRANSMISSION
                      <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
                <div className="absolute -left-12 top-0 text-[100px] font-black text-white/5 italic select-none pointer-events-none hidden xl:block">
                  0{i + 1}
                </div>
              </motion.article>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-black p-8 border-t-2 border-white shadow-2xl">
               <h3 className="text-lg font-black italic uppercase tracking-tighter mb-6">Trending Topics</h3>
               <div className="flex flex-wrap gap-2">
                 {['QUANTUM-PHYSICS', 'LIBRARY-BOTS', 'AI-RESEARCH', 'BLOCKCHAIN', 'INFRASTRUCTURE', 'CYBER-SEC'].map(tag => (
                   <span key={tag} className="text-[9px] font-black bg-white/5 hover:bg-[#e10600] text-gray-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer border border-white/5">
                     {tag}
                   </span>
                 ))}
               </div>
            </div>

            <div className="bg-black p-8 border-l-4 border-[#e10600] shadow-2xl">
               <h3 className="text-lg font-black italic uppercase tracking-tighter mb-4">Subscribe to Datalink</h3>
               <p className="text-gray-500 text-xs italic font-medium leading-relaxed mb-6">
                 Receive direct transmissions of system announcements and research abstracts.
               </p>
               <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="ENTER EMAIL" 
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-[10px] font-black uppercase focus:ring-1 focus:ring-[#e10600] outline-none"
                  />
                  <button className="w-full py-4 bg-white text-black font-black uppercase italic tracking-widest hover:bg-[#e10600] hover:text-white transition-all transform hover:skew-x-[-10deg]">
                    Link Interface
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

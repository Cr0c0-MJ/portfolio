'use client';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  tags: string[];
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#0f1419] border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-emerald-500/20 to-amber-500/20">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419] via-[#0f1419]/50 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-emerald-500/90 text-white text-xs rounded-full backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-white group-hover:text-emerald-400 transition-colors mb-3">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.description}</p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-amber-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-gray-400 text-xs hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Link */}
        <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm group/link">
          <span>Read full article</span>
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.article>
  );
}

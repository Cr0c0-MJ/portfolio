'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import { BlogCard } from '../components/BlogCard';

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

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'How JAX Turns Ordinary Python Into a Transformation Machine',
    description: "What does it really mean for JAX to 'transform' ordinary Python into a transformation machine? This walks through how that shift changes how you think about code.",
    date: 'November 27, 2025',
    readTime: '35m read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    category: 'AI',
    tags: ['#JAX', '#Python', '#MachineLearning', '#Programming'],
  },
  {
    id: 2,
    title: 'Batching Tokens Without Losing Your Mind',
    description: "Working on high-throughput AI and juggling batching logic? 'Batching Tokens Without Losing Your Mind' breaks down how to stay fast without drowning in complexity.",
    date: 'November 25, 2025',
    readTime: '35m read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop',
    category: 'AI',
    tags: ['#AI', '#LLM', '#inference', '#scaling'],
  },
  {
    id: 3,
    title: 'Understanding React Server Components',
    description: 'A deep dive into React Server Components and how they change the way we think about building React applications in the modern web.',
    date: 'November 20, 2025',
    readTime: '28m read',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=600&fit=crop',
    category: 'Web Development',
    tags: ['#React', '#NextJS', '#ServerComponents', '#WebDev'],
  },
  {
    id: 4,
    title: 'The Future of TypeScript: Type System Evolution',
    description: 'Exploring the latest TypeScript features and how the type system continues to evolve to meet modern development needs.',
    date: 'November 15, 2025',
    readTime: '22m read',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop',
    category: 'Web Development',
    tags: ['#TypeScript', '#JavaScript', '#Programming'],
  },
  {
    id: 5,
    title: 'Building Scalable APIs with GraphQL',
    description: 'Learn best practices for designing and implementing GraphQL APIs that scale with your application needs.',
    date: 'November 10, 2025',
    readTime: '30m read',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    category: 'Backend',
    tags: ['#GraphQL', '#API', '#Backend', '#WebDev'],
  },
  {
    id: 6,
    title: 'Design Systems: From Concept to Implementation',
    description: 'A comprehensive guide to building and maintaining design systems that empower teams and ensure consistency.',
    date: 'November 5, 2025',
    readTime: '25m read',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    category: 'Design',
    tags: ['#DesignSystems', '#UX', '#UI', '#Frontend'],
  },
  {
    id: 7,
    title: 'Optimizing Performance in Large React Applications',
    description: 'Practical strategies for identifying and fixing performance bottlenecks in complex React applications.',
    date: 'October 30, 2025',
    readTime: '32m read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    category: 'Web Development',
    tags: ['#React', '#Performance', '#Optimization'],
  },
  {
    id: 8,
    title: 'Database Indexing Strategies for Modern Apps',
    description: 'Understanding when and how to use database indexes to improve query performance without sacrificing write speed.',
    date: 'October 25, 2025',
    readTime: '27m read',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop',
    category: 'Backend',
    tags: ['#Database', '#SQL', '#Performance', '#Backend'],
  },
];

const allCategories = Array.from(new Set(blogPosts.map((post) => post.category))).sort();

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPosts =
    selectedCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="relative z-10 px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-emerald-400 mb-4">Blog / {blogPosts.length} Articles</h1>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <span>HOME</span>
            <span>/</span>
            <span className="text-emerald-400">BLOG</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Thoughts on development, design, and technology. Sharing insights from building products,
          solving problems, and learning along the way.
        </motion.p>

        {/* Filter Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-12 flex-wrap"
        >
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === 'All'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            All Articles ({blogPosts.length})
          </button>
          {allCategories.map((category) => {
            const count = blogPosts.filter((p) => p.category === category).length;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </motion.div>

        {/* No results message */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 py-12"
          >
            No articles found in this category.
          </motion.div>
        )}
      </div>
    </div>
  );
}

'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';

interface Project {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  badge: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AI Integration Platform',
    date: 'October 2023',
    category: 'Web App, SDK, API, Website, Docs',
    description: 'A plug-and-play platform for integrating an AI-powered voice user interface (VUI) directly on top of existing applications. It is designed...',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    technologies: ['React', 'TypeScript', 'Node.js', 'LangChain', 'FastMCP', 'PineconeDB'],
    badge: 31,
  },
  {
    id: 2,
    title: 'AI Sales Agent for Shopify',
    date: 'July 2025',
    category: 'Shopify App',
    description: 'A native app for Shopify stores that can be installed in minutes, delivering an assistant experience directly inside the merchant...',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
    technologies: ['NextJS', 'OpenAI', 'GraphQL', 'Shopify API'],
    badge: 29,
  },
  {
    id: 3,
    title: 'AI Browsing Assistant',
    date: 'February 2024',
    category: 'Browser Extension',
    description: 'A browser extension that brings voice control and AI-powered assistance to your web browsing experience. This tool transforms...',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    technologies: ['Plasmo', 'Ant Design', 'OpenAI', 'Chrome API'],
    badge: 18,
  },
  {
    id: 4,
    title: 'E-commerce Dashboard',
    date: 'March 2024',
    category: 'Web App',
    description: 'A comprehensive analytics dashboard for e-commerce businesses with real-time data visualization and insights...',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    technologies: ['React', 'TypeScript', 'GraphQL', 'D3.js'],
    badge: 24,
  },
  {
    id: 5,
    title: 'Mobile Fitness Tracker',
    date: 'January 2024',
    category: 'Mobile App',
    description: 'A React Native mobile application for tracking workouts, nutrition, and health metrics with personalized AI coaching...',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'OpenAI'],
    badge: 15,
  },
  {
    id: 6,
    title: 'Content Management System',
    date: 'December 2023',
    category: 'Web App, CMS',
    description: 'A headless CMS built with modern technologies, offering flexible content modeling and powerful API...',
    image: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&h=600&fit=crop',
    technologies: ['NextJS', 'PostgreSQL', 'GraphQL', 'Prisma'],
    badge: 28,
  },
];

const allTechnologies = Array.from(
  new Set(projects.flatMap((project) => project.technologies))
).sort();

export function ProjectsPage() {
  const [selectedTech, setSelectedTech] = useState<string>('All');

  const filteredProjects =
    selectedTech === 'All'
      ? projects
      : projects.filter((project) => project.technologies.includes(selectedTech));

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
          <h1 className="text-emerald-400 mb-4">Projects</h1>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <span>HOME</span>
            <span>/</span>
            <span className="text-emerald-400">PROJECTS</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Thanks for stopping by. Below is a collection of {projects.length} public projects I&apos;ve
          worked on since 2010. Each one was a step in my journey, and every one taught me something
          new.
        </motion.p>

        {/* Filter Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-12 flex-wrap"
        >
          <button
            onClick={() => setSelectedTech('All')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedTech === 'All'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            All Projects ({projects.length})
          </button>
          {allTechnologies.map((tech) => {
            const count = projects.filter((p) => p.technologies.includes(tech)).length;
            return (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedTech === tech
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tech} ({count})
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* No results message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 py-12"
          >
            No projects found with this technology.
          </motion.div>
        )}
      </div>
    </div>
  );
}

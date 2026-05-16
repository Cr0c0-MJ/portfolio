'use client';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-500/10 to-blue-500/10">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Date */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-foreground group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-muted-foreground text-sm whitespace-nowrap ml-2">{project.date}</span>
        </div>

        {/* Category */}
        <div className="mb-3">
          <span className="text-amber-500 text-sm">{project.category}</span>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-3 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full border border-border">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* View Project Link */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm group/link"
        >
          <span>View Project</span>
          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

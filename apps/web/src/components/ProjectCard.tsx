'use client';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  imageContain?: boolean;
  technologies: string[];
  link: string;
  readme: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: () => void;
}

export function ProjectCard({ project, index, onOpenModal }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onOpenModal}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-emerald-500/5 flex flex-col"
    >
      {/* 이미지 */}
      <div
        className={`relative h-48 flex-shrink-0 overflow-hidden ${
          project.imageContain
            ? 'bg-white p-4'
            : 'bg-gradient-to-br from-emerald-500/10 to-blue-500/10'
        }`}
      >
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={
            project.imageContain
              ? 'object-contain'
              : 'object-cover group-hover:scale-110 transition-transform duration-500'
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
      </div>

      {/* 카드 내용 — flex-col + flex-1 로 높이 채움 */}
      <div className="p-6 flex flex-col flex-1">
        {/* 제목 + 날짜 */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-foreground group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-muted-foreground text-sm whitespace-nowrap ml-2">
            {project.date}
          </span>
        </div>

        {/* 카테고리 */}
        <div className="mb-3">
          <span className="text-amber-500 text-sm">{project.category}</span>
        </div>

        {/* 설명 — flex-1 로 남은 공간 채워서 하단 요소를 아래로 밀어냄 */}
        <p className="text-muted-foreground text-sm line-clamp-3 flex-1">{project.description}</p>

        {/* 하단 고정 영역 */}
        <div className="mt-4">
          {/* 기술 스택 */}
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

          {/* 자세히 보기 */}
          <div className="flex items-center gap-1 text-emerald-400 group-hover:text-emerald-300 transition-colors text-sm">
            <span>자세히 보기</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

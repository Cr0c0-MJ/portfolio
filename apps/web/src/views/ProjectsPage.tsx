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
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Zooflix',
    date: 'February 2024',
    category: 'Web App, FinTech',
    description: '구독 경제 모델을 주식 투자에 접목한 플랫폼. 한국투자증권 API를 활용한 월별 자동 주식 매수, AI 기반 외국어 뉴스 번역·음성 합성, 주가 예측 커뮤니티 및 랭킹 기능을 제공합니다.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    technologies: ['React', 'TypeScript', 'Spring Boot', 'MySQL', 'Docker', 'AWS', 'Jenkins'],

    link: 'https://github.com/Cr0c0-MJ/Zooflix',
  },
  {
    id: 2,
    title: 'Shortorial',
    date: 'April 2024',
    category: 'Web App, AI',
    description: '모션 인식 기반 댄스 학습 서비스. MediaPipe BlazePose를 활용한 실시간 포즈 유사도 분석으로 동작 정확도를 즉시 피드백하고, 챌린지 영상을 YouTube에 바로 업로드할 수 있습니다.',
    image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&h=600&fit=crop',
    technologies: ['React', 'TypeScript', 'Spring Boot', 'Python', 'MediaPipe', 'MySQL', 'Redis'],

    link: 'https://github.com/Cr0c0-MJ/Shortorial',
  },
  {
    id: 3,
    title: 'ConGraduation',
    date: 'January 2024',
    category: 'Web App',
    description: '졸업을 축하하는 온라인 사진 롤링페이퍼 서비스. 4컷 형식의 졸업 사진에 메시지를 담아 친구들과 추억을 공유하고, 졸업 당일 이후 열람 및 ZIP 다운로드가 가능합니다.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    technologies: ['React', 'Spring Boot', 'MySQL', 'AWS S3', 'WebSocket', 'Docker'],

    link: 'https://github.com/Cr0c0-MJ/congraduation',
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
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
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
          className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto"
        >
          방문해 주셔서 감사합니다. 아래는 제가 진행한 {projects.length}개의 공개 프로젝트입니다.<br></br>
          각각의 프로젝트는 성장의 발판이 되었고, 매번 새로운 것을 배우는 계기가 되었습니다.
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
                : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground'
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
                    : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground'
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
            className="text-center text-muted-foreground py-12"
          >
            No projects found with this technology.
          </motion.div>
        )}
      </div>
    </div>
  );
}

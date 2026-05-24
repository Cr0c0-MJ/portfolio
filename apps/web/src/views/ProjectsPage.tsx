'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { projects, type Project } from '../data/projectsData';

const allTechnologies = Array.from(
  new Set(projects.flatMap((project) => project.technologies))
).sort();

export function ProjectsPage() {
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedTech === 'All'
      ? projects
      : projects.filter((project) => project.technologies.includes(selectedTech));

  return (
    <div className="relative z-10 px-4 sm:px-8 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* 페이지 타이틀 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-emerald-400 mb-4">Projects</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <span>HOME</span>
            <span>/</span>
            <span className="text-emerald-400">PROJECTS</span>
          </div>
        </motion.div>

        {/* 소개 문구 */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto text-sm sm:text-base px-2"
        >
          방문해 주셔서 감사합니다. 아래는 제가 진행한 {projects.length}개의 공개 프로젝트입니다.
          <br className="hidden sm:block" />
          각각의 프로젝트는 성장의 발판이 되었고, 매번 새로운 것을 배우는 계기가 되었습니다.
        </motion.p>

        {/* 기술 스택 필터 탭 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-8 sm:mb-12 flex-wrap"
        >
          <button
            onClick={() => setSelectedTech('All')}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg transition-all ${
              selectedTech === 'All'
                ? 'bg-emerald-500 text-white'
                : 'bg-muted/50 text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            All ({projects.length})
          </button>
          {allTechnologies.map((tech) => {
            const count = projects.filter((p) => p.technologies.includes(tech)).length;
            return (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg transition-all ${
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

        {/* 프로젝트 그리드 */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenModal={() => setModalProject(project)}
            />
          ))}
        </motion.div>

        {/* 결과 없음 */}
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

      {/* 프로젝트 상세 모달 */}
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </div>
  );
}

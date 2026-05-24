'use client';
import { useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'motion/react';
import { X, GitBranch, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // ESC 키로 닫기
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleClose]);

  // 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = project ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* 모달 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-card border border-border rounded-2xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* 헤더 */}
            <div className="flex-shrink-0 px-6 pt-6 pb-4 border-b border-border">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  {/* 썸네일 */}
                  <div
                    className={`relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ${
                      project.imageContain
                        ? 'bg-white p-1.5'
                        : 'bg-gradient-to-br from-emerald-500/20 to-blue-500/20'
                    }`}
                  >
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      sizes="56px"
                      className={project.imageContain ? 'object-contain' : 'object-cover'}
                    />
                  </div>
                  {/* 제목 / 카테고리 / 날짜 */}
                  <div className="min-w-0">
                    <h2 className="text-foreground font-semibold truncate">{project.title}</h2>
                    <p className="text-amber-500 text-sm">{project.category}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{project.date}</p>
                  </div>
                </div>
                {/* 닫기 버튼 */}
                <button
                  onClick={handleClose}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 기술 스택 뱃지 */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* README 본문 */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div
                className="
                  prose prose-sm prose-invert max-w-none
                  prose-headings:text-foreground prose-headings:font-semibold prose-headings:border-b prose-headings:border-border/50 prose-headings:pb-2 prose-headings:mb-3
                  prose-h2:text-lg prose-h3:text-base prose-h3:border-none
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-2
                  prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-code:text-emerald-300 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-muted/40 prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:text-xs prose-pre:my-3
                  prose-blockquote:border-l-emerald-500 prose-blockquote:text-muted-foreground prose-blockquote:not-italic prose-blockquote:bg-muted/20 prose-blockquote:rounded-r-lg prose-blockquote:py-1
                  prose-hr:border-border prose-hr:my-4
                  prose-li:text-muted-foreground prose-li:my-0.5 prose-li:marker:text-emerald-500
                  prose-ul:my-2 prose-ol:my-2
                  prose-table:text-sm prose-table:my-3
                  prose-th:text-foreground prose-th:bg-muted/30 prose-th:font-semibold prose-th:px-3 prose-th:py-2
                  prose-td:text-muted-foreground prose-td:px-3 prose-td:py-1.5
                  prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:mx-auto
                "
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.readme}</ReactMarkdown>
              </div>
            </div>

            {/* 푸터 */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-border flex items-center justify-between">
              <span className="text-muted-foreground text-xs flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" />
                Project Details
              </span>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <GitBranch className="w-4 h-4" />
                GitHub에서 보기
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

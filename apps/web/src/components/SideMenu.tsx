'use client';
import {
  Home,
  User,
  Briefcase,
  Star,
  Code,
  FolderOpen,
  Layers,
  Camera,
  Mail,
  BookOpen,
  FileText,
} from "lucide-react";
import { motion } from "motion/react";

export function SideMenu() {
  const menuItems = [
    { icon: Home, label: "Home" },
    { icon: User, label: "About" },
    { icon: Briefcase, label: "Services" },
    { icon: Star, label: "Testimonials" },
    { icon: Code, label: "Contributions" },
    { icon: FolderOpen, label: "Projects" },
    { icon: Layers, label: "Stack" },
    { icon: Camera, label: "Moments" },
    { icon: Mail, label: "Contact" },
    { icon: BookOpen, label: "Books" },
    { icon: FileText, label: "Blog" },
    { icon: FileText, label: "Logs" },
  ];

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-20"
    >
      <nav className="flex flex-col gap-3 bg-[#0f1419]/80 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.6 + index * 0.05,
              }}
              className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
              whileHover={{ x: -5 }}
            >
              <Icon className="w-4 h-4 group-hover:text-emerald-400 transition-colors" />
              <span className="text-sm whitespace-nowrap">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </nav>
    </motion.div>
  );
}
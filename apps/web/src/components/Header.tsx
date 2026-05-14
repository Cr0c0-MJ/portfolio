'use client';
import {
  Home,
  User,
  Mail,
  FolderOpen,
  BookOpen,
  Sun,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'About', path: '/about' },
    { icon: FolderOpen, label: 'Projects', path: '/projects' },
    { icon: Mail, label: 'Contact', path: '/contact' },
    { icon: BookOpen, label: 'Blog', path: '/blog' },
  ];

  return (
    <header className="relative z-10">
      <div className="flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-amber-500">Croco's</span>
          <span>Portfolio</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.label}
                href={item.path}
                className={`flex items-center gap-2 transition-colors ${
                  isActive ? 'text-emerald-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Theme and Language toggles */}
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Sun className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Globe className="w-4 h-4" />
          </button>
        </nav>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </header>
  );
}

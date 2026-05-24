'use client';
import {
  Home,
  User,
  Mail,
  FolderOpen,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => setMenuOpen(false), [pathname]);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'About', path: '/about' },
    { icon: FolderOpen, label: 'Projects', path: '/projects' },
    { icon: Mail, label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="relative z-20">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6">
        {/* Logo */}
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <span className="text-amber-500">Croco&apos;s</span>
          <span>Portfolio</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.label}
                href={item.path}
                className={`flex items-center gap-2 transition-colors ${
                  isActive
                    ? 'text-emerald-500'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Theme Toggle */}
          <button
            className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="테마 전환"
          >
            {mounted && (resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          </button>
        </nav>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="테마 전환"
          >
            {mounted && (resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
          </button>
          <button
            className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="메뉴 열기/닫기"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 z-30 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
          <ul className="flex flex-col py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                      isActive
                        ? 'text-emerald-500 bg-emerald-500/10'
                        : 'text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}

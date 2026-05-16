'use client';
import {
  Home,
  User,
  Mail,
  FolderOpen,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'About', path: '/about' },
    { icon: FolderOpen, label: 'Projects', path: '/projects' },
    { icon: Mail, label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="relative z-10">
      <div className="flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-amber-500">Croco&apos;s</span>
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

          {/* Theme and Language toggles */}
          <button
            className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </header>
  );
}

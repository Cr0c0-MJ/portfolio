import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StarBackground } from '@/components/StarBackground';
import { SideMenu } from '@/components/SideMenu';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Croco's Portfolio",
  description: 'Software Engineer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn('font-sans', inter.variable)}>
      <body className="bg-[#0f1419] text-white min-h-screen flex flex-col">
        <div className="relative flex flex-col min-h-screen">
          <StarBackground />
          <Header />
          <main className="flex-1">{children}</main>
          <SideMenu />
          <Footer />
        </div>
      </body>
    </html>
  );
}

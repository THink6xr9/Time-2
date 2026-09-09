'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Grid, Info, ShieldAlert, Menu, X, Sparkles } from 'lucide-react';
import { getCollectionMetadata } from '@/lib/timeData';

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const metadata = getCollectionMetadata();

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/journey', label: 'JOURNEY', icon: Compass },
    { href: '/archive', label: 'ARCHIVE', icon: Grid },
    { href: '/about', label: 'ABOUT', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050608]/90 backdrop-blur-md border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-gold-400/40 flex items-center justify-center bg-gold-400/5 group-hover:border-gold-400 transition-colors">
            <div className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
          </div>
          <div>
            <span className="font-editorial text-2xl tracking-[0.2em] text-white font-medium group-hover:text-gold-400 transition-colors">
              TIME
            </span>
            <span className="hidden sm:inline-block ml-3 text-[10px] tracking-widest text-muted-foreground uppercase border-l border-white/10 pl-3">
              Awakening Collection ({metadata.publishedCount} / {metadata.totalItems})
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-[0.25em] transition-all flex items-center space-x-2 py-1 relative ${
                  isActive
                    ? 'text-gold-400 font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 opacity-75" />}
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-400 rounded-full" />
                )}
              </Link>
            );
          })}

          {/* Dev Audit Link */}
          <Link
            href="/dev/audit"
            title="Data Audit & Health Dashboard"
            className="text-[10px] tracking-widest text-gray-500 hover:text-gold-400/80 transition-colors px-2 py-1 rounded border border-white/5 hover:border-gold-400/30 flex items-center space-x-1"
          >
            <ShieldAlert className="w-3 h-3 text-gold-400/70" />
            <span>AUDIT</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-400 hover:text-white p-2 rounded-lg focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-6 h-6 text-gold-400" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0c10] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="text-[10px] tracking-widest text-gold-400/80 uppercase pb-2 border-b border-white/5">
            Collection Status: {metadata.publishedCount} Chapters Active
          </div>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm tracking-[0.2em] py-2 transition-colors ${
                  isActive ? 'text-gold-400 font-semibold pl-2 border-l-2 border-gold-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/5">
            <Link
              href="/dev/audit"
              onClick={() => setMobileOpen(false)}
              className="flex items-center space-x-2 text-xs tracking-widest text-gray-400 hover:text-gold-400 py-2"
            >
              <ShieldAlert className="w-4 h-4 text-gold-400" />
              <span>DATA HEALTH AUDIT</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] py-16 px-4 sm:px-6 lg:px-8 text-gray-400 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Column */}
        <div className="space-y-2 text-center md:text-left">
          <Link href="/" className="font-editorial text-2xl tracking-[0.2em] text-white hover:text-gold-400 transition-colors inline-block">
            TIME
          </Link>
          <p className="text-xs tracking-widest text-gray-500 uppercase">
            NFT Journey Through Awakening
          </p>
          <p className="text-[11px] text-gray-600 max-w-sm pt-1">
            A permanent digital archive of consciousness, sound, story, and art.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs tracking-[0.2em]">
          <Link href="/journey" className="hover:text-gold-400 transition-colors">
            JOURNEY
          </Link>
          <Link href="/archive" className="hover:text-gold-400 transition-colors">
            ARCHIVE
          </Link>
          <Link href="/about" className="hover:text-gold-400 transition-colors">
            ABOUT
          </Link>
          <Link href="/dev/audit" className="hover:text-gold-400 transition-colors text-gray-500">
            DATA AUDIT
          </Link>
        </div>

        {/* Right Info */}
        <div className="text-center md:text-right space-y-1 text-xs text-gray-500">
          <p>© TIME Collection. All rights reserved.</p>
          <p className="text-[10px] text-gray-600">
            OpenSea • Medium • YouTube • Ditto
          </p>
        </div>
      </div>
    </footer>
  );
};

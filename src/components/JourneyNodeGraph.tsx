'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Lock } from 'lucide-react';
import { TimeItem } from '@/lib/types';

interface JourneyNodeGraphProps {
  items: TimeItem[];
}

export const JourneyNodeGraph: React.FC<JourneyNodeGraphProps> = ({ items }) => {
  const [hoveredItem, setHoveredItem] = useState<TimeItem | null>(null);

  // Group items or sort sequentially
  const sortedItems = [...items].sort((a, b) => a.time - b.time);

  return (
    <div className="relative min-h-[70vh] py-12 px-4 sm:px-8 bg-[#050608]/50 rounded-3xl border border-white/[0.08] overflow-hidden">
      
      {/* Background Constellation Connection Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="constellationGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e6c875" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#4f86f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#9333ea" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M 50 100 Q 300 200 600 150 T 1200 300"
            fill="none"
            stroke="url(#constellationGrad)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Floating Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 relative z-10">
        <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.3em] text-gold-400 uppercase border border-gold-400/30 px-3 py-1 rounded-full bg-gold-400/5">
          <Sparkles className="w-3 h-3" />
          <span>CONSCIOUSNESS TIMELINE MAP</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl text-white font-medium">
          The Celestial Pathway
        </h2>
        <p className="text-xs text-gray-400 max-w-lg mx-auto">
          Hover over nodes to reveal individual moments of awakening. Click any chapter to step inside its chamber.
        </p>
      </div>

      {/* Node Grid Map */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 max-w-6xl mx-auto relative z-10">
        {sortedItems.map((item) => {
          const isPublished = item.status === 'published';
          const isHovered = hoveredItem?.time === item.time;

          return (
            <div key={item.time} className="relative group">
              {isPublished ? (
                <Link
                  href={`/time/${item.time}`}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`flex flex-col items-center justify-center aspect-square rounded-2xl border transition-all duration-300 relative ${
                    isHovered
                      ? 'bg-gold-400/10 border-gold-400 shadow-[0_0_25px_rgba(230,200,117,0.3)] scale-110'
                      : 'bg-[#0c0e15] border-white/10 hover:border-gold-400/50 hover:bg-[#111522]'
                  }`}
                >
                  {/* Glowing Node Core */}
                  <div
                    className={`w-3 h-3 rounded-full transition-all ${
                      isHovered ? 'bg-gold-400 scale-125 shadow-[0_0_12px_#e6c875]' : 'bg-gold-400/70'
                    }`}
                  />
                  <span className="font-mono text-[10px] tracking-wider text-gray-300 mt-2">
                    {String(item.time).padStart(3, '0')}
                  </span>
                </Link>
              ) : (
                /* Unlit Incomplete Node */
                <div
                  title={`TIME ${String(item.time).padStart(3, '0')} — Unawakened`}
                  className="flex flex-col items-center justify-center aspect-square rounded-2xl border border-white/5 bg-[#07080b]/60 opacity-40 cursor-not-allowed"
                >
                  <Lock className="w-3.5 h-3.5 text-gray-600 mb-1" />
                  <span className="font-mono text-[9px] text-gray-600">
                    {String(item.time).padStart(3, '0')}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hover Preview Card Overlay */}
      {hoveredItem && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[90%] bg-[#0c0e16]/95 border border-gold-400/40 p-6 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <span className="font-mono text-xs text-gold-400 tracking-widest font-semibold">
              {hoveredItem.formattedId}
            </span>
            <span className="text-[10px] uppercase text-gray-400 tracking-wider">
              {hoveredItem.explicitThemes[0] || hoveredItem.derivedThemes[0] || 'CHAPTER'}
            </span>
          </div>

          <h4 className="font-editorial text-2xl text-white font-medium mb-2">
            {hoveredItem.title}
          </h4>

          <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed mb-4">
            {hoveredItem.description || 'Step inside to explore the story, artwork, and music.'}
          </p>

          <Link
            href={`/time/${hoveredItem.time}`}
            className="inline-flex items-center space-x-2 text-xs text-gold-400 font-semibold tracking-widest hover:underline uppercase"
          >
            <span>ENTER CHAMBER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
};

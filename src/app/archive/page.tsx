'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Grid, List, ArrowRight, ExternalLink, Sparkles, Filter } from 'lucide-react';
import { getAllTimeItems, getAllThemes, searchTimeItems } from '@/lib/timeData';
import { TimeItem } from '@/lib/types';

export default function ArchivePage() {
  const [query, setQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'ledger'>('grid');

  const themes = useMemo(() => ['All', ...getAllThemes()], []);

  const filteredItems = useMemo(() => {
    return searchTimeItems(query, selectedTheme);
  }, [query, selectedTheme]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Archive Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-2">
          <div className="text-[10px] tracking-[0.35em] text-gold-400 uppercase font-semibold">
            DIGITAL CONSCIOUSNESS ARCHIVE
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl text-white font-light tracking-wide glow-text-gold">
            Archive Ledger
          </h1>
          <p className="text-xs text-gray-400 max-w-xl">
            Browse and query all recorded TIME pieces by chapter number, philosophical theme, soundscape, or title.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-[#0c0e15] border border-white/10 p-1 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded flex items-center space-x-1.5 text-xs transition-colors ${
              viewMode === 'grid' ? 'bg-gold-400 text-black font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GRID</span>
          </button>
          <button
            onClick={() => setViewMode('ledger')}
            className={`p-2 rounded flex items-center space-x-1.5 text-xs transition-colors ${
              viewMode === 'ledger' ? 'bg-gold-400 text-black font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LEDGER</span>
          </button>
        </div>
      </div>

      {/* Search & Filters Controls */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search TIME number, title, description, or keyword (e.g. 'illusion', 'love', '33')..."
              className="w-full bg-[#0c0e15] border border-white/15 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Theme Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-gold-400 shrink-0 mr-1" />
          {themes.map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wider whitespace-nowrap transition-all ${
                selectedTheme === theme
                  ? 'bg-gold-400/20 text-gold-400 border border-gold-400 font-semibold'
                  : 'bg-[#0c0e15] text-gray-400 border border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="text-xs text-gray-500 tracking-widest uppercase font-mono">
        Found {filteredItems.length} matching TIME entries
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isPublished = item.status === 'published';

            return (
              <div key={item.time} className={`card-dark-frame rounded-2xl p-6 flex flex-col justify-between space-y-4 ${!isPublished ? 'opacity-50' : ''}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-gold-400 font-semibold">{item.formattedId}</span>
                    <span className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border ${
                      isPublished ? 'border-gold-400/30 text-gold-400 bg-gold-400/5' : 'border-gray-700 text-gray-500'
                    }`}>
                      {isPublished ? (item.explicitThemes[0] || item.derivedThemes[0] || 'PUBLISHED') : 'UNRELEASED'}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl text-white font-medium">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {item.description || (isPublished ? 'Explore chamber details and story.' : 'This chapter remains unawakened in the archive.')}
                  </p>
                </div>

                {isPublished ? (
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <Link
                      href={`/time/${item.time}`}
                      className="text-gold-400 hover:underline tracking-widest font-semibold flex items-center space-x-1"
                    >
                      <span>ENTER CHAMBER</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {item.music.hasAudio && (
                      <span className="text-[10px] text-cosmic-blue font-mono">SOUNDSCAPE</span>
                    )}
                  </div>
                ) : (
                  <div className="pt-4 border-t border-white/5 text-[11px] text-gray-600 font-mono italic">
                    CHAMBER SILENT
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* LEDGER LIST VIEW */}
      {viewMode === 'ledger' && (
        <div className="card-dark-frame rounded-2xl overflow-hidden border border-white/10 divide-y divide-white/5">
          <div className="grid grid-cols-12 px-6 py-3 bg-[#08090d] text-[10px] tracking-widest text-gray-400 uppercase font-mono">
            <div className="col-span-2">TIME ID</div>
            <div className="col-span-5">TITLE</div>
            <div className="col-span-3">THEME</div>
            <div className="col-span-2 text-right">ACTION</div>
          </div>

          {filteredItems.map((item) => {
            const isPublished = item.status === 'published';
            return (
              <div key={item.time} className={`grid grid-cols-12 px-6 py-4 items-center text-xs hover:bg-[#11141e] transition-colors ${!isPublished ? 'opacity-50' : ''}`}>
                <div className="col-span-2 font-mono text-gold-400 font-semibold">{item.formattedId}</div>
                <div className="col-span-5 text-white font-editorial text-lg">{item.title}</div>
                <div className="col-span-3 text-gray-400 text-[11px]">
                  {item.explicitThemes.join(', ') || item.derivedThemes.join(', ') || '—'}
                </div>
                <div className="col-span-2 text-right">
                  {isPublished ? (
                    <Link
                      href={`/time/${item.time}`}
                      className="text-gold-400 hover:underline tracking-widest text-[11px] font-semibold"
                    >
                      OPEN →
                    </Link>
                  ) : (
                    <span className="text-gray-600 text-[10px]">SILENT</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

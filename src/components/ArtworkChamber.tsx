'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, Sparkles, Image as ImageIcon, Eye } from 'lucide-react';
import { TimeItem } from '@/lib/types';

interface ArtworkChamberProps {
  item: TimeItem;
  className?: string;
}

export const ArtworkChamber: React.FC<ArtworkChamberProps> = ({ item, className = '' }) => {
  const [zoomOpen, setZoomOpen] = useState(false);

  const hasArtwork = item.artworkUrl !== null;

  return (
    <>
      <div className={`relative group rounded-2xl overflow-hidden card-dark-frame ${className}`}>
        
        {/* Ambient Glow behind artwork frame */}
        <div className="absolute inset-0 bg-radial-gradient from-cosmic-purple/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Chamber Framing Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.08] bg-[#08090d]/80 text-xs tracking-widest text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span className="font-mono text-gray-300">{item.formattedId}</span>
          </div>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">
            {item.status === 'published' ? 'ARTWORK CHAMBER' : 'UNAWAKENED VOID'}
          </span>
        </div>

        {/* Artwork Canvas Container */}
        <div className="relative aspect-square sm:aspect-[4/3] md:aspect-[16/10] w-full flex items-center justify-center bg-[#07080b] p-6">
          {hasArtwork ? (
            <div className="relative w-full h-full flex items-center justify-center cursor-pointer" onClick={() => setZoomOpen(true)}>
              <Image
                src={item.artworkUrl!}
                alt={`${item.formattedId} — ${item.title}`}
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <button
                onClick={() => setZoomOpen(true)}
                aria-label="Enlarge artwork"
                className="absolute top-4 right-4 p-2.5 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-gold-400 hover:text-black transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Elegant Cosmic Artwork Placeholder */
            <div className="w-full h-full border border-white/[0.06] rounded-xl bg-gradient-to-b from-[#0c0e15] to-[#060709] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,200,117,0.05)_0,transparent_70%)] pointer-events-none" />
              
              <div className="w-16 h-16 rounded-full border border-gold-400/20 bg-gold-400/5 flex items-center justify-center mb-4 group-hover:border-gold-400/40 transition-colors">
                <Sparkles className="w-8 h-8 text-gold-400/70" />
              </div>

              <div className="text-[10px] tracking-[0.3em] text-gold-400 uppercase font-semibold mb-2">
                DIGITAL ARTWORK CHAMBER
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal max-w-lg leading-tight mb-2">
                {item.title}
              </h3>

              <p className="text-xs text-gray-500 max-w-md tracking-wider">
                {item.status === 'published'
                  ? 'Visual representation archived. Click below to explore provenance on OpenSea or read the story.'
                  : 'This chapter remains unawakened in the archive.'}
              </p>
            </div>
          )}
        </div>

        {/* Chamber Footer Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-white/[0.08] bg-[#08090d]/80 text-[11px] text-gray-400">
          <div className="truncate max-w-[80%] font-editorial text-sm text-white">
            {item.title}
          </div>
          {hasArtwork && (
            <button
              onClick={() => setZoomOpen(true)}
              className="text-gold-400 hover:underline flex items-center space-x-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>INSPECT</span>
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {zoomOpen && hasArtwork && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setZoomOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center">
            <Image
              src={item.artworkUrl!}
              alt={`${item.formattedId} — ${item.title}`}
              fill
              className="object-contain"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-white/10 flex justify-between items-center text-xs">
              <span className="font-editorial text-lg text-white">{item.formattedId}: {item.title}</span>
              <span className="text-gray-400">Click anywhere to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

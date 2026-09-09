'use client';

import React, { useState } from 'react';
import { Music, Play, ExternalLink, Disc, Youtube } from 'lucide-react';
import { MusicData } from '@/lib/types';

interface MusicPlayerChamberProps {
  music: MusicData;
  formattedId: string;
}

export const MusicPlayerChamber: React.FC<MusicPlayerChamberProps> = ({ music, formattedId }) => {
  const [showEmbed, setShowEmbed] = useState(false);

  if (!music.hasAudio && !music.youtubeUrl && !music.smartLink) {
    return null;
  }

  return (
    <div className="card-dark-frame rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cosmic-blue/5 rounded-full blur-2xl pointer-events-none" />

      {/* Music Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-cosmic-blue/10 border border-cosmic-blue/30 rounded-lg text-cosmic-blue">
            <Disc className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] text-cosmic-blue uppercase font-semibold">
              SOUNDSCAPE CHAMBER
            </div>
            <h3 className="font-editorial text-xl sm:text-2xl text-white font-medium">
              {music.trackTitle || `Sound of ${formattedId}`}
            </h3>
          </div>
        </div>
        {music.dittoStatus && (
          <span className="hidden sm:inline-block text-[10px] tracking-widest text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full bg-emerald-500/5">
            DISTRIBUTED ({music.dittoStatus})
          </span>
        )}
      </div>

      {/* Video Embed Player */}
      {showEmbed && music.youtubeId ? (
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${music.youtubeId}?autoplay=1`}
            title={music.youtubeTitle || `${formattedId} Soundscape`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        /* Video Preview Launcher */
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-[#07090e] border border-white/[0.06]">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-sm font-medium text-white">
              {music.youtubeTitle || `${formattedId} Official Audio`}
            </p>
            <p className="text-xs text-gray-400">
              Immerse yourself in the sonic manifestation of this awakening chapter.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {music.youtubeId ? (
              <button
                onClick={() => setShowEmbed(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold tracking-wider rounded-lg transition-colors shadow-lg shadow-red-600/20"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>LISTEN TO {formattedId}</span>
              </button>
            ) : music.youtubeUrl ? (
              <a
                href={music.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-red-600/90 hover:bg-red-600 text-white text-xs font-semibold tracking-wider rounded-lg transition-colors"
              >
                <Youtube className="w-4 h-4" />
                <span>YOUTUBE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : null}

            {/* Smart Link / Ditto Link */}
            {music.smartLink && (
              <a
                href={music.smartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-cosmic-blue/20 hover:bg-cosmic-blue/30 border border-cosmic-blue/40 text-cosmic-blue text-xs font-semibold tracking-wider rounded-lg transition-colors"
              >
                <Music className="w-4 h-4" />
                <span>LISTEN EVERYWHERE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

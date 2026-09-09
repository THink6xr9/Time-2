'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
import { getJourneyProgressState, JourneyProgressState } from '@/lib/storage';

export const ContinueJourneyBanner: React.FC = () => {
  const [state, setState] = useState<JourneyProgressState | null>(null);

  useEffect(() => {
    const progress = getJourneyProgressState();
    if (progress.lastVisitedTime) {
      setState(progress);
    }
  }, []);

  if (!state || !state.lastVisitedTime) return null;

  return (
    <div className="bg-[#0b0d14] border border-gold-400/30 rounded-xl p-4 sm:p-6 mb-12 shadow-2xl relative overflow-hidden group">
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gold-400/5 rounded-full blur-3xl group-hover:bg-gold-400/10 transition-colors pointer-events-none" />
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 bg-gold-400/10 border border-gold-400/30 rounded-lg mt-0.5 text-gold-400">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold">
              RESUME YOUR AWAKENING
            </div>
            <div className="font-editorial text-xl sm:text-2xl text-white font-medium mt-0.5">
              {state.lastVisitedFormattedId} — {state.lastVisitedTitle}
            </div>
          </div>
        </div>

        <Link
          href={`/time/${state.lastVisitedTime}`}
          className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-gold-400 text-black text-xs font-semibold tracking-widest uppercase rounded-lg hover:bg-gold-500 transition-colors shadow-lg shadow-gold-400/10"
        >
          <span>CONTINUE JOURNEY</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

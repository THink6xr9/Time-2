import React from 'react';
import { getAllTimeItems, getCollectionMetadata } from '@/lib/timeData';
import { JourneyNodeGraph } from '@/components/JourneyNodeGraph';

export const metadata = {
  title: 'THE JOURNEY — Celestial Timeline | TIME Collection',
  description: 'Explore the continuous timeline of TIME pieces from 001 through 041 and beyond.',
};

export default function JourneyPage() {
  const items = getAllTimeItems();
  const metadata = getCollectionMetadata();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="text-[10px] tracking-[0.35em] text-gold-400 uppercase font-semibold">
          THE CONTINUOUS TIMELINE
        </div>
        <h1 className="font-editorial text-5xl sm:text-7xl text-white font-light tracking-wide glow-text-gold">
          The Journey
        </h1>
        <p className="text-sm text-gray-300 leading-relaxed">
          Traverse the consciousness pathway chronologically from TIME 001 through TIME 041. Every node represents a chapter of revelation.
        </p>
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 pt-2 font-mono">
          <span>ACTIVE: {metadata.publishedCount}</span>
          <span>•</span>
          <span>UNAWAKENED VOID: {metadata.incompleteCount}</span>
          <span>•</span>
          <span>TOTAL: {metadata.totalItems}</span>
        </div>
      </div>

      {/* Node Timeline */}
      <JourneyNodeGraph items={items} />

    </div>
  );
}

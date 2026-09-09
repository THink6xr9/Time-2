import React from 'react';
import Link from 'next/link';
import { Sparkles, Compass, BookOpen, Layers } from 'lucide-react';
import { getCollectionMetadata } from '@/lib/timeData';

export const metadata = {
  title: 'ABOUT — Concept & Philosophy | TIME Collection',
  description: 'An ongoing artistic journey through awakening, consciousness, sound, story, and digital art provenance.',
};

export default function AboutPage() {
  const metadata = getCollectionMetadata();

  const themesList = [
    'illusion',
    'love',
    'truth',
    'suffering',
    'silence',
    'wholeness',
    'confusion',
    'acceptance',
    'awakening'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.35em] text-gold-400 uppercase border border-gold-400/30 px-4 py-1.5 rounded-full bg-gold-400/5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>CONCEPTUAL STATEMENT</span>
        </div>
        <h1 className="font-editorial text-5xl sm:text-7xl text-white font-light tracking-wide glow-text-gold">
          About TIME
        </h1>
        <p className="font-editorial text-2xl text-gray-300 italic">
          An ongoing artistic journey through awakening.
        </p>
      </div>

      {/* Main Philosophy Body */}
      <div className="card-dark-frame rounded-3xl p-8 sm:p-12 space-y-8 leading-relaxed text-gray-300 text-sm sm:text-base">
        <p>
          <strong className="text-white font-editorial text-xl">TIME</strong> is a permanent digital repository and continuous artistic exploration of human consciousness, self-inquiry, and internal transformation.
        </p>

        <p>
          Rather than existing as a static catalogue of digital assets, each piece within the TIME collection functions as a individual chapter — an alignment of visual art, philosophical narrative, soundscape, and digital provenance.
        </p>

        <div className="border-t border-b border-white/10 py-6 my-6 space-y-4">
          <h3 className="font-editorial text-2xl text-white font-medium">Core Philosophical Themes</h3>
          <div className="flex flex-wrap gap-2">
            {themesList.map((t) => (
              <span
                key={t}
                className="px-3.5 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-mono tracking-wider uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <p>
          Every moment carries a truth, and every truth leads somewhere. The journey moves sequentially from early inquiry and shadow confrontation to the realization of silence, acceptance, and unbroken wholeness.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs font-mono text-gray-400">
          <span>Active Chapters: {metadata.publishedCount}</span>
          <span>Latest: TIME {String(metadata.latestPublishedTime).padStart(3, '0')}</span>
          <span>Total Recorded: {metadata.totalItems}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-6">
        <Link
          href="/journey"
          className="inline-flex items-center space-x-3 px-8 py-4 bg-gold-400 text-black font-semibold text-xs tracking-[0.25em] uppercase rounded-xl hover:bg-gold-500 transition-all shadow-xl shadow-gold-400/10"
        >
          <Compass className="w-4 h-4" />
          <span>ENTER THE JOURNEY</span>
        </Link>
      </div>

    </div>
  );
}

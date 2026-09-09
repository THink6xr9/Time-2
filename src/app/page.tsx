import React from 'react';
import Link from 'next/link';
import { Compass, Grid, ArrowRight, Sparkles, Disc, BookOpen, ShieldCheck } from 'lucide-react';
import { getCollectionMetadata, getPublishedTimeItems, getTimeItemByNumber } from '@/lib/timeData';
import { ContinueJourneyBanner } from '@/components/ContinueJourneyBanner';
import { ArtworkChamber } from '@/components/ArtworkChamber';

export default function HomePage() {
  const metadata = getCollectionMetadata();
  const publishedItems = getPublishedTimeItems();
  
  // Latest TIME
  const latestItem = getTimeItemByNumber(metadata.latestPublishedTime) || publishedItems[publishedItems.length - 1];

  // Highlights (e.g. TIME 008, TIME 013, TIME 033)
  const highlightNums = [33, 13, 8];
  const highlightItems = highlightNums
    .map(n => getTimeItemByNumber(n))
    .filter((it): it is NonNullable<typeof it> => it !== undefined);

  return (
    <div className="space-y-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HERO SECTION */}
      <section className="text-center py-16 sm:py-24 space-y-8 relative">
        <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs tracking-[0.35em] text-gold-400 uppercase border border-gold-400/30 px-4 py-1.5 rounded-full bg-gold-400/5 animate-pulse-slow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AWAKENING ARCHIVE & JOURNEY</span>
        </div>

        <div className="space-y-4">
          <h1 className="font-editorial text-7xl sm:text-9xl text-white tracking-[0.15em] font-light glow-text-gold">
            TIME
          </h1>
          <h2 className="text-xs sm:text-sm tracking-[0.4em] text-gray-400 uppercase font-medium">
            NFT JOURNEY THROUGH AWAKENING
          </h2>
        </div>

        <p className="font-editorial text-xl sm:text-3xl text-gray-300 italic max-w-2xl mx-auto leading-relaxed pt-4">
          "Every piece is a moment.<br />
          Every moment carries a truth.<br />
          Every truth leads somewhere."
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link
            href="/journey"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gold-400 text-black font-semibold text-xs tracking-[0.25em] uppercase rounded-xl hover:bg-gold-500 transition-all shadow-xl shadow-gold-400/10 group"
          >
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            <span>ENTER THE JOURNEY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/archive"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 bg-[#0d1017] border border-white/15 text-white font-semibold text-xs tracking-[0.25em] uppercase rounded-xl hover:border-gold-400/50 hover:bg-[#131824] transition-all"
          >
            <Grid className="w-4 h-4 text-gray-400" />
            <span>EXPLORE THE ARCHIVE</span>
          </Link>
        </div>
      </section>

      {/* CONTINUE JOURNEY BANNER */}
      <ContinueJourneyBanner />

      {/* LATEST TIME HIGHLIGHT */}
      {latestItem && (
        <section className="card-dark-frame rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <ArtworkChamber item={latestItem} />
            </div>

            <div className="w-full lg:w-1/2 space-y-6">
              <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold border border-gold-400/30 px-3 py-1 rounded-full bg-gold-400/5">
                <span>LATEST AWAKENED CHAPTER</span>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-sm text-gray-400 tracking-widest">{latestItem.formattedId}</span>
                <h3 className="font-editorial text-4xl sm:text-5xl text-white font-medium">
                  {latestItem.title}
                </h3>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed">
                {latestItem.description}
              </p>

              <div className="pt-2">
                <Link
                  href={`/time/${latestItem.time}`}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-gold-400 hover:text-black text-white text-xs font-semibold tracking-widest uppercase rounded-lg transition-colors border border-white/10"
                >
                  <span>STEP INSIDE CHAMBER {latestItem.formattedId}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SELECTED TIME PIECES GRID */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] tracking-[0.3em] text-gold-400 uppercase font-semibold">CURATED ARCHIVE</div>
            <h3 className="font-editorial text-3xl sm:text-4xl text-white font-medium">Key Moments in the Journey</h3>
          </div>
          <Link href="/archive" className="text-xs tracking-widest text-gold-400 hover:underline uppercase flex items-center space-x-1">
            <span>VIEW ALL {metadata.publishedCount} PIECES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlightItems.map((item) => (
            <Link key={item.time} href={`/time/${item.time}`} className="group card-dark-frame rounded-2xl p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-gold-400 font-semibold">{item.formattedId}</span>
                  <span className="text-[10px] uppercase text-gray-500 tracking-wider">
                    {item.explicitThemes[0] || item.derivedThemes[0] || 'JOURNEY'}
                  </span>
                </div>
                <h4 className="font-editorial text-2xl text-white font-medium group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 group-hover:text-white">
                <span className="text-[10px] tracking-widest uppercase">EXPLORE CHAMBER</span>
                <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY STATEMENT */}
      <section className="card-dark-frame rounded-3xl p-10 sm:p-16 text-center space-y-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.3em] text-gold-400 uppercase">
            <BookOpen className="w-4 h-4" />
            <span>THE PHILOSOPHY OF TIME</span>
          </div>

          <h3 className="font-editorial text-3xl sm:text-5xl text-white font-light leading-tight">
            An Ongoing Journey Through Consciousness
          </h3>

          <p className="text-sm text-gray-300 leading-relaxed">
            TIME is not a catalog of digital assets. It is a unfolding, permanent repository where every piece marks a moment of internal revelation — exploring illusion, truth, silence, love, and wholeness.
          </p>

          <div className="pt-4">
            <Link href="/about" className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] text-gold-400 hover:underline uppercase">
              <span>READ THE ABOUT STATEMENT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

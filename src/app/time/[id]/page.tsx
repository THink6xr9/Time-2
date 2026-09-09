import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, ExternalLink, ArrowLeft, ArrowRight, Compass, Sparkles, ShoppingBag } from 'lucide-react';
import { getTimeItemByNumber, getAdjacentTimeItems, getRelatedTimeItems, getAllTimeItems } from '@/lib/timeData';
import { ArtworkChamber } from '@/components/ArtworkChamber';
import { MusicPlayerChamber } from '@/components/MusicPlayerChamber';
import { SaveJourneyState } from './SaveJourneyState';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const items = getAllTimeItems();
  return items.map(it => ({ id: String(it.time) }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const num = parseInt(resolvedParams.id, 10);
  const item = getTimeItemByNumber(num);

  if (!item) return { title: 'TIME Not Found' };

  return {
    title: `${item.formattedId} — ${item.title} | TIME NFT Journey Through Awakening`,
    description: item.description || `Explore chapter ${item.formattedId} (${item.title}) in the TIME digital archive.`,
  };
}

export default async function TimeDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const num = parseInt(resolvedParams.id, 10);
  
  if (isNaN(num)) notFound();

  const item = getTimeItemByNumber(num);
  if (!item) notFound();

  const { prev, next } = getAdjacentTimeItems(num);
  const relatedItems = getRelatedTimeItems(num);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Save journey progress to local storage */}
      <SaveJourneyState time={item.time} formattedId={item.formattedId} title={item.title} />

      {/* Chamber Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center space-x-3 text-xs tracking-[0.3em] font-mono text-gold-400">
          <Link href="/journey" className="hover:underline text-gray-500 uppercase">THE JOURNEY</Link>
          <span>/</span>
          <span className="font-bold">{item.formattedId}</span>
        </div>

        <h1 className="font-editorial text-4xl sm:text-6xl text-white font-medium tracking-wide">
          {item.title}
        </h1>

        {item.status === 'incomplete' && (
          <div className="inline-block px-4 py-1.5 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10 text-xs tracking-widest uppercase">
            UNAWAKENED / INCOMPLETE CHAPTER
          </div>
        )}
      </div>

      {/* Artwork Chamber */}
      <ArtworkChamber item={item} />

      {/* Short Description */}
      {item.description && (
        <div className="card-dark-frame rounded-2xl p-8 text-center max-w-3xl mx-auto relative overflow-hidden">
          <div className="text-[10px] tracking-[0.3em] text-gold-400 uppercase font-semibold mb-3">
            PHILOSOPHICAL INSIGHT
          </div>
          <blockquote className="font-editorial text-xl sm:text-2xl text-gray-200 italic leading-relaxed">
            "{item.description}"
          </blockquote>
        </div>
      )}

      {/* STORY SECTION */}
      {item.mediumUrl && (
        <div className="card-dark-frame rounded-2xl p-8 space-y-6">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="p-2 bg-gold-400/10 border border-gold-400/30 rounded-lg text-gold-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] tracking-[0.25em] text-gold-400 uppercase font-semibold">THE STORY</div>
              <h3 className="font-editorial text-2xl text-white font-medium">Medium Narrative</h3>
            </div>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed">
            Read the complete philosophical text and story accompanying {item.formattedId} on Medium.
          </p>

          <a
            href={item.mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-6 py-3 bg-[#131620] hover:bg-gold-400 hover:text-black border border-white/15 text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-lg"
          >
            <span>READ THE STORY ON MEDIUM</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* SOUND SECTION */}
      <MusicPlayerChamber music={item.music} formattedId={item.formattedId} />

      {/* COLLECT / OPENSEA SECTION */}
      {item.openseaUrl && (
        <div className="card-dark-frame rounded-2xl p-8 space-y-6">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] tracking-[0.25em] text-emerald-400 uppercase font-semibold">COLLECT</div>
              <h3 className="font-editorial text-2xl text-white font-medium">OpenSea Provenance</h3>
            </div>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed">
            View artwork provenance and collectible history for {item.formattedId} on OpenSea.
          </p>

          <a
            href={item.openseaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-6 py-3 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-emerald-600/20"
          >
            <span>VIEW ON OPENSEA</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* JOURNEY NAVIGATION (PREVIOUS / NEXT) */}
      <div className="border-t border-white/10 pt-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {prev ? (
            <Link
              href={`/time/${prev.time}`}
              className="group flex items-center space-x-4 p-4 rounded-xl card-dark-frame w-full sm:w-auto"
            >
              <ArrowLeft className="w-5 h-5 text-gold-400 group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-[10px] text-gray-500 tracking-widest uppercase">PREVIOUS TIME</div>
                <div className="font-editorial text-lg text-white font-medium">{prev.formattedId}</div>
                <div className="text-xs text-gray-400 truncate max-w-[200px]">{prev.title}</div>
              </div>
            </Link>
          ) : (
            <div className="text-xs text-gray-600 font-mono">FIRST CHAPTER</div>
          )}

          <Link href="/journey" className="text-xs tracking-widest text-gold-400 hover:underline uppercase flex items-center space-x-1">
            <Compass className="w-4 h-4" />
            <span>ALL CHAPTERS</span>
          </Link>

          {next ? (
            <Link
              href={`/time/${next.time}`}
              className="group flex items-center space-x-4 p-4 rounded-xl card-dark-frame w-full sm:w-auto text-right justify-end"
            >
              <div>
                <div className="text-[10px] text-gray-500 tracking-widest uppercase">NEXT TIME</div>
                <div className="font-editorial text-lg text-white font-medium">{next.formattedId}</div>
                <div className="text-xs text-gray-400 truncate max-w-[200px]">{next.title}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-gold-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div className="text-xs text-gray-600 font-mono">LATEST CHAPTER</div>
          )}

        </div>
      </div>

      {/* RELATED WORKS */}
      {relatedItems.length > 0 && (
        <div className="space-y-6 border-t border-white/10 pt-12">
          <div className="space-y-1">
            <div className="text-[10px] tracking-[0.3em] text-gold-400 uppercase font-semibold">THEMATIC CONNECTIONS</div>
            <h3 className="font-editorial text-3xl text-white font-medium">Related TIME Pieces</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedItems.map((rel) => (
              <Link
                key={rel.time}
                href={`/time/${rel.time}`}
                className="group card-dark-frame rounded-2xl p-5 space-y-2"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-gold-400 font-semibold">{rel.formattedId}</span>
                  <span className="text-[10px] uppercase text-gray-500">{rel.explicitThemes[0] || rel.derivedThemes[0] || 'RELATED'}</span>
                </div>
                <h4 className="font-editorial text-xl text-white font-medium group-hover:text-gold-400 transition-colors">
                  {rel.title}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-2">{rel.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

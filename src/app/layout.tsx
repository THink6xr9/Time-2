import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CosmicBackground } from '@/components/CosmicBackground';

export const metadata: Metadata = {
  title: 'TIME — NFT Journey Through Awakening',
  description: 'A cinematic, mysterious, and permanent digital art archive and journey through consciousness, sound, story, and art.',
  openGraph: {
    title: 'TIME — NFT Journey Through Awakening',
    description: 'Every piece is a moment. Every moment carries a truth. Every truth leads somewhere.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#050608] text-gray-200 min-h-screen flex flex-col antialiased selection:bg-gold-400 selection:text-black">
        <CosmicBackground />
        <Navigation />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

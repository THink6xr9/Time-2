import React from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle, AlertTriangle, Info, Cpu, Database } from 'lucide-react';
import { getAllTimeItems, getCollectionMetadata } from '@/lib/timeData';
import { ArchiveAgent, ContentAgent, SEOAgent, MusicAgent } from '@/lib/agents';

export const metadata = {
  title: 'DATA AUDIT DASHBOARD — DEV | TIME Collection',
  description: 'Collection health report, link validation, and agent architecture status.',
};

export default function AuditPage() {
  const items = getAllTimeItems();
  const metadata = getCollectionMetadata();

  // Run audit agent check
  const archiveAudit = ArchiveAgent.checkCompleteness(items);

  const issues: { time: number; type: 'warning' | 'error' | 'info'; message: string }[] = [];

  for (const item of items) {
    if (item.status === 'incomplete') {
      issues.push({
        time: item.time,
        type: 'info',
        message: `${item.formattedId} is marked incomplete (unawakened / silent node)`
      });
      continue;
    }

    if (!item.description) {
      issues.push({
        time: item.time,
        type: 'warning',
        message: `${item.formattedId} has empty short description`
      });
    }

    if (item.openseaUrl && !item.openseaUrl.startsWith('https://opensea.io/')) {
      issues.push({
        time: item.time,
        type: 'warning',
        message: `Malformed OpenSea URL for ${item.formattedId}`
      });
    }
  }

  const warningsCount = issues.filter(i => i.type === 'warning').length;
  const errorsCount = issues.filter(i => i.type === 'error').length;
  const healthScore = Math.max(0, 100 - (errorsCount * 20) - (warningsCount * 2));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Audit Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.3em] text-gold-400 uppercase font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DEVELOPMENT DATA AUDIT</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl text-white font-medium tracking-wide">
            Collection Health & Diagnostics
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Automated verification of spreadsheet ingestion, link integrity, and agent pipeline.
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-[#0c0e15] border border-white/10 px-6 py-3 rounded-2xl">
          <div className="text-right">
            <div className="text-[10px] text-gray-500 uppercase tracking-widest">HEALTH SCORE</div>
            <div className="font-mono text-3xl font-bold text-emerald-400">{healthScore} / 100</div>
          </div>
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="card-dark-frame p-6 rounded-2xl space-y-1">
          <div className="text-[10px] tracking-widest text-gray-500 uppercase font-mono">TOTAL RECORDS</div>
          <div className="font-mono text-3xl text-white font-bold">{metadata.totalItems}</div>
          <div className="text-[11px] text-gray-400">Spreadsheet rows ingested</div>
        </div>

        <div className="card-dark-frame p-6 rounded-2xl space-y-1">
          <div className="text-[10px] tracking-widest text-emerald-400 uppercase font-mono">ACTIVE PUBLISHED</div>
          <div className="font-mono text-3xl text-emerald-400 font-bold">{metadata.publishedCount}</div>
          <div className="text-[11px] text-gray-400">Navigable chambers</div>
        </div>

        <div className="card-dark-frame p-6 rounded-2xl space-y-1">
          <div className="text-[10px] tracking-widest text-amber-400 uppercase font-mono">INCOMPLETE VOID</div>
          <div className="font-mono text-3xl text-amber-400 font-bold">{metadata.incompleteCount}</div>
          <div className="text-[11px] text-gray-400">TIME 001, 002, 026</div>
        </div>

        <div className="card-dark-frame p-6 rounded-2xl space-y-1">
          <div className="text-[10px] tracking-widest text-cosmic-blue uppercase font-mono">COMPLETION RATE</div>
          <div className="font-mono text-3xl text-cosmic-blue font-bold">{archiveAudit.data.completionRate}</div>
          <div className="text-[11px] text-gray-400">Active percentage</div>
        </div>
      </div>

      {/* Agents System Status */}
      <div className="card-dark-frame rounded-2xl p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <Cpu className="w-5 h-5 text-gold-400" />
          <h3 className="font-editorial text-2xl text-white font-medium">Future AI Agent Stubs Status</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#08090e] border border-white/5 space-y-1">
            <span className="text-emerald-400">● ContentAgent</span>
            <p className="text-gray-400 text-[11px]">Validates metadata schemas & title integrity</p>
          </div>
          <div className="p-4 rounded-xl bg-[#08090e] border border-white/5 space-y-1">
            <span className="text-emerald-400">● RelationshipAgent</span>
            <p className="text-gray-400 text-[11px]">Generates theme similarity connections</p>
          </div>
          <div className="p-4 rounded-xl bg-[#08090e] border border-white/5 space-y-1">
            <span className="text-emerald-400">● SEOAgent</span>
            <p className="text-gray-400 text-[11px]">Dynamic OpenGraph tags generation</p>
          </div>
          <div className="p-4 rounded-xl bg-[#08090e] border border-white/5 space-y-1">
            <span className="text-emerald-400">● SocialAgent</span>
            <p className="text-gray-400 text-[11px]">Transforms stories into social copy</p>
          </div>
          <div className="p-4 rounded-xl bg-[#08090e] border border-white/5 space-y-1">
            <span className="text-emerald-400">● MusicAgent</span>
            <p className="text-gray-400 text-[11px]">Verifies YouTube & Ditto Smart Links</p>
          </div>
          <div className="p-4 rounded-xl bg-[#08090e] border border-white/5 space-y-1">
            <span className="text-emerald-400">● ArchiveAgent</span>
            <p className="text-gray-400 text-[11px]">Calculates collection data health</p>
          </div>
        </div>
      </div>

      {/* Detailed Issues Log */}
      <div className="card-dark-frame rounded-2xl p-8 space-y-6">
        <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
          <Database className="w-5 h-5 text-gold-400" />
          <h3 className="font-editorial text-2xl text-white font-medium">Audit Findings & Logs</h3>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {issues.map((issue, idx) => {
            const isWarn = issue.type === 'warning';
            const isErr = issue.type === 'error';
            return (
              <div
                key={idx}
                className={`p-3 rounded-lg flex items-center justify-between border ${
                  isErr
                    ? 'border-red-500/30 bg-red-500/10 text-red-300'
                    : isWarn
                    ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                    : 'border-white/5 bg-[#08090e] text-gray-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {isErr ? (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  ) : isWarn ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Info className="w-4 h-4 text-gray-500" />
                  )}
                  <span>{issue.message}</span>
                </div>
                <span className="uppercase text-[10px] tracking-widest">{issue.type}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

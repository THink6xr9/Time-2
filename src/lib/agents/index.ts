import { TimeItem } from '../types';

export interface AgentResponse<T> {
  agentName: string;
  timestamp: string;
  data: T;
  logs: string[];
}

export class ContentAgent {
  static validateItem(item: Partial<TimeItem>): AgentResponse<{ isValid: boolean; errors: string[] }> {
    const errors: string[] = [];
    if (!item.time || item.time <= 0) errors.push('Invalid TIME number');
    if (!item.title || item.title.trim() === '') errors.push('Missing title');
    
    return {
      agentName: 'ContentAgent',
      timestamp: new Date().toISOString(),
      data: { isValid: errors.length === 0, errors },
      logs: [`Validated item ${item.formattedId || item.time}`]
    };
  }
}

export class RelationshipAgent {
  static suggestRelationships(target: TimeItem, allItems: TimeItem[]): AgentResponse<number[]> {
    const published = allItems.filter(i => i.status === 'published' && i.time !== target.time);
    const targetThemes = new Set([...target.explicitThemes, ...target.derivedThemes]);

    const suggestions = published
      .map(item => {
        const itemThemes = new Set([...item.explicitThemes, ...item.derivedThemes]);
        let overlap = 0;
        targetThemes.forEach(t => { if (itemThemes.has(t)) overlap++; });
        return { time: item.time, score: overlap };
      })
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(s => s.time);

    return {
      agentName: 'RelationshipAgent',
      timestamp: new Date().toISOString(),
      data: suggestions,
      logs: [`Generated ${suggestions.length} relationships for ${target.formattedId}`]
    };
  }
}

export class SEOAgent {
  static generateMetadata(item: TimeItem) {
    const title = `${item.formattedId} — ${item.title} | TIME NFT Journey Through Awakening`;
    const description = item.description || `Explore ${item.formattedId} (${item.title}) in the TIME digital archive and awakening journey.`;
    
    return {
      agentName: 'SEOAgent',
      timestamp: new Date().toISOString(),
      data: { title, description, ogTitle: title, ogDescription: description },
      logs: [`Generated SEO tags for ${item.formattedId}`]
    };
  }
}

export class SocialAgent {
  static generateSocialCopy(item: TimeItem): AgentResponse<string> {
    const copy = `"${item.description || item.title}"\n\nEnter chapter ${item.formattedId}: ${item.title}\n\nJourney through awakening: https://time.art/time/${String(item.time).padStart(3, '0')}`;
    return {
      agentName: 'SocialAgent',
      timestamp: new Date().toISOString(),
      data: copy,
      logs: [`Created social snippet for ${item.formattedId}`]
    };
  }
}

export class MusicAgent {
  static inspectMusic(item: TimeItem) {
    const status = item.music.hasAudio ? 'Soundscape Available' : 'Silent / Unset';
    return {
      agentName: 'MusicAgent',
      timestamp: new Date().toISOString(),
      data: { hasAudio: item.music.hasAudio, youtubeId: item.music.youtubeId, smartLink: item.music.smartLink, status },
      logs: [`Inspected music metadata for ${item.formattedId}`]
    };
  }
}

export class ArchiveAgent {
  static checkCompleteness(items: TimeItem[]) {
    const total = items.length;
    const published = items.filter(i => i.status === 'published').length;
    const incomplete = total - published;
    return {
      agentName: 'ArchiveAgent',
      timestamp: new Date().toISOString(),
      data: { total, published, incomplete, completionRate: `${((published / total) * 100).toFixed(1)}%` },
      logs: [`Audit completed for ${total} items`]
    };
  }
}

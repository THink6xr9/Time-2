export type TimeStatus = 'published' | 'incomplete' | 'draft' | 'upcoming' | 'archived';

export interface MusicData {
  trackTitle: string | null;
  youtubeTitle: string | null;
  youtubeUrl: string | null;
  youtubeId: string | null;
  dittoStatus: string | null;
  smartLink: string | null;
  hasAudio: boolean;
}

export interface TimeItem {
  time: number;
  formattedId: string;
  title: string;
  description: string;
  openseaUrl: string | null;
  mediumUrl: string | null;
  music: MusicData;
  artworkUrl: string | null;
  status: TimeStatus;
  explicitThemes: string[];
  derivedThemes: string[];
  relatedTimes: number[];
}

export interface CollectionData {
  metadata: {
    totalItems: number;
    publishedCount: number;
    incompleteCount: number;
    latestPublishedTime: number;
    lastIngestedAt: string;
  };
  items: TimeItem[];
}

export interface AuditReport {
  timestamp: string;
  totalRecords: number;
  publishedCount: number;
  incompleteCount: number;
  issues: {
    time: number;
    type: 'warning' | 'error' | 'info';
    message: string;
  }[];
  healthScore: number; // 0 to 100
}

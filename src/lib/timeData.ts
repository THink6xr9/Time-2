import collectionDataRaw from '../data/timeCollection.json';
import { TimeItem, CollectionData, TimeStatus } from './types';

const data = collectionDataRaw as unknown as CollectionData;

export function getAllTimeItems(): TimeItem[] {
  return data.items;
}

export function getPublishedTimeItems(): TimeItem[] {
  return data.items.filter(item => item.status === 'published');
}

export function getTimeItemByNumber(num: number): TimeItem | undefined {
  return data.items.find(item => item.time === num);
}

export function getCollectionMetadata() {
  return data.metadata;
}

/**
 * Returns previous and next published TIME items, smoothly skipping incomplete entries (e.g. from 025 to 027).
 */
export function getAdjacentTimeItems(currentNum: number): {
  prev: TimeItem | null;
  next: TimeItem | null;
} {
  const published = getPublishedTimeItems().sort((a, b) => a.time - b.time);
  const currentIndex = published.findIndex(item => item.time === currentNum);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prev = currentIndex > 0 ? published[currentIndex - 1] : null;
  const next = currentIndex < published.length - 1 ? published[currentIndex + 1] : null;

  return { prev, next };
}

/**
 * Searches TIME items by title, description, or TIME number.
 */
export function searchTimeItems(query: string, themeFilter: string = 'All'): TimeItem[] {
  let items = data.items;

  if (themeFilter !== 'All') {
    items = items.filter(item => {
      const allThemes = [...item.explicitThemes, ...item.derivedThemes];
      return allThemes.includes(themeFilter);
    });
  }

  const q = query.trim().toLowerCase();
  if (!q) return items;

  return items.filter(item => {
    const formattedMatch = item.formattedId.toLowerCase().includes(q);
    const numMatch = String(item.time) === q || `time ${item.time}` === q || `time0${item.time}` === q || `time00${item.time}` === q;
    const titleMatch = item.title.toLowerCase().includes(q);
    const descMatch = item.description.toLowerCase().includes(q);
    const trackMatch = item.music.trackTitle?.toLowerCase().includes(q) || false;

    return formattedMatch || numMatch || titleMatch || descMatch || trackMatch;
  });
}

/**
 * Returns all unique explicit + derived themes across published pieces.
 */
export function getAllThemes(): string[] {
  const themesSet = new Set<string>();
  for (const item of data.items) {
    if (item.status !== 'published') continue;
    item.explicitThemes.forEach(t => themesSet.add(t));
    item.derivedThemes.forEach(t => themesSet.add(t));
  }
  return Array.from(themesSet).sort();
}

/**
 * Returns related TIME items for a given TIME number.
 */
export function getRelatedTimeItems(num: number): TimeItem[] {
  const item = getTimeItemByNumber(num);
  if (!item || item.relatedTimes.length === 0) return [];

  return item.relatedTimes
    .map(relNum => getTimeItemByNumber(relNum))
    .filter((rel): rel is TimeItem => rel !== undefined && rel.status === 'published');
}

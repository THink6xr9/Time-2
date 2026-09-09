import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { TimeItem, CollectionData, TimeStatus } from '../src/lib/types';

const THEME_KEYWORDS: Record<string, string[]> = {
  "Illusion": ["illusion", "illusions", "lie", "spell", "witch", "reflections", "deception"],
  "Love": ["love", "heart", "hunger", "form of love", "union"],
  "Truth": ["truth", "truths", "point of truth", "thread of truth"],
  "Wholeness": ["wholeness", "mirror of wholeness", "roots of wholeness", "stillness of wholeness"],
  "Awakening": ["awakening", "mind", "acceptance", "fire to light", "shattering"],
  "Silence": ["silence", "quiet", "voice", "stillness", "patient"],
  "Storm": ["storm", "root beneath", "madness", "confusion"],
  "Early Journey": ["broken heart", "threefold mind", "safer shadows", "gratitude"]
};

// Optional manual theme overrides
const EXPLICIT_THEMES_MAP: Record<number, string[]> = {
  3: ["Truth", "Love"],
  4: ["Awakening", "Love"],
  5: ["Awakening"],
  6: ["Awakening", "Wholeness"],
  7: ["Truth", "Love"],
  8: ["Silence", "Love"],
  9: ["Silence"],
  10: ["Wholeness"],
  11: ["Awakening"],
  12: ["Love"],
  13: ["Wholeness"],
  14: ["Awakening"],
  15: ["Truth"],
  16: ["Love"],
  17: ["Wholeness"],
  18: ["Illusion", "Silence"],
  19: ["Truth"],
  20: ["Awakening"],
  21: ["Silence"],
  22: ["Wholeness", "Illusion"],
  23: ["Silence"],
  24: ["Wholeness", "Silence"],
  25: ["Storm"],
  27: ["Wholeness", "Storm"],
  28: ["Wholeness", "Storm"],
  29: ["Illusion", "Love"],
  30: ["Illusion"],
  31: ["Illusion"],
  32: ["Truth", "Illusion"],
  33: ["Illusion", "Truth"],
  34: ["Storm"],
  35: ["Illusion", "Awakening"],
  36: ["Illusion"],
  37: ["Awakening", "Illusion"],
  38: ["Silence"],
  39: ["Love", "Storm"],
  40: ["Love"],
  41: ["Love"]
};

function extractYouTubeId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

function cleanYouTubeTitle(title: string | null): string | null {
  if (!title) return null;
  // Remove [TIME 008] or Time 033 - prefixes
  return title
    .replace(/^\[TIME\s*\d+\]\s*/i, '')
    .replace(/^TIME\s*\d+\s*[-–—:]\s*/i, '')
    .trim();
}

function deriveThemes(title: string, desc: string): string[] {
  const combined = `${title} ${desc}`.toLowerCase();
  const matched: string[] = [];
  
  for (const [theme, keywords] of Object.entries(THEME_KEYWORDS)) {
    if (keywords.some(k => combined.includes(k))) {
      matched.push(theme);
    }
  }
  
  return matched;
}

function runIngestion() {
  const excelPath = path.join(process.cwd(), 'TimeCollection Track Sheet.xlsx');
  if (!fs.existsSync(excelPath)) {
    console.error('Spreadsheet not found at:', excelPath);
    process.exit(1);
  }

  const workbook = XLSX.readFile(excelPath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  const rawRows: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
  // Find header index
  let headerRowIdx = -1;
  for (let i = 0; i < rawRows.length; i++) {
    if (rawRows[i] && rawRows[i].includes('Title')) {
      headerRowIdx = i;
      break;
    }
  }

  if (headerRowIdx === -1) {
    console.error('Could not locate header row containing "Title"');
    process.exit(1);
  }

  const items: TimeItem[] = [];

  for (let i = headerRowIdx + 1; i < rawRows.length; i++) {
    const row = rawRows[i];
    if (!row || row.length === 0) continue;

    const timeVal = row[0];
    if (timeVal === undefined || timeVal === null || timeVal === '') continue;

    const timeNum = parseInt(String(timeVal).trim(), 10);
    if (isNaN(timeNum)) continue;

    const rawTitle = String(row[1] || '').trim();
    const rawDesc = String(row[2] || '').trim();
    const rawOpenSea = String(row[3] || '').trim();
    const rawMedium = String(row[4] || '').trim();
    const rawYtTitle = String(row[5] || '').trim();
    const rawYtUrl = String(row[6] || '').trim();
    const rawDitto = String(row[7] || '').trim();
    const rawSmartLink = String(row[8] || '').trim();

    const isInvalidTitle = !rawTitle || rawTitle === '-' || rawTitle.toLowerCase() === 'placeholder';
    const status: TimeStatus = isInvalidTitle ? 'incomplete' : 'published';

    const cleanTitle = isInvalidTitle ? `TIME ${String(timeNum).padStart(3, '0')}` : rawTitle;
    const cleanDesc = (rawDesc && rawDesc !== '-') ? rawDesc : '';

    const openseaUrl = (rawOpenSea && rawOpenSea !== '-') ? rawOpenSea : null;
    const mediumUrl = (rawMedium && rawMedium !== '-') ? rawMedium : null;
    const youtubeUrl = (rawYtUrl && rawYtUrl !== '-') ? rawYtUrl : null;
    const youtubeTitle = (rawYtTitle && rawYtTitle !== '-') ? rawYtTitle : null;
    const dittoStatus = (rawDitto && rawDitto !== '-') ? rawDitto : null;
    const smartLink = (rawSmartLink && rawSmartLink !== '-') ? rawSmartLink : null;

    const youtubeId = extractYouTubeId(youtubeUrl);
    const trackTitle = cleanYouTubeTitle(youtubeTitle) || (status === 'published' ? cleanTitle : null);
    const hasAudio = !!(youtubeUrl || smartLink);

    const explicitThemes = EXPLICIT_THEMES_MAP[timeNum] || [];
    const derivedThemes = deriveThemes(cleanTitle, cleanDesc);

    // Formatted 3-digit ID
    const formattedId = `TIME ${String(timeNum).padStart(3, '0')}`;
    
    // Artwork path mapping check
    const artworkFileName = `time-${String(timeNum).padStart(3, '0')}.webp`;
    const localArtPath = path.join(process.cwd(), 'public', 'art', artworkFileName);
    const artworkUrl = fs.existsSync(localArtPath) ? `/art/${artworkFileName}` : null;

    items.push({
      time: timeNum,
      formattedId,
      title: cleanTitle,
      description: cleanDesc,
      openseaUrl,
      mediumUrl,
      music: {
        trackTitle,
        youtubeTitle,
        youtubeUrl,
        youtubeId,
        dittoStatus,
        smartLink,
        hasAudio
      },
      artworkUrl,
      status,
      explicitThemes,
      derivedThemes,
      relatedTimes: [] // Will be populated in second pass
    });
  }

  // Second pass: Calculate relatedTimes based on shared themes
  const publishedItems = items.filter(it => it.status === 'published');
  
  for (const item of items) {
    if (item.status !== 'published') continue;
    
    const allThemes = new Set([...item.explicitThemes, ...item.derivedThemes]);
    
    const scores: { time: number; score: number }[] = [];
    for (const other of publishedItems) {
      if (other.time === item.time) continue;
      const otherThemes = new Set([...other.explicitThemes, ...other.derivedThemes]);
      
      // Calculate Jaccard / Overlap similarity
      let overlap = 0;
      allThemes.forEach(t => {
        if (otherThemes.has(t)) overlap++;
      });
      
      if (overlap > 0) {
        scores.push({ time: other.time, score: overlap });
      }
    }
    
    // Sort by highest overlap, then closest TIME index
    scores.sort((a, b) => b.score - a.score || Math.abs(a.time - item.time) - Math.abs(b.time - item.time));
    item.relatedTimes = scores.slice(0, 3).map(s => s.time);
  }

  const publishedCount = items.filter(i => i.status === 'published').length;
  const incompleteCount = items.filter(i => i.status === 'incomplete').length;
  const latestPublishedTime = Math.max(...publishedItems.map(i => i.time));

  const collectionData: CollectionData = {
    metadata: {
      totalItems: items.length,
      publishedCount,
      incompleteCount,
      latestPublishedTime,
      lastIngestedAt: new Date().toISOString()
    },
    items
  };

  const outputDir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'timeCollection.json');
  fs.writeFileSync(outputPath, JSON.stringify(collectionData, null, 2), 'utf-8');

  console.log(`Ingestion completed successfully:`);
  console.log(`- Total items: ${items.length}`);
  console.log(`- Published: ${publishedCount}`);
  console.log(`- Incomplete: ${incompleteCount}`);
  console.log(`- Latest published: TIME ${latestPublishedTime}`);
  console.log(`- Saved to: ${outputPath}`);
}

runIngestion();

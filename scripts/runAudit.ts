import * as fs from 'fs';
import * as path from 'path';
import { CollectionData, AuditReport } from '../src/lib/types';

function runAudit(): AuditReport {
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'timeCollection.json');
  if (!fs.existsSync(jsonPath)) {
    console.error('Data file not found:', jsonPath);
    process.exit(1);
  }

  const data: CollectionData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const issues: AuditReport['issues'] = [];

  const timesSeen = new Set<number>();

  for (const item of data.items) {
    // 1. Check duplicate TIME numbers
    if (timesSeen.has(item.time)) {
      issues.push({
        time: item.time,
        type: 'error',
        message: `Duplicate TIME number detected: ${item.time}`
      });
    }
    timesSeen.add(item.time);

    // 2. Check incomplete handling
    if (item.status === 'incomplete') {
      issues.push({
        time: item.time,
        type: 'info',
        message: `Item ${item.formattedId} is marked incomplete (unreleased / missing data)`
      });
      continue;
    }

    // 3. Published item validation
    if (!item.title || item.title.trim() === '') {
      issues.push({
        time: item.time,
        type: 'error',
        message: `Published item ${item.formattedId} is missing a title`
      });
    }

    if (!item.description || item.description.trim() === '') {
      issues.push({
        time: item.time,
        type: 'warning',
        message: `Item ${item.formattedId} has empty short description`
      });
    }

    // 4. URL format validation
    if (item.openseaUrl && !item.openseaUrl.startsWith('https://opensea.io/')) {
      issues.push({
        time: item.time,
        type: 'warning',
        message: `Malformed OpenSea URL: ${item.openseaUrl}`
      });
    }

    if (item.mediumUrl && !item.mediumUrl.startsWith('https://medium.com/')) {
      issues.push({
        time: item.time,
        type: 'warning',
        message: `Malformed Medium URL: ${item.mediumUrl}`
      });
    }

    if (item.music.youtubeUrl && !item.music.youtubeId) {
      issues.push({
        time: item.time,
        type: 'warning',
        message: `YouTube URL exists but could not extract video ID: ${item.music.youtubeUrl}`
      });
    }
  }

  const totalErrors = issues.filter(i => i.type === 'error').length;
  const totalWarnings = issues.filter(i => i.type === 'warning').length;
  
  // Health score calculation
  const maxScore = 100;
  const healthScore = Math.max(0, maxScore - (totalErrors * 20) - (totalWarnings * 2));

  const report: AuditReport = {
    timestamp: new Date().toISOString(),
    totalRecords: data.items.length,
    publishedCount: data.metadata.publishedCount,
    incompleteCount: data.metadata.incompleteCount,
    issues,
    healthScore
  };

  console.log('\n=== TIME DATA HEALTH AUDIT REPORT ===');
  console.log(`Timestamp: ${report.timestamp}`);
  console.log(`Total Records: ${report.totalRecords}`);
  console.log(`Published: ${report.publishedCount} | Incomplete: ${report.incompleteCount}`);
  console.log(`Health Score: ${report.healthScore} / 100`);
  console.log(`Total Issues Found: ${issues.length} (Errors: ${totalErrors}, Warnings: ${totalWarnings}, Info: ${issues.filter(i => i.type === 'info').length})`);
  
  console.log('\nDetailed Findings:');
  for (const issue of issues) {
    const prefix = issue.type === 'error' ? '[ERROR]' : issue.type === 'warning' ? '[WARN]' : '[INFO]';
    console.log(`  ${prefix} TIME ${String(issue.time).padStart(3, '0')}: ${issue.message}`);
  }
  console.log('=====================================\n');

  return report;
}

runAudit();

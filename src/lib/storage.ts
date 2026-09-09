const LAST_VISITED_KEY = 'time_journey_last_visited';
const VISITED_TIMES_KEY = 'time_journey_visited_set';

export interface JourneyProgressState {
  lastVisitedTime: number | null;
  lastVisitedFormattedId: string | null;
  lastVisitedTitle: string | null;
  visitedTimes: number[];
  timestamp: string | null;
}

export function saveLastVisitedTime(time: number, formattedId: string, title: string): void {
  if (typeof window === 'undefined') return;

  try {
    const payload = {
      time,
      formattedId,
      title,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(LAST_VISITED_KEY, JSON.stringify(payload));

    const existingVisitedRaw = localStorage.getItem(VISITED_TIMES_KEY);
    let visited: number[] = [];
    if (existingVisitedRaw && existingVisitedRaw.trim() !== '') {
      try {
        visited = JSON.parse(existingVisitedRaw);
      } catch {
        visited = [];
      }
    }
    if (!visited.includes(time)) {
      visited.push(time);
      localStorage.setItem(VISITED_TIMES_KEY, JSON.stringify(visited));
    }
  } catch (e) {
    console.warn('Could not save journey progress to localStorage', e);
  }
}

export function getJourneyProgressState(): JourneyProgressState {
  const emptyState: JourneyProgressState = {
    lastVisitedTime: null,
    lastVisitedFormattedId: null,
    lastVisitedTitle: null,
    visitedTimes: [],
    timestamp: null
  };

  if (typeof window === 'undefined') {
    return emptyState;
  }

  try {
    const lastRaw = localStorage.getItem(LAST_VISITED_KEY);
    const visitedRaw = localStorage.getItem(VISITED_TIMES_KEY);

    let lastData = null;
    if (lastRaw && lastRaw.trim() !== '') {
      try {
        lastData = JSON.parse(lastRaw);
      } catch {
        lastData = null;
      }
    }

    let visitedTimes: number[] = [];
    if (visitedRaw && visitedRaw.trim() !== '') {
      try {
        visitedTimes = JSON.parse(visitedRaw);
      } catch {
        visitedTimes = [];
      }
    }

    return {
      lastVisitedTime: lastData?.time || null,
      lastVisitedFormattedId: lastData?.formattedId || null,
      lastVisitedTitle: lastData?.title || null,
      visitedTimes,
      timestamp: lastData?.timestamp || null
    };
  } catch (e) {
    return emptyState;
  }
}

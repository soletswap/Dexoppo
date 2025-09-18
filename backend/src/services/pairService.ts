import { memoryCache } from "../cache/memoryCache";

export function listPairs(search?: string, timeFilter?: string) {
  const all = memoryCache.getAll();
  let filtered = all;

  // Apply search filter
  if (search) {
    const s = search.toLowerCase();
    filtered = all.filter(p =>
      p.base.toLowerCase().includes(s) ||
      p.quote.toLowerCase().includes(s) ||
      p.id.includes(s)
    );
  }

  // Apply time-based sorting for popular tokens
  if (timeFilter) {
    const now = Date.now();
    const timeMs = getTimeFilterMs(timeFilter);
    
    if (timeFilter === 'new') {
      // Show new tokens (created within last 24 hours)
      filtered = filtered
        .filter(p => now - p.createdAt <= 24 * 60 * 60 * 1000)
        .sort((a, b) => b.createdAt - a.createdAt); // Newest first
    } else {
      // For time-based popular tokens, we'll sort by volume for now
      // In a real implementation, you'd have time-specific volume data
      filtered = filtered.sort((a, b) => b.volumeUSD - a.volumeUSD);
    }
  } else {
    // Default: sort by volume (most popular)
    filtered = filtered.sort((a, b) => b.volumeUSD - a.volumeUSD);
  }

  return filtered;
}

export function getPair(id: string) {
  return memoryCache.get(id);
}

function getTimeFilterMs(timeFilter: string): number {
  switch (timeFilter) {
    case '1h': return 60 * 60 * 1000;
    case '24h': return 24 * 60 * 60 * 1000;
    case '7d': return 7 * 24 * 60 * 60 * 1000;
    case '30d': return 30 * 24 * 60 * 60 * 1000;
    default: return 24 * 60 * 60 * 1000;
  }
}

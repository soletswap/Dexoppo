import { memoryCache } from "../cache/memoryCache";

export function listPairs(search?: string) {
  const all = memoryCache.getAll();
  if (!search) return all;
  const s = search.toLowerCase();
  return all.filter(p =>
    p.base.toLowerCase().includes(s) ||
    p.quote.toLowerCase().includes(s) ||
    p.id.includes(s)
  );
}

export function getPair(id: string) {
  return memoryCache.get(id);
}

import { NormalizedPair } from "../types/pair";

class MemoryCache {  
  private pairs: Map<string, NormalizedPair> = new Map();  
  getAll(): NormalizedPair[] {  
    return Array.from(this.pairs.values());  
  }  
  get(id: string) {  
    return this.pairs.get(id);  
  }  
  set(pair: NormalizedPair) {  
    this.pairs.set(pair.id, pair);  
  }  
  upsertSpark(id: string, price: number) {  
    const p = this.pairs.get(id);  
    if (!p) return;  
    p.sparkline = p.sparkline ?? [];  
    p.sparkline.push(price);  
    if (p.sparkline.length > 50) p.sparkline.shift();  
  }  
}

export const memoryCache = new MemoryCache();

export interface RawPair {  
  id: string;  
  token0: { symbol: string; id: string; decimals: string };  
  token1: { symbol: string; id: string; decimals: string };  
  token0Price: string;  
  token1Price: string;  
  reserveUSD: string;  
  volumeUSD: string;  
}
  
export interface NormalizedPair {  
  id: string;  
  base: string;  
  quote: string;  
  price: number;  
  priceInverse: number;  
  reserveUSD: number;  
  volumeUSD: number;  
  updatedAt: number;  
  chain: string;  
  source: string;  
  sparkline?: number[];  
}

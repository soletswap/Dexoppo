import { NormalizedPair } from "../../types/pair";
import { memoryCache } from "../../cache/memoryCache";

// Mock data for testing when external API is not available
export function initializeMockData() {
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;
  const oneDay = 24 * oneHour;
  
  const mockPairs: NormalizedPair[] = [
    // Popular established tokens
    {
      id: "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
      base: "USDC",
      quote: "WETH",
      price: 0.0003125,
      priceInverse: 3200,
      reserveUSD: 150000000,
      volumeUSD: 45000000,
      updatedAt: now,
      createdAt: now - 30 * oneDay, // 30 days old
      chain: "ethereum",
      source: "uniswap-v2",
      sparkline: [3150, 3180, 3200, 3220, 3190, 3200]
    },
    {
      id: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
      base: "DAI",
      quote: "WETH",
      price: 0.0003125,
      priceInverse: 3200,
      reserveUSD: 120000000,
      volumeUSD: 32000000,
      updatedAt: now,
      createdAt: now - 45 * oneDay, // 45 days old
      chain: "ethereum",
      source: "uniswap-v2",
      sparkline: [3180, 3200, 3190, 3210, 3195, 3200]
    },
    {
      id: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
      base: "USDC",
      quote: "USDT",
      price: 1.001,
      priceInverse: 0.999,
      reserveUSD: 200000000,
      volumeUSD: 75000000,
      updatedAt: now,
      createdAt: now - 60 * oneDay, // 60 days old
      chain: "ethereum",
      source: "uniswap-v2",
      sparkline: [1.000, 1.001, 0.999, 1.002, 1.000, 1.001]
    },
    // New tokens (created recently)
    {
      id: "0x1234567890abcdef1234567890abcdef12345678",
      base: "NEWTOKEN",
      quote: "WETH",
      price: 0.000045,
      priceInverse: 22222,
      reserveUSD: 500000,
      volumeUSD: 1200000,
      updatedAt: now,
      createdAt: now - 2 * oneHour, // 2 hours old
      chain: "ethereum",
      source: "uniswap-v2",
      sparkline: [0.000040, 0.000042, 0.000045, 0.000048, 0.000046, 0.000045]
    },
    {
      id: "0xabcdef1234567890abcdef1234567890abcdef12",
      base: "MEMECOIN",
      quote: "USDC",
      price: 0.00012,
      priceInverse: 8333.33,
      reserveUSD: 250000,
      volumeUSD: 800000,
      updatedAt: now,
      createdAt: now - 6 * oneHour, // 6 hours old
      chain: "ethereum",
      source: "uniswap-v2",
      sparkline: [0.00010, 0.00011, 0.00012, 0.00014, 0.00013, 0.00012]
    },
    {
      id: "0xdeadbeef1234567890abcdef1234567890abcdef",
      base: "ROCKET",
      quote: "WETH",
      price: 0.0000125,
      priceInverse: 80000,
      reserveUSD: 180000,
      volumeUSD: 650000,
      updatedAt: now,
      createdAt: now - 12 * oneHour, // 12 hours old
      chain: "ethereum",
      source: "uniswap-v2",
      sparkline: [0.0000120, 0.0000122, 0.0000125, 0.0000128, 0.0000126, 0.0000125]
    },
    // Medium age tokens (between new and established)
    {
      id: "0x1111111111111111111111111111111111111111",
      base: "MIDTOKEN",
      quote: "USDC", 
      price: 2.45,
      priceInverse: 0.408,
      reserveUSD: 2500000,
      volumeUSD: 3500000,
      updatedAt: now,
      createdAt: now - 5 * oneDay, // 5 days old
      chain: "ethereum",
      source: "uniswap-v2",
      sparkline: [2.40, 2.42, 2.45, 2.48, 2.46, 2.45]
    },
    {
      id: "0x2222222222222222222222222222222222222222",
      base: "TRENDING",
      quote: "WETH",
      price: 0.00089,
      priceInverse: 1123.6,
      reserveUSD: 1800000,
      volumeUSD: 4200000,
      updatedAt: now,
      createdAt: now - 3 * oneDay, // 3 days old
      chain: "ethereum",
      source: "uniswap-v2",
      sparkline: [0.00085, 0.00087, 0.00089, 0.00092, 0.00090, 0.00089]
    }
  ];

  // Add mock data to cache
  mockPairs.forEach(pair => {
    memoryCache.set(pair);
    if (pair.sparkline) {
      pair.sparkline.forEach(price => {
        memoryCache.upsertSpark(pair.id, price);
      });
    }
  });

  console.log(`✅ Initialized ${mockPairs.length} mock pairs for testing`);
}
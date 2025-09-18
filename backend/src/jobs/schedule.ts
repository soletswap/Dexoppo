import { fetchUniswapPairs } from "../services/fetch/uniswapFetcher";
import { initializeMockData } from "../services/fetch/mockData";

export function startJobs() {
  // Initialize with mock data first for testing
  initializeMockData();
  
  // Try to fetch real data, fall back to mock if it fails
  fetchUniswapPairs().catch((error) => {
    console.log("⚠️  External API unavailable, using mock data:", error.message);
  });

  // Try to fetch real data every 30 seconds
  setInterval(() => {
    fetchUniswapPairs().catch((error) => {
      console.log("⚠️  External API still unavailable:", error.message);
    });
  }, 30_000);
}

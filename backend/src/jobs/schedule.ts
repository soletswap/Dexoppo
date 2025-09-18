import { fetchUniswapPairs } from "../services/fetch/uniswapFetcher";

export function startJobs() {
  // İlk çekiş
  fetchUniswapPairs().catch(console.error);

  // Her 30 sn
  setInterval(() => {
    fetchUniswapPairs().catch(console.error);
  }, 30_000);
}

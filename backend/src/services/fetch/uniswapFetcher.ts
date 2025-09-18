import fetch from "node-fetch";
import { RawPair, NormalizedPair } from "../../types/pair";
import { memoryCache } from "../../cache/memoryCache";

const UNISWAP_V2_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2";

const query = `
{
  pairs(first: 20, orderBy: volumeUSD, orderDirection: desc) {
    id
    token0 { symbol id decimals }
    token1 { symbol id decimals }
    token0Price
    token1Price
    reserveUSD
    volumeUSD
  }
}
`;

export async function fetchUniswapPairs() {
  const res = await fetch(UNISWAP_V2_SUBGRAPH, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query })
  });
  const json = await res.json() as { data: { pairs: RawPair[] } };
  const raw: RawPair[] = json.data.pairs;
  const now = Date.now();

  raw.forEach(r => {
    const price = parseFloat(r.token0Price);
    const norm: NormalizedPair = {
      id: r.id,
      base: r.token0.symbol,
      quote: r.token1.symbol,
      price,
      priceInverse: parseFloat(r.token1Price),
      reserveUSD: parseFloat(r.reserveUSD),
      volumeUSD: parseFloat(r.volumeUSD),
      updatedAt: now,
      chain: "ethereum",
      source: "uniswap-v2",
    };
    memoryCache.set(norm);
    memoryCache.upsertSpark(norm.id, norm.price);
  });
}

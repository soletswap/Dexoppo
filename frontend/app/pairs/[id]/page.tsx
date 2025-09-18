import { fetchPair } from "../../../lib/api";

interface Props {
  params: { id: string };
}

export default async function PairDetail({ params }: Props) {
  const pair = await fetchPair(params.id);
  return (
    <main style={{ padding: 24 }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{pair.base}/{pair.quote}</h2>
      <div style={{ display: 'grid', gap: 8 }}>
        <div>Price: {pair.price}</div>
        <div>Volume USD: {pair.volumeUSD}</div>
        <div>Reserve USD: {pair.reserveUSD}</div>
        <div>Kaynak: {pair.source}</div>
        <div>Chain: {pair.chain}</div>
      </div>
      <a href="/" style={{ color: '#2563eb', textDecoration: 'underline', marginTop: 16, display: 'inline-block' }}>Geri</a>
    </main>
  );
}

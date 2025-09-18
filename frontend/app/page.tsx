import { PairTable } from "../components/PairTable";

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Dexoppo</h1>
      <PairTable />
      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 16 }}>
        Veriler gecikebilir, yalnızca demo amaçlıdır.
      </p>
    </main>
  );
}

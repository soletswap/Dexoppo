"use client";
import { useEffect, useState } from "react";
import { Sparkline } from "./Sparkline";

export function PairTable() {
  const [pairs, setPairs] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  async function load() {
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/api/pairs${search ? `?search=${encodeURIComponent(search)}` : ""}`;
    const res = await fetch(url);
    const json = await res.json();
    setPairs(json.data || []);
  }

  useEffect(() => {
    load();
    const int = setInterval(load, 15000);
    return () => clearInterval(int);
  }, [search]);

  return (
    <div>
      <input
        placeholder="Ara..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ border: '1px solid #e5e7eb', padding: '4px 8px', marginBottom: 8, borderRadius: 6 }}
      />
      <table style={{ width: '100%', fontSize: 14 }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
            <th>Pair</th>
            <th>Price</th>
            <th>Volume 24h</th>
            <th>Reserve USD</th>
            <th>Graph</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td>
                <a href={`/pairs/${p.id}`} style={{ color: '#2563eb', textDecoration: 'underline' }}>
                  {p.base}/{p.quote}
                </a>
              </td>
              <td>{Number(p.price).toFixed(6)}</td>
              <td>{Number(p.volumeUSD).toFixed(0)}</td>
              <td>{Number(p.reserveUSD).toFixed(0)}</td>
              <td><Sparkline data={p.sparkline} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useEffect, useState } from "react";

interface Pair {
  id: string;
  base: string;
  quote: string;
  price: number;
  volumeUSD: number;
  reserveUSD: number;
  sparkline?: number[];
}

interface ApiResponse {
  data: Pair[];
}

export default function Home() {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPairs() {
      try {
        setLoading(true);
        setError(null);
        
        const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";
        const response = await fetch(`${apiBase}/api/pairs`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data: ApiResponse = await response.json();
        setPairs(data.data || []);
      } catch (err) {
        console.error("Failed to fetch pairs:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch pairs");
      } finally {
        setLoading(false);
      }
    }

    fetchPairs();
    
    // Refresh data every 15 seconds
    const interval = setInterval(fetchPairs, 15000);
    return () => clearInterval(interval);
  }, []);

  const Sparkline = ({ data }: { data?: number[] }) => {
    if (!data || data.length === 0) {
      return <span style={{ color: '#9ca3af' }}>—</span>;
    }

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    
    if (range === 0) {
      return <span style={{ color: '#9ca3af' }}>—</span>;
    }

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 60;
      const y = 20 - ((value - min) / range) * 15;
      return `${x},${y}`;
    }).join(' ');

    const color = data[data.length - 1] >= data[0] ? '#22c55e' : '#ef4444';

    return (
      <svg width="60" height="20" style={{ display: 'block' }}>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  if (loading) {
    return (
      <div style={{ padding: 24, fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Dexoppo</h1>
        <p style={{ color: '#6b7280' }}>Loading pairs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24, fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Dexoppo</h1>
        <p style={{ color: '#ef4444', marginBottom: 16 }}>Error: {error}</p>
        <p style={{ color: '#6b7280', fontSize: 14 }}>
          Make sure the backend is running on {process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000"}
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Dexoppo</h1>
      
      {pairs.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No pairs available</p>
      ) : (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', fontSize: 14, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600, borderBottom: '1px solid #e5e7eb' }}>
                  Pair
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, borderBottom: '1px solid #e5e7eb' }}>
                  Price
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, borderBottom: '1px solid #e5e7eb' }}>
                  Volume 24h
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, borderBottom: '1px solid #e5e7eb' }}>
                  Reserve USD
                </th>
                <th style={{ padding: '12px 16px', fontWeight: 600, borderBottom: '1px solid #e5e7eb' }}>
                  Chart
                </th>
              </tr>
            </thead>
            <tbody>
              {pairs.map((pair, index) => (
                <tr 
                  key={pair.id} 
                  style={{ 
                    borderBottom: index < pairs.length - 1 ? '1px solid #f3f4f6' : 'none',
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa'
                  }}
                >
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontWeight: 500 }}>
                      {pair.base}/{pair.quote}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'ui-monospace, monospace' }}>
                    {pair.price.toFixed(6)}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'ui-monospace, monospace' }}>
                    ${pair.volumeUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'ui-monospace, monospace' }}>
                    ${pair.reserveUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Sparkline data={pair.sparkline} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 16 }}>
        Data may be delayed, for demo purposes only. 
        API Base: {process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000"}
      </p>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import { Sparkline } from "./Sparkline";

interface TimeFilter {
  key: string;
  label: string;
}

const TIME_FILTERS: TimeFilter[] = [
  { key: '', label: 'Popular' },
  { key: 'new', label: 'New Tokens' },
  { key: '1h', label: '1H' },
  { key: '24h', label: '24H' },
  { key: '7d', label: '7D' },
  { key: '30d', label: '30D' }
];

export function PairTable() {
  const [pairs, setPairs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (timeFilter) params.append('timeFilter', timeFilter);
      
      const url = `${process.env.NEXT_PUBLIC_API_BASE}/api/pairs${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url);
      const json = await res.json();
      setPairs(json.data || []);
    } catch (error) {
      console.error('Failed to load pairs:', error);
      setPairs([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const int = setInterval(load, 15000);
    return () => clearInterval(int);
  }, [search, timeFilter]);

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const isNewToken = (createdAt: number) => {
    const now = Date.now();
    return (now - createdAt) <= 24 * 60 * 60 * 1000; // Less than 24 hours old
  };

  return (
    <div>
      {/* Time Filter Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '16px', 
        flexWrap: 'wrap',
        borderBottom: '1px solid #e5e7eb',
        paddingBottom: '8px'
      }}>
        {TIME_FILTERS.map(filter => (
          <button
            key={filter.key}
            onClick={() => setTimeFilter(filter.key)}
            style={{
              padding: '8px 16px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: timeFilter === filter.key ? '#2563eb' : 'white',
              color: timeFilter === filter.key ? 'white' : '#374151',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: timeFilter === filter.key ? '600' : '400',
              transition: 'all 0.2s'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        placeholder="Search tokens..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ 
          border: '1px solid #e5e7eb', 
          padding: '8px 12px', 
          marginBottom: '16px', 
          borderRadius: '6px',
          width: '100%',
          maxWidth: '300px',
          fontSize: '14px'
        }}
      />

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
          Loading...
        </div>
      )}

      {/* Results Count and Filter Info */}
      <div style={{ marginBottom: '8px', fontSize: '14px', color: '#6b7280' }}>
        {timeFilter === 'new' ? (
          `Showing ${pairs.length} new tokens (created in last 24h)`
        ) : timeFilter ? (
          `Showing ${pairs.length} popular tokens (${TIME_FILTERS.find(f => f.key === timeFilter)?.label})`
        ) : (
          `Showing ${pairs.length} pairs sorted by volume`
        )}
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ 
              textAlign: 'left', 
              borderBottom: '2px solid #e5e7eb',
              background: '#f9fafb'
            }}>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>Pair</th>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>Price</th>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>Volume 24h</th>
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>Reserve USD</th>
              {timeFilter === 'new' && (
                <th style={{ padding: '12px 8px', fontWeight: '600' }}>Age</th>
              )}
              <th style={{ padding: '12px 8px', fontWeight: '600' }}>Chart</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map((p, index) => (
              <tr 
                key={p.id} 
                style={{ 
                  borderBottom: '1px solid #f3f4f6',
                  background: index % 2 === 0 ? 'white' : '#fafafa'
                }}
              >
                <td style={{ padding: '12px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <a href={`/pairs/${p.id}`} style={{ 
                      color: '#2563eb', 
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}>
                      {p.base}/{p.quote}
                    </a>
                    {isNewToken(p.createdAt) && (
                      <span style={{
                        background: '#10b981',
                        color: 'white',
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontWeight: '600'
                      }}>
                        NEW
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '12px 8px', fontFamily: 'monospace' }}>
                  ${Number(p.price).toFixed(6)}
                </td>
                <td style={{ padding: '12px 8px', fontFamily: 'monospace' }}>
                  ${Number(p.volumeUSD).toLocaleString()}
                </td>
                <td style={{ padding: '12px 8px', fontFamily: 'monospace' }}>
                  ${Number(p.reserveUSD).toLocaleString()}
                </td>
                {timeFilter === 'new' && (
                  <td style={{ padding: '12px 8px', fontSize: '12px', color: '#6b7280' }}>
                    {formatTime(p.createdAt)}
                  </td>
                )}
                <td style={{ padding: '12px 8px' }}>
                  <Sparkline data={p.sparkline} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pairs.length === 0 && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px', 
          color: '#6b7280',
          background: '#f9fafb',
          borderRadius: '8px',
          marginTop: '16px'
        }}>
          No tokens found matching your criteria.
        </div>
      )}
    </div>
  );
}

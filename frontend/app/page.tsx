import { PairTable } from "../components/PairTable";

export default function Home() {
  return (
    <main style={{ 
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          marginBottom: '8px',
          color: '#111827'
        }}>
          Dexoppo
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#6b7280', 
          marginBottom: '4px' 
        }}>
          Discover new tokens and track popular pairs on Ethereum
        </p>
        <p style={{ 
          fontSize: '14px', 
          color: '#9ca3af' 
        }}>
          Real-time data from Uniswap V2 • Updated every 30 seconds
        </p>
      </div>
      
      <PairTable />
      
      <div style={{ 
        marginTop: '32px', 
        padding: '16px', 
        background: '#f9fafb', 
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <p style={{ 
          fontSize: '12px', 
          color: '#6b7280', 
          margin: '0',
          lineHeight: '1.5'
        }}>
          ⚠️ <strong>Disclaimer:</strong> This is a demo application for educational purposes only. 
          Data may be delayed or inaccurate. Not financial advice. Always do your own research before making investment decisions.
        </p>
      </div>
    </main>
  );
}

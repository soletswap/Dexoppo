import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ 
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#ffffff'
    }}>
      <Component {...pageProps} />
    </div>
  );
}
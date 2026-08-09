import Link from 'next/link';

const backgroundStyle: React.CSSProperties = {
  maxWidth: '100%',
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  color: '#fff',
  padding: '20px',
};

const linkStyle: React.CSSProperties = {
  marginTop: '24px',
  color: '#ac54df',
  fontSize: '32px',
  fontWeight: 600,
  textDecoration: 'none',
  transition: 'color 0.3s',
};

export default function NotFound() {
  return (
    <div style={backgroundStyle}>
      <h1>Страница не найдена...</h1>

      <Link href="/music/main" style={linkStyle}>
        На главную
      </Link>
    </div>
  );
}

import Link from 'next/link'

const CALLERS = [
  { name: 'Tammy', id: 'tammy' },
  { name: 'Miche', id: 'miche' },
  { name: 'Celeste', id: 'celeste' },
  { name: 'Sitarah', id: 'sitarah' },
  { name: 'Zama', id: 'zama' },
  { name: 'Warren', id: 'warren' },
  { name: 'Deje', id: 'deje' },
  { name: 'Toni', id: 'toni' },
  { name: 'Natasha', id: 'natasha' },
  { name: 'Carlos', id: 'carlos' },
]

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9f9f8',
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      padding: '48px 16px',
    }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
          color: '#185FA5', textTransform: 'uppercase', marginBottom: 8,
        }}>
          ADsorbed
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111', marginBottom: 6 }}>
          Caller Portal
        </h1>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 36 }}>
          Select your name to view your clients and shift details.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {CALLERS.map(caller => (
            <Link
              key={caller.id}
              href={`/caller/${caller.id}`}
              style={{
                display: 'block',
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: 12,
                padding: '20px 16px',
                textDecoration: 'none',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 600,
                color: '#111',
                transition: 'border-color 0.15s, box-shadow 0.15s',
              }}
            >
              {caller.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

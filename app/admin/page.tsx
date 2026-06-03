export const revalidate = 0

import Link from 'next/link'
import { STATIC_CALLERS } from '../../data/callers'
import { CallerData } from '../../lib/sheets'

function ShiftBadge({ label, type }: { label: string; type: 'week' | 'sat' | 'other' }) {
  const styles = {
    week: { background: '#E1F5EE', color: '#085041' },
    sat: { background: '#FAEEDA', color: '#633806' },
    other: { background: '#EEEDFE', color: '#3C3489' },
  }
  return (
    <span style={{ ...styles[type], display: 'inline-block', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap' as const }}>
      {label}
    </span>
  )
}

function TotalsBadge({ value, label }: { value: string | number; label: string }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 10, padding: '14px 18px', minWidth: 100 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#111' }}>{value}</div>
      <div style={{ fontSize: 12, color: '#999', marginTop: 2 }}>{label}</div>
    </div>
  )
}

export default async function AdminPage() {
  let allCallers: CallerData[] = []
  let isStatic = false

  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY && process.env.ROTA_SHEET_ID) {
    try {
      const { getAllCallersData } = await import('../../lib/sheets')
      allCallers = await getAllCallersData()
    } catch (err) {
      console.error('Sheets fetch failed, falling back to static data:', err)
    }
  }

  if (allCallers.length === 0) {
    allCallers = Object.values(STATIC_CALLERS)
    isStatic = true
  }

  allCallers.sort((a, b) => a.caller.name.localeCompare(b.caller.name))

  const totalCallers = allCallers.length
  const totalClients = allCallers.reduce((sum, c) => sum + c.clients.length, 0)
  const totalHours = allCallers.reduce((sum, c) => sum + c.clients.reduce((s, cl) => s + cl.hours, 0), 0)
  const uniqueClients = new Set(allCallers.flatMap(c => c.clients.map(cl => cl.name))).size

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f8', fontFamily: "'DM Sans', -apple-system, sans-serif", padding: '32px 16px 64px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {isStatic && (
          <div style={{ background: '#FAEEDA', color: '#633806', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 20 }}>
            Using static fallback data.
          </div>
        )}

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: '#185FA5', textTransform: 'uppercase', marginBottom: 6 }}>ADsorbed</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111', margin: 0 }}>Team Overview</h1>
            <Link href="/" style={{ fontSize: 13, color: '#185FA5', textDecoration: 'none', fontWeight: 500 }}>← Back to portal</Link>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
          <TotalsBadge value={totalCallers} label="Active callers" />
          <TotalsBadge value={uniqueClients} label="Unique clients" />
          <TotalsBadge value={totalClients} label="Assignments" />
          <TotalsBadge value={`${totalHours}h`} label="Total hours" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {allCallers.map((callerData) => {
            const { caller, clients } = callerData
            const callerHours = clients.reduce((s, c) => s + c.hours, 0)
            const slug = caller.name.toLowerCase()

            return (
              <div key={caller.name} style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px', borderBottom: clients.length > 0 ? '1px solid #f0f0f0' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>{caller.name}</span>
                      {caller.shift_week && <ShiftBadge label={caller.shift_week} type="week" />}
                      {caller.shift_sat && <ShiftBadge label={caller.shift_sat} type="sat" />}
                      {caller.shift_other && <ShiftBadge label={caller.shift_other} type="other" />}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 13, color: '#999' }}>{clients.length} client{clients.length !== 1 ? 's' : ''} · {callerHours}h</span>
                    <Link href={`/caller/${slug}`} style={{ fontSize: 12, color: '#185FA5', textDecoration: 'none', fontWeight: 600, padding: '5px 12px', border: '1px solid #185FA5', borderRadius: 6 }}>
                      View portal ↗
                    </Link>
                  </div>
                </div>

                {clients.length > 0 && (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <thead>
                        <tr style={{ background: '#f8f8f8' }}>
                          {['Client', 'Campaign', 'Hours', 'Tag', 'SJP'].map(h => (
                            <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map((client, i) => (
                          <tr key={i} style={{ borderTop: '1px solid #f0f0f0' }}>
                            <td style={{ padding: '10px 16px', fontWeight: 600, color: '#111', whiteSpace: 'nowrap' }}>{client.name}</td>
                            <td style={{ padding: '10px 16px', color: '#555' }}>{client.campaign || '—'}</td>
                            <td style={{ padding: '10px 16px' }}>
                              <span style={{ background: '#E6F1FB', color: '#185FA5', fontWeight: 600, fontSize: 12, padding: '3px 10px', borderRadius: 6 }}>{client.hours}h</span>
                            </td>
                            <td style={{ padding: '10px 16px' }}>
                              {client.tag ? <span style={{ background: '#FAEEDA', color: '#633806', fontWeight: 500, fontSize: 11, padding: '2px 8px', borderRadius: 6 }}>{client.tag}</span> : <span style={{ color: '#ccc' }}>—</span>}
                            </td>
                            <td style={{ padding: '10px 16px', fontSize: 16, textAlign: 'center' as const }}>
                              {client.sjp === 'Yes' ? '✅' : '❌'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {clients.length === 0 && (
                  <div style={{ padding: '14px 20px', fontSize: 13, color: '#bbb' }}>No clients assigned yet</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

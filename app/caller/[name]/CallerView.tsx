'use client'

import { useState } from 'react'

interface CalendlyLink { name: string; url: string }
interface CallerClient { name: string; hours: number; tag: string | null; campaign: string | null; sjp: string | null; ghl_url: string | null; brief_url: string | null; script: string | null; calendly: CalendlyLink[] }
interface CallerData { caller: { name: string; shift_week: string | null; shift_sat: string | null; shift_other: string | null }; clients: CallerClient[] }

function ShiftBadge({ label, type }: { label: string; type: 'week' | 'sat' | 'other' }) {
  const styles = { week: { background: '#E1F5EE', color: '#085041' }, sat: { background: '#FAEEDA', color: '#633806' }, other: { background: '#EEEDFE', color: '#3C3489' } }
  return <span style={{ ...styles[type], display: 'inline-block', padding: '4px 10px', borderRadius: 6, fontSize: 12, fontWeight: 500 }}>{label}</span>
}

function Badge({ label, colour }: { label: string; colour: 'blue' | 'amber' | 'gray' }) {
  const colours = { blue: { background: '#E6F1FB', color: '#0C447C' }, amber: { background: '#FAEEDA', color: '#633806' }, gray: { background: '#F1EFE8', color: '#444441' } }
  return <span style={{ ...colours[colour], display: 'inline-block', padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 500 }}>{label}</span>
}

function ClientCard({ client }: { client: CallerClient }) {
  const [open, setOpen] = useState(false)
  return (
    <div onClick={() => setOpen(o => !o)} style={{ background: '#fff', border: open ? '1px solid #185FA5' : '1px solid #e5e5e5', borderRadius: 12, padding: '16px 20px', marginBottom: 10, cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#111', marginBottom: 6 }}>{client.name}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {client.tag && <Badge label={client.tag} colour="amber" />}
            {client.sjp === 'Yes' && <Badge label="SJP" colour="blue" />}
            {client.campaign && <Badge label={client.campaign} colour="gray" />}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ background: '#E6F1FB', color: '#185FA5', fontWeight: 600, fontSize: 13, padding: '4px 12px', borderRadius: 6 }}>{client.hours}h</span>
          <span style={{ fontSize: 18, color: '#999', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}>›</span>
        </div>
      </div>
      {open && (
        <div onClick={e => e.stopPropagation()} style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f0f0f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {[{ label: 'Campaign', value: client.campaign || 'TBC' }, { label: 'SJP client', value: client.sjp || 'N/A' }].map(({ label, value }) => (
              <div key={label} style={{ background: '#f8f8f8', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{value}</div>
              </div>
            ))}
          </div>
          {client.script && <>
            <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 8 }}>Opening script</div>
            <div style={{ background: '#f8f8f8', borderLeft: '3px solid #378ADD', borderRadius: '0 8px 8px 0', padding: '12px 14px', fontSize: 13, color: '#444', lineHeight: 1.65, marginBottom: 16 }}>{client.script}</div>
          </>}
          {client.calendly && client.calendly.length > 0 && <>
            <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: 8 }}>Adviser booking links</div>
            <div style={{ marginBottom: 16 }}>
              {client.calendly.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < client.calendly.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#111' }}>{a.name}</span>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#185FA5', textDecoration: 'none' }}>Open Calendly ↗</a>
                </div>
              ))}
            </div>
          </>}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {client.ghl_url && <a href={client.ghl_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: '#185FA5', color: '#E6F1FB', textDecoration: 'none' }}>Open in GHL ↗</a>}
            {client.brief_url && <a href={client.brief_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, background: '#fff', color: '#111', textDecoration: 'none', border: '1px solid #e5e5e5' }}>View briefing doc ↗</a>}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CallerView({ data, isStatic }: { data: CallerData; isStatic: boolean }) {
  const { caller, clients } = data
  const totalHours = clients.reduce((s, c) => s + c.hours, 0)
  const uniqueCampaigns = [...new Set(clients.map(c => c.campaign).filter(Boolean))].length
  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f8', fontFamily: "'DM Sans', -apple-system, sans-serif", padding: '32px 16px 64px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {isStatic && <div style={{ background: '#FAEEDA', color: '#633806', borderRadius: 8, padding: '10px 14px', fontSize: 13, marginBottom: 20 }}>Using static fallback data.</div>}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: '#185FA5', textTransform: 'uppercase', marginBottom: 6 }}>ADsorbed</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111', marginBottom: 4 }}>Good morning, {caller.name}</h1>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
            {caller.shift_week && <ShiftBadge label={caller.shift_week} type="week" />}
            {caller.shift_sat && <ShiftBadge label={caller.shift_sat} type="sat" />}
            {caller.shift_other && <ShiftBadge label={caller.shift_other} type="other" />}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
          {[{ label: 'Clients today', value: clients.length }, { label: 'Total hours', value: `${totalHours}h` }, { label: 'Campaigns', value: uniqueCampaigns }].map(({ label, value }) => (
            <div key={label} style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#111' }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: '#aaa', textTransform: 'uppercase', marginBottom: 12 }}>Your clients</div>
        {clients.map((client, i) => <ClientCard key={i} client={client} />)}
      </div>
    </div>
  )
}

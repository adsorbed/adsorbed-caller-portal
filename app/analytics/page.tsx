'use client';

import { useEffect, useState, useCallback } from 'react';

const SB_URL = 'https://eygsnwbddkphnlagairw.supabase.co';
const SB_KEY = 'sb_publishable_izjFHeW5WUhgK4eWev2i0g_2XR7SVrE';

interface Client { id: string; name: string; status: string; }
interface HealthRow {
  client_id: string; date: string;
  total_spend: number | null; total_leads: number | null; avg_cpl: number | null;
  cpl_7d_avg: number | null; cpl_delta_pct: number | null;
  sit_rate: number | null; health_score: number | null;
  flags: string | Flag[];
}
interface Appointment { client_id: string; status: string; appointment_date: string; }
interface Flag { type: 'critical' | 'warning' | 'positive'; metric: string; value: number; msg: string; client?: string; }

async function sbFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  return res.json();
}

function gbp(v: number | null): string {
  if (v == null) return '—';
  return '£' + Math.round(v).toLocaleString('en-GB');
}

function slugToName(id: string, clients: Client[]): string {
  return clients.find(c => c.id === id)?.name ?? id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function getFlags(health: HealthRow[], clients: Client[]): Flag[] {
  const flags: Flag[] = [];
  health.forEach(h => {
    let parsed: Flag[] = [];
    try { parsed = typeof h.flags === 'string' ? JSON.parse(h.flags) : (h.flags as Flag[] || []); } catch {}
    parsed.forEach(f => flags.push({ ...f, client: slugToName(h.client_id, clients) }));
  });
  return flags;
}

function BarChart({ data, label }: { data: { label: string; value: number; color: string }[]; label: string }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div>
      <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>{label}</div>
      {data.map((d, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <div style={{ width: 90, fontSize: 11, color: '#666', textAlign: 'right', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.label}</div>
          <div style={{ flex: 1, height: 16, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(d.value / max * 100).toFixed(1)}%`, background: d.color, borderRadius: 3, transition: 'width 0.4s' }} />
          </div>
          <div style={{ width: 50, fontSize: 11, color: '#444' }}>£{d.value.toLocaleString('en-GB')}</div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [health, setHealth] = useState<HealthRow[]>([]);
  const [appts, setAppts] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'flags'>('overview');
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [sortCol, setSortCol] = useState('spend');
  const [sortDir, setSortDir] = useState(-1);

  const load = useCallback(async () => {
    try {
      const [c, h, a] = await Promise.all([
        sbFetch<Client[]>('clients?select=id,name,status&status=eq.active&order=name'),
        sbFetch<HealthRow[]>('client_health_daily?select=*&order=date.desc&limit=500'),
        sbFetch<Appointment[]>('appointments?select=client_id,status,appointment_date'),
      ]);
      setClients(c);
      const latest: Record<string, HealthRow> = {};
      const activeIds = new Set(c.map((cl: Client) => cl.id));
      h.forEach(row => { if (!latest[row.client_id] && activeIds.has(row.client_id)) latest[row.client_id] = row; });
      setHealth(Object.values(latest));
      setAppts(a);
      setUpdatedAt(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
      if (c.length > 0) setSelectedClient(c[0].id);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div style={{ padding: '2rem', color: '#888', fontSize: 14 }}>Loading analytics...</div>;
  if (error) return <div style={{ padding: '2rem', color: '#A32D2D', fontSize: 14 }}>Error: {error}</div>;

  const totalSpend = health.reduce((s, h) => s + (h.total_spend ?? 0), 0);
  const totalLeads = health.reduce((s, h) => s + (h.total_leads ?? 0), 0);
  const avgCPL = totalLeads > 0 ? totalSpend / totalLeads : null;
  const totalBookings = appts.length;
  const sits = appts.filter(a => a.status === 'sat').length;
  const sitRate = totalBookings > 0 ? sits / totalBookings * 100 : null;
  const avgHealth = health.filter(h => h.health_score != null).reduce((s, h, _, arr) => s + (h.health_score ?? 0) / arr.length, 0) || null;
  const flags = getFlags(health, clients);
  const criticalCount = flags.filter(f => f.type === 'critical').length;

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d * -1);
    else { setSortCol(col); setSortDir(-1); }
  };

  const sortedHealth = [...health].sort((a, b) => {
    const cA = appts.filter(x => x.client_id === a.client_id);
    const cB = appts.filter(x => x.client_id === b.client_id);
    const val = (h: HealthRow, ca: Appointment[]): number | string => {
      if (sortCol === 'name') return slugToName(h.client_id, clients);
      if (sortCol === 'spend') return h.total_spend ?? 0;
      if (sortCol === 'leads') return h.total_leads ?? 0;
      if (sortCol === 'cpl') return h.avg_cpl ?? 0;
      if (sortCol === 'delta') return h.cpl_delta_pct ?? 0;
      if (sortCol === 'bookings') return ca.length;
      if (sortCol === 'sits') return ca.filter(x => x.status === 'sat').length;
      if (sortCol === 'health') return h.health_score ?? 0;
      return 0;
    };
    const va = val(a, cA), vb = val(b, cB);
    if (typeof va === 'string') return sortDir * va.localeCompare(vb as string);
    return sortDir * ((va as number) - (vb as number));
  });

  const kpiStyle: React.CSSProperties = { background: '#f9f9f7', borderRadius: 8, padding: '14px 16px' };
  const labelStyle: React.CSSProperties = { fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 };
  const valueStyle: React.CSSProperties = { fontSize: 22, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: '1' };

  const selectedHealth = health.find(h => h.client_id === selectedClient);
  const selectedAppts = appts.filter(a => a.client_id === selectedClient);
  const selectedSits = selectedAppts.filter(a => a.status === 'sat').length;
  const selectedNoShows = selectedAppts.filter(a => a.status === 'no_show').length;

  const pillColors: Record<string, { bg: string; color: string; label: string }> = {
    spike:     { bg: '#FCEBEB', color: '#A32D2D', label: '⚠ CPL spike' },
    watch:     { bg: '#FAEEDA', color: '#854F0B', label: '↑ Watch' },
    efficient: { bg: '#EAF3DE', color: '#3B6D11', label: '↓ Efficient' },
    stable:    { bg: '#F1EFE8', color: '#5F5E5A', label: 'Stable' },
  };
  const getPill = (delta: number | null) => {
    if (delta == null) return pillColors.stable;
    if (delta > 20) return pillColors.spike;
    if (delta > 10) return pillColors.watch;
    if (delta < -10) return pillColors.efficient;
    return pillColors.stable;
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: 14, color: '#1a1a1a', padding: '1.5rem 2rem', maxWidth: 1200, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '0.5px solid #e5e5e5', marginBottom: '1.25rem', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1D9E75', display: 'inline-block' }} />
          <h1 style={{ fontSize: 15, fontWeight: 500, margin: 0 }}>ADsorbed — analytics</h1>
        </div>
        <span style={{ fontSize: 11, color: '#888' }}>Live · {updatedAt}</span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: '1.25rem', borderBottom: '0.5px solid #e5e5e5' }}>
        {(['overview', 'clients', 'flags'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '8px 14px', fontSize: 13, cursor: 'pointer', background: 'none', border: 'none', borderBottom: activeTab === tab ? '2px solid #1a1a1a' : '2px solid transparent', color: activeTab === tab ? '#1a1a1a' : '#888', fontWeight: activeTab === tab ? 500 : 400, marginBottom: -1 }}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: '1.25rem' }}>
            {[
              { label: 'Total spend', value: gbp(totalSpend) },
              { label: 'Total leads', value: totalLeads || '—' },
              { label: 'Avg CPL', value: gbp(avgCPL) },
              { label: 'Bookings', value: totalBookings || '—' },
              { label: 'Sit rate', value: sitRate != null ? sitRate.toFixed(0) + '%' : '—' },
              { label: 'Avg health', value: avgHealth ? Math.round(avgHealth) : '—' },
              { label: 'Active clients', value: clients.length },
              { label: 'Critical flags', value: criticalCount, sub: criticalCount > 0 ? `${criticalCount} need attention` : 'All clear', subColor: criticalCount > 0 ? '#A32D2D' : '#3B6D11' },
            ].map((k, i) => (
              <div key={i} style={kpiStyle}>
                <div style={labelStyle}>{k.label}</div>
                <div style={valueStyle}>{k.value}</div>
                {k.sub && <div style={{ fontSize: 11, marginTop: 4, color: k.subColor }}>{k.sub}</div>}
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 10, padding: '14px 16px' }}>
              <BarChart label="Spend by client" data={health.map(h => ({ label: slugToName(h.client_id, clients).split(' ').slice(0,2).join(' '), value: Math.round(h.total_spend ?? 0), color: '#378ADD' }))} />
            </div>
            <div style={{ background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 10, padding: '14px 16px' }}>
              <BarChart label="CPL by client (red = spike)" data={health.map(h => ({ label: slugToName(h.client_id, clients).split(' ').slice(0,2).join(' '), value: Math.round(h.avg_cpl ?? 0), color: (h.cpl_delta_pct ?? 0) > 20 ? '#E24B4A' : (h.cpl_delta_pct ?? 0) > 10 ? '#EF9F27' : '#378ADD' }))} />
            </div>
          </div>

          {/* Flags */}
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#888', marginBottom: 10 }}>Active flags</div>
          {flags.length === 0
            ? <div style={{ fontSize: 13, color: '#888', marginBottom: '1.25rem' }}>No active flags.</div>
            : <div style={{ marginBottom: '1.25rem' }}>{flags.slice(0, 5).map((f, i) => {
                const s = { critical: { bg: '#FCEBEB', border: '#A32D2D' }, warning: { bg: '#FAEEDA', border: '#854F0B' }, positive: { bg: '#EAF3DE', border: '#3B6D11' } }[f.type];
                return <div key={i} style={{ background: s.bg, borderLeft: `3px solid ${s.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: 6 }}><div style={{ fontSize: 13, fontWeight: 500 }}>{f.client} — {f.msg}</div></div>;
              })}</div>
          }

          {/* Table */}
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#888', marginBottom: 10 }}>Client table</div>
          <div style={{ background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 10, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead style={{ background: '#f9f9f7' }}>
                <tr>
                  {[['name','Client'],['spend','Spend'],['leads','Leads'],['cpl','CPL'],['delta','CPL Δ 7d'],['bookings','Bookings'],['sits','Sits'],['health','Health']].map(([col, lbl]) => (
                    <th key={col} onClick={() => handleSort(col)} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888', borderBottom: '0.5px solid #e5e5e5', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      {lbl}{sortCol === col ? (sortDir === -1 ? ' ↓' : ' ↑') : ''}
                    </th>
                  ))}
                  <th style={{ padding: '8px 12px', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', color: '#888', borderBottom: '0.5px solid #e5e5e5' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedHealth.map((h, i) => {
                  const ca = appts.filter(a => a.client_id === h.client_id);
                  const cSits = ca.filter(a => a.status === 'sat').length;
                  const pill = getPill(h.cpl_delta_pct);
                  return (
                    <tr key={h.client_id} style={{ borderBottom: i < sortedHealth.length - 1 ? '0.5px solid #e5e5e5' : 'none' }}>
                      <td style={{ padding: '9px 12px', fontWeight: 500 }}>{slugToName(h.client_id, clients)}</td>
                      <td style={{ padding: '9px 12px' }}>{gbp(h.total_spend)}</td>
                      <td style={{ padding: '9px 12px' }}>{h.total_leads ?? '—'}</td>
                      <td style={{ padding: '9px 12px' }}>{gbp(h.avg_cpl)}</td>
                      <td style={{ padding: '9px 12px', color: (h.cpl_delta_pct ?? 0) > 20 ? '#A32D2D' : (h.cpl_delta_pct ?? 0) < -10 ? '#3B6D11' : undefined, fontWeight: Math.abs(h.cpl_delta_pct ?? 0) > 10 ? 500 : 400 }}>
                        {h.cpl_delta_pct != null ? (h.cpl_delta_pct > 0 ? '+' : '') + h.cpl_delta_pct.toFixed(1) + '%' : '—'}
                      </td>
                      <td style={{ padding: '9px 12px' }}>{ca.length || '—'}</td>
                      <td style={{ padding: '9px 12px' }}>{cSits || '—'}</td>
                      <td style={{ padding: '9px 12px' }}>{h.health_score != null ? Math.round(h.health_score) : '—'}</td>
                      <td style={{ padding: '9px 12px' }}>
                        <span style={{ background: pill.bg, color: pill.color, fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 20 }}>{pill.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Clients tab */}
      {activeTab === 'clients' && (
        <>
          <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} style={{ marginBottom: '1rem', padding: '6px 10px', fontSize: 13, border: '0.5px solid #ccc', borderRadius: 6 }}>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {selectedHealth ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
                {[
                  { label: 'Spend', value: gbp(selectedHealth.total_spend) },
                  { label: 'Leads', value: selectedHealth.total_leads ?? '—' },
                  { label: 'CPL', value: gbp(selectedHealth.avg_cpl) },
                  { label: 'Health score', value: selectedHealth.health_score != null ? Math.round(selectedHealth.health_score) : '—' },
                ].map((k, i) => <div key={i} style={kpiStyle}><div style={labelStyle}>{k.label}</div><div style={valueStyle}>{k.value}</div></div>)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {[
                  { label: 'Bookings', value: selectedAppts.length || '—' },
                  { label: 'Sits', value: selectedSits || '—' },
                  { label: 'No shows', value: selectedNoShows || '—' },
                  { label: 'Sit rate', value: selectedAppts.length > 0 ? (selectedSits / selectedAppts.length * 100).toFixed(0) + '%' : '—' },
                ].map((k, i) => <div key={i} style={kpiStyle}><div style={labelStyle}>{k.label}</div><div style={valueStyle}>{k.value}</div></div>)}
              </div>
            </>
          ) : <div style={{ fontSize: 13, color: '#888' }}>No data yet for this client.</div>}
        </>
      )}

      {/* Flags tab */}
      {activeTab === 'flags' && (
        flags.length === 0
          ? <div style={{ fontSize: 13, color: '#888' }}>No active flags.</div>
          : (['critical', 'warning', 'positive'] as const).map(type => {
              const group = flags.filter(f => f.type === type);
              if (!group.length) return null;
              const labelMap = { critical: 'Critical', warning: 'Warnings', positive: 'Positive signals' };
              const colorMap = { critical: '#A32D2D', warning: '#854F0B', positive: '#3B6D11' };
              const bgMap = { critical: '#FCEBEB', warning: '#FAEEDA', positive: '#EAF3DE' };
              const borderMap = { critical: '#A32D2D', warning: '#854F0B', positive: '#3B6D11' };
              return (
                <div key={type} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: colorMap[type], marginBottom: 8 }}>{labelMap[type]} ({group.length})</div>
                  {group.map((f, i) => (
                    <div key={i} style={{ background: bgMap[type], borderLeft: `3px solid ${borderMap[type]}`, borderRadius: 8, padding: '10px 14px', marginBottom: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{f.client} — {f.msg}</div>
                    </div>
                  ))}
                </div>
              );
            })
      )}
    </div>
  );
}

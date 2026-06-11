'use client';

import { useEffect, useState, useCallback } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SB_URL = 'https://eygsnwbddkphnlagairw.supabase.co';
const SB_KEY = 'sb_publishable_izjFHeW5WUhgK4eWev2i0g_2XR7SVrE';

// ── Types ────────────────────────────────────────────────────────────────────

interface Client {
  id: string;
  name: string;
  status: string;
}

interface HealthRow {
  client_id: string;
  date: string;
  total_spend: number | null;
  total_leads: number | null;
  avg_cpl: number | null;
  cpl_7d_avg: number | null;
  cpl_delta_pct: number | null;
  total_bookings: number | null;
  sits: number | null;
  no_shows: number | null;
  sit_rate: number | null;
  health_score: number | null;
  flags: string | Flag[];
}

interface Appointment {
  client_id: string;
  status: string;
  appointment_date: string;
}

interface Flag {
  type: 'critical' | 'warning' | 'positive';
  metric: string;
  value: number;
  msg: string;
  client?: string;
}

// ── Supabase fetch ────────────────────────────────────────────────────────────

async function sbFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}`);
  return res.json();
}

// ── Helpers ───────────────────────────────────────────────────────────────────

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

function statusPill(delta: number | null): string {
  if (delta == null) return 'stable';
  if (delta > 20) return 'spike';
  if (delta > 10) return 'watch';
  if (delta < -10) return 'efficient';
  return 'stable';
}

// ── Components ────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, subType }: { label: string; value: string | number; sub?: string; subType?: 'up' | 'down' | 'neutral' }) {
  return (
    <div style={{ background: 'var(--color-bg-secondary, #f9f9f7)', borderRadius: 8, padding: '14px 16px' }}>
      <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, marginTop: 4, color: subType === 'up' ? '#A32D2D' : subType === 'down' ? '#3B6D11' : '#888' }}>{sub}</div>}
    </div>
  );
}

function FlagBanner({ flag }: { flag: Flag }) {
  const styles: Record<string, { bg: string; border: string }> = {
    critical: { bg: '#FCEBEB', border: '#A32D2D' },
    warning:  { bg: '#FAEEDA', border: '#854F0B' },
    positive: { bg: '#EAF3DE', border: '#3B6D11' },
  };
  const s = styles[flag.type] || styles.warning;
  return (
    <div style={{ background: s.bg, borderLeft: `3px solid ${s.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: 6 }}>
      <div style={{ fontSize: 13, fontWeight: 500 }}>{flag.client} — {flag.msg}</div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

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
      h.forEach(row => { if (!latest[row.client_id]) latest[row.client_id] = row; });
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

  useEffect(() => {
    if (health.length === 0) return;
    const spendCtx = document.getElementById('spendChart') as HTMLCanvasElement | null;
    const cplCtx = document.getElementById('cplChart') as HTMLCanvasElement | null;
    if (!spendCtx || !cplCtx) return;

    const labels = health.map(h => slugToName(h.client_id, clients).split(' ').slice(0, 2).join(' '));
    const spends = health.map(h => Math.round(h.total_spend ?? 0));
    const cpls = health.map(h => Math.round(h.avg_cpl ?? 0));
    const deltaColors = health.map(h => (h.cpl_delta_pct ?? 0) > 20 ? '#E24B4A' : (h.cpl_delta_pct ?? 0) > 10 ? '#EF9F27' : '#378ADD');

    const existing1 = Chart.getChart('spendChart');
    const existing2 = Chart.getChart('cplChart');
    if (existing1) existing1.destroy();
    if (existing2) existing2.destroy();

    new Chart(spendCtx, {
      type: 'bar',
      data: { labels, datasets: [{ data: spends, backgroundColor: '#378ADD', borderRadius: 3 }] },
      options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { callback: (v) => '£' + v, font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.04)' } }, y: { ticks: { font: { size: 10 } }, grid: { display: false } } } }
    });

    new Chart(cplCtx, {
      type: 'bar',
      data: { labels, datasets: [{ data: cpls, backgroundColor: deltaColors, borderRadius: 3 }] },
      options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { callback: (v) => '£' + v, font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.04)' } }, y: { ticks: { font: { size: 10 } }, grid: { display: false } } } }
    });
  }, [health, clients]);

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

  const sortedHealth = [...health].sort((a, b) => {
    const clientAppts = (h: HealthRow) => appts.filter(x => x.client_id === h.client_id);
    const val = (h: HealthRow): number | string => {
      if (sortCol === 'name') return slugToName(h.client_id, clients);
      if (sortCol === 'spend') return h.total_spend ?? 0;
      if (sortCol === 'leads') return h.total_leads ?? 0;
      if (sortCol === 'cpl') return h.avg_cpl ?? 0;
      if (sortCol === 'delta') return h.cpl_delta_pct ?? 0;
      if (sortCol === 'bookings') return clientAppts(h).length;
      if (sortCol === 'sits') return clientAppts(h).filter(x => x.status === 'sat').length;
      if (sortCol === 'sit_rate') return h.sit_rate ?? 0;
      if (sortCol === 'health') return h.health_score ?? 0;
      return 0;
    };
    const va = val(a), vb = val(b);
    if (typeof va === 'string') return sortDir * va.localeCompare(vb as string);
    return sortDir * ((va as number) - (vb as number));
  });

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d * -1);
    else { setSortCol(col); setSortDir(-1); }
  };

  const selectedHealth = health.find(h => h.client_id === selectedClient);
  const selectedAppts = appts.filter(a => a.client_id === selectedClient);
  const selectedSits = selectedAppts.filter(a => a.status === 'sat').length;
  const selectedNoShows = selectedAppts.filter(a => a.status === 'no_show').length;

  const pillStyle: Record<string, React.CSSProperties> = {
    spike:     { background: '#FCEBEB', color: '#A32D2D' },
    watch:     { background: '#FAEEDA', color: '#854F0B' },
    efficient: { background: '#EAF3DE', color: '#3B6D11' },
    stable:    { background: '#F1EFE8', color: '#5F5E5A' },
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

      {/* Overview tab */}
      {activeTab === 'overview' && (
        <>
          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginBottom: '1.25rem' }}>
            <KpiCard label="Total spend" value={gbp(totalSpend)} />
            <KpiCard label="Total leads" value={totalLeads || '—'} />
            <KpiCard label="Avg CPL" value={gbp(avgCPL)} />
            <KpiCard label="Bookings" value={totalBookings || '—'} />
            <KpiCard label="Sit rate" value={sitRate != null ? sitRate.toFixed(0) + '%' : '—'} />
            <KpiCard label="Avg health" value={avgHealth ? Math.round(avgHealth) : '—'} />
            <KpiCard label="Active clients" value={clients.length} />
            <KpiCard label="Critical flags" value={criticalCount} sub={criticalCount > 0 ? `${criticalCount} need attention` : 'All clear'} subType={criticalCount > 0 ? 'up' : 'down'} />
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 10 }}>Spend by client</div>
              <div style={{ position: 'relative', height: 220 }}>
                <canvas id="spendChart" role="img" aria-label="Spend by client" />
              </div>
            </div>
            <div style={{ background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 10 }}>CPL by client (red = spike)</div>
              <div style={{ position: 'relative', height: 220 }}>
                <canvas id="cplChart" role="img" aria-label="CPL by client" />
              </div>
            </div>
          </div>

          {/* Flags compact */}
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#888', marginBottom: 10 }}>Active flags</div>
          {flags.length === 0
            ? <div style={{ fontSize: 13, color: '#888', marginBottom: '1.25rem' }}>No active flags — all clients within normal ranges.</div>
            : <div style={{ marginBottom: '1.25rem' }}>{flags.slice(0, 4).map((f, i) => <FlagBanner key={i} flag={f} />)}</div>
          }

          {/* Table */}
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#888', marginBottom: 10 }}>Client table</div>
          <div style={{ background: '#fff', border: '0.5px solid #e5e5e5', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead style={{ background: '#f9f9f7' }}>
                <tr>
                  {[['name','Client'],['spend','Spend'],['leads','Leads'],['cpl','CPL'],['delta','CPL Δ 7d'],['bookings','Bookings'],['sits','Sits'],['sit_rate','Sit rate'],['health','Health']].map(([col, label]) => (
                    <th key={col} onClick={() => handleSort(col)} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888', borderBottom: '0.5px solid #e5e5e5', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      {label} {sortCol === col ? (sortDir === -1 ? '↓' : '↑') : ''}
                    </th>
                  ))}
                  <th style={{ padding: '8px 12px', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#888', borderBottom: '0.5px solid #e5e5e5' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {sortedHealth.map((h, i) => {
                  const cAppts = appts.filter(a => a.client_id === h.client_id);
                  const cSits = cAppts.filter(a => a.status === 'sat').length;
                  const cSitRate = cAppts.length > 0 ? (cSits / cAppts.length * 100).toFixed(0) + '%' : '—';
                  const delta = h.cpl_delta_pct;
                  const pill = statusPill(delta);
                  const maxSpend = Math.max(...health.map(x => x.total_spend ?? 0), 1);
                  return (
                    <tr key={h.client_id} style={{ borderBottom: i < sortedHealth.length - 1 ? '0.5px solid #e5e5e5' : 'none' }}>
                      <td style={{ padding: '9px 12px', fontWeight: 500 }}>{slugToName(h.client_id, clients)}</td>
                      <td style={{ padding: '9px 12px' }}>
                        {gbp(h.total_spend)}
                        <div style={{ height: 4, borderRadius: 2, background: '#e5e5e5', marginTop: 4 }}>
                          <div style={{ height: 4, borderRadius: 2, background: '#378ADD', width: `${((h.total_spend ?? 0) / maxSpend * 100).toFixed(0)}%` }} />
                        </div>
                      </td>
                      <td style={{ padding: '9px 12px' }}>{h.total_leads ?? '—'}</td>
                      <td style={{ padding: '9px 12px' }}>{gbp(h.avg_cpl)}</td>
                      <td style={{ padding: '9px 12px', color: (delta ?? 0) > 20 ? '#A32D2D' : (delta ?? 0) < -10 ? '#3B6D11' : undefined, fontWeight: (delta ?? 0) > 20 || (delta ?? 0) < -10 ? 500 : 400 }}>
                        {delta != null ? (delta > 0 ? '+' : '') + delta.toFixed(1) + '%' : '—'}
                      </td>
                      <td style={{ padding: '9px 12px' }}>{cAppts.length || '—'}</td>
                      <td style={{ padding: '9px 12px' }}>{cSits || '—'}</td>
                      <td style={{ padding: '9px 12px' }}>{cSitRate}</td>
                      <td style={{ padding: '9px 12px' }}>{h.health_score != null ? Math.round(h.health_score) : '—'}</td>
                      <td style={{ padding: '9px 12px' }}>
                        <span style={{ ...pillStyle[pill], fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 20, display: 'inline-block' }}>
                          {pill === 'spike' ? '⚠ CPL spike' : pill === 'watch' ? '↑ Watch' : pill === 'efficient' ? '↓ Efficient' : 'Stable'}
                        </span>
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
          <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} style={{ marginBottom: '1rem', padding: '6px 10px', fontSize: 13, border: '0.5px solid #ccc', borderRadius: 6, background: '#f9f9f7' }}>
            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          {selectedHealth ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 10 }}>
                <KpiCard label="Spend" value={gbp(selectedHealth.total_spend)} />
                <KpiCard label="Leads" value={selectedHealth.total_leads ?? '—'} />
                <KpiCard label="CPL" value={gbp(selectedHealth.avg_cpl)} sub={selectedHealth.cpl_delta_pct != null ? (selectedHealth.cpl_delta_pct > 0 ? '+' : '') + selectedHealth.cpl_delta_pct.toFixed(1) + '% vs 7d avg' : undefined} subType={selectedHealth.cpl_delta_pct != null && selectedHealth.cpl_delta_pct > 0 ? 'up' : 'down'} />
                <KpiCard label="Health score" value={selectedHealth.health_score != null ? Math.round(selectedHealth.health_score) : '—'} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                <KpiCard label="Bookings" value={selectedAppts.length || '—'} />
                <KpiCard label="Sits" value={selectedSits || '—'} />
                <KpiCard label="No shows" value={selectedNoShows || '—'} />
                <KpiCard label="Sit rate" value={selectedAppts.length > 0 ? (selectedSits / selectedAppts.length * 100).toFixed(0) + '%' : '—'} />
              </div>
            </>
          ) : (
            <div style={{ fontSize: 13, color: '#888' }}>No data yet for this client.</div>
          )}
        </>
      )}

      {/* Flags tab */}
      {activeTab === 'flags' && (
        <>
          {flags.length === 0
            ? <div style={{ fontSize: 13, color: '#888' }}>No active flags.</div>
            : (
              <>
                {(['critical', 'warning', 'positive'] as const).map(type => {
                  const group = flags.filter(f => f.type === type);
                  if (!group.length) return null;
                  const label = type === 'critical' ? 'Critical' : type === 'warning' ? 'Warnings' : 'Positive signals';
                  const color = type === 'critical' ? '#A32D2D' : type === 'warning' ? '#854F0B' : '#3B6D11';
                  return (
                    <div key={type} style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color, marginBottom: 8 }}>{label} ({group.length})</div>
                      {group.map((f, i) => <FlagBanner key={i} flag={f} />)}
                    </div>
                  );
                })}
              </>
            )
          }
        </>
      )}
    </div>
  );
}

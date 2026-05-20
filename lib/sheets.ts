import { google } from 'googleapis'

const SHEET_ID = process.env.ROTA_SHEET_ID!

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })
}

function rowsToObjects(rows: string[][]): Record<string, string>[] {
  if (!rows || rows.length < 2) return []
  const [headers, ...data] = rows
  return data.map(row =>
    Object.fromEntries(headers.map((h, i) => [h.trim(), (row[i] || '').trim()]))
  )
}

export interface CalendlyLink { name: string; url: string }
export interface CallerClient {
  name: string; hours: number; tag: string | null; campaign: string | null
  sjp: string | null; ghl_url: string | null; brief_url: string | null
  script: string | null; calendly: CalendlyLink[]
}
export interface CallerData {
  caller: { name: string; shift_week: string | null; shift_sat: string | null; shift_other: string | null }
  clients: CallerClient[]
}

export async function getCallerData(callerName: string): Promise<CallerData | null> {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })
  const [callersRes, clientsRes, assignmentsRes] = await Promise.all([
    sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: '_Callers!A:F' }),
    sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: '_Clients!A:K' }),
    sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: '_Assignments!A:E' }),
  ])
  const callers = rowsToObjects(callersRes.data.values as string[][])
  const clients = rowsToObjects(clientsRes.data.values as string[][])
  const assignments = rowsToObjects(assignmentsRes.data.values as string[][])
  const caller = callers.find(c => c.name.toLowerCase() === callerName.toLowerCase())
  if (!caller) return null
  const callerAssignments = assignments.filter(
    a => a.caller_id.toLowerCase() === caller.id.toLowerCase() && a.active.toLowerCase() === 'true'
  )
  const callerClients: CallerClient[] = callerAssignments.map(a => {
    const client = clients.find(c => c.id === a.client_id) || {}
    const calendlyNames = (client.calendly_names || '').split(',').map((s: string) => s.trim()).filter(Boolean)
    const calendlyUrls = (client.calendly_urls || '').split(',').map((s: string) => s.trim()).filter(Boolean)
    return {
      name: client.name || a.client_id, hours: parseFloat(a.hours) || 0,
      tag: a.tag || null, campaign: client.campaign || null, sjp: client.sjp || null,
      ghl_url: client.ghl_url || null, brief_url: client.brief_url || null,
        lead_sheet_url: client.lead_sheet_url || null, script: client.script || null,
      calendly: calendlyNames.map((name: string, i: number) => ({ name, url: calendlyUrls[i] || '' })),
    }
  })
  return {
    caller: { name: caller.name, shift_week: caller.shift_week || null, shift_sat: caller.shift_sat || null, shift_other: caller.shift_other || null },
    clients: callerClients,
  }
}

export async function getAllCallersData(): Promise<CallerData[]> {
  const auth = getAuth()
  const sheets = google.sheets({ version: 'v4', auth })
  const [callersRes, clientsRes, assignmentsRes] = await Promise.all([
    sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: '_Callers!A:F' }),
    sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: '_Clients!A:K' }),
    sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: '_Assignments!A:E' }),
  ])
  const callers = rowsToObjects(callersRes.data.values as string[][])
  const clients = rowsToObjects(clientsRes.data.values as string[][])
  const assignments = rowsToObjects(assignmentsRes.data.values as string[][])

  return callers.map(caller => {
    const callerAssignments = assignments.filter(
      a => a.caller_id.toLowerCase() === caller.id.toLowerCase() && a.active.toLowerCase() === 'true'
    )
    const callerClients: CallerClient[] = callerAssignments.map(a => {
      const client = clients.find(c => c.id === a.client_id) || {}
      const calendlyNames = (client.calendly_names || '').split(',').map((s: string) => s.trim()).filter(Boolean)
      const calendlyUrls = (client.calendly_urls || '').split(',').map((s: string) => s.trim()).filter(Boolean)
      return {
        name: client.name || a.client_id, hours: parseFloat(a.hours) || 0,
        tag: a.tag || null, campaign: client.campaign || null, sjp: client.sjp || null,
        ghl_url: client.ghl_url || null, brief_url: client.brief_url || null,
        lead_sheet_url: client.lead_sheet_url || null, script: client.script || null,
        calendly: calendlyNames.map((name: string, i: number) => ({ name, url: calendlyUrls[i] || '' })),
      }
    })
    return {
      caller: { name: caller.name, shift_week: caller.shift_week || null, shift_sat: caller.shift_sat || null, shift_other: caller.shift_other || null },
      clients: callerClients,
    }
  })
}

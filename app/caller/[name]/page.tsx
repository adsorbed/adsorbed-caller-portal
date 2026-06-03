export const revalidate = 0

import { notFound } from 'next/navigation'
import CallerView from './CallerView'
import { STATIC_CALLERS } from '../../../data/callers'

export default async function CallerPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const callerName = name.toLowerCase()

  let data = null
  let isStatic = false

  // Try live Sheets data first
  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY && process.env.ROTA_SHEET_ID) {
    try {
      const { getCallerData } = await import('../../../lib/sheets')
      data = await getCallerData(callerName)
    } catch (err) {
      console.error('Sheets fetch failed, falling back to static data:', err)
    }
  }

  // Fall back to static data
  if (!data) {
    if (STATIC_CALLERS[callerName]) {
      data = STATIC_CALLERS[callerName]
      isStatic = true
    } else {
      notFound()
    }
  }

  return <CallerView data={data} isStatic={isStatic} />
}

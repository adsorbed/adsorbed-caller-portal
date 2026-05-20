import { CallerData } from '../lib/sheets'

export const STATIC_CALLERS: Record<string, CallerData> = {
  joy: {
    caller: { name: 'Joy', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'Enver Wealth Management', hours: 2.5, tag: null, campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/accounts/detail/UFOBKmmDchnRwIM0bEHF', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Josh Holmes', url: 'https://calendly.com/josh-holmes-ewm/financial-consultation' }, { name: 'Ben Russell', url: 'https://calendly.com/benjamin-russell-sjpp/30min' }, { name: 'Harry', url: 'https://calendly.com/h-carling/zoom-meeting' }] },
      { name: 'Vantage Wealth + Recall', hours: 3, tag: 'Recall', campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/NdfxLkYsuEbITzf3os5t/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Dan', url: 'https://calendly.com/danmcguigan/introductory-call-30-mins' }, { name: 'Joseph', url: 'https://calendly.com/josephoconnor/introductory-call-vantage-wealth-management' }, { name: 'Kevin', url: 'https://calendly.com/kevinmugisha/introductory-call-30-mins-1' }] },
    ],
  },
  tammy: {
    caller: { name: 'Tammy', shift_week: '9am-5pm UK', shift_sat: '10am-6pm SAT', shift_other: null },
    clients: [
      { name: 'Castell Wealth Management', hours: 2, tag: null, campaign: 'Retirement - 750k+', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/LR5em7sSiNdZRcWsCKmT/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'James', url: 'https://calendly.com/castellwealth/future-perfect-initial-review' }, { name: 'Ashley', url: 'https://calendly.com/ashley-nassiri-sjpp/30-minute-meeting' }] },
      { name: 'Deeprose Wealth & Recall', hours: 2, tag: 'Recall', campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: null, brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Fraser', url: 'https://calendly.com/fraser-j-deeprose-sjpp/30min' }] },
    ],
  },
  miche: {
    caller: { name: 'Miche', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'Pinnacle Wealth Management', hours: 2, tag: null, campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/LTp42eS7bty2DDMeSrS6/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Jon Whitley', url: 'https://calendly.com/jon-whitley/introductory-meeting-with-pinnacle-wealth-management-103' }, { name: 'Ben Rotchford', url: 'https://calendly.com/ben-rotchford---sjp/introductory-meeting-with-pinnacle-wealth-management-duplicate' }, { name: 'Mark Griffiths', url: 'https://calendly.com/mark-griffiths-2/introductory-meeting-with-pinnacle-wealth-management-duplicate-duplicate-duplicate' }, { name: 'Felix Flower', url: 'https://calendly.com/felix-flower/introductory-meeting-with-pinnacle-wealth-management-duplicate-duplicate-2-duplicate-1' }, { name: 'Brody Faulkner', url: 'https://calendly.com/brody-faulkner-sjpp/introductory-meeting-with-pinnacle-wealth-management-duplicate-duplicate-2-duplicate' }, { name: 'Ross Hayden', url: 'https://calendly.com/ross-hayden-sjpp/introductory-meeting-with-pinnacle-wealth-management-duplicate-duplicate-2' }, { name: 'Charlie Bornor', url: 'https://calendly.com/charlie-bornor/introductory-meeting-with-pinnacle-wealth-management-104' }] },
      { name: 'Sovereign Wealth + Recall', hours: 3, tag: 'Recall', campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/eVuJ4ipmU51Zm0Vi2sy8/contacts/smart_list/All', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Alexander Head', url: 'https://calendly.com/alexander-head/financial-planning-consultation-1' }] },
      { name: 'Fusion Financial', hours: 2, tag: null, campaign: 'Pension Consolidation', sjp: 'No', ghl_url: null, brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Fusion Adviser', url: 'https://calendly.com/joahu-s-fcg/fusion-initial-discovery-call' }] },
    ],
  },
  celeste: {
    caller: { name: 'Celeste', shift_week: '8.30am-4.30pm UK', shift_sat: '10.30am-6.30pm SAT', shift_other: null },
    clients: [
      { name: 'Shinfield Financial Planning', hours: 2, tag: null, campaign: 'Tax Trap', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/v2/location/ustxqf1QbLCAcfR1O4r/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Richard', url: 'https://calendly.com/richard-shinfield/30min' }] },
      { name: 'Oakland Wealth Consultants', hours: 2, tag: null, campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/aoiuWcTeJRJXfrONp71p/settings/company', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Oakland Adviser', url: 'https://calendly.com/oaklandwealthconsultants/30min' }] },
      { name: 'William Street & Recall', hours: 3, tag: 'Recall', campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/DF5YpqdKYNykTlTvEdwp/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'William Street Adviser', url: 'https://calendly.com/wswealth/30min' }] },
    ],
  },
  sitarah: {
    caller: { name: 'Sitarah', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: '8pm-12am US' },
    clients: [
      { name: 'TBA Recall', hours: 2, tag: 'Recall', campaign: 'Pay Less Tax in Retirement', sjp: 'No', ghl_url: null, brief_url: null, lead_sheet_url: null, script: null, calendly: [] },
      { name: 'Office Freedom', hours: 3, tag: null, campaign: 'Business Owners', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/v2/location/JJY49W48ZHoFp9AG8muZi/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [] },
      { name: 'Fusion Financial', hours: 1, tag: null, campaign: 'Pension Consolidation', sjp: 'No', ghl_url: null, brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Fusion Adviser', url: 'https://calendly.com/joahu-s-fcg/fusion-initial-discovery-call' }] },
    ],
  },
  zama: {
    caller: { name: 'Zama', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'Macfarlane Wealth Partners', hours: 3, tag: null, campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/b1SpoviaL4WesER7OvDA/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Macfarlane Adviser', url: 'https://calendly.com/yonas-a-mfine/sjp-introductory-meeting' }] },
      { name: 'Office Freedom', hours: 3, tag: null, campaign: 'Business Owners', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/v2/location/JJY49W48ZHoFp9AG8muZi/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [] },
      { name: 'Fusion Financial Recall', hours: 1, tag: 'Recall', campaign: 'Pension Consolidation', sjp: 'No', ghl_url: null, brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Fusion Adviser', url: 'https://calendly.com/joahu-s-fcg/fusion-initial-discovery-call' }] },
    ],
  },
  deje: {
    caller: { name: 'Deje', shift_week: '9am-5pm UK', shift_sat: '10am-6pm SAT', shift_other: null },
    clients: [
      { name: 'Enver Wealth Recall', hours: 2, tag: 'Recall', campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/accounts/detail/UFOBKmmDchnRwIM0bEHF', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Josh Holmes', url: 'https://calendly.com/josh-holmes-ewm/financial-consultation' }, { name: 'Ben Russell', url: 'https://calendly.com/benjamin-russell-sjpp/30min' }] },
      { name: 'Twelve Wealth Management', hours: 2, tag: null, campaign: 'Maximise Retirement', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/xm4D7aFFAP1NJPZmcUzt/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Alex Exall', url: 'https://calendly.com/alex-exall-financial-planning-financial-health-check' }, { name: 'Jonathan Pollock', url: 'https://calendly.com/jonathan-pollock-twm/60min' }, { name: 'Alfie', url: 'https://calendly.com/alfie-richingandone-on-one-meeting-and-review' }] },
      { name: 'Whitfield Wealth', hours: 2, tag: null, campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/HBCeaAQBmXZoIpFaaMS/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Whitfield Adviser', url: 'https://calendly.com/e/ewvm-wwp0-d/minute-discovery-meeting' }] },
    ],
  },
  toni: {
    caller: { name: 'Toni', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'TBA Wealth', hours: 2, tag: null, campaign: null, sjp: null, ghl_url: null, brief_url: null, lead_sheet_url: null, script: null, calendly: [] },
      { name: 'Oakland Wealth Consultants', hours: 1, tag: null, campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/aoiuWcTeJRJXfrONp71p/settings/company', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Oakland Adviser', url: 'https://calendly.com/oaklandwealthconsultants/30min' }] },
    ],
  },
  natasha: {
    caller: { name: 'Natasha', shift_week: '9am-5pm UK', shift_sat: '10am-6pm SAT', shift_other: null },
    clients: [
      { name: 'Nadia Enver Financial Planning', hours: 2, tag: null, campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: null, brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Nadia Enver', url: 'https://calendly.com/nadiaenverfp/30min' }] },
      { name: 'Twelve Wealth Retirement & Recall', hours: 2, tag: 'Recall', campaign: 'Maximise Retirement', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/xm4D7aFFAP1NJPZmcUzt/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Alex Exall', url: 'https://calendly.com/alex-exall-financial-planning-financial-health-check' }, { name: 'Jonathan Pollock', url: 'https://calendly.com/jonathan-pollock-twm/60min' }] },
      { name: 'Deeprose Wealth (child)', hours: 2, tag: null, campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: null, brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Fraser', url: 'https://calendly.com/fraser-j-deeprose-sjpp/30min' }] },
    ],
  },
  carlos: {
    caller: { name: 'Carlos', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'Cleardrop Investment LLC', hours: 4, tag: null, campaign: 'Post Liquidity Wealth Playbook', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/v2/location/ZoDXrKX6paQ4uQRhpV4w/dashboard', brief_url: null, lead_sheet_url: null, script: null, calendly: [{ name: 'Baj', url: 'https://calendly.com/baj-cedarrivercapital/30min' }, { name: 'Paul', url: 'https://calendly.com/platta-cedarrivercapital/30min' }] },
      { name: 'OnPoint Financial Management', hours: 3, tag: null, campaign: null, sjp: 'No', ghl_url: null, brief_url: null, lead_sheet_url: null, script: null, calendly: [] },
    ],
  },
}

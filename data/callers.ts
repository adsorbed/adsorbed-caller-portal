import { CallerData } from '../lib/sheets'

export const STATIC_CALLERS: Record<string, CallerData> = {
  tammy: {
    caller: { name: 'Tammy', shift_week: '9am-5pm UK', shift_sat: '10am-6pm SAT', shift_other: null },
    clients: [
      { name: 'Enver Wealth Management', hours: 1, tag: 'Recall', campaign: 'Tax Trap', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/accounts/detail/UF0BKmmDchnRwIM0bEHF', brief_url: null, script: "Hi, this is [Name] calling from ADsorbed on behalf of Enver Wealth Management. I'm reaching out to busy professionals who may be paying too much tax. Does that sound like something you'd want a quick chat about?", calendly: [{ name: 'Josh Holmes', url: 'https://calendly.com/josh-holmes-nm/financial-consultation' }, { name: 'Ben Russell', url: 'https://calendly.com/benjamin-russell-sjpp/30min' }] },
      { name: 'Fusion - Pensions', hours: 2, tag: null, campaign: 'Pension Consolidation', sjp: 'No', ghl_url: 'https://app.gohighlevel.com', brief_url: null, script: "Hi, this is [Name] from ADsorbed working with Fusion Pensions. We help people consolidate old workplace pensions — have you got any old pensions from previous jobs you haven't sorted?", calendly: [] },
      { name: 'NO SHOWS - Recall', hours: 2, tag: 'Recall', campaign: 'No Show Redial', sjp: null, ghl_url: 'https://app.gohighlevel.com', brief_url: null, script: "Hi, I'm following up as you had an appointment booked with one of our advisers but we missed you. Would you like to get that rescheduled?", calendly: [] },
    ],
  },
  miche: {
    caller: { name: 'Miche', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'Enver Wealth Management', hours: 2, tag: null, campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/accounts/detail/UF0BKmmDchnRwIM0bEHF', brief_url: null, script: "Hi, this is [Name] calling from ADsorbed on behalf of Enver Wealth Management. I'm reaching out to busy professionals who may be paying too much tax. Does that sound like something you'd want a quick chat about?", calendly: [{ name: 'Josh Holmes', url: 'https://calendly.com/josh-holmes-nm/financial-consultation' }, { name: 'Ben Russell', url: 'https://calendly.com/benjamin-russell-sjpp/30min' }] },
      { name: 'Pinnacle Wealth Management', hours: 2, tag: null, campaign: 'Pension Consolidation', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com', brief_url: null, script: "Hi, I'm calling on behalf of Pinnacle Wealth Management. We help professionals review and consolidate their pensions — is that something you've thought about recently?", calendly: [{ name: 'Jon Whitley', url: 'https://calendly.com/jon-whitley/introductory-meeting-with-pinnacle-wealth-management-103' }] },
      { name: 'LionHeart (LI)', hours: 2.5, tag: null, campaign: 'Life Insurance', sjp: 'No', ghl_url: 'https://app.gohighlevel.com', brief_url: null, script: "Hi, I'm reaching out on behalf of LionHeart. We help families make sure they're protected with the right life cover — do you currently have any life insurance in place?", calendly: [{ name: 'LionHeart Team', url: 'https://calendly.com/lionheart-telesales' }] },
    ],
  },
}

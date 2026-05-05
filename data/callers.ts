import { CallerData } from '../lib/sheets'

export const STATIC_CALLERS: Record<string, CallerData> = {
  tammy: {
    caller: { name: 'Tammy', shift_week: '9am-5pm UK', shift_sat: '10am-6pm SAT', shift_other: null },
    clients: [
      { name: 'Enver Wealth Management', hours: 1.5, tag: 'Recall', campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/accounts/detail/UFOBKmmDchnRwIM0bEHF', brief_url: null, script: 'Hi, this is [Name] calling from ADsorbed on behalf of Enver Wealth Management. Reaching out to professionals who may be paying too much tax - is that worth a chat?', calendly: [{ name: 'Josh Holmes', url: 'https://calendly.com/josh-holmes-ewm/financial-consultation' }, { name: 'Ben Russell', url: 'https://calendly.com/benjamin-russell-sjpp/30min' }, { name: 'Harry', url: 'https://calendly.com/h-carling/zoom-meeting' }] },
      { name: 'NO SHOWS - Recall', hours: 2, tag: 'Recall', campaign: 'No Show Redial', sjp: null, ghl_url: null, brief_url: null, script: 'Hi, following up - you had an appointment booked with one of our advisers but we missed you. Would you like to reschedule?', calendly: [] },
      { name: 'Fusion Financial', hours: 2, tag: null, campaign: 'Pension Consolidation', sjp: 'No', ghl_url: null, brief_url: null, script: 'Hi, this is [Name] from ADsorbed working with Fusion Financial. We help people consolidate old workplace pensions - do you have any old pensions sitting around?', calendly: [{ name: 'Fusion Adviser', url: 'https://calendly.com/joahu-s-fcg/fusion-initial-discovery-call' }] },
      { name: 'Office Freedom', hours: 1.5, tag: null, campaign: 'Business Owners', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/v2/location/JJY49W48ZHoFp9AG8muZi/dashboard', brief_url: null, script: 'Hi, calling on behalf of Office Freedom. We work with business owners to help them make the most of their finances - is that relevant to you?', calendly: [] },
    ],
  },
  miche: {
    caller: { name: 'Miche', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'Enver Wealth Management', hours: 2.5, tag: null, campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/accounts/detail/UFOBKmmDchnRwIM0bEHF', brief_url: null, script: 'Hi, this is [Name] calling from ADsorbed on behalf of Enver Wealth Management. Reaching out to professionals who may be paying too much tax - is that worth a chat?', calendly: [{ name: 'Josh Holmes', url: 'https://calendly.com/josh-holmes-ewm/financial-consultation' }, { name: 'Ben Russell', url: 'https://calendly.com/benjamin-russell-sjpp/30min' }] },
      { name: 'Pinnacle Wealth Management', hours: 2, tag: null, campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/LTp42eS7bty2DDMeSrS6/dashboard', brief_url: null, script: 'Hi, calling on behalf of Pinnacle Wealth Management. We help professionals review their pension and retirement plans - is that something you have thought about recently?', calendly: [{ name: 'Jon Whitley', url: 'https://calendly.com/jon-whitley/introductory-meeting-with-pinnacle-wealth-management-103' }, { name: 'Ben Rotchford', url: 'https://calendly.com/ben-rotchford---sjp/introductory-meeting-with-pinnacle-wealth-management-duplicate' }, { name: 'Mark Griffiths', url: 'https://calendly.com/mark-griffiths-2/introductory-meeting-with-pinnacle-wealth-management-duplicate-duplicate-duplicate' }, { name: 'Felix Flower', url: 'https://calendly.com/felix-flower/introductory-meeting-with-pinnacle-wealth-management-duplicate-duplicate-2-duplicate-1' }, { name: 'Brody Faulkner', url: 'https://calendly.com/brody-faulkner-sjpp/introductory-meeting-with-pinnacle-wealth-management-duplicate-duplicate-2-duplicate' }, { name: 'Ross Hayden', url: 'https://calendly.com/ross-hayden-sjpp/introductory-meeting-with-pinnacle-wealth-management-duplicate-duplicate-2' }, { name: 'Charlie Bornor', url: 'https://calendly.com/charlie-bornor/introductory-meeting-with-pinnacle-wealth-management-104' }] },
      { name: 'William Street Wealth', hours: 2.5, tag: null, campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/DF5YpqdKYNykTlTvEdwp/dashboard', brief_url: null, script: 'Hi, calling on behalf of William Street Wealth. We help people pay less tax in retirement - is that relevant to you?', calendly: [{ name: 'William Street Adviser', url: 'https://calendly.com/wswealth/30min' }] },
    ],
  },
  celeste: {
    caller: { name: 'Celeste', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'Sovereign Wealth Management', hours: 2.5, tag: null, campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/eVuJ4ipmU51Zm0Vi2sy8/contacts/smart_list/All', brief_url: null, script: 'Hi, calling on behalf of Sovereign Wealth Management. We help high earners review their tax position - is that relevant to you?', calendly: [{ name: 'Alexander Head', url: 'https://calendly.com/alexander-head/financial-planning-consultation-1' }] },
      { name: 'Oakland Wealth Consultants', hours: 2, tag: null, campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/aoiuWcTeJRJXfrONp71p/settings/company', brief_url: null, script: 'Hi, calling on behalf of Oakland Wealth. We help professionals pay less tax - would that be worth a conversation?', calendly: [{ name: 'Oakland Adviser', url: 'https://calendly.com/oaklandwealthconsultants/30min' }] },
      { name: 'LionHeart', hours: 2.5, tag: null, campaign: 'Pension Consolidation', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/v2/location/18Qgzv4ChXvRVvHkUVI6/contacts/smart_list/All', brief_url: null, script: 'Hi, reaching out on behalf of LionHeart. We help people consolidate old workplace pensions into one manageable pot - is that something you would be open to exploring?', calendly: [{ name: 'LionHeart Team', url: 'https://calendly.com/lionheartwealthuk/initial-discovery-call' }] },
    ],
  },
  sitarah: {
    caller: { name: 'Sitarah', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: '8pm-12am US' },
    clients: [
      { name: 'TBA', hours: 2, tag: 'Recall', campaign: 'Pay Less Tax in Retirement', sjp: 'No', ghl_url: null, brief_url: null, script: 'Hi, calling - the adviser will be in touch shortly to discuss your retirement planning options.', calendly: [{ name: 'Oliver Brien', url: 'https://calendly.com/oliver-obrien-turpinbal/30min' }] },
      { name: 'Office Freedom', hours: 3, tag: null, campaign: 'Business Owners', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/v2/location/JJY49W48ZHoFp9AG8muZi/dashboard', brief_url: null, script: 'Hi, calling on behalf of Office Freedom. We work with business owners to help them make the most of their finances - is that relevant to you?', calendly: [] },
      { name: 'Whitfield Wealth', hours: 2, tag: null, campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/HBCeaAQBmXZoIpFaaMS/dashboard', brief_url: null, script: 'Hi, calling on behalf of Whitfield Wealth Management. We help professionals review their tax position - is that something you would be open to discussing?', calendly: [{ name: 'Whitfield Adviser', url: 'https://calendly.com/e/ewvm-wwp0-d/minute-discovery-meeting' }] },
    ],
  },
  zama: {
    caller: { name: 'Zama', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'Deeprose Wealth Management', hours: 2, tag: null, campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: null, brief_url: null, script: 'Hi, calling on behalf of Deeprose Wealth. We help people pay less tax in retirement - is that on your radar?', calendly: [{ name: 'Fraser', url: 'https://calendly.com/fraser-j-deeprose-sjpp/30min' }] },
      { name: 'Macfarlane Wealth Partners', hours: 1, tag: null, campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/b1SpoviaL4WesER7OvDA/dashboard', brief_url: null, script: 'Hi, calling on behalf of Macfarlane Wealth Partners. We help professionals approaching retirement make the most of what they have built - is that a conversation worth having?', calendly: [{ name: 'Macfarlane Adviser', url: 'https://calendly.com/yonas-a-mfine/sjp-introductory-meeting' }] },
      { name: 'Office Freedom', hours: 3, tag: null, campaign: 'Business Owners', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/v2/location/JJY49W48ZHoFp9AG8muZi/dashboard', brief_url: null, script: 'Hi, calling on behalf of Office Freedom. We work with business owners to help them make the most of their finances - is that relevant to you?', calendly: [] },
    ],
  },
  warren: {
    caller: { name: 'Warren', shift_week: '9am-5pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'Sovereign Wealth Management', hours: 3, tag: 'Recall', campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/eVuJ4ipmU51Zm0Vi2sy8/contacts/smart_list/All', brief_url: null, script: 'Hi, calling on behalf of Sovereign Wealth Management. We help high earners review their tax position - is that relevant to you?', calendly: [{ name: 'Alexander Head', url: 'https://calendly.com/alexander-head/financial-planning-consultation-1' }] },
      { name: 'Shinfield Financial Planning', hours: 1, tag: null, campaign: 'Tax Trap', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/v2/location/ustxqf1QbLCAcfR1O4r/dashboard', brief_url: null, script: 'Hi, calling on behalf of Shinfield Financial Planning. We help busy professionals who may be overpaying tax - does that sound relevant to you?', calendly: [{ name: 'Richard', url: 'https://calendly.com/richard-shinfield/30min' }] },
      { name: 'Twelve Wealth Management', hours: 1, tag: null, campaign: 'Maximise Retirement', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/xm4D7aFFAP1NJPZmcUzt/dashboard', brief_url: null, script: 'Hi, calling on behalf of Twelve Wealth Management. We help professionals maximise what they get from retirement - is that worth a quick conversation?', calendly: [{ name: 'Alex Exall', url: 'https://calendly.com/alex-exall-financial-planning-financial-health-check' }, { name: 'Jonathan Pollock', url: 'https://calendly.com/jonathan-pollock-twm/60min' }, { name: 'Alfie', url: 'https://calendly.com/alfie-richingandone-on-one-meeting-and-review' }] },
      { name: 'Deeprose Wealth Management', hours: 2, tag: null, campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: null, brief_url: null, script: 'Hi, calling on behalf of Deeprose Wealth. We help people pay less tax in retirement - is that on your radar?', calendly: [{ name: 'Fraser', url: 'https://calendly.com/fraser-j-deeprose-sjpp/30min' }] },
    ],
  },
  deje: {
    caller: { name: 'Deje', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'Fusion Financial', hours: 2, tag: null, campaign: 'Pension Consolidation', sjp: 'No', ghl_url: null, brief_url: null, script: 'Hi, calling on behalf of Fusion Financial. We help people consolidate old workplace pensions - do you have any old pensions sitting around?', calendly: [{ name: 'Fusion Adviser', url: 'https://calendly.com/joahu-s-fcg/fusion-initial-discovery-call' }] },
      { name: 'Fusion Financial Recall', hours: 2, tag: 'Recall', campaign: 'Pension Consolidation', sjp: 'No', ghl_url: null, brief_url: null, script: 'Hi, following up on a previous conversation about consolidating your pensions with Fusion Financial - are you still open to a quick chat?', calendly: [{ name: 'Fusion Adviser', url: 'https://calendly.com/joahu-s-fcg/fusion-initial-discovery-call' }] },
      { name: 'Vantage Wealth Management', hours: 3, tag: 'Recall', campaign: 'Tax Trap', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/NdfxLkYsuEbITzf3os5t/dashboard', brief_url: null, script: 'Hi, calling on behalf of Vantage Wealth Management. We help professionals review their tax position - is that something you would be open to discussing?', calendly: [{ name: 'Dan', url: 'https://calendly.com/danmcguigan/introductory-call-30-mins' }, { name: 'Joseph', url: 'https://calendly.com/josephoconnor/introductory-call-vantage-wealth-management' }, { name: 'Kevin', url: 'https://calendly.com/kevinmugisha/introductory-call-30-mins-1' }] },
    ],
  },
  toni: {
    caller: { name: 'Toni', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [
      { name: 'McMillan Financial Advice', hours: 2, tag: null, campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/accounts/detail/xKphu0bjBTkvP5pJi3fP', brief_url: null, script: 'Hi, calling on behalf of McMillan Financial Advice. We help professionals pay less tax in retirement - is that worth a conversation?', calendly: [{ name: 'Chris', url: 'https://calendly.com/christopher-beck-y1v/90min' }] },
      { name: 'LionHeart Recall', hours: 1, tag: 'Recall', campaign: 'Pension Consolidation', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/v2/location/18Qgzv4ChXvRVvHkUVI6/contacts/smart_list/All', brief_url: null, script: 'Hi, following up on a previous conversation about consolidating your pensions with LionHeart - are you still open to a quick chat?', calendly: [{ name: 'LionHeart Team', url: 'https://calendly.com/lionheartwealthuk/initial-discovery-call' }] },
      { name: 'LionHeart', hours: 3, tag: null, campaign: 'Pension Consolidation', sjp: 'No', ghl_url: 'https://app.gohighlevel.com/v2/location/18Qgzv4ChXvRVvHkUVI6/contacts/smart_list/All', brief_url: null, script: 'Hi, reaching out on behalf of LionHeart. We help people consolidate old workplace pensions into one manageable pot - is that something you would be open to exploring?', calendly: [{ name: 'LionHeart Team', url: 'https://calendly.com/lionheartwealthuk/initial-discovery-call' }] },
    ],
  },
  natasha: {
    caller: { name: 'Natasha', shift_week: '9am-5pm UK', shift_sat: null, shift_other: null },
    clients: [
      { name: 'Twelve Wealth Management', hours: 2, tag: null, campaign: 'Maximise Retirement', sjp: 'Yes', ghl_url: 'https://app.gohighlevel.com/v2/location/xm4D7aFFAP1NJPZmcUzt/dashboard', brief_url: null, script: 'Hi, calling on behalf of Twelve Wealth Management. We help professionals maximise what they get from retirement - is that worth a quick conversation?', calendly: [{ name: 'Alex Exall', url: 'https://calendly.com/alex-exall-financial-planning-financial-health-check' }, { name: 'Jonathan Pollock', url: 'https://calendly.com/jonathan-pollock-twm/60min' }, { name: 'Alfie', url: 'https://calendly.com/alfie-richingandone-on-one-meeting-and-review' }] },
      { name: 'Nadia Enver Financial Planning', hours: 2, tag: 'Recall', campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: null, brief_url: null, script: 'Hi, calling on behalf of Nadia Enver Financial Planning. We help people pay less tax in retirement - is that something you would be interested in exploring?', calendly: [{ name: 'Nadia Enver', url: 'https://calendly.com/nadiaenverfp/30min' }] },
      { name: 'Deeprose Wealth Management', hours: 2, tag: null, campaign: 'Pay Less Tax in Retirement', sjp: 'Yes', ghl_url: null, brief_url: null, script: 'Hi, calling on behalf of Deeprose Wealth. We help people pay less tax in retirement - is that on your radar?', calendly: [{ name: 'Fraser', url: 'https://calendly.com/fraser-j-deeprose-sjpp/30min' }] },
    ],
  },
  carlos: {
    caller: { name: 'Carlos', shift_week: '10am-6pm UK', shift_sat: '11am-7pm SAT', shift_other: null },
    clients: [],
  },
}

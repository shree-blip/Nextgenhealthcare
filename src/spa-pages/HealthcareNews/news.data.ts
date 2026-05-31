import analyticsImg from '../../assets/nextgen-image/Analytics&report.png';
import ouradvantageImg from '../../assets/nextgen-image/Ouradvantageimg1.png';
import builtForClinicImg from '../../assets/nextgen-image/Clinicalimg1.png';
import medSpaImg from '../../assets/nextgen-image/Medspas&wellnessimg.png';
import emailImg from '../../assets/nextgen-image/Emailcampingimg.png';
import healthcareimg1 from '../../assets/nextgen-image/Smsemailimg.png';
import healthcareimg2 from '../../assets/nextgen-image/Patientverificationimg.png';
import healthcareimg3 from '../../assets/nextgen-image/Helathcareimg.png';
import healthcareimg4 from '../../assets/nextgen-image/Reviewcollectionimg.png';
import healthcareimg5 from '../../assets/nextgen-image/Mentalhealthimg.png';
import healthcareimg6 from '../../assets/nextgen-image/Helathcareimg.png';
import healthcareimg7 from '../../assets/nextgen-image/Hippacomplianceimg.png';
import recallImg from '../../assets/nextgen-image/Medicalautomationimg.png';
import patientIdentitiesImg from '../../assets/nextgen-image/Brandidentityimg.png';
import futuristicImg from '../../assets/nextgen-image/Gptbotimg.png';
import bookingWebsiteImg from '../../assets/nextgen-image/Websiteimg.png';
import dentalImg from '../../assets/nextgen-image/Dentalimg.png';

/* ============================================================
   HEALTHCARE NEWS — article data store.
   One entry per topic. Each entry feeds the dynamic
   /healthcare-news/:slug detail page.
   ============================================================ */

export type NewsCategory =
  | 'Research'
  | 'Regulation'
  | 'Telehealth'
  | 'AI & Operations'
  | 'Policy'
  | 'Insurance'
  | 'Operations'
  | 'Marketing'
  | 'Pharmacy'
  | 'Case Study'
  | 'Compliance'
  | 'Tech Stack'
  | 'Reputation'
  | 'Email'
  | 'Paid Ads'
  | 'Automation';

export interface NewsArticle {
  slug: string;
  category: NewsCategory;
  title: string;
  lede: string;
  author: string;
  date: string;
  readTime: string;
  img: string;
  takeaways: string[];
  body: string[];
  quote?: { text: string; attribution: string };
  ctaTitle?: string;
  ctaBody?: string;
  ctaTo?: string;
  ctaLabel?: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    slug: 'ai-imaging-diagnostic-errors',
    category: 'Research',
    title: 'AI-driven imaging tool cuts diagnostic errors by 47% in multi-site hospital trial.',
    lede: 'A 14-month study across nine US hospital networks reports the largest measured drop in radiology misreads of the decade — and a clear blueprint for how the rest of healthcare might follow.',
    author: 'Aanya Patel',
    date: 'May 1, 2026',
    readTime: '9 min read',
    img: futuristicImg,
    takeaways: [
      'Hybrid model pairs federated learning with clinician feedback loops, sidestepping the data-pooling barrier hospitals usually hit.',
      'Misread rate dropped from 8.3% to 4.4% across 312,000 studies — the biggest peer-reviewed improvement on record.',
      'Cost-per-study fell 11% even after factoring the AI licence, because radiologist re-reads dropped from 19% to 7%.',
      'Roll-out is fastest in mid-size networks; small clinics still face an integration tax that needs vendor-side answers.',
    ],
    body: [
      'For the better part of a decade, vendors have promised that machine-learning imaging tools would slot neatly into hospital radiology workflows. The reality has been messier — adoption stalls on data silos, model drift, and a measurable trust gap with reading clinicians.',
      'The 14-month multi-site trial published this week is the first peer-reviewed work to measure outcomes at the scale of a regional health system. Nine US networks across the Southwest and Midwest participated. The hybrid model — federated learning paired with structured radiologist correction loops — produced a 47% drop in misreads across 312,000 imaging studies.',
      'Crucially, the cost-per-study figure also moved. Radiologist re-read rates fell from 19% to 7%, which more than absorbed the AI licence fee. The networks running the model report a net 11% reduction in cost-per-study at the system level.',
      'Translation for smaller practices: the unit economics now favour adoption, but the integration tax is still real. Mid-size networks moved fastest because they could fund a dedicated integration engineer. Single-clinic operations still need the vendor side to ship a working PACS connector before the model can earn its keep.',
    ],
    quote: {
      text: 'We have been waiting six years for a study at this scale. The result is not just statistical — it is operational. The radiologists are reading faster and trusting the second opinion.',
      attribution: 'Dr. Marcus Field, Chief of Radiology, Memorial Regional',
    },
    ctaTitle: 'Want help connecting clinical AI to your marketing funnel?',
    ctaBody:
      'We build the patient-facing landing pages, schema, and reporting layer that translate clinical investment into booked visits.',
    ctaTo: '/services/seo',
    ctaLabel: 'See the SEO programme',
  },
  {
    slug: 'fda-glucose-monitor-type2',
    category: 'Regulation',
    title: 'FDA approves first continuous glucose monitor designed for Type 2 patients.',
    lede: 'The approval breaks the device category out of its Type 1 niche and is expected to shift the home-monitoring market by an estimated $4.2B over the next 24 months.',
    author: 'Riya Chowdhury',
    date: 'Apr 30, 2026',
    readTime: '4 min read',
    img: healthcareimg6,
    takeaways: [
      'First-of-kind clearance specifically for the larger Type 2 cohort — previously off-label for most CGM hardware.',
      'Reimbursement pathway already cleared by three major payers ahead of the announcement.',
      'Integrated patient education layer is a condition of the approval — manufacturers must ship onboarding flows.',
      'Marketing claims are tightly scoped; "treats" language remains prohibited under the 510(k) framework.',
    ],
    body: [
      'Continuous glucose monitors (CGMs) have been a Type 1 diabetes story for most of their commercial history. With this clearance, the FDA opens the door to the much larger Type 2 patient population — a cohort approximately ten times bigger and growing.',
      'Three major payers had reimbursement pathways pre-loaded ahead of the announcement, which signals the agency coordinated with the commercial side on the rollout. That removes the most common blocker for new monitoring devices: patients who qualify clinically but cannot afford the recurring sensor cost.',
      'A notable structural condition: the approval requires manufacturers to ship a patient education layer alongside the hardware. The FDA is making interpretive guidance an integrated product rather than an afterthought.',
      'For marketers, the language guard-rails are tight. The device may not be claimed to "treat" diabetes — only to monitor. Practices promoting the new monitors should be careful to keep the language inside the cleared indication.',
    ],
    ctaTitle: 'New device, new questions from patients?',
    ctaBody:
      'We build the educational landing pages, FAQ schema, and HIPAA-aware lead flows that turn regulatory news into booked consults.',
    ctaTo: '/hipaa-compliance',
    ctaLabel: 'See HIPAA marketing',
  },
  {
    slug: 'telemedicine-q1-record',
    category: 'Telehealth',
    title: 'Telemedicine visits hit a record high in Q1, led by mental-health specialties.',
    lede: 'Q1 2026 visits exceeded the previous peak by 18%. Mental-health and chronic-care follow-ups now drive a majority of the volume.',
    author: 'Ben Holloway',
    date: 'Apr 29, 2026',
    readTime: '6 min read',
    img: healthcareimg2,
    takeaways: [
      'Mental-health visits made up 41% of all telehealth volume — a category shift, not a temporary spike.',
      'Chronic-care follow-ups (cardiology, endocrinology) grew the fastest at 64% YoY.',
      'No-show rates remain 23% lower than equivalent in-person appointments.',
      'Insurance parity rulings from late 2025 are now flowing through to provider-side reimbursement.',
    ],
    body: [
      'The Q1 telehealth numbers are out and they redraw the category. Volume exceeded the previous all-time peak (set in pandemic-era Q2 2021) by 18%, but the composition has changed entirely.',
      'Mental-health visits now account for 41% of all telehealth volume. That is not a cyclical spike — it is the maturing of an entire delivery channel that practitioners and patients have decided works better remotely for most of the cadence.',
      'The fastest-growing slice is chronic-care follow-ups. Cardiology and endocrinology each grew over 60% year-over-year. The hypothesis: structured periodic check-ins (vitals review, medication adjustment, lifestyle counselling) are well-suited to a remote model.',
      'Operationally, the no-show rate remains a quiet success. Across the surveyed health systems, telehealth visits had a 23% lower no-show rate than equivalent in-person appointments — which is the single biggest lever for clinic revenue if you can convert it.',
    ],
    quote: {
      text: 'Mental health is the proof case. If the modality works for the highest-trust visit type in medicine, it works for everything downstream of that.',
      attribution: 'Dr. Lena Park, Chief Medical Officer, Brightline Health',
    },
    ctaTitle: 'Telehealth-ready landing pages?',
    ctaBody:
      'Booking-first sites with telehealth booking, insurance verification, and HIPAA-aware intake — all conversion-tracked end to end.',
    ctaTo: '/services/website-design-dev',
    ctaLabel: 'See website programme',
  },
  {
    slug: 'voice-ai-front-desks',
    category: 'AI & Operations',
    title: 'Hospital network adopts voice-AI front desks across 38 locations.',
    lede: 'A regional operator becomes the largest US system to replace its inbound call line with a voice-AI agent — and to publish the operational data alongside the rollout.',
    author: 'Daniel Reyes',
    date: 'Apr 28, 2026',
    readTime: '5 min read',
    img: recallImg,
    takeaways: [
      '38 locations live in a single operational quarter — record pace for an enterprise AI rollout.',
      'Average answer-time fell from 6:42 to 0:08 across the network.',
      'Hand-off rate to a human staffer holds at 12% — well below the projected 25% benchmark.',
      'Network reports 31% of new-patient bookings now originate inside the AI conversation.',
    ],
    body: [
      'Most healthcare AI announcements are demos. This is an operating system. The unnamed regional network — Top-50 by revenue in the US — has migrated its inbound patient line to a voice-AI agent across 38 locations in a single quarter.',
      'The published metrics are the first peek at what works at enterprise scale. Average answer-time fell from 6:42 to 0:08 (the AI picks up on the first ring). The hand-off rate to a human staffer holds at 12% — significantly below the 25% benchmark most pilots reported.',
      'The most striking number: 31% of new-patient bookings now originate inside the AI conversation, meaning the agent is not just routing existing demand but capturing demand that the old IVR was leaking entirely.',
      'For independent practices, the lesson is not that you need to roll out voice-AI tomorrow. It is that the inbound experience now has a moving baseline. Patients who have called the network will expect equivalent responsiveness everywhere else.',
    ],
    ctaTitle: 'Inbound experience that matches the new baseline.',
    ctaBody:
      'We connect website, call platform, and CRM into one HIPAA-aware system — so booked visits stop leaking between channels.',
    ctaTo: '/automation',
    ctaLabel: 'See automation services',
  },
  {
    slug: 'cms-cardiac-monitoring',
    category: 'Policy',
    title: 'CMS announces expanded reimbursement for at-home cardiac monitoring.',
    lede: 'New billing codes activate January 2027 — but the design choices independent cardiology practices need to make are due this quarter.',
    author: 'Aanya Patel',
    date: 'Apr 27, 2026',
    readTime: '7 min read',
    img: ouradvantageImg,
    takeaways: [
      'Three new billing codes cover continuous, intermittent, and event-based at-home monitoring.',
      'Reimbursement is up to 22% higher than equivalent in-clinic codes for the first 12 months.',
      'Documentation requirements include a signed care-plan and structured device-uptime data.',
      'Independent cardiology practices need to choose vendors and build the workflow before Q3 2026.',
    ],
    body: [
      'CMS is making the largest reimbursement adjustment for at-home cardiac monitoring since the category formed. Three new billing codes — continuous, intermittent, and event-based — activate January 2027.',
      'The headline: reimbursement is up to 22% higher than equivalent in-clinic codes for the first 12 months, intentionally tilting the economics toward at-home programmes.',
      'Documentation requirements are real. Every claim needs a signed care-plan and structured device-uptime data. Practices that have already adopted a remote-monitoring platform will sail through; those without one have a 6-month sprint to choose, integrate, and train.',
      'The window for vendor selection is tight. Independent cardiology practices should be evaluating now, in time for a Q3 2026 implementation. By Q4 the vendor-side bandwidth will be saturated.',
    ],
    ctaTitle: 'Translate policy windows into booked patients.',
    ctaBody:
      'When the reimbursement structure shifts, the search intent shifts with it. We build the pages and ad campaigns that capture the new demand on day one.',
    ctaTo: '/services/google-ads',
    ctaLabel: 'See paid programme',
  },
  {
    slug: 'mayo-wearable-heart-monitor',
    category: 'Research',
    title: 'Mayo Clinic pilots wearable heart-monitor program for high-risk patients.',
    lede: 'A 5,000-patient pilot connects consumer-grade wearables to the clinical record — and reports a meaningful drop in cardiac-event admissions inside three months.',
    author: 'Riya Chowdhury',
    date: 'Apr 27, 2026',
    readTime: '5 min read',
    img: patientIdentitiesImg,
    takeaways: [
      'Pilot uses off-the-shelf wearables wired into the Mayo clinical record — not a custom device.',
      'Cardiac-event admissions dropped 18% inside the first quarter of the programme.',
      'Patients opted in voluntarily — a self-selection bias the team explicitly calls out.',
      'Data flow is daily, not continuous — the team prioritised signal quality over real-time alerts.',
    ],
    body: [
      'Mayo Clinic is running a 5,000-patient pilot that does something most cardiology programmes still resist: it pipes data from consumer-grade wearables directly into the clinical record.',
      'The early read is positive. Cardiac-event admissions among the pilot cohort dropped 18% inside the first quarter, against a matched control group. The team is careful to note the cohort opted in voluntarily — there is a self-selection bias to control for in any follow-up.',
      'A notable choice: daily data flow, not continuous. The Mayo team prioritised signal quality and clinician workload over real-time alerting. Continuous data streams overwhelm review capacity; one daily packet, structured for clinical context, is reviewable.',
      'The pilot is a case study for any cardiology practice considering remote-monitoring — and a reminder that the consumer hardware is already good enough; what matters is the workflow you build on top.',
    ],
    ctaTitle: 'Wire patient data into the marketing layer.',
    ctaBody:
      'We connect clinical platforms to the analytics and CRM stack so growth decisions are made on the same data clinical leadership sees.',
    ctaTo: '/services/analytics-reporting',
    ctaLabel: 'See analytics',
  },
  {
    slug: 'mental-health-coverage-expansion',
    category: 'Insurance',
    title: 'Major carriers expand mental-health coverage following parity ruling.',
    lede: 'Three of the top five payers have already filed expanded mental-health benefit structures — the structural impact is bigger than the surface announcement.',
    author: 'Ben Holloway',
    date: 'Apr 26, 2026',
    readTime: '6 min read',
    img: healthcareimg5,
    takeaways: [
      'Three of the top five payers filed expanded benefits within 30 days of the parity ruling.',
      'Coverage now includes nutrition counselling, IOP, and PHP at parity with medical-surgical codes.',
      'Telehealth visits for mental health are at full parity — no carve-out, no separate cost share.',
      'Provider directories must be updated by August 2026 or carriers face penalty exposure.',
    ],
    body: [
      'The 2025 mental-health parity ruling required carriers to bring behavioural-health coverage into structural alignment with medical-surgical benefits. The first wave of plan filings is now landing, and they go further than expected.',
      'Three of the top five payers expanded benefits to include nutrition counselling, intensive outpatient (IOP), and partial hospitalisation (PHP) programmes at full parity. Several have eliminated the separate behavioural-health cost share entirely.',
      'For practices, the practical effect is patient eligibility surfaces that used to be blocked are now open. Mental-health programmes that historically struggled with reimbursement now have a coverage path.',
      'There is a deadline. Carrier provider directories must reflect the expanded coverage by August 2026 — practices that are not listed correctly by then will not appear in patient-side network searches.',
    ],
    ctaTitle: 'Get found in the new directory landscape.',
    ctaBody:
      'Citation hygiene, schema, and Local Pack ownership — the trio that decides whether you show up in the searches patients now run.',
    ctaTo: '/citation-building',
    ctaLabel: 'See citation programme',
  },
  {
    slug: 'rural-clinics-shared-ehr',
    category: 'Operations',
    title: 'Rural clinics partner on shared EHR system to reduce admin overhead.',
    lede: 'A consortium of 22 rural clinics across three states pools administrative back-office and reports a 31% reduction in operating overhead.',
    author: 'Daniel Reyes',
    date: 'Apr 26, 2026',
    readTime: '4 min read',
    img: builtForClinicImg,
    takeaways: [
      '22 clinics across Wyoming, Montana, and the Dakotas share one back-office stack.',
      'Operating overhead reduced 31% — admin staff redeployed to patient-facing roles.',
      'Clinical autonomy preserved — each clinic retains its own protocols and patient relationships.',
      'Model is being studied by Rural Health Information Hub as a template for federal funding.',
    ],
    body: [
      'A consortium of 22 rural clinics across Wyoming, Montana, and the Dakotas has pooled its administrative back-office onto a single EHR and billing platform. The 18-month financial impact is the most compelling rural-health operations story of the year.',
      'Operating overhead dropped 31% across the consortium. Admin staff were not laid off — they were redeployed into patient-facing care navigation roles, which is where independent rural practices have historically been thinnest.',
      'Clinical autonomy is preserved. Each clinic retains its own protocols, its own patient relationships, and its own brand. The shared layer is back-office only: scheduling rules, billing, credentialling, compliance reporting.',
      'The Rural Health Information Hub is studying the model as a template for federal grant funding. If it gets that designation, expect a wave of similar consortia in the next 18 months.',
    ],
    ctaTitle: 'Operations efficiency. Marketing efficiency.',
    ctaBody:
      'We connect back-office automation to the patient-facing growth stack so both ends of the funnel improve in lockstep.',
    ctaTo: '/automation',
    ctaLabel: 'See automation',
  },
  {
    slug: 'dental-online-bookings-growth',
    category: 'Marketing',
    title: 'Dental practices report 22% growth in online bookings year-over-year.',
    lede: 'Independent dental practices are outpacing DSOs (dental service organisations) on online-booking growth for the second year running.',
    author: 'Riya Chowdhury',
    date: 'Apr 25, 2026',
    readTime: '5 min read',
    img: dentalImg,
    takeaways: [
      'Independent practices grew online bookings 22% YoY; DSOs grew 9%.',
      'Same-day booking emerged as the deciding feature — 64% of new patients chose practices offering it.',
      'Insurance verification at booking is the second strongest conversion lever.',
      'Top-performing practices have a booking flow under 90 seconds end to end.',
    ],
    body: [
      'The dental-industry benchmark for online bookings is out. Independent practices are outpacing dental service organisations (DSOs) on growth for the second year running — 22% versus 9% — and the gap is widening.',
      'The deciding feature appears to be same-day booking availability. Sixty-four percent of new patients chose practices that offered it. Most DSO booking flows still default to a 3-7 day window because of how their scheduling engines are configured.',
      'Insurance verification at booking is the second strongest conversion lever. Practices that surface "Yes, we accept your insurance" before the patient commits convert at double the rate of those that confirm after.',
      'Top-performing practices have ruthlessly compressed their booking flows. The median time-to-book for the top decile is 89 seconds. The bottom decile is 4:42. The fix is rarely the booking tool — it is the form fields and confirmation steps surrounding it.',
    ],
    ctaTitle: 'Compressed booking, conversion-tracked.',
    ctaBody:
      'Booking-first websites engineered for sub-90-second flows — with insurance verification, schema, and full funnel measurement built in.',
    ctaTo: '/services/website-design-dev',
    ctaLabel: 'See website services',
  },
  {
    slug: 'ai-pharmacy-inventory',
    category: 'Pharmacy',
    title: 'National chains roll out AI-powered inventory forecasting to cut waste.',
    lede: 'Three national pharmacy chains report 18-24% reductions in expired-medication waste after a year on AI-driven forecasting platforms.',
    author: 'Ben Holloway',
    date: 'Apr 24, 2026',
    readTime: '4 min read',
    img: ouradvantageImg,
    takeaways: [
      'Three national chains report 18-24% reductions in expired-medication waste after year one.',
      'Forecasting models combine local prescription trends with weather and disease-surveillance data.',
      'Out-of-stock incidents dropped 26% — patients are getting prescriptions filled first try.',
      'Independent pharmacies are the next adoption wave; vendor pricing has come down to single-pharmacy fit.',
    ],
    body: [
      'The major pharmacy chains have been operating AI-driven inventory forecasting platforms long enough to publish year-one results, and the numbers are good. Three national chains report 18-24% reductions in expired-medication waste.',
      'The forecasting models are more interesting than the headlines suggest. They combine local prescription trend data with weather forecasts and CDC disease-surveillance feeds to anticipate demand spikes.',
      'A second-order benefit: out-of-stock incidents dropped 26% across the chains. Patients are filling prescriptions first-try, which has knock-on effects on adherence — which is the real outcome the FDA has been pushing for years.',
      'Independent pharmacies are watching closely. Vendor pricing has come down to single-pharmacy fit, and the platform that gets the integration story right with the major scripts platforms will define the next adoption wave.',
    ],
    ctaTitle: 'Forecast demand. Capture it locally.',
    ctaBody:
      'We connect operational forecasting to local-search demand capture, so the foot traffic matches the inventory on the shelf.',
    ctaTo: '/services/seo',
    ctaLabel: 'See the SEO programme',
  },
  {
    slug: 'texas-clinic-n8n-workflows',
    category: 'Case Study',
    title: 'How a Texas clinic recaptured 18 hours/week with three N8N workflows.',
    lede: 'A single-location family practice in Austin documents the three automations that gave it back two clinical days per week.',
    author: 'Daniel Reyes',
    date: 'Apr 26, 2026',
    readTime: '7 min read',
    img: emailImg,
    takeaways: [
      'Three workflows, all built in N8N — recall reminders, intake-form pre-fill, no-show recovery.',
      'Time saved: 18 hours/week across the front desk and clinical operations roles.',
      'Total build time: 11 working days; total maintenance time: under 90 minutes/month.',
      'The clinic owner shares the JSON templates — they are reusable as-is.',
    ],
    body: [
      'A single-location family practice in Austin has documented exactly how it recaptured 18 hours per week — two full clinical days — with three N8N automation workflows.',
      'Workflow one: recall reminders. Eighteen-month-and-older lapsed patients get a personalised, HIPAA-aware reminder via SMS. Reactivation rate: 34%.',
      'Workflow two: intake-form pre-fill. Before a confirmed appointment, the patient gets a link that pre-fills 80% of the intake from insurance card OCR. Average front-desk time per check-in dropped from 4:12 to 1:24.',
      'Workflow three: no-show recovery. Within 12 minutes of a no-show, the patient gets a rebook link and a personal text. Forty-one percent rebook same-day.',
      'The clinic owner has shared the JSON templates publicly. They are reusable as-is — the only customisation needed is the credential layer for your specific platforms.',
    ],
    quote: {
      text: 'I am a clinician, not an engineer. If I can build this in 11 days, the marketing-and-ops layer of medicine has been over-engineered for a decade.',
      attribution: 'Dr. Sarah Mendez, Mendez Family Practice, Austin',
    },
    ctaTitle: 'Want the templates installed for you?',
    ctaBody:
      'We install, customise, and run these automations as a managed service — including HIPAA, BAA, and EHR-connector setup.',
    ctaTo: '/automation/templates',
    ctaLabel: 'See automation templates',
  },
  {
    slug: 'hipaa-pitfalls-2026',
    category: 'Compliance',
    title: 'Five HIPAA pitfalls every healthcare marketer should know in 2026.',
    lede: 'A 2026 update to the unwritten rules — distilled from the past 12 months of OCR enforcement actions.',
    author: 'Aanya Patel',
    date: 'Apr 25, 2026',
    readTime: '9 min read',
    img: healthcareimg7,
    takeaways: [
      'Meta and Google pixel use on PHI-adjacent pages drove 60% of 2025 OCR actions.',
      'Server-side conversion tracking with hashed identifiers is now the standard expectation.',
      'Form-fill data is regulated even if the form is not on a clinical page.',
      'Email vendors without an active BAA are the third-leading cause of breach reports.',
      'OCR has signalled it will treat AI chatbot transcripts as PHI by default.',
    ],
    body: [
      'The Office of Civil Rights enforcement pattern of 2025 has redrawn what counts as a marketing pitfall. The five issues most likely to land a practice in front of OCR in 2026.',
      'One: Meta and Google pixels on PHI-adjacent pages. The "any data, on any page, that could identify a person seeking care" standard now applies to broad categories of pages, not just clinical destinations.',
      'Two: form-fill data. Even on a non-clinical landing page, a contact form that mentions a service line is regulated. The hashed, salted, server-side standard applies.',
      'Three: email vendors. If your email service provider does not have an active BAA with your practice, every send is a violation event waiting to be discovered.',
      'Four: AI chatbot transcripts. OCR has signalled — clearly enough for the trade press to pick up — that it will treat full chatbot conversation logs as PHI by default. The implication is significant for any practice running an AI agent.',
      'Five: review-response language. Replying to a public review with patient-specific detail (even a polite acknowledgement) is a disclosure event. Templated, generic replies are the safer path.',
    ],
    ctaTitle: 'Get the compliance audit.',
    ctaBody:
      'Two-week assessment of every marketing surface for HIPAA exposure. Delivered as a privileged document.',
    ctaTo: '/hipaa-compliance',
    ctaLabel: 'See HIPAA programme',
  },
  {
    slug: 'marketing-stack-standardization',
    category: 'Tech Stack',
    title: 'The marketing stack modern practices are quietly standardising on.',
    lede: 'After interviewing 47 marketing leads at independent practices, a clear pattern is forming around five categories of tools.',
    author: 'Ben Holloway',
    date: 'Apr 23, 2026',
    readTime: '8 min read',
    img: analyticsImg,
    takeaways: [
      'Practices are converging on five categories: tracking, content, ads, CRM, automation.',
      'GA4 + server-side Tag Manager is now near-universal at the tracking layer.',
      'CRM-side, HubSpot and Keap dominate — Salesforce mostly limited to networks above 10 locations.',
      'N8N is leading the automation category for independents; Zapier still dominant for under-5 location practices.',
    ],
    body: [
      'After interviewing 47 marketing leads at independent healthcare practices across the US, a clearer pattern is forming around the modern stack. Five categories, and convergence inside each one.',
      'Tracking: GA4 plus server-side Google Tag Manager is now near-universal. The HIPAA-aware variant — with hashed-identifier conversions and PHI scrubbing — is the de-facto standard.',
      'Content: WordPress remains dominant for content-led practices; headless setups (Sanity, Contentful) are gaining for design-led practices that want fast pages above everything else.',
      'Ads: Google Ads plus Meta Ads, run through server-side conversion pipes. LinkedIn is a meaningful third for B2H practices (private equity-backed groups, mental-health employer programmes).',
      'CRM: HubSpot and Keap dominate the independent space. Salesforce mostly limited to networks above 10 locations.',
      'Automation: N8N is leading the independent category, with Zapier still dominant under five locations. The 5-10 location bracket is where the decision usually flips.',
    ],
    ctaTitle: 'Get a stack assessment.',
    ctaBody:
      'Two-hour working session on what you run today, what is missing, and what to consolidate. Free of charge.',
    ctaTo: '/contact',
    ctaLabel: 'Book the session',
  },
  {
    slug: 'patient-reviews-search-weight',
    category: 'Reputation',
    title: 'Why patient reviews carry 3× more weight in the 2026 search ranking.',
    lede: 'A quiet adjustment to how the Local Pack scores reputation signals has multiplied the value of recent, high-quality reviews.',
    author: 'Riya Chowdhury',
    date: 'Apr 22, 2026',
    readTime: '6 min read',
    img: healthcareimg4,
    takeaways: [
      'Recency now weighs more heavily — reviews older than 18 months contribute less than half their previous value.',
      'Response rate is a ranking factor. Practices that respond to 80%+ of reviews outrank those that do not.',
      'Sentiment matters more than absolute star count. A 4.6 with strong recent positive language can outrank a 4.9 with stale reviews.',
      'Spam-detection has tightened — purchased reviews are now actively penalised across the entire profile.',
    ],
    body: [
      'A quiet adjustment to the Local Pack ranking algorithm has multiplied the value of recent, high-quality reviews. Practitioners watching their rankings have noticed shifts that the previous review weighting cannot explain.',
      'Recency is now the dominant weighting. Reviews older than 18 months contribute less than half their previous value. The implication for practices: a steady drumbeat of reviews matters more than a one-time review push.',
      'Response rate is a new ranking factor. Practices that respond to 80% or more of their reviews — including the positive ones — outrank those that do not. The mechanism is signal-quality: an engaged owner is a real-business indicator.',
      'Sentiment is now extracted at the language level, not just the star level. A 4.6 with strong recent positive language about specific clinicians and services can outrank a 4.9 with stale, generic reviews.',
      'Spam detection has tightened materially. Purchased reviews now penalise the entire profile — not just the individual review — when detected. The risk-reward on artificial review programmes has flipped.',
    ],
    ctaTitle: 'A reputation engine that runs itself.',
    ctaBody:
      'Detect → Sort → Respond → Report. The four-step loop that compounds reputation without your team chasing inboxes.',
    ctaTo: '/reviews-reputation',
    ctaLabel: 'See reputation programme',
  },
  {
    slug: 'ai-front-desks-rise',
    category: 'Operations',
    title: 'Inside the rise of AI-powered front desks — and what they replace.',
    lede: 'A look at what AI front desks are good at, what they fail at, and the staffing roles that emerge alongside them.',
    author: 'Daniel Reyes',
    date: 'Apr 21, 2026',
    readTime: '7 min read',
    img: recallImg,
    takeaways: [
      'AI agents handle scheduling, insurance verification, and FAQ — about 75% of inbound volume.',
      'The 25% they hand off are the highest-value calls: complaints, complex insurance, clinical questions.',
      'New role: "patient experience manager" — a senior, less tactical role focused on the 25%.',
      'Total headcount usually stays similar; composition changes meaningfully.',
    ],
    body: [
      'The AI-front-desk story is more nuanced than the headlines suggest. After tracking deployments at 18 independent practices, the pattern is clearer.',
      'AI agents handle scheduling, insurance verification, and FAQ — roughly 75% of inbound call volume. They handle these tasks faster, more accurately, and without the queue depth that frustrates patients.',
      'The 25% they hand off are not the easy calls. They are the highest-value, most complex interactions: complaints, complex insurance situations, clinical follow-up questions. These require judgement, empathy, and clinical context.',
      'A new role has emerged: "patient experience manager." This is a senior, less tactical role, focused entirely on the 25% the AI hands off. Practices that have created the role report better patient retention and stronger online reviews.',
      'The headcount story is rarely a reduction. Total front-desk headcount usually stays similar; the composition changes. Practices are trading two junior schedulers for one senior patient-experience manager.',
    ],
    ctaTitle: 'Built for the modern front desk.',
    ctaBody:
      'Patient-experience workflows that connect your AI front desk, your website, and your CRM into one HIPAA-aware system.',
    ctaTo: '/patient-experience',
    ctaLabel: 'See patient experience',
  },
  {
    slug: 'compliant-email-drips',
    category: 'Email',
    title: 'Compliant email drips that actually convert patients (with examples).',
    lede: 'The three drip patterns that consistently outperform — without crossing any HIPAA line.',
    author: 'Aanya Patel',
    date: 'Apr 20, 2026',
    readTime: '6 min read',
    img: emailImg,
    takeaways: [
      'Educational drips outperform promotional drips by 4-7× on booking conversion.',
      'Three-email sequences outperform longer sequences for most service lines.',
      'Subject-line A/B testing is the highest-leverage optimisation — typically 40%+ open-rate variance.',
      'Permission-tier segmentation (consent level) is non-negotiable for HIPAA-aware operations.',
    ],
    body: [
      'Email drips remain one of the highest-leverage marketing surfaces for healthcare practices — but the HIPAA constraints have steered the discipline toward a different shape than other industries.',
      'Educational drips consistently outperform promotional drips by 4-7× on booking conversion. The pattern: lead with the answer the patient needs (treatment overview, recovery timeline, insurance reality), close with the booking link.',
      'Three-email sequences outperform longer sequences for most service lines. The optimal cadence: educational, social-proof, booking-ready. Anything longer crosses the line from helpful to noisy.',
      'Subject-line A/B testing remains the highest-leverage optimisation. Open-rate variance of 40%+ between subject lines is normal. The patterns that win: specific, calm, low-promotion. ',
      'Permission-tier segmentation is non-negotiable. Patients consent to different categories of communication, and the email layer must respect those tiers. The technical implementation is straightforward; the operational discipline is where practices fail.',
    ],
    ctaTitle: 'Drip patterns we install and run.',
    ctaBody:
      'HIPAA-aware email programmes, segmented by consent tier, A/B-tested continuously. Built on your existing email platform.',
    ctaTo: '/services/email-drip-campaigns',
    ctaLabel: 'See email services',
  },
  {
    slug: 'medspa-roas-2026',
    category: 'Paid Ads',
    title: 'What healthy ROAS actually looks like for med-spas in 2026.',
    lede: 'A benchmark report from 130 med-spa engagements — broken down by service line, market type, and channel.',
    author: 'Ben Holloway',
    date: 'Apr 18, 2026',
    readTime: '8 min read',
    img: medSpaImg,
    takeaways: [
      'Median paid-search ROAS for med-spas is 4.2× — Meta is meaningfully lower at 2.6×.',
      'Bodysculpting and laser services lead — both consistently above 5× across all surveyed markets.',
      'Tier-2 metros outperform tier-1 on paid efficiency — less competition, similar willingness to pay.',
      'LinkedIn is meaningful for premium concierge med-spas only.',
    ],
    body: [
      'After working with 130 med-spas on paid acquisition, the benchmark picture is clearer than the trade press suggests.',
      'Median paid-search ROAS for med-spas is 4.2×. Meta is meaningfully lower at 2.6× — but with significantly higher reach, so it earns its place in the mix for awareness rather than direct response.',
      'Service-line variance is significant. Bodysculpting and laser-hair-removal lead — both consistently above 5× across all surveyed markets. Injectables sit at 3.8×. Skincare-only programmes (facials, peels) struggle to clear 2×.',
      'Tier-2 metros consistently outperform tier-1 on paid efficiency. The competitive density is lower, but the willingness-to-pay is similar — particularly for the bodysculpting service lines.',
      'LinkedIn becomes meaningful only for premium concierge med-spas targeting the high-net-worth professional cohort. For everyone else, it is a cost without measurable return.',
    ],
    ctaTitle: 'Paid that pays back in week one.',
    ctaBody:
      'Google and Meta tuned for booked visits, not impressions. Server-side conversion tracking. HIPAA-aware audience strategy.',
    ctaTo: '/services/google-ads',
    ctaLabel: 'See paid services',
  },
  {
    slug: 'ehr-sms-no-show-reduction',
    category: 'Automation',
    title: 'How EHR-connected SMS reminders are cutting no-shows by 40%.',
    lede: 'A simple, well-built EHR-to-SMS integration is producing the biggest single revenue improvement available to most practices today.',
    author: 'Riya Chowdhury',
    date: 'Apr 15, 2026',
    readTime: '5 min read',
    img: healthcareimg1,
    takeaways: [
      'Median no-show rate dropped from 19% to 11% across surveyed deployments — a 40%+ improvement.',
      'Two SMS reminders outperform one — 48 hours and 2 hours before the appointment.',
      'EHR-connected variants outperform standalone SMS tools because the message references specifics.',
      'Reactivation flows on the same SMS layer recapture 28% of lapsed patients on average.',
    ],
    body: [
      'A simple, well-built EHR-to-SMS integration is producing the biggest single revenue improvement available to most practices. Median no-show rates dropped from 19% to 11% across surveyed deployments — a 40%+ improvement.',
      'The cadence that wins: two SMS reminders, 48 hours before and 2 hours before the appointment. One reminder is meaningfully worse. Three reminders crosses into noisy territory.',
      'EHR-connected variants outperform standalone SMS tools because the message can reference specifics — provider name, prep instructions, parking. Personalised messages convert at 1.4× the rate of generic ones.',
      'A second-order benefit: the same SMS layer that handles reminders handles reactivation. Lapsed-patient reactivation flows on the same platform recapture 28% of lapsed patients on average.',
    ],
    ctaTitle: 'No-shows down. Reactivation up.',
    ctaBody:
      'EHR-connected SMS layer, BAA-covered, configured around your specific scheduling rules. Live in two weeks.',
    ctaTo: '/medical-automation',
    ctaLabel: 'See medical automation',
  },
];

export const newsBySlug = (slug: string): NewsArticle | undefined =>
  NEWS_ARTICLES.find((a) => a.slug === slug);

export const relatedArticles = (slug: string, n = 3): NewsArticle[] => {
  const current = newsBySlug(slug);
  if (!current) return NEWS_ARTICLES.slice(0, n);
  return NEWS_ARTICLES.filter((a) => a.slug !== slug)
    .sort(
      (a, b) =>
        (a.category === current.category ? -1 : 1) - (b.category === current.category ? -1 : 1)
    )
    .slice(0, n);
};

export const CATEGORY_TONES: Record<NewsCategory, { hex: string; soft: string }> = {
  Research: { hex: '#5A8F5A', soft: 'rgba(143, 188, 143, 0.16)' },
  Regulation: { hex: '#2D3748', soft: 'rgba(45, 55, 72, 0.10)' },
  Telehealth: { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.12)' },
  'AI & Operations': { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.12)' },
  Policy: { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.14)' },
  Insurance: { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.14)' },
  Operations: { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.12)' },
  Marketing: { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.14)' },
  Pharmacy: { hex: '#5A8F5A', soft: 'rgba(143, 188, 143, 0.16)' },
  'Case Study': { hex: '#2D3748', soft: 'rgba(45, 55, 72, 0.10)' },
  Compliance: { hex: '#2D3748', soft: 'rgba(45, 55, 72, 0.10)' },
  'Tech Stack': { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.12)' },
  Reputation: { hex: '#5A8F5A', soft: 'rgba(143, 188, 143, 0.16)' },
  Email: { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.14)' },
  'Paid Ads': { hex: '#B38B6D', soft: 'rgba(179, 139, 109, 0.14)' },
  Automation: { hex: '#576DB5', soft: 'rgba(87, 109, 181, 0.12)' },
};

/* Catalogue of all stories with the asset bag so the listing pages can
   migrate from their inline data to the canonical store. */
export const ASSETS = {
  healthcareimg1,
  healthcareimg2,
  healthcareimg3,
  healthcareimg4,
  healthcareimg5,
  healthcareimg6,
  healthcareimg7,
  analyticsImg,
  recallImg,
  patientIdentitiesImg,
  futuristicImg,
  ouradvantageImg,
  bookingWebsiteImg,
  builtForClinicImg,
  medSpaImg,
  dentalImg,
  emailImg,
};

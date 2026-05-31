export interface CasePhase {
  label: 'Challenge' | 'Strategy' | 'Execution';
  headline: string;
  narrative: string;
  tactics: string[];
}

export interface CaseKpi {
  value: string;
  label: string;
  change: string;
}

export interface CaseSecondary {
  value: string;
  label: string;
}

export interface CaseQuote {
  text: string;
  author: string;
  role: string;
}

export interface CaseBlock {
  label: string;
  text: string;
}

export interface CaseStudy {
  id: string;
  emoji: string;
  sector: string;
  name: string;
  metricNum: string;
  metricLbl: string;
  blocks: CaseBlock[];

  location: string;
  specialty: string;
  teamSize: string;
  engagement: string;
  started: string;
  brief: string;

  secondary: CaseSecondary[];
  phases: [CasePhase, CasePhase, CasePhase];
  tools: string[];
  kpis: CaseKpi[];
  quote: CaseQuote;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'er-network-patient-growth',
    emoji: '🏥',
    sector: 'Emergency Room',
    name: 'Freestanding ER in Dallas Metro',
    metricNum: '+45%',
    metricLbl: 'Patient Visits',
    blocks: [
      {
        label: 'Challenge',
        text: 'Limited local visibility competing against large hospital systems.',
      },
      {
        label: 'Solution',
        text: 'Local SEO dominance + Google Ads targeting high-acuity keywords.',
      },
      {
        label: 'Results',
        text: '45% increase in patient visits within 6 months, $800K+ additional annual revenue.',
      },
    ],
    location: 'Dallas Metro, TX',
    specialty: '24/7 Emergency Care',
    teamSize: '38 staff · 3 locations',
    engagement: '6-month sprint',
    started: 'Q1 2024',
    brief:
      'A three-location freestanding ER network competing against four hospital-owned ERs within a five-mile radius. Patient volume was steady, but acquisition cost per visit was creeping every quarter while branded search was being intercepted by larger systems running aggressive bid strategies.',
    secondary: [
      { value: '$800K', label: 'Net new annual revenue' },
      { value: '6.2×', label: 'Return on ad spend' },
      { value: '−38%', label: 'Cost per qualified visit' },
    ],
    phases: [
      {
        label: 'Challenge',
        headline: 'Outspent, out-ranked, out-staffed for marketing.',
        narrative:
          'The network had no in-house marketer and was relying on a generalist agency that treated their ER like a dentistry account. Branded keywords were being arbitraged by the two largest hospital systems in the market, intent terms were sending visitors to a slow site, and the GBP profiles for each location had duplicate addresses, mismatched hours, and missing service categories.',
        tactics: [
          'No tracking on which keyword was driving an actual ER visit',
          'GBP listings were unverified for two of three locations',
          'Average page-load time of 6.4s on the location pages',
          'Branded CPC up 3.1× year-over-year from competitor bidding',
        ],
      },
      {
        label: 'Strategy',
        headline: 'Own the high-acuity moments and force the bid math to flip.',
        narrative:
          'We narrowed targeting to a tight set of high-acuity, high-urgency search terms - chest pain, broken bone, severe abdominal - and rebuilt three location landing pages around the patient decision moment. The goal was not more clicks; it was a tighter funnel: the right search at the right radius, with a page that loaded fast and answered the only three questions a panicked patient is asking.',
        tactics: [
          'Tightened keyword set from 480 to 64 high-intent terms',
          'Rebuilt three location pages with sub-1.5s mobile load',
          'Radius bid modifiers tuned to 1.5 / 3 / 5-mile ROAS bands',
          'GBP service catalog and Q&A rewritten per location',
        ],
      },
      {
        label: 'Execution',
        headline: 'Six-month sprint, one playbook, three live locations.',
        narrative:
          'Weeks one through four were entirely infrastructure: tracking, GBP, site speed, schema. Paid spend held flat through that period to protect the baseline. From week five we layered Google Ads back on with the new bid map, and from week eight forward we shipped a weekly local-content cadence aimed at the second-line questions patients asked our intake nurses.',
        tactics: [
          'Weeks 1–4: tracking, schema, GBP, page speed',
          'Weeks 5–8: paid relaunch with radius-tuned bids',
          'Weeks 9–24: weekly local-content drops + review pulls',
          'Monthly review of intake-nurse FAQ data to seed new pages',
        ],
      },
    ],
    tools: ['Google Ads', 'Search Console', 'GA4', 'GBP API', 'CallRail', 'Schema.org', 'Ahrefs'],
    kpis: [
      { value: '+45%', label: 'Patient visits', change: 'from 1,840 → 2,668 / mo' },
      { value: '+$800K', label: 'Annual revenue', change: 'incremental, attributed' },
      { value: '−38%', label: 'Cost per visit', change: '$84 → $52 paid CAC' },
      { value: '6.2×', label: 'Return on ad spend', change: 'up from 1.9× baseline' },
    ],
    quote: {
      text: 'For the first time we could point to a specific keyword, a specific page, and a specific patient walking in the door. The marketing finally felt like part of the operation, not a line item we argued about every month.',
      author: 'Director of Operations',
      role: 'Dallas Metro ER network',
    },
  },
  {
    id: 'urgent-care-patient-acquisition',
    emoji: '⚡',
    sector: 'Urgent Care',
    name: 'Multi-location urgent care in Houston',
    metricNum: '3×',
    metricLbl: 'Acquisitions',
    blocks: [
      { label: 'Challenge', text: 'Brand not recognized, losing patients to competitors.' },
      { label: 'Solution', text: 'Comprehensive market strategy + location-specific campaigns.' },
      {
        label: 'Results',
        text: '3× increase in appointments, 60% reduction in cost-per-acquisition.',
      },
    ],
    location: 'Greater Houston, TX',
    specialty: 'Walk-in Urgent Care',
    teamSize: '64 staff · 7 locations',
    engagement: '9-month rollout',
    started: 'Q2 2023',
    brief:
      'A seven-location urgent-care group that grew through acquisition. Each clinic carried a different name, a different website, and a different referral pattern. Patient acquisition was high because every clinic was competing as if it were a one-off. Leadership wanted a unified brand without losing the local equity each clinic had built in its neighborhood.',
    secondary: [
      { value: '7', label: 'Locations unified' },
      { value: '−60%', label: 'Cost per acquisition' },
      { value: '4.8★', label: 'Network-wide rating' },
    ],
    phases: [
      {
        label: 'Challenge',
        headline: 'Seven brands, one bank account, zero leverage.',
        narrative:
          'Each clinic had its own logo, its own site, its own ad account, and its own front-desk script. Patients showing up at one location did not realize the others existed. Marketing dollars were being spent seven times to solve the same problem, and there was no shared review velocity, no shared SEO equity, and no shared paid-search budget pool to flex against demand.',
        tactics: [
          'Seven Google Ads accounts running in parallel',
          'Conflicting service catalogs across each clinic site',
          'Sub-3.9★ ratings at three of the seven locations',
          'No cross-clinic referral path for after-hours overflow',
        ],
      },
      {
        label: 'Strategy',
        headline: 'One parent brand, seven neighborhood faces.',
        narrative:
          'We architected a master-brand structure: one network identity carrying credibility, with location pages that retained neighborhood photography, local provider bios, and clinic-specific reviews. Paid budget moved into a single pooled account with location-level bid modifiers, so dollars flowed toward whichever clinic had the most demand-conversion gap that week.',
        tactics: [
          'Master brand + 7 location sub-identities',
          'Single pooled Google Ads account with geo-tiered bids',
          'Per-clinic review request cadence wired to the EHR',
          'Cross-clinic overflow routing for full booking windows',
        ],
      },
      {
        label: 'Execution',
        headline: 'Rebrand without breaking what already worked.',
        narrative:
          'We rolled out one clinic at a time over nine months - the lowest-performing first, the highest-performing last - to protect revenue while the playbook stabilized. Each clinic went through the same forty-day cutover: brand assets, site, GBP, ads, review system, then a two-week monitoring window before moving to the next.',
        tactics: [
          'Forty-day cutover protocol, one clinic at a time',
          'Lowest-performing locations migrated first',
          'Two-week post-launch monitoring before next rollout',
          'Quarterly brand review with operations leadership',
        ],
      },
    ],
    tools: ['Figma', 'GBP API', 'Google Ads', 'Meta Ads', 'Birdeye', 'GA4', 'Segment'],
    kpis: [
      { value: '3×', label: 'Appointment volume', change: 'pooled across 7 clinics' },
      { value: '−60%', label: 'Cost per acquisition', change: '$94 → $38 blended' },
      { value: '+82%', label: 'Returning patient rate', change: 'within 90 days' },
      { value: '4.8★', label: 'Network rating', change: 'up from 3.7★ avg' },
    ],
    quote: {
      text: 'We were running seven small marketing teams pretending to be one company. Now we are one company that happens to know every street corner it sits on. The math finally works.',
      author: 'Chief Growth Officer',
      role: 'Houston urgent care group',
    },
  },
  {
    id: 'cosmetic-surgery-lead-growth',
    emoji: '✨',
    sector: 'Cosmetic Surgery',
    name: 'Aesthetic clinic in Austin',
    metricNum: '+120%',
    metricLbl: 'Lead Growth',
    blocks: [
      { label: 'Challenge', text: 'Competing on price, needed premium positioning.' },
      {
        label: 'Solution',
        text: 'Brand identity + targeted social media for high-ticket procedures.',
      },
      {
        label: 'Results',
        text: '120% increase in qualified leads, 25% higher average transaction value.',
      },
    ],
    location: 'Austin, TX',
    specialty: 'Aesthetic & Plastic Surgery',
    teamSize: '14 staff · 1 flagship',
    engagement: '8-month rebrand',
    started: 'Q3 2023',
    brief:
      'A single-location aesthetic clinic with a credentialed surgeon and a top-quartile patient outcome record - but a brand that read like a Groupon storefront. They were getting volume, but the average ticket was suppressed and the consult-to-procedure rate was stuck below industry baseline. We treated this as a positioning problem, not a traffic problem.',
    secondary: [
      { value: '+25%', label: 'Average ticket value' },
      { value: '+120%', label: 'Qualified leads' },
      { value: '47%', label: 'Consult-to-procedure rate' },
    ],
    phases: [
      {
        label: 'Challenge',
        headline: 'A premium operator wearing a discount uniform.',
        narrative:
          'The surgeon was board-certified, fellowship-trained, and operating on patients who could comfortably pay full-price elsewhere. But every patient touchpoint - site, social, intake forms, financing UI - signaled budget. Leads were plentiful and price-sensitive, and the consult team was burning time on patients who would never convert above the entry-tier procedure.',
        tactics: [
          'Avg lead-to-consult: $42; consult-to-procedure: 29%',
          'Site lead form asked for budget in the second field',
          'Social grid mixed before/after with promotional discounts',
          'Financing UI placed above credentialing in nav',
        ],
      },
      {
        label: 'Strategy',
        headline: 'Reposition for the patient who is already shopping at the top.',
        narrative:
          'We rebuilt the brand around outcomes, not price. New photography, new identity system, new consult flow that started with the surgeon, not the package. The site led with the surgical philosophy, the recovery experience, and the credentialing - financing was pushed to a single section, present but no longer the headline.',
        tactics: [
          'Identity system rebuilt around outcomes-first language',
          'New lead form qualifies for procedure, not budget',
          'Surgeon-led consult video on every procedure page',
          'Paid social pivoted to outcome storytelling, no offers',
        ],
      },
      {
        label: 'Execution',
        headline: 'Brand first, paid second, retention third.',
        narrative:
          'We held paid spend flat for the first ninety days while the brand and site shipped. From month four we re-entered paid social with the new creative library and a tighter geographic + interest filter targeting higher-income zip codes. From month six we added a post-procedure retention program to compound the lifetime value of every consult we paid for.',
        tactics: [
          'Months 1–3: brand, site, photography, consult flow',
          'Months 4–5: paid social relaunch on outcome creative',
          'Months 6–8: post-procedure retention + referral engine',
          'Quarterly creative refresh tied to procedure mix',
        ],
      },
    ],
    tools: ['Figma', 'Webflow', 'Meta Ads', 'Klaviyo', 'Calendly', 'HubSpot', 'Vimeo'],
    kpis: [
      { value: '+120%', label: 'Qualified leads', change: 'with paid spend flat' },
      { value: '+25%', label: 'Avg transaction', change: '$4,800 → $6,000' },
      { value: '47%', label: 'Consult-to-procedure', change: 'up from 29%' },
      { value: '+38%', label: 'Lifetime value', change: 'on 12-month cohort' },
    ],
    quote: {
      text: 'I stopped meeting patients in the consult room who had already decided I was a price tag. The brand did the qualifying before the chair did. That changed every part of the day.',
      author: 'Founding Surgeon',
      role: 'Austin aesthetic clinic',
    },
  },
  {
    id: 'primary-care-seo-roi',
    emoji: '👨‍⚕️',
    sector: 'Primary Care',
    name: 'Family medicine practice in San Antonio',
    metricNum: '500%',
    metricLbl: 'SEO ROI',
    blocks: [
      { label: 'Challenge', text: 'Invisible in search results for "doctor near me".' },
      {
        label: 'Solution',
        text: 'Local SEO fundamentals + content marketing for patient education.',
      },
      {
        label: 'Results',
        text: '500%+ ROI, $300K+ annual additional revenue from organic traffic.',
      },
    ],
    location: 'San Antonio, TX',
    specialty: 'Family Medicine',
    teamSize: '11 staff · 2 providers',
    engagement: '12-month build',
    started: 'Q4 2022',
    brief:
      'A two-physician family medicine practice that had quietly served three neighborhoods for fourteen years. Patient roster was steady but aging, and new-patient inquiries had drifted toward zero. The practice did not want to advertise - they wanted to be discoverable when someone in the neighborhood actually started looking.',
    secondary: [
      { value: '$300K', label: 'Net new annual revenue' },
      { value: '+412%', label: 'Organic traffic' },
      { value: '142', label: 'Ranking keywords' },
    ],
    phases: [
      {
        label: 'Challenge',
        headline: 'Fourteen years of trust, none of it discoverable.',
        narrative:
          'The practice ranked nowhere for any local intent term. Their site was a one-page brochure from 2014 with the providers’ bios and a phone number. Google Business Profile was claimed but had not been touched in three years, and the few reviews that existed were unanswered. Word-of-mouth referrals were still strong but slowing as their longest-tenured patients aged out.',
        tactics: [
          'Page 3+ rankings for every neighborhood intent term',
          'GBP profile stale, 22 unanswered reviews',
          'No location pages, no service pages, no insurance pages',
          'Site DA of 4, no backlinks beyond the directory listings',
        ],
      },
      {
        label: 'Strategy',
        headline: 'Build a content engine that mirrors how patients actually search.',
        narrative:
          'We treated the site like a long-term asset, not a campaign. Eight months of patient-question-driven content, mapped to the conditions the practice actually treats, anchored to two clean location pages and an insurance-accepted page. Every article was reviewed by one of the physicians for clinical accuracy, which became its own ranking advantage.',
        tactics: [
          'Patient-question keyword research from intake forms',
          'Physician-reviewed editorial process for every article',
          'Two location pages built for neighborhood intent',
          'Quarterly link outreach to local civic and health orgs',
        ],
      },
      {
        label: 'Execution',
        headline: 'Slow, compounding, almost boring - and then a step change.',
        narrative:
          'Months one through four were entirely fundamentals: schema, GBP, location pages, reviews. The content engine started in month five at four articles per month and stayed there for the rest of the year. Traffic was flat through month seven, then doubled in month eight, then doubled again in month ten - the classic SEO compounding curve.',
        tactics: [
          'Months 1–4: technical fixes + GBP + location pages',
          'Months 5–12: four physician-reviewed articles per month',
          'Monthly review-response cadence built into the front desk',
          'Quarterly content audit to refresh ranking pages',
        ],
      },
    ],
    tools: ['Ahrefs', 'Search Console', 'Surfer', 'GBP API', 'Schema.org', 'WordPress', 'Birdeye'],
    kpis: [
      { value: '500%+', label: 'Return on investment', change: 'over 12 months' },
      { value: '+$300K', label: 'Annual revenue', change: 'from organic only' },
      { value: '+412%', label: 'Organic sessions', change: 'on 12-mo cohort' },
      { value: '142', label: 'Ranking keywords', change: 'page 1, up from 4' },
    ],
    quote: {
      text: 'We did not want a slick campaign. We wanted to be the practice someone’s neighbor recommends, and then the one Google confirms. That is exactly what the year produced.',
      author: 'Senior Partner',
      role: 'San Antonio family medicine',
    },
  },
  {
    id: 'mental-health-patient-retention',
    emoji: '🧠',
    sector: 'Mental Health',
    name: 'Therapy practice in Dallas',
    metricNum: '2×',
    metricLbl: 'Retention',
    blocks: [
      { label: 'Challenge', text: 'High patient acquisition costs, poor retention.' },
      { label: 'Solution', text: 'Email automation + patient education content strategy.' },
      {
        label: 'Results',
        text: '2× patient retention rate, 40% reduction in marketing spend needed.',
      },
    ],
    location: 'Dallas, TX',
    specialty: 'Outpatient Mental Health',
    teamSize: '22 clinicians · 1 clinic',
    engagement: '7-month rebuild',
    started: 'Q1 2024',
    brief:
      'A growing outpatient therapy practice with strong inbound demand but a retention problem: patients booked an intake, came for a first session, and disappeared within three weeks. Acquisition cost was rising every quarter to compensate. The leak was not in marketing - it was in the gap between scheduling and care.',
    secondary: [
      { value: '2×', label: 'Patient retention' },
      { value: '−40%', label: 'Marketing spend' },
      { value: '92%', label: 'Email open rate' },
    ],
    phases: [
      {
        label: 'Challenge',
        headline: 'A funnel that worked, then forgot the patient existed.',
        narrative:
          'Marketing was bringing in qualified leads at a healthy cost. The clinic was booking intakes within forty-eight hours. But there was a fourteen-day average gap between the booking call and the first session, and during that gap the patient heard nothing. Roughly forty percent of bookings either no-showed the first session or did not return for a second.',
        tactics: [
          '14-day average gap from booking to first session',
          '~40% no-show or one-and-done rate on new patients',
          'No automated communication between intake and visit',
          'Clinician notes were not surfaced back into patient comms',
        ],
      },
      {
        label: 'Strategy',
        headline: 'Treat the gap as part of the care, not part of the wait.',
        narrative:
          'We designed a fourteen-day onboarding sequence that started the moment the booking was confirmed: what to expect, who the clinician is, what the room looks like, how to think about the first session, how to handle the moment before walking in. After the first session, the sequence pivoted into between-session reinforcement, written with the clinical lead.',
        tactics: [
          'Fourteen-day pre-first-session education sequence',
          'Clinician-voiced introduction video per provider',
          'Between-session reinforcement library by presenting concern',
          'Front-desk soft-touch calls at day three and day ten',
        ],
      },
      {
        label: 'Execution',
        headline: 'Build it small, ship it weekly, watch the no-show rate.',
        narrative:
          'We shipped the sequence in week three, then iterated weekly based on the no-show data and clinician feedback. The first six weeks were almost entirely about tone - patients in this category need very different language than a dental reminder. By month four the no-show rate was halved; by month seven the marketing budget could come down because each patient was now worth meaningfully more.',
        tactics: [
          'Weekly iteration on subject lines and open windows',
          'Clinician review of every message before send',
          'Pause-and-replay logic so reschedules do not restart the flow',
          'Monthly retention dashboard reviewed with clinical lead',
        ],
      },
    ],
    tools: ['Customer.io', 'SimplePractice', 'Twilio', 'Loom', 'Notion', 'Mixpanel'],
    kpis: [
      { value: '2×', label: 'Retention rate', change: '4 → 8 sessions avg' },
      { value: '−40%', label: 'Marketing spend', change: 'with volume held flat' },
      { value: '−52%', label: 'First-session no-show', change: '38% → 18%' },
      { value: '92%', label: 'Sequence open rate', change: 'across 14-day flow' },
    ],
    quote: {
      text: 'The most powerful thing we did was not send an offer or a discount. We just told patients, in the right voice, that we knew this was hard and we were ready for them. Retention followed.',
      author: 'Clinical Director',
      role: 'Dallas therapy practice',
    },
  },
  {
    id: 'dental-practice-local-pack',
    emoji: '🦷',
    sector: 'Dental Practice',
    name: 'General dentistry in Irving',
    metricNum: '#1',
    metricLbl: 'Local Pack',
    blocks: [
      { label: 'Challenge', text: 'Not appearing in local search top 3.' },
      { label: 'Solution', text: 'Google Business Profile optimization + local citations.' },
      { label: 'Results', text: '#1 ranking in local pack, 70% increase in appointment bookings.' },
    ],
    location: 'Irving, TX',
    specialty: 'General & Cosmetic Dentistry',
    teamSize: '9 staff · 1 practice',
    engagement: '5-month focused push',
    started: 'Q2 2024',
    brief:
      'A single-location general dentistry practice in a dense, competitive market. Patient experience was excellent - 4.9-star reviews from existing patients - but new-patient inquiries had plateaued. The practice was buried below three competitors in the local pack despite ranking organically. The path forward was not more content; it was local-pack mechanics, done with discipline.',
    secondary: [
      { value: '+70%', label: 'Appointment bookings' },
      { value: '4.9★', label: 'Average rating' },
      { value: '218', label: 'Local citations cleaned' },
    ],
    phases: [
      {
        label: 'Challenge',
        headline: 'Loved by patients, invisible in the map.',
        narrative:
          'The practice was ranking 4th–7th in the local pack for every meaningful keyword. The map was being won by two corporate dental groups with high citation counts and one independent with twice the review velocity. The practice had 60+ reviews averaging 4.9★ but no review-acquisition cadence, and roughly thirty percent of their NAP citations were stale or inconsistent.',
        tactics: [
          'Position 4–7 in local pack on all priority terms',
          'Stagnant review acquisition: ~1 review per month',
          '60+ stale or inconsistent NAP citations across directories',
          'No service-category granularity inside GBP',
        ],
      },
      {
        label: 'Strategy',
        headline: 'Win the local pack the boring, methodical way.',
        narrative:
          'There was no clever tactic here - local pack is mechanics. We rebuilt the GBP service catalog, cleaned and standardized every citation, and installed a review-request cadence wired into the patient management system that fired exactly forty-five minutes after the appointment was marked complete. That last detail was the unlock.',
        tactics: [
          'Full GBP rebuild: services, attributes, Q&A, posts',
          'Citation cleanup across 218 directories, NAP standardized',
          'Review request 45 min post-appointment, two-tap UX',
          'Weekly review response by the practice manager',
        ],
      },
      {
        label: 'Execution',
        headline: 'Five months, one tactic at a time, no detours.',
        narrative:
          'We resisted the urge to layer paid or content on top. The practice already had organic traffic - they did not need more, they needed the map. Month one was GBP, months two and three were citations, months four and five were review velocity and response. By month five the practice was sitting at #1 for their three priority keywords and the new-patient phone was ringing on a different rhythm.',
        tactics: [
          'Month 1: GBP rebuild + photo refresh + Q&A seeding',
          'Months 2–3: citation cleanup across 218 directories',
          'Months 4–5: review velocity + response cadence',
          'Quarterly audit to defend the position once held',
        ],
      },
    ],
    tools: ['GBP API', 'Whitespark', 'BrightLocal', 'Birdeye', 'Local Falcon', 'Schema.org'],
    kpis: [
      { value: '#1', label: 'Local pack position', change: 'on 3 priority terms' },
      { value: '+70%', label: 'New patient bookings', change: 'over 5 months' },
      { value: '8.4×', label: 'Review acquisition', change: '1 → 8.4 per month' },
      { value: '−54%', label: 'Cost per new patient', change: 'organic-driven' },
    ],
    quote: {
      text: 'The reviews and the patients were always there. We just made sure Google could count them. Five months of doing the unsexy work, and the map finally agreed with what our patients already knew.',
      author: 'Practice Owner',
      role: 'Irving general dentistry',
    },
  },
];

export const findCaseStudy = (id: string | undefined) => CASE_STUDIES.find((c) => c.id === id);

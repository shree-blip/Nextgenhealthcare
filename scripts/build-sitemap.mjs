#!/usr/bin/env node
/**
 * Build-time sitemap generator.
 *
 * Reads project route data and writes `public/sitemap.xml`. Wired to
 * `npm run prebuild` so it runs automatically before `vite build`.
 *
 * STATIC ROUTES are a hand-maintained mirror of `src/lib/routes.ts`.
 * When a route is added/removed there, update STATIC_ROUTES below too.
 *
 * DYNAMIC slugs are extracted from data files via simple line-based regex
 * over the file text — robust enough that re-ordering fields inside an
 * entry doesn't break extraction. If a data file's slug field name changes
 * (e.g. `slug:` → `key:`), that section silently produces zero URLs; check
 * the console summary after build to spot regressions.
 *
 * The script is read-only on `src/` and write-only to `public/sitemap.xml`.
 * It is intentionally self-contained: no npm deps, no TS imports, no need
 * for ts-node / tsx / vite-node.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SITE_URL = 'https://thenextgenhealth.com';
const TODAY = new Date().toISOString().slice(0, 10);

// ─── Static routes (mirror of src/lib/routes.ts) ───────────────────
// changefreq + priority are SEO heuristics; tune as the site evolves.
const STATIC_ROUTES = [
  // Home
  { path: '/', priority: '1.0', changefreq: 'weekly' },

  // Top conversion pages
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/industries', priority: '0.9', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.9', changefreq: 'monthly' },
  { path: '/free-growth-audit', priority: '0.9', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/team', priority: '0.6', changefreq: 'monthly' },

  // Service spokes
  { path: '/services/seo', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/google-business-profile', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/google-ads', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/analytics-reporting', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/email-drip-campaigns', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/brand-identity-design', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/website-design-dev', priority: '0.9', changefreq: 'monthly' },
  { path: '/services/social-media-marketing', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/content-copywriting', priority: '0.8', changefreq: 'monthly' },

  // Industry sub-pages
  { path: '/industries/clinics', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries/medspas', priority: '0.8', changefreq: 'monthly' },
  { path: '/industries/specialty-emergency', priority: '0.8', changefreq: 'monthly' },

  // Specialty / feature service pages
  { path: '/meta-ads', priority: '0.8', changefreq: 'monthly' },
  { path: '/reviews-reputation', priority: '0.8', changefreq: 'monthly' },
  { path: '/medical-automation', priority: '0.8', changefreq: 'monthly' },
  { path: '/patient-experience', priority: '0.7', changefreq: 'monthly' },
  { path: '/citation-building', priority: '0.7', changefreq: 'monthly' },
  { path: '/hyper-local-content', priority: '0.7', changefreq: 'monthly' },
  { path: '/aeo-schema', priority: '0.7', changefreq: 'monthly' },
  { path: '/hipaa-compliance', priority: '0.7', changefreq: 'monthly' },
  { path: '/healthcare-content', priority: '0.7', changefreq: 'monthly' },
  { path: '/growth-plan', priority: '0.7', changefreq: 'monthly' },
  { path: '/onsite-field-marketing', priority: '0.6', changefreq: 'monthly' },

  // Authority / methodology
  { path: '/healthcare-growth-engine', priority: '0.8', changefreq: 'monthly' },
  { path: '/methodology/phase-1', priority: '0.6', changefreq: 'yearly' },
  { path: '/methodology/phase-2', priority: '0.6', changefreq: 'yearly' },
  { path: '/methodology/phase-3', priority: '0.6', changefreq: 'yearly' },
  { path: '/automation', priority: '0.7', changefreq: 'monthly' },
  { path: '/automation/more-info', priority: '0.6', changefreq: 'monthly' },
  { path: '/automation/templates', priority: '0.7', changefreq: 'monthly' },
  { path: '/infrastructure/growth-team', priority: '0.5', changefreq: 'yearly' },
  { path: '/infrastructure/compliance-protocol', priority: '0.5', changefreq: 'yearly' },
  { path: '/infrastructure/service-level-agreements', priority: '0.5', changefreq: 'yearly' },

  // Proof / content hubs
  { path: '/case-studies', priority: '0.8', changefreq: 'weekly' },
  { path: '/our-work', priority: '0.8', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/healthcare-news', priority: '0.7', changefreq: 'daily' },

  // Legal / utility
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/accessibility', priority: '0.3', changefreq: 'yearly' },
  { path: '/sitemap', priority: '0.4', changefreq: 'monthly' },
];

// ─── Helpers ────────────────────────────────────────────────────────
const readText = (relPath) => readFileSync(resolve(ROOT, relPath), 'utf8');

const extractMatches = (text, regex, groupIndex = 1) => {
  const out = [];
  for (const m of text.matchAll(regex)) {
    out.push(m[groupIndex]);
  }
  return out;
};

const xmlEscape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ─── Dynamic slug extraction ────────────────────────────────────────
// Each section is wrapped in try/catch so a missing/renamed data file
// doesn't break the build — the script logs a warning and continues.

const safeExtract = (label, fn) => {
  try {
    const result = fn();
    return Array.isArray(result) ? result : [];
  } catch (err) {
    console.warn(`[sitemap] ${label}: extraction failed — ${err.message}`);
    return [];
  }
};

const caseStudyIds = safeExtract('case studies', () => {
  const text = readText('src/pages/CaseStudies/caseStudies.data.ts');
  // top-level `  id: 'slug-style',` (two-space indent inside object literal)
  return extractMatches(text, /^\s+id:\s*['"]([a-z0-9-]+)['"]/gm);
});

const blogSlugs = safeExtract('blog', () => {
  const text = readText('src/content/blog/posts.tsx');
  return extractMatches(text, /^\s+slug:\s*['"]([a-z0-9-]+)['"]/gm);
});

const newsSlugs = safeExtract('news', () => {
  const text = readText('src/pages/HealthcareNews/news.data.ts');
  return extractMatches(text, /^\s+slug:\s*['"]([a-z0-9-]+)['"]/gm);
});

const industrySlugs = safeExtract('industry detail', () => {
  const text = readText('src/content/industries/details.data.ts');
  return extractMatches(text, /^\s+slug:\s*['"]([a-z0-9-]+)['"]/gm);
});

const valueSlugs = safeExtract('about value', () => {
  const text = readText('src/content/about/values.data.tsx');
  return extractMatches(text, /^\s+slug:\s*['"]([a-z0-9-]+)['"]/gm);
});

const ourWorkEntries = safeExtract('our-work detail', () => {
  const text = readText('src/pages/OurWork/details.data.ts');
  const kinds = extractMatches(text, /^\s+kind:\s*['"](engagement|industry|capability)['"]/gm);
  const slugs = extractMatches(text, /^\s+slug:\s*['"]([a-z0-9-]+)['"]/gm);
  // Each DetailEntry has exactly one kind and one slug, in the same order.
  return kinds.map((kind, i) => ({ kind, slug: slugs[i] })).filter((e) => e.slug);
});

// ─── Assemble URL list ──────────────────────────────────────────────
const DYN_PRIORITY = '0.6';
const DYN_CHANGEFREQ_PROOF = 'monthly';
const DYN_CHANGEFREQ_NEWS = 'monthly';

const dynamicRoutes = [
  ...caseStudyIds.map((id) => ({
    path: `/case-studies/${id}`,
    priority: '0.7',
    changefreq: DYN_CHANGEFREQ_PROOF,
  })),
  ...blogSlugs.map((slug) => ({
    path: `/blog/${slug}`,
    priority: '0.7',
    changefreq: DYN_CHANGEFREQ_PROOF,
  })),
  ...newsSlugs.map((slug) => ({
    path: `/healthcare-news/${slug}`,
    priority: '0.6',
    changefreq: DYN_CHANGEFREQ_NEWS,
  })),
  ...ourWorkEntries.map(({ kind, slug }) => ({
    path: `/our-work/${kind}/${slug}`,
    priority: DYN_PRIORITY,
    changefreq: DYN_CHANGEFREQ_PROOF,
  })),
  ...industrySlugs.map((slug) => ({
    path: `/industries/detail/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
  ...valueSlugs.map((slug) => ({
    path: `/about/value/${slug}`,
    priority: '0.5',
    changefreq: 'yearly',
  })),
];

const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];

// Deduplicate by path (in case static + dynamic ever collide)
const seenPaths = new Set();
const uniqueRoutes = allRoutes.filter((r) => {
  if (seenPaths.has(r.path)) return false;
  seenPaths.add(r.path);
  return true;
});

// ─── Render XML ─────────────────────────────────────────────────────
const urlEntries = uniqueRoutes
  .map(
    (r) => `  <url>
    <loc>${xmlEscape(`${SITE_URL}${r.path}`)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

// ─── Write output ───────────────────────────────────────────────────
const outDir = resolve(ROOT, 'public');
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, 'sitemap.xml'), xml, 'utf8');

console.log(`[sitemap] Wrote public/sitemap.xml`);
console.log(`[sitemap]   static routes:       ${STATIC_ROUTES.length}`);
console.log(`[sitemap]   case studies:        ${caseStudyIds.length}`);
console.log(`[sitemap]   blog posts:          ${blogSlugs.length}`);
console.log(`[sitemap]   news articles:       ${newsSlugs.length}`);
console.log(`[sitemap]   our-work details:    ${ourWorkEntries.length}`);
console.log(`[sitemap]   industry details:    ${industrySlugs.length}`);
console.log(`[sitemap]   about values:        ${valueSlugs.length}`);
console.log(`[sitemap]   total unique URLs:   ${uniqueRoutes.length}`);

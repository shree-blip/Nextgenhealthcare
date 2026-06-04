import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import BookingModal from '@/components/BookingModal';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';
import { ArrowIcon, CheckIcon, ChartIcon, NetworkIcon, LinkIcon } from '@/components/icons';

const GRADIENT = 'linear-gradient(90deg, #B38B6D 0%, #8FBC8F 50%, #576DB5 100%)';

const Eyebrow = ({ children, color = '#576DB5' }: { children: ReactNode; color?: string }) => (
  <span className="inline-flex items-center gap-2.5 rounded-full border border-line-faint bg-white px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
    <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} aria-hidden="true" />
    {children}
  </span>
);

const Gradient = ({ children }: { children: ReactNode }) => (
  <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
    {children}
  </span>
);

interface Stat {
  value: string;
  label: string;
}
interface Metric {
  tag: string;
  title: string;
  body: string;
}
interface Source {
  title: string;
  body: string;
}

const SOURCE_ICONS = [ChartIcon, NetworkIcon, LinkIcon];

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Practice Metrics — Healthcare Marketing Dashboard',
  serviceType: 'Analytics · KPI Dashboard · Attribution Reporting',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: { '@type': 'Audience', audienceType: 'Healthcare practices, clinics' },
};

const PracticeMetrics = () => {
  const { t } = useTranslation('pages');
  const [bookingOpen, setBookingOpen] = useState(false);

  const stats = t('pages:practiceMetrics.stats', { returnObjects: true }) as Stat[];
  const metrics = t('pages:practiceMetrics.metrics.items', { returnObjects: true }) as Metric[];
  const sources = t('pages:practiceMetrics.sources.items', { returnObjects: true }) as Source[];
  const points = t('pages:practiceMetrics.score.points', { returnObjects: true }) as string[];

  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: t('pages:practiceMetrics.breadcrumb.current') },
  ]);

  return (
    <>
      <Seo
        title={t('pages:practiceMetrics.seo.title')}
        description={t('pages:practiceMetrics.seo.description')}
        path="/practice-metrics"
        schema={[SERVICE_SCHEMA, breadcrumbSchema]}
      />

      {/* ── Hero ── */}
      <section className="ph-page-head">
        <div className="container-shell">
          <Breadcrumb current={t('pages:practiceMetrics.breadcrumb.current')} />

          <div className="mt-10 grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>{t('pages:practiceMetrics.hero.eyebrow')}</Eyebrow>
              <h1 className="mt-6 max-w-[16ch] text-[clamp(38px,5.2vw,68px)] font-extrabold leading-[1.03] tracking-[-0.034em] text-heading">
                {t('pages:practiceMetrics.hero.titleLine1')}{' '}
                <Gradient>{t('pages:practiceMetrics.hero.titleAccent')}</Gradient>
                {t('pages:practiceMetrics.hero.titleSuffix')}
              </h1>
              <p className="mt-7 max-w-[58ch] text-[17px] leading-[1.7] text-body">
                {t('pages:practiceMetrics.hero.lede')}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="group inline-flex items-center gap-2.5 rounded-[12px] bg-cta px-6 py-3.5 text-[15px] font-bold text-white shadow-cta transition hover:bg-cta-hover hover:-translate-y-px"
                >
                  {t('pages:practiceMetrics.cta.book')}
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowIcon size={16} />
                  </span>
                </button>
                <Link
                  to="/patient-flow"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-heading underline-offset-4 hover:underline"
                >
                  {t('pages:practiceMetrics.cta.cross')}
                  <ArrowIcon size={14} />
                </Link>
              </div>
            </div>

            {/* Dashboard mock — the single live screen */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] border border-line-faint bg-white/80 p-6 shadow-card backdrop-blur-sm sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    {t('pages:practiceMetrics.score.scoreLabel')}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#5A8F5A]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5A8F5A]" />
                    LIVE
                  </span>
                </div>
                <div className="mt-4 flex items-end gap-3">
                  <span className="text-[clamp(44px,6vw,64px)] font-extrabold leading-none tracking-[-0.03em] text-cta">
                    {t('pages:practiceMetrics.score.scoreValue')}
                  </span>
                  <span className="mb-1.5 text-[13px] font-semibold text-[#5A8F5A]">
                    {t('pages:practiceMetrics.score.scoreCaption')}
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-bg-soft">
                  <div className="h-full rounded-full bg-cta" style={{ width: '90%' }} aria-hidden="true" />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {metrics.slice(0, 4).map((m) => (
                    <div key={m.title} className="rounded-[12px] border border-line-faint bg-bg-alt p-3.5">
                      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                        {m.tag}
                      </div>
                      <div className="mt-1 text-[13px] font-bold leading-tight text-heading">
                        {m.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="border-t border-line-faint bg-bg-alt">
        <div className="container-shell py-[clamp(40px,5vw,64px)]">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-line-faint bg-line-faint lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-7 text-center sm:p-8">
                <div className="text-[clamp(30px,3.4vw,44px)] font-extrabold leading-none tracking-[-0.02em] text-cta">
                  {s.value}
                </div>
                <div className="mt-2.5 text-[13px] font-medium text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics grid ── */}
      <section className="border-t border-line-faint">
        <div className="container-shell py-[clamp(64px,9vw,128px)]">
          <div className="mb-14 grid items-end gap-x-16 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow color="#576DB5">{t('pages:practiceMetrics.metrics.eyebrow')}</Eyebrow>
              <h2 className="mt-5 text-[clamp(28px,3vw,42px)] font-bold leading-[1.1] tracking-[-0.024em] text-heading">
                {t('pages:practiceMetrics.metrics.title')}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="max-w-[44ch] text-[15px] leading-[1.7] text-body">
                {t('pages:practiceMetrics.metrics.lede')}
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((m) => (
              <article
                key={m.title}
                className="flex flex-col gap-3.5 rounded-[18px] border border-line-faint bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <span
                  className="inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em]"
                  style={{ background: 'rgba(87,109,181,0.10)', color: '#576DB5' }}
                >
                  {m.tag}
                </span>
                <h3 className="text-[19px] font-bold tracking-[-0.012em] text-heading">{m.title}</h3>
                <p className="text-[14px] leading-[1.65] text-body">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Data sources ── */}
      <section className="border-t border-line-faint bg-bg-alt">
        <div className="container-shell py-[clamp(64px,9vw,128px)]">
          <div className="mb-14 grid items-end gap-x-16 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow color="#5A8F5A">{t('pages:practiceMetrics.sources.eyebrow')}</Eyebrow>
              <h2 className="mt-5 text-[clamp(28px,3vw,42px)] font-bold leading-[1.1] tracking-[-0.024em] text-heading">
                {t('pages:practiceMetrics.sources.title')}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="max-w-[44ch] text-[15px] leading-[1.7] text-body">
                {t('pages:practiceMetrics.sources.lede')}
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {sources.map((s, i) => {
              const Icon = SOURCE_ICONS[i] ?? ChartIcon;
              return (
                <article
                  key={s.title}
                  className="flex flex-col gap-4 rounded-[18px] border border-line-faint bg-white p-8"
                >
                  <span
                    className="inline-grid h-12 w-12 place-items-center rounded-[14px] text-[#5A8F5A]"
                    style={{ background: 'rgba(143,188,143,0.14)' }}
                    aria-hidden="true"
                  >
                    <Icon size={22} />
                  </span>
                  <h3 className="text-[18px] font-bold tracking-[-0.012em] text-heading">
                    {s.title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-body">{s.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Practice Health score showcase ── */}
      <section className="border-t border-line-faint">
        <div className="container-shell py-[clamp(64px,9vw,128px)]">
          <div
            className="grid items-center gap-x-12 gap-y-10 overflow-hidden rounded-[24px] border border-heading/10 p-8 sm:p-12 lg:grid-cols-2 lg:p-14"
            style={{
              background:
                'radial-gradient(1000px 480px at 100% 0%, rgba(87,109,181,0.30), transparent 60%), radial-gradient(640px 420px at 0% 120%, rgba(143,188,143,0.18), transparent 60%), #2D3748',
            }}
          >
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.24em] text-white/55">
                {t('pages:practiceMetrics.score.eyebrow')}
              </div>
              <h2 className="mt-5 max-w-[20ch] text-[clamp(26px,3vw,40px)] font-extrabold leading-[1.08] tracking-[-0.024em] text-white">
                {t('pages:practiceMetrics.score.title')}
              </h2>
              <p className="mt-6 max-w-[48ch] text-[15.5px] leading-[1.65] text-white/70">
                {t('pages:practiceMetrics.score.body')}
              </p>
              <ul className="mt-7 flex flex-col gap-3">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[14.5px] leading-[1.5] text-white/85">
                    <span
                      className="mt-0.5 inline-grid h-5 w-5 shrink-0 place-items-center rounded-full"
                      style={{ background: 'rgba(143,188,143,0.25)', color: '#B4DBC3' }}
                      aria-hidden="true"
                    >
                      <CheckIcon size={11} strokeWidth={3.2} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Score card */}
            <div className="rounded-[20px] bg-white/[0.07] p-8 ring-1 ring-white/10 backdrop-blur-sm">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                {t('pages:practiceMetrics.score.scoreLabel')}
              </div>
              <div className="mt-3 text-[clamp(56px,8vw,88px)] font-extrabold leading-none tracking-[-0.03em] text-white">
                {t('pages:practiceMetrics.score.scoreValue')}
              </div>
              <div className="mt-2 text-[14px] font-semibold text-[#B4DBC3]">
                {t('pages:practiceMetrics.score.scoreCaption')}
              </div>
              <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{ width: '90%', backgroundImage: 'linear-gradient(90deg, #B4DBC3, #9DB4F0)' }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="border-t border-line-faint bg-bg-alt">
        <div className="container-shell py-[clamp(64px,9vw,120px)]">
          <div className="mx-auto max-w-[760px] text-center">
            <Eyebrow color="#576DB5">{t('pages:practiceMetrics.closing.eyebrow')}</Eyebrow>
            <h2 className="mt-6 text-[clamp(28px,3.2vw,44px)] font-extrabold leading-[1.06] tracking-[-0.026em] text-heading">
              {t('pages:practiceMetrics.closing.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[16px] leading-[1.65] text-body">
              {t('pages:practiceMetrics.closing.body')}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="group inline-flex items-center gap-2.5 rounded-[12px] bg-cta px-7 py-4 text-[15px] font-bold text-white shadow-cta transition hover:bg-cta-hover hover:-translate-y-px"
              >
                {t('pages:practiceMetrics.cta.book')}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowIcon size={16} />
                </span>
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 rounded-[12px] border border-heading/20 bg-white px-7 py-4 text-[15px] font-bold text-heading transition hover:-translate-y-px hover:border-heading/40"
              >
                Contact us
                <ArrowIcon size={15} />
              </Link>
            </div>
            <p className="mt-4 text-[13px] text-muted">{t('pages:practiceMetrics.cta.bookHint')}</p>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
};

export default PracticeMetrics;

import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '@/components/Breadcrumb';
import BookingModal from '@/components/BookingModal';
import Seo from '@/components/Seo';
import { buildBreadcrumbList } from '@/lib/schema';
import { SITE } from '@/content/site';
import {
  ArrowIcon,
  CheckIcon,
  FileIcon,
  ClockIcon,
  NetworkIcon,
  UsersIcon,
  StarIcon,
} from '@/components/icons';

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
interface Step {
  n: string;
  title: string;
  body: string;
}
interface Feature {
  title: string;
  body: string;
}

const FEATURE_ICONS = [FileIcon, ClockIcon, NetworkIcon, CheckIcon, UsersIcon, StarIcon];

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Patient Flow — Healthcare Intake Automation',
  serviceType: 'Intake Automation · EHR Sync · Appointment Confirmation',
  provider: { '@id': `${SITE.url}#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: { '@type': 'Audience', audienceType: 'Healthcare practices, clinics' },
};

const PatientFlow = () => {
  const { t } = useTranslation('pages');
  const [bookingOpen, setBookingOpen] = useState(false);

  const stats = t('pages:patientFlow.stats', { returnObjects: true }) as Stat[];
  const steps = t('pages:patientFlow.steps.items', { returnObjects: true }) as Step[];
  const features = t('pages:patientFlow.features.items', { returnObjects: true }) as Feature[];
  const points = t('pages:patientFlow.compliance.points', { returnObjects: true }) as string[];

  const breadcrumbSchema = buildBreadcrumbList([
    { name: 'Home', path: '/' },
    { name: t('pages:patientFlow.breadcrumb.current') },
  ]);

  return (
    <>
      <Seo
        title={t('pages:patientFlow.seo.title')}
        description={t('pages:patientFlow.seo.description')}
        path="/patient-flow"
        schema={[SERVICE_SCHEMA, breadcrumbSchema]}
      />

      {/* ── Hero ── */}
      <section className="ph-page-head">
        <div className="container-shell">
          <Breadcrumb current={t('pages:patientFlow.breadcrumb.current')} />

          <div className="mt-10 grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow color="#5A8F5A">{t('pages:patientFlow.hero.eyebrow')}</Eyebrow>
              <h1 className="mt-6 max-w-[16ch] text-[clamp(38px,5.2vw,68px)] font-extrabold leading-[1.03] tracking-[-0.034em] text-heading">
                {t('pages:patientFlow.hero.titleLine1')}{' '}
                <Gradient>{t('pages:patientFlow.hero.titleAccent')}</Gradient>
                {t('pages:patientFlow.hero.titleSuffix')}
              </h1>
              <p className="mt-7 max-w-[58ch] text-[17px] leading-[1.7] text-body">
                {t('pages:patientFlow.hero.lede')}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="group inline-flex items-center gap-2.5 rounded-[12px] bg-cta px-6 py-3.5 text-[15px] font-bold text-white shadow-cta transition hover:bg-cta-hover hover:-translate-y-px"
                >
                  {t('pages:patientFlow.cta.book')}
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowIcon size={16} />
                  </span>
                </button>
                <Link
                  to="/practice-metrics"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-heading underline-offset-4 hover:underline"
                >
                  {t('pages:patientFlow.cta.cross')}
                  <ArrowIcon size={14} />
                </Link>
              </div>
            </div>

            {/* Live intake mock — echoes the moment a patient books */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] border border-line-faint bg-white/80 p-6 shadow-card backdrop-blur-sm sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    {t('pages:patientFlow.hero.eyebrow')}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#5A8F5A]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5A8F5A]" />
                    LIVE
                  </span>
                </div>
                <ol className="mt-5 flex flex-col gap-3">
                  {steps.map((s, i) => (
                    <li
                      key={s.n}
                      className="flex items-center gap-3.5 rounded-[14px] border border-line-faint bg-bg-alt px-4 py-3"
                    >
                      <span
                        className="inline-grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-[12px] font-bold"
                        style={{ background: 'rgba(143,188,143,0.16)', color: '#5A8F5A' }}
                      >
                        {s.n}
                      </span>
                      <span className="text-[14px] font-semibold text-heading">{s.title}</span>
                      <span className="ml-auto text-[#5A8F5A]" aria-hidden="true">
                        <CheckIcon size={15} strokeWidth={3} />
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 rounded-[14px] bg-cta px-4 py-3 text-center text-[13px] font-bold text-white">
                  {stats[0]?.value} · {stats[0]?.label}
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

      {/* ── How it works ── */}
      <section className="border-t border-line-faint">
        <div className="container-shell py-[clamp(64px,9vw,128px)]">
          <div className="mb-14 grid items-end gap-x-16 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>{t('pages:patientFlow.steps.eyebrow')}</Eyebrow>
              <h2 className="mt-5 text-[clamp(28px,3vw,42px)] font-bold leading-[1.1] tracking-[-0.024em] text-heading">
                {t('pages:patientFlow.steps.title')}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="max-w-[44ch] text-[15px] leading-[1.7] text-body">
                {t('pages:patientFlow.steps.lede')}
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <article
                key={s.n}
                className="relative flex flex-col rounded-[18px] border border-line-faint bg-white p-7"
              >
                <span
                  className="inline-grid h-12 w-12 place-items-center rounded-[14px] font-mono text-[16px] font-bold"
                  style={{ background: 'rgba(87,109,181,0.10)', color: '#576DB5' }}
                >
                  {s.n}
                </span>
                <h3 className="mt-5 text-[19px] font-bold tracking-[-0.012em] text-heading">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-body">{s.body}</p>
                {i < steps.length - 1 && (
                  <span
                    className="absolute right-4 top-9 hidden text-line/40 lg:block"
                    aria-hidden="true"
                  >
                    <ArrowIcon size={18} />
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── What it handles ── */}
      <section className="border-t border-line-faint bg-bg-alt">
        <div className="container-shell py-[clamp(64px,9vw,128px)]">
          <div className="mb-14 grid items-end gap-x-16 gap-y-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow color="#B38B6D">{t('pages:patientFlow.features.eyebrow')}</Eyebrow>
              <h2 className="mt-5 text-[clamp(28px,3vw,42px)] font-bold leading-[1.1] tracking-[-0.024em] text-heading">
                {t('pages:patientFlow.features.title')}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="max-w-[44ch] text-[15px] leading-[1.7] text-body">
                {t('pages:patientFlow.features.lede')}
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = FEATURE_ICONS[i] ?? FileIcon;
              return (
                <article
                  key={f.title}
                  className="group flex flex-col gap-4 rounded-[18px] border border-line-faint bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                >
                  <span
                    className="inline-grid h-12 w-12 place-items-center rounded-[14px] text-cta"
                    style={{ background: 'rgba(87,109,181,0.10)' }}
                    aria-hidden="true"
                  >
                    <Icon size={22} />
                  </span>
                  <h3 className="text-[18px] font-bold leading-[1.25] tracking-[-0.012em] text-heading">
                    {f.title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-body">{f.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Compliance callout ── */}
      <section className="border-t border-line-faint">
        <div className="container-shell py-[clamp(64px,9vw,128px)]">
          <div
            className="grid items-center gap-x-12 gap-y-10 overflow-hidden rounded-[24px] border border-heading/10 p-8 sm:p-12 lg:grid-cols-2 lg:p-14"
            style={{
              background:
                'radial-gradient(900px 460px at 100% 0%, rgba(87,109,181,0.30), transparent 60%), radial-gradient(640px 420px at 0% 120%, rgba(143,188,143,0.18), transparent 60%), #2D3748',
            }}
          >
            <div>
              <div className="font-mono text-[12px] uppercase tracking-[0.24em] text-white/55">
                {t('pages:patientFlow.compliance.eyebrow')}
              </div>
              <h2 className="mt-5 max-w-[20ch] text-[clamp(26px,3vw,40px)] font-extrabold leading-[1.08] tracking-[-0.024em] text-white">
                {t('pages:patientFlow.compliance.title')}
              </h2>
              <p className="mt-6 max-w-[48ch] text-[15.5px] leading-[1.65] text-white/70">
                {t('pages:patientFlow.compliance.body')}
              </p>
            </div>
            <ul className="flex flex-col gap-4">
              {points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3.5 rounded-[14px] bg-white/5 p-5 text-[15px] leading-[1.5] text-white/90 ring-1 ring-white/10"
                >
                  <span
                    className="mt-0.5 inline-grid h-6 w-6 shrink-0 place-items-center rounded-full"
                    style={{ background: 'rgba(143,188,143,0.25)', color: '#B4DBC3' }}
                    aria-hidden="true"
                  >
                    <CheckIcon size={13} strokeWidth={3.2} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="border-t border-line-faint bg-bg-alt">
        <div className="container-shell py-[clamp(64px,9vw,120px)]">
          <div className="mx-auto max-w-[760px] text-center">
            <Eyebrow color="#5A8F5A">{t('pages:patientFlow.closing.eyebrow')}</Eyebrow>
            <h2 className="mt-6 text-[clamp(28px,3.2vw,44px)] font-extrabold leading-[1.06] tracking-[-0.026em] text-heading">
              {t('pages:patientFlow.closing.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-[52ch] text-[16px] leading-[1.65] text-body">
              {t('pages:patientFlow.closing.body')}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="group inline-flex items-center gap-2.5 rounded-[12px] bg-cta px-7 py-4 text-[15px] font-bold text-white shadow-cta transition hover:bg-cta-hover hover:-translate-y-px"
              >
                {t('pages:patientFlow.cta.book')}
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
            <p className="mt-4 text-[13px] text-muted">{t('pages:patientFlow.cta.bookHint')}</p>
          </div>
        </div>
      </section>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
};

export default PatientFlow;

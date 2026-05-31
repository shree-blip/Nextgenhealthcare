import { useTranslation } from 'react-i18next';
import { Section } from './helpers';
import { GAP_ROW_KEYS } from './data';

/* ---------- THE GAP (comparison) ---------- */
const TheGap = () => {
  const { t } = useTranslation('pages');
  return (
    <Section
      no={t('pages:healthcareGrowthEngine.theGap.no')}
      title={t('pages:healthcareGrowthEngine.theGap.title')}
      kicker={t('pages:healthcareGrowthEngine.theGap.kicker')}
    >
      <div className="grid md:grid-cols-2 gap-px bg-line-faint border border-line-faint rounded-[16px] overflow-hidden">
        {/* Standard column */}
        <div className="bg-bg-soft p-7 sm:p-9">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">A</span>
            <h3 className="text-muted text-[18px] font-bold tracking-[-0.015em]">
              {t('pages:healthcareGrowthEngine.theGap.agencyHeading')}
            </h3>
          </div>
          <ul className="space-y-4">
            {GAP_ROW_KEYS.map((key) => (
              <li key={key} className="flex gap-4 items-start">
                <span className="shrink-0 w-20 text-[11px] uppercase tracking-[0.18em] text-muted font-bold pt-1">
                  {t(`pages:healthcareGrowthEngine.theGap.rows.${key}.topic`)}
                </span>
                <span className="text-muted text-[14.5px] leading-[1.55] line-through decoration-line-faint decoration-2">
                  {t(`pages:healthcareGrowthEngine.theGap.rows.${key}.agency`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Engine column */}
        <div className="bg-bg p-7 sm:p-9 relative">
          <span className="absolute top-7 right-7 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-heading text-white font-mono text-[10px] tracking-[0.2em] uppercase font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
            {t('pages:healthcareGrowthEngine.theGap.engineBadge')}
          </span>
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-line">B</span>
            <h3 className="text-heading text-[18px] font-bold tracking-[-0.015em]">
              {t('pages:healthcareGrowthEngine.theGap.engineHeading')}
            </h3>
          </div>
          <ul className="space-y-4">
            {GAP_ROW_KEYS.map((key) => (
              <li key={key} className="flex gap-4 items-start">
                <span className="shrink-0 w-20 text-[11px] uppercase tracking-[0.18em] text-line font-bold pt-1">
                  {t(`pages:healthcareGrowthEngine.theGap.rows.${key}.topic`)}
                </span>
                <span className="text-heading text-[14.5px] leading-[1.55] font-medium">
                  {t(`pages:healthcareGrowthEngine.theGap.rows.${key}.engine`)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default TheGap;

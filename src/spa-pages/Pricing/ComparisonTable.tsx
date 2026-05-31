import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useGroups } from '@/content/pricing/comparison';

const CheckCell = () => (
  <span className="pr-cell-check">
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const DashCell = () => <span className="pr-cell-dash">-</span>;

const ComparisonTable = () => {
  const { t } = useTranslation('pricing');
  const groups = useGroups();

  return (
    <section className="pr-compare" aria-labelledby="pr-cmp-title">
      <div className="container-shell">
        <div className="pr-section-head">
          <span className="pr-section-eyebrow">{t('comparison.eyebrow')}</span>
          <h2 id="pr-cmp-title" className="pr-section-h2">
            {t('comparison.title')}
          </h2>
          <p className="pr-section-sub">{t('comparison.subtitle')}</p>
        </div>

        <div className="pr-compare-wrap">
          <table className="pr-table">
            <thead>
              <tr>
                <th>{t('comparison.featureHeader')}</th>
                <th>
                  <span className="col-name">{t('comparison.starterName')}</span>
                  <span className="col-price">{t('comparison.starterPrice')}</span>
                </th>
                <th className="is-featured">
                  <span className="col-name">{t('comparison.growthName')}</span>
                  <span className="col-price">{t('comparison.growthPrice')}</span>
                </th>
                <th>
                  <span className="col-name">{t('comparison.scaleName')}</span>
                  <span className="col-price">{t('comparison.scalePrice')}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <Fragment key={group.label}>
                  <tr className="is-divider">
                    <td colSpan={4}>
                      <span className="pr-table-group">{group.label}</span>
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td>{row.values[0] ? <CheckCell /> : <DashCell />}</td>
                      <td className="is-featured-col">
                        {row.values[1] ? <CheckCell /> : <DashCell />}
                      </td>
                      <td>{row.values[2] ? <CheckCell /> : <DashCell />}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;

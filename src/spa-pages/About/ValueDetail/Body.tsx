import { useTranslation } from 'react-i18next';
import DetailSectionHead from '@/components/DetailSectionHead';
import type { ValueEntry } from '@/content/about/values.data';
import { BODY_CARD_META } from './data';

const Body = ({ entry }: { entry: ValueEntry }) => {
  const { t } = useTranslation('about');

  return (
    <section className="ow-detail-body" aria-labelledby="ab-value-body-title">
      <div className="container-shell">
        <DetailSectionHead
          id="ab-value-body-title"
          eyebrow={t('valueDetail.body.eyebrow')}
          title={t('valueDetail.body.title')}
          intro={t('valueDetail.body.intro')}
        />
        <div className="ab-value-body-grid">
          {BODY_CARD_META.map((meta, i) => {
            const text = entry.longBody[i];
            if (!text) return null;
            return (
              <article key={meta.i18nKey} className={`ab-value-body-card tone-${meta.tone}`}>
                <span className="ab-value-body-num">/{String(i + 1).padStart(2, '0')}</span>
                <span className="ab-value-body-icon" aria-hidden="true">
                  {meta.icon}
                </span>
                <h3 className="ab-value-body-title">{t(`valueDetail.body.${meta.i18nKey}`)}</h3>
                <p className="ab-value-body-text">{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Body;

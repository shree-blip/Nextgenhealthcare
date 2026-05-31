import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const Engage = () => {
  const { t } = useTranslation('pages');

  return (
    <section className="ngt-section ngt-engage">
      <div className="container-shell">
        <div className="ngt-mark">
          <span className="ngt-mark-num">{t('team.engage.markNum')}</span>
          <span className="ngt-mark-lbl">{t('team.engage.markLabel')}</span>
          <span className="ngt-mark-line" />
          <span className="ngt-mark-meta">{t('team.engage.markMeta')}</span>
        </div>

        <div className="ngt-en-grid">
          <div>
            <h2 className="ngt-en-h2">
              {t('team.engage.titleStart')} <em>{t('team.engage.titleEm')}</em>
            </h2>
            <p className="ngt-en-sub">{t('team.engage.sub')}</p>
          </div>

          <aside className="ngt-en-aside">
            <p className="ngt-en-text">{t('team.engage.text')}</p>
            <Link to="/contact" className="ngt-en-link">
              <span>{t('team.engage.cta')}</span>
              <ArrowIcon strokeWidth={1.8} />
            </Link>
            <div className="ngt-en-foot">
              <span>{t('team.engage.footLeft')}</span>
              <span>·</span>
              <span>{t('team.engage.footRight')}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Engage;

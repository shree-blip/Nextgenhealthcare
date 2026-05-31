import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CASE_STUDIES } from '../caseStudies.data';
import { ArrowOutIcon } from '@/components/icons';
import { ArrowLeft } from './icons';

const NotFoundCase = () => {
  const { t } = useTranslation('pages');
  return (
    <main className="csd" id="csd-top">
      <section className="csd-missing">
        <div className="container-shell">
          <p className="csd-missing-eyebrow">{t('caseStudies.detail.notFound.eyebrow')}</p>
          <h1 className="csd-missing-h1">{t('caseStudies.detail.notFound.title')}</h1>
          <p className="csd-missing-sub">{t('caseStudies.detail.notFound.sub')}</p>
          <Link to="/case-studies#cs-all" className="csd-missing-link">
            <ArrowLeft /> {t('caseStudies.detail.notFound.back')}
          </Link>
          <ul className="csd-missing-list">
            {CASE_STUDIES.map((c) => (
              <li key={c.id}>
                <Link to={`/case-studies/${c.id}`}>
                  <span className="csd-missing-emoji" aria-hidden="true">
                    {c.emoji}
                  </span>
                  <span>{t(`caseStudies.studies.${c.id}.name`, c.name)}</span>
                  <ArrowOutIcon strokeWidth={2} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default NotFoundCase;

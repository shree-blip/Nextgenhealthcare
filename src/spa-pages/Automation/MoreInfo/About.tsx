import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import builtForClinic from '../../../assets/nextgen-image/Clinicalimg1.png';
import { ArrowIcon, CheckIcon } from '@/components/icons';

const About = () => {
  const { t } = useTranslation(['automation']);
  const checklist = t('automation:moreInfo.about.checklist', { returnObjects: true });
  const items: string[] = Array.isArray(checklist) ? (checklist as string[]) : [];

  return (
    <section className="amih-about" aria-labelledby="amih-about-title">
      <div className="container-shell">
        <div className="amih-about-grid">
          <div className="amih-about-media" aria-hidden="true">
            <div className="amih-about-frame">
              <span className="amih-frame-cap" />
              <span className="amih-frame-block amih-frame-block--a" />
              <span className="amih-frame-block amih-frame-block--b" />
              <span className="amih-frame-block amih-frame-block--c" />
              <img src={builtForClinic} alt="" className="amih-frame-img" loading="lazy" />
              <div className="amih-frame-tag">
                <span>{t('automation:moreInfo.about.tagLive')}</span>
                <strong>{t('automation:moreInfo.about.tagName')}</strong>
              </div>
            </div>
          </div>

          <div className="amih-about-copy">
            <span className="amih-section-label">{t('automation:moreInfo.about.label')}</span>
            <h2 id="amih-about-title" className="amih-h2">
              {t('automation:moreInfo.about.title')}
            </h2>
            <p className="amih-about-lede">{t('automation:moreInfo.about.lede')}</p>
            <ul className="amih-check-list">
              {items.map((item) => (
                <li key={item}>
                  <span className="amih-check-icon" aria-hidden="true">
                    <CheckIcon size={14} strokeWidth={2.6} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/automation" className="amih-btn amih-btn-ghost">
              {t('automation:moreInfo.about.back')} <ArrowIcon size={14} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

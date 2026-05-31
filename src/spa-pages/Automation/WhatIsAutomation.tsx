import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import healthautoImg from '../../assets/nextgen-image/Healthautoimg.png';

const WhatIsAutomation = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="what-is" aria-labelledby="what-title">
      <div className="container-shell">
        <div className="what-grid">
          <div className="reveal">
            <h2 className="section-title" id="what-title">
              {t('automation:whatIs.title')}
            </h2>
            <p className="what-text">{t('automation:whatIs.text')}</p>
            <Link to="/automation/more-info" className="more-info">
              <span className="more-info-icon">
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
              {t('automation:whatIs.moreInfo')}
            </Link>
          </div>

          <div className="reveal d2">
            <div className="what-single">
              <img src={healthautoImg} alt="" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsAutomation;

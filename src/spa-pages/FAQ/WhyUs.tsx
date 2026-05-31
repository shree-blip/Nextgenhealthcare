import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const WhyUs = () => {
  const { t } = useTranslation('pages');

  return (
    <section className="fp-why" id="why-us">
      <div className="container-shell">
        <div className="fp-why-head">
          <div className="fp-why-eyebrow">{t('faq.whyUs.eyebrow')}</div>
          <h2 className="fp-why-title">{t('faq.whyUs.title')}</h2>
          <p className="fp-why-sub">{t('faq.whyUs.subtitle')}</p>
        </div>

        <div className="fp-why-grid">
          {/* TL: Image card - referrals mockup */}
          <div className="fp-card fp-card-img">
            <div className="fp-mock">
              <div className="fp-mock-dash">
                <div className="fp-mock-row">
                  <div className="fp-mock-avatar a1" />
                  <div className="fp-mock-text">
                    <div className="fp-mock-name">{t('faq.whyUs.mockA.name1')}</div>
                    <div className="fp-mock-sub">{t('faq.whyUs.mockA.sub1')}</div>
                  </div>
                  <div className="fp-mock-amt">+$23.46</div>
                </div>
                <span className="fp-mock-pill">{t('faq.whyUs.mockA.booked')}</span>
                <div className="fp-mock-row">
                  <div className="fp-mock-avatar a2" />
                  <div className="fp-mock-text">
                    <div className="fp-mock-name">{t('faq.whyUs.mockA.name2')}</div>
                    <div className="fp-mock-sub">{t('faq.whyUs.mockA.sub2')}</div>
                  </div>
                  <div className="fp-mock-amt green">+$25.45</div>
                </div>
                <span className="fp-mock-pill cta">{t('faq.whyUs.mockA.confirmed')}</span>
              </div>
            </div>
          </div>

          {/* TR: Text card */}
          <a className="fp-card fp-card-text" href="#feature-1">
            <span className="fp-tag">{t('faq.whyUs.patientFlow.tag')}</span>
            <h3 className="fp-card-title">{t('faq.whyUs.patientFlow.title')}</h3>
            <p className="fp-card-desc">{t('faq.whyUs.patientFlow.desc')}</p>
            <span className="fp-btn">
              {t('faq.whyUs.patientFlow.cta')}
              <ArrowIcon />
            </span>
          </a>

          {/* BL: Text card */}
          <a className="fp-card fp-card-text" href="#feature-2">
            <span className="fp-tag">{t('faq.whyUs.metrics.tag')}</span>
            <h3 className="fp-card-title">{t('faq.whyUs.metrics.title')}</h3>
            <p className="fp-card-desc">{t('faq.whyUs.metrics.desc')}</p>
            <span className="fp-btn">
              {t('faq.whyUs.metrics.cta')}
              <ArrowIcon />
            </span>
          </a>

          {/* BR: Image card - finance health mockup */}
          <div className="fp-card fp-card-img">
            <div className="fp-mock">
              <div className="fp-mock-health">
                <div className="fp-mock-banner">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t('faq.whyUs.mockB.banner')}
                </div>
                <div className="fp-mock-row headline">
                  <div className="fp-mock-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                  <div className="fp-mock-text">
                    <div className="fp-mock-name">{t('faq.whyUs.mockB.name')}</div>
                    <div className="fp-mock-sub">{t('faq.whyUs.mockB.sub')}</div>
                  </div>
                </div>
                <div className="fp-mock-bignum">90%</div>
                <div className="fp-mock-caption">{t('faq.whyUs.mockB.caption')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

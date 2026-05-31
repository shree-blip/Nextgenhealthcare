import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation('pages');
  const location = useLocation();

  return (
    <section
      aria-labelledby="nf-title"
      style={{ padding: 'clamp(64px, 8vw, 112px) 0 clamp(40px, 5vw, 64px)' }}
    >
      <div className="container-shell">
        <div style={{ maxWidth: 760 }}>
          <span className="results-eyebrow">{t('notFound.hero.eyebrow')}</span>
          <h1
            id="nf-title"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              color: '#2D3748',
              fontWeight: 700,
              margin: '8px 0 16px',
            }}
          >
            {t('notFound.hero.title')}
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: '#4A5568',
              margin: 0,
              maxWidth: '60ch',
            }}
          >
            {t('notFound.hero.bodyBefore')}
            <code
              style={{ background: 'rgba(45,55,72,0.06)', padding: '2px 8px', borderRadius: 6 }}
            >
              {location.pathname}
            </code>
            {t('notFound.hero.bodyAfter')}
          </p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: 28,
              flexWrap: 'wrap',
            }}
          >
            <Link to="/" className="btn-primary">
              {t('notFound.hero.primary')} <ArrowIcon size={13} strokeWidth={2} />
            </Link>
            <Link
              to="/free-growth-audit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 20px',
                borderRadius: 10,
                border: '1.5px solid rgba(45,55,72,0.18)',
                color: '#2D3748',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {t('notFound.hero.secondary')} <ArrowIcon size={13} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';

const Hero = () => {
  const { t } = useTranslation('pages');
  const bullets = t('emailCampaigns.hero.bullets', { returnObjects: true }) as string[];

  return (
    <section className="em-hero">
      <div className="container-shell">
        <div className="em-hero-grid">
          <div>
            <div className="em-hero-crumb">
              <Link to="/services">{t('emailCampaigns.hero.breadcrumbServices')}</Link>
              <span className="sep">/</span>
              <span className="cur">{t('emailCampaigns.hero.breadcrumbCurrent')}</span>
            </div>
            <span className="em-hero-eyebrow">
              <span className="dot" /> {t('emailCampaigns.hero.eyebrow')}
            </span>
            <h1 className="em-hero-title">
              {t('emailCampaigns.hero.titleLine')} <em>{t('emailCampaigns.hero.titleAccent')}</em>
            </h1>
            <p className="em-hero-lede">{t('emailCampaigns.hero.lede')}</p>

            <div className="em-hero-ctas">
              <Link to="/contact" className="sl-btn-primary">
                {t('emailCampaigns.hero.ctaPrimary')}
                <ArrowIcon />
              </Link>
              <a href="#flows" className="sl-btn-ghost">
                {t('emailCampaigns.hero.ctaSecondary')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            <ul className="em-hero-bullets">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="em-hero-check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="em-hero-mock" aria-hidden="true">
            <div className="em-hero-inbox">
              <div className="em-hero-inbox-bar">
                <span className="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg></span>
                <div className="em-hero-search">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  Search mail
                </div>
                <span className="badge">12 new</span>
              </div>

              <div className="em-hero-folders">
                <span className="f active"><span className="dot" />Inbox <em>12</em></span>
                <span className="f">Starred</span>
                <span className="f">Promotions</span>
              </div>

              <ul className="em-hero-list">
                <li className="em-hero-row unread">
                  <span className="em-hero-avatar a1" />
                  <div className="em-hero-row-body">
                    <div className="em-hero-row-top">
                      <span className="em-hero-sender">Dr. Marin · Coastal Dental</span>
                      <span className="em-hero-time">9:42 am</span>
                    </div>
                    <span className="em-hero-subj">Your cleaning is due - here&rsquo;s a 60-second booking link</span>
                    <span className="em-hero-prev">Hi Sarah - it&rsquo;s been 5 months since your last visit. We have Tuesday and Thursday morning slots open this week...</span>
                  </div>
                  <span className="em-hero-tag t-recall">Recall</span>
                </li>

                <li className="em-hero-row unread">
                  <span className="em-hero-avatar a2" />
                  <div className="em-hero-row-body">
                    <div className="em-hero-row-top">
                      <span className="em-hero-sender">Bayview Health</span>
                      <span className="em-hero-time">Yesterday</span>
                    </div>
                    <span className="em-hero-subj">Welcome to the practice - 3 things to know before your first visit</span>
                    <span className="em-hero-prev">We&rsquo;re glad you chose Bayview. Here&rsquo;s what to expect at your appointment, what to bring, and how to reach us if you need...</span>
                  </div>
                  <span className="em-hero-tag t-welcome">Welcome</span>
                </li>

                <li className="em-hero-row">
                  <span className="em-hero-avatar a3" />
                  <div className="em-hero-row-body">
                    <div className="em-hero-row-top">
                      <span className="em-hero-sender">North Vision Care</span>
                      <span className="em-hero-time">2 days</span>
                    </div>
                    <span className="em-hero-subj">A friend who needs us? You earn $25 - they save $50</span>
                    <span className="em-hero-prev">Thanks again for trusting us with your eye care. If anyone in your circle is looking for a new provider...</span>
                  </div>
                  <span className="em-hero-tag t-referral">Referral</span>
                </li>

                <li className="em-hero-row">
                  <span className="em-hero-avatar a4" />
                  <div className="em-hero-row-body">
                    <div className="em-hero-row-top">
                      <span className="em-hero-sender">Lakeside MedSpa</span>
                      <span className="em-hero-time">3 days</span>
                    </div>
                    <span className="em-hero-subj">We miss you - a quick check-in (and a tip for spring)</span>
                    <span className="em-hero-prev">It&rsquo;s been a while since we&rsquo;ve seen you, and we wanted to reach out personally. No pressure...</span>
                  </div>
                  <span className="em-hero-tag t-winback">Win-back</span>
                </li>
              </ul>
            </div>

            <div className="em-hero-tag-pill t1">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
              {t('emailCampaigns.hero.tag1')}
            </div>
            <div className="em-hero-tag-pill t2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.37 1.9.74 2.79a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.89.37 1.83.62 2.79.74A2 2 0 0 1 22 16.92z" /></svg>
              {t('emailCampaigns.hero.tag2')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

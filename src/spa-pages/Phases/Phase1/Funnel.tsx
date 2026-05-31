import { useTranslation } from 'react-i18next';

const Funnel = () => {
  const { t } = useTranslation(['pages']);
  return (
    <section className="ph1-funnel-wrap">
      <div className="ph1-funnel-head">
        <span className="lbl">{t('pages:phases.phase1.funnel.label')}</span>
        <h2>{t('pages:phases.phase1.funnel.title')}</h2>
        <p>{t('pages:phases.phase1.funnel.lede')}</p>
      </div>
      <div className="ph1-funnel" aria-label={t('pages:phases.phase1.funnel.ariaLabel')}>
        <div className="ph1-step">
          <span className="idx">01</span>
          <span className="stage">{t('pages:phases.phase1.funnel.stages.clicks')}</span>
          <div className="bar">
            <div className="fill" style={{ width: '100%' }} />
          </div>
          <div className="num">
            <span className="count">100</span>
            <span className="of">/ 100</span>
          </div>
        </div>

        <div className="ph1-drop">
          <span className="line" aria-hidden="true" />
          <span className="d-val">−16</span>
          <span className="d-reason">{t('pages:phases.phase1.funnel.drops.bounce')}</span>
        </div>

        <div className="ph1-step">
          <span className="idx">02</span>
          <span className="stage">{t('pages:phases.phase1.funnel.stages.landed')}</span>
          <div className="bar">
            <div className="fill" style={{ width: '84%' }} />
          </div>
          <div className="num">
            <span className="count">84</span>
            <span className="of">/ 100</span>
          </div>
        </div>

        <div className="ph1-drop is-leak">
          <span className="line" aria-hidden="true" />
          <span className="d-val">−32</span>
          <span className="d-reason">{t('pages:phases.phase1.funnel.drops.scrollExit')}</span>
          <span className="d-badge">{t('pages:phases.phase1.funnel.biggestLeak')}</span>
        </div>

        <div className="ph1-step leak">
          <span className="idx">03</span>
          <span className="stage">{t('pages:phases.phase1.funnel.stages.engaged')}</span>
          <div className="bar">
            <div className="fill" style={{ width: '52%' }} />
          </div>
          <div className="num">
            <span className="count">52</span>
            <span className="of">/ 100</span>
          </div>
        </div>

        <div className="ph1-drop">
          <span className="line" aria-hidden="true" />
          <span className="d-val">−33</span>
          <span className="d-reason">{t('pages:phases.phase1.funnel.drops.formCall')}</span>
        </div>

        <div className="ph1-step">
          <span className="idx">04</span>
          <span className="stage">{t('pages:phases.phase1.funnel.stages.inquired')}</span>
          <div className="bar">
            <div className="fill" style={{ width: '19%' }} />
          </div>
          <div className="num">
            <span className="count">19</span>
            <span className="of">/ 100</span>
          </div>
        </div>

        <div className="ph1-drop">
          <span className="line" aria-hidden="true" />
          <span className="d-val">−11</span>
          <span className="d-reason">{t('pages:phases.phase1.funnel.drops.deskDrop')}</span>
        </div>

        <div className="ph1-step leak">
          <span className="idx">05</span>
          <span className="stage">{t('pages:phases.phase1.funnel.stages.booked')}</span>
          <div className="bar">
            <div className="fill" style={{ width: '8%' }} />
          </div>
          <div className="num">
            <span className="count">08</span>
            <span className="of">/ 100</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Funnel;

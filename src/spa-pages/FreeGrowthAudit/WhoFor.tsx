import { useTranslation } from 'react-i18next';
import medspaImg from '@/assets/nextgen-image/Medspas&wellnessimg.png';
import urgentImg from '@/assets/nextgen-image/Urgentcareimg.png';
import dentalImg from '@/assets/nextgen-image/Dentalimg.png';
import mentalImg from '@/assets/nextgen-image/Mentalhealthimg.png';
import dermImg from '@/assets/nextgen-image/Dermatologyimg.png';
import plasticImg from '@/assets/nextgen-image/Plasticsurgeryimg.png';
import primaryImg from '@/assets/nextgen-image/Primarycareimg.png';
import erImg from '@/assets/nextgen-image/Erimg.png';

interface Audience {
  key: string;
  type: string;
  pain: string;
  win: string;
}

const IMG_MAP: Record<string, string> = {
  dental: dentalImg,
  medspa: medspaImg,
  urgent: urgentImg,
  primary: primaryImg,
  mental: mentalImg,
  derm: dermImg,
  plastic: plasticImg,
  er: erImg,
};

const WhoFor = () => {
  const { t } = useTranslation('pages');
  const audiences = t('pages:freeGrowthAudit.whoFor.audiences', {
    returnObjects: true,
  }) as Audience[];
  const altSuffix = t('pages:freeGrowthAudit.whoFor.altSuffix');
  return (
    <section className="fga-whofor" aria-labelledby="fga-whofor-title">
      <div className="container-shell">
        <header className="fga-section-head">
          <span className="fga-section-tag">{t('pages:freeGrowthAudit.whoFor.tag')}</span>
          <h2 id="fga-whofor-title" className="fga-section-h2">
            {t('pages:freeGrowthAudit.whoFor.title')}
          </h2>
          <p className="fga-section-lede">{t('pages:freeGrowthAudit.whoFor.lede')}</p>
        </header>

        <div className="fga-whofor-grid">
          {audiences.map((a) => (
            <article key={a.type} className="fga-whofor-card">
              <div className="fga-whofor-img">
                <img
                  src={IMG_MAP[a.key] ?? dentalImg}
                  alt={`${a.type} ${altSuffix}`}
                  loading="lazy"
                />
                <span className="fga-whofor-overlay" aria-hidden="true" />
              </div>
              <div className="fga-whofor-body">
                <h3 className="fga-whofor-type">{a.type}</h3>
                <div className="fga-whofor-meta">
                  <div className="fga-whofor-line">
                    <span className="fga-whofor-tag fga-whofor-tag-pain">
                      {t('pages:freeGrowthAudit.whoFor.painLabel')}
                    </span>
                    <span>{a.pain}</span>
                  </div>
                  <div className="fga-whofor-line">
                    <span className="fga-whofor-tag fga-whofor-tag-win">
                      {t('pages:freeGrowthAudit.whoFor.winLabel')}
                    </span>
                    <span>{a.win}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoFor;

import { useTranslation } from 'react-i18next';
import { usePrinciples } from '@/content/about/principles';
import vendorImg from '@/assets/nextgen-image/Vendorimg.png';

const Genesis = () => {
  const { t } = useTranslation('about');
  const principles = usePrinciples();

  return (
    <section className="ab-genesis" aria-labelledby="ab-gen-title">
      <div className="container-shell">
        <div className="ab-gen-grid">
          <div className="ab-gen-visual" aria-hidden="true">
            <div className="ab-gen-frame">
              <div className="ab-gen-svg">
                <img src={vendorImg} alt="" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>

          <div className="ab-gen-text">
            <span className="ab-gen-eyebrow">{t('genesis.eyebrow')}</span>
            <h2 id="ab-gen-title" className="ab-gen-h2">
              {t('genesis.title')}
            </h2>
            <p dangerouslySetInnerHTML={{ __html: t('genesis.p1') }} />
            <p dangerouslySetInnerHTML={{ __html: t('genesis.p2') }} />

            <div className="ab-gen-principles">
              {principles.map((p) => (
                <div key={p.title} className="ab-gen-principle">
                  <div className="ab-gen-principle-head">
                    <span className="ab-gen-principle-ico" aria-hidden="true">
                      {p.icon}
                    </span>
                    <h3 className="ab-gen-principle-title">{p.title}</h3>
                  </div>
                  <p className="ab-gen-principle-text">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Genesis;

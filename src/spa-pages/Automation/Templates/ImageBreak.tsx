import { useTranslation } from 'react-i18next';
import n8nWorkflowImg from '@/assets/nextgen-image/N8Nworkflowimg.png';

const ImageBreak = () => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="atx-break" aria-hidden="true">
      <div className="container-shell">
        <div className="atx-break-frame">
          <div className="atx-break-art">
            <img
              src={n8nWorkflowImg}
              alt=""
              loading="lazy"
              decoding="async"
              className="atx-break-img"
            />
          </div>
          <div className="atx-break-meta">
            <span className="atx-mono">{t('automation:templates.page.imageBreak.caption')}</span>
            <p className="atx-break-caption">
              {t('automation:templates.page.imageBreak.text')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageBreak;

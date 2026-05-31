import { useTranslation } from 'react-i18next';
import { useIndustryDeepDiveBlocks } from '@/content/industries/deep-dive';

const IndustryDeepDive = () => {
  const { t } = useTranslation('industries');
  const blocks = useIndustryDeepDiveBlocks();

  return (
    <section className="ind-deep" id="deep-dive" aria-labelledby="ind-deep-title">
      <div className="container-shell">
        <div className="ind-deep-head">
          <span className="ind-deep-eyebrow">{t('deepDive.eyebrow')}</span>
          <h2 id="ind-deep-title" className="ind-deep-h2">
            {t('deepDive.title')}
          </h2>
          <p className="ind-deep-sub">{t('deepDive.subtitle')}</p>
        </div>

        {blocks.map((block) => (
          <article key={block.id} className="ind-block" id={block.id}>
            <header className="ind-block-head">
              <span className="ind-block-num">
                <span className="num">{block.num}</span>
                {block.badge}
              </span>
              <span className={block.iconClass} aria-hidden="true">
                {block.icon}
              </span>
              <h3 className="ind-block-title">{block.title}</h3>
              <p className="ind-block-desc">{block.desc}</p>
              <div className="ind-block-meta">
                {block.tags.map((tag) => (
                  <span key={tag} className="ind-block-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="ind-block-cards">
              {block.subs.map((sub) => (
                <div key={sub.num} className="ind-sub">
                  <span className="ind-sub-num">
                    {sub.num} &nbsp; {sub.category}
                  </span>
                  <h4 className="ind-sub-title">{sub.title}</h4>
                  <p className="ind-sub-text">{sub.text}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default IndustryDeepDive;

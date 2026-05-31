import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowIcon } from '@/components/icons';
import { type Template } from './data';

const TemplateCard = ({ t: tpl, index }: { t: Template; index: number }) => {
  const { t } = useTranslation(['automation']);
  return (
    <li id={`tpl-${tpl.num}`} className={`atx-card tone-${tpl.tone}`}>
      <div className="atx-card-art">
        <img
          className="atx-card-img"
          src={tpl.img}
          alt={tpl.imgAlt}
          loading="lazy"
          decoding="async"
        />
        <span className="atx-card-num" aria-hidden="true">
          /{tpl.num}
        </span>
        <span className="atx-card-cat-pill" aria-hidden="true">
          {tpl.cat}
        </span>
      </div>
      <div className="atx-card-body">
        <div className="atx-card-head">
          <span className="atx-card-mono">
            FIG. {String(index + 2).padStart(2, '0')} — {tpl.cat.toUpperCase()}
          </span>
          <h3 className="atx-card-title">{tpl.title}</h3>
          <p className="atx-card-blurb">{tpl.blurb}</p>
        </div>

        <div className="atx-card-specs">
          <div className="atx-card-spec">
            <span className="atx-card-spec-label">
              {t('automation:templates.page.library.card.build')}
            </span>
            <span className="atx-card-spec-value">{tpl.nodes}</span>
          </div>
          <div className="atx-card-spec">
            <span className="atx-card-spec-label">
              {t('automation:templates.page.library.card.setup')}
            </span>
            <span className="atx-card-spec-value">{tpl.effort}</span>
          </div>
          <div className="atx-card-spec">
            <span className="atx-card-spec-label">
              {t('automation:templates.page.library.card.value')}
            </span>
            <span className="atx-card-spec-value">{tpl.saves}</span>
          </div>
          <div className="atx-card-spec">
            <span className="atx-card-spec-label">
              {t('automation:templates.page.library.card.compliance')}
            </span>
            <span className="atx-card-spec-value">{tpl.compliance}</span>
          </div>
        </div>

        <div className="atx-card-foot">
          <p className="atx-card-pull">&ldquo;{tpl.pull}&rdquo;</p>
          <Link
            to={tpl.detailPath ?? '/free-growth-audit'}
            className="atx-btn atx-btn-primary atx-btn-sm"
            aria-label={t('automation:templates.page.library.card.ctaAria', { title: tpl.title })}
          >
            {t('automation:templates.page.library.card.cta')} <ArrowIcon size={14} />
          </Link>
        </div>
      </div>
    </li>
  );
};

const Library = ({ visible }: { visible: Template[] }) => {
  const { t } = useTranslation(['automation']);
  return (
    <section className="atx-list" id="atx-list" aria-labelledby="atx-list-title">
      <div className="container-shell">
        <header className="adv-head det-head">
          <span className="adv-eyebrow">{t('automation:templates.page.library.label')}</span>
          <h2 id="atx-list-title" className="adv-h2">
            {t('automation:templates.page.library.title')}
          </h2>
          <p className="adv-intro">{t('automation:templates.page.library.intro')}</p>
        </header>

        {visible.length === 0 ? (
          <div className="atx-empty">
            <span className="atx-empty-icon" aria-hidden="true">
              ∅
            </span>
            <p>
              {t('automation:templates.page.library.emptyText')}
              <Link to="/free-growth-audit">
                {t('automation:templates.page.library.emptyLink')}
              </Link>
              .
            </p>
          </div>
        ) : (
          <ol className="atx-cards">
            {visible.map((tpl, i) => (
              <TemplateCard key={tpl.num} t={tpl} index={i} />
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};

export default Library;

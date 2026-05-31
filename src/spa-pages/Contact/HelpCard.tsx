import { useTranslation } from 'react-i18next';
import { useHelpRows, useSocials } from '@/content/contact/help';

const HelpCard = () => {
  const { t } = useTranslation('contact');
  const rows = useHelpRows();
  const socials = useSocials();

  return (
    <aside className="ct-help" aria-labelledby="help-title">
      <span className="ct-help-eyebrow">{t('help.eyebrow')}</span>
      <h3 id="help-title" className="ct-help-title">
        {t('help.title')}
      </h3>

      <div className="ct-help-rows">
        {rows.map((row) => (
          <a key={row.tag} href={row.href} className="ct-help-row">
            <span className="ct-help-row-ico" aria-hidden="true">
              {row.icon}
            </span>
            <div className="ct-help-row-body">
              <span className="ct-help-row-tag">{row.tag}</span>
              <span className="ct-help-row-value">{row.value}</span>
            </div>
          </a>
        ))}
      </div>

      <div className="ct-help-social">
        <span className="ct-help-social-label">{t('help.social')}</span>
        <div className="ct-help-social-icons">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default HelpCard;

import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowIcon, CheckIcon } from '@/components/icons';

interface AuditFormProps {
  variant?: 'hero' | 'closing';
  /** id used by aria-labelledby — pass the heading's id */
  labelledBy?: string;
}

const AuditForm = ({ variant = 'hero', labelledBy }: AuditFormProps) => {
  const { t } = useTranslation('pages');
  const practiceTypes = t('pages:freeGrowthAudit.auditForm.practiceTypes', {
    returnObjects: true,
  }) as string[];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [practice, setPractice] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !website.trim() || !practice) {
      setError(t('pages:freeGrowthAudit.auditForm.errorRequired'));
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(t('pages:freeGrowthAudit.auditForm.errorEmail'));
      return;
    }

    const body = encodeURIComponent(
      `${t('pages:freeGrowthAudit.auditForm.mailBodyTitle')}%0D%0A%0D%0A` +
        `${t('pages:freeGrowthAudit.auditForm.mailBodyName')}: ${name}%0D%0A` +
        `${t('pages:freeGrowthAudit.auditForm.mailBodyEmail')}: ${email}%0D%0A` +
        `${t('pages:freeGrowthAudit.auditForm.mailBodyWebsite')}: ${website}%0D%0A` +
        `${t('pages:freeGrowthAudit.auditForm.mailBodyPractice')}: ${practice}`,
    );
    const subject = encodeURIComponent(t('pages:freeGrowthAudit.auditForm.mailSubject'));
    window.location.href = `mailto:hello@thenextgenhealth.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className={`fga-form fga-form-${variant} fga-form-success`}
        role="status"
        aria-live="polite"
      >
        <div className="fga-form-success-icon" aria-hidden="true">
          <CheckIcon size={28} />
        </div>
        <h3 className="fga-form-success-h">
          {t('pages:freeGrowthAudit.auditForm.successTitle')}
        </h3>
        <p className="fga-form-success-p">
          {t('pages:freeGrowthAudit.auditForm.successBody')}
        </p>
      </div>
    );
  }

  return (
    <form
      className={`fga-form fga-form-${variant}`}
      onSubmit={handleSubmit}
      aria-labelledby={labelledBy}
      noValidate
    >
      <div className="fga-form-row">
        <label className="fga-form-field">
          <span className="fga-form-label">{t('pages:freeGrowthAudit.auditForm.labelName')}</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('pages:freeGrowthAudit.auditForm.placeholderName')}
            autoComplete="name"
            required
          />
        </label>
        <label className="fga-form-field">
          <span className="fga-form-label">{t('pages:freeGrowthAudit.auditForm.labelEmail')}</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('pages:freeGrowthAudit.auditForm.placeholderEmail')}
            autoComplete="email"
            required
          />
        </label>
      </div>
      <div className="fga-form-row">
        <label className="fga-form-field">
          <span className="fga-form-label">{t('pages:freeGrowthAudit.auditForm.labelWebsite')}</span>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder={t('pages:freeGrowthAudit.auditForm.placeholderWebsite')}
            autoComplete="url"
            required
          />
        </label>
        <label className="fga-form-field">
          <span className="fga-form-label">{t('pages:freeGrowthAudit.auditForm.labelPractice')}</span>
          <select value={practice} onChange={(e) => setPractice(e.target.value)} required>
            <option value="" disabled>
              {t('pages:freeGrowthAudit.auditForm.chooseOne')}
            </option>
            {practiceTypes.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>
      {error && (
        <p className="fga-form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="fga-form-submit">
        {t('pages:freeGrowthAudit.auditForm.submit')}
        <ArrowIcon size={16} />
      </button>
      <p className="fga-form-fine">
        <span className="fga-form-fine-dot" aria-hidden="true" />
        {t('pages:freeGrowthAudit.auditForm.fine')}
      </p>
    </form>
  );
};

export default AuditForm;

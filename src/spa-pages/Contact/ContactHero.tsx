import { useTranslation } from 'react-i18next';
import { AnimatedBackground } from '@/lib/motion';

const ContactHero = () => {
  const { t } = useTranslation('contact');

  return (
    <section className="ct-hero" aria-labelledby="ct-title">
      <AnimatedBackground variant="aurora" intensity="subtle" />
      <div className="container-shell">
        <span className="ct-hero-eyebrow reveal d1">{t('hero.eyebrow')}</span>
        <h1 id="ct-title" className="ct-hero-h1 reveal d2">
          {t('hero.titleStart')} <span className="accent">{t('hero.titleAccent')}</span>
        </h1>
        <p className="ct-hero-lede reveal d3">{t('hero.lede')}</p>
      </div>
    </section>
  );
};

export default ContactHero;

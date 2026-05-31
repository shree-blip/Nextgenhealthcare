import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRightIcon } from '@/components/icons';
import { useHomeTestimonials, useHomeTestimonialsHead } from '@/content/home/testimonials';

const QuoteMark = () => (
  <span className="testi-mark" aria-hidden="true">
    <svg
      width={56}
      height={44}
      viewBox="0 0 56 44"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 44V25.6C0 18.6 1.5 12.7 4.6 7.8 7.7 2.9 12.6 0 19.4 0v8.4c-3.4 1-5.9 2.8-7.4 5.4-1.5 2.6-2.3 5.6-2.3 9v3.2H19.4V44H0zm32 0V25.6c0-7 1.5-12.9 4.6-17.8C39.7 2.9 44.6 0 51.4 0v8.4c-3.4 1-5.9 2.8-7.4 5.4-1.5 2.6-2.3 5.6-2.3 9v3.2H51.4V44H32z" />
    </svg>
  </span>
);

const ChevronLeft = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => <ChevronRightIcon size={18} strokeWidth={2} />;

const Testimonials = () => {
  const { t } = useTranslation('home');
  const head = useHomeTestimonialsHead();
  const testimonials = useHomeTestimonials();
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [fillStyle, setFillStyle] = useState<CSSProperties>({});

  const update = () => {
    const track = trackRef.current;
    const bar = barRef.current;
    if (!track || !bar) return;
    const max = track.scrollWidth - track.clientWidth;
    setPrevDisabled(track.scrollLeft <= 1);
    setNextDisabled(track.scrollLeft >= max - 1);
    const barW = bar.clientWidth;
    const segW = Math.max(40, (track.clientWidth / track.scrollWidth) * barW);
    const pct = max > 0 ? track.scrollLeft / max : 0;
    setFillStyle({
      width: `${segW}px`,
      transform: `translateX(${pct * (barW - segW)}px)`,
    });
  };

  const step = () => {
    const track = trackRef.current;
    if (!track) return 400;
    const card = track.querySelector<HTMLElement>('.testi-card');
    if (!card) return 400;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const handlePrev = () => trackRef.current?.scrollBy({ left: -step(), behavior: 'smooth' });
  const handleNext = () => trackRef.current?.scrollBy({ left: step(), behavior: 'smooth' });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    const t = window.setTimeout(update, 250);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="testi-section" id="testimonials" aria-labelledby="testi-title">
      <div className="container-shell">
        <div className="testi-head">
          <span className="testi-eyebrow">{head.eyebrow}</span>
          <h2 id="testi-title" className="testi-h2">
            {head.title}
          </h2>
          <p className="testi-sub">{head.sub}</p>
        </div>

        <div className="testi-track-wrap">
          <div className="testi-track" ref={trackRef}>
            {testimonials.map(({ key, initials, text, name, title }) => (
              <article key={key} className="testi-card">
                <QuoteMark />
                <p className="testi-text">{text}</p>
                <div className="testi-author">
                  <span className="testi-line" aria-hidden="true" />
                  <div className="testi-avatar" aria-hidden="true">
                    {initials}
                  </div>
                  <div className="testi-meta">
                    <p className="testi-name">{name}</p>
                    <p className="testi-title">{title}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="testi-nav" role="group" aria-label={t('testimonials.nav.groupLabel')}>
          <button
            type="button"
            className="nav-chev prev"
            onClick={handlePrev}
            disabled={prevDisabled}
            aria-label={t('testimonials.nav.prev')}
          >
            <ChevronLeft />
          </button>
          <div className="nav-bar" ref={barRef} aria-hidden="true">
            <span className="nav-bar-fill" style={fillStyle} />
          </div>
          <button
            type="button"
            className="nav-chev next"
            onClick={handleNext}
            disabled={nextDisabled}
            aria-label={t('testimonials.nav.next')}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

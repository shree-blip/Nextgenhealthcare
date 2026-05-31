import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, TouchEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CASE_STUDIES } from './caseStudies.data';
import { ArrowIcon, ArrowOutIcon } from '@/components/icons';

const CARDS = CASE_STUDIES;

const visibleForWidth = (w: number) => {
  if (w <= 640) return 1;
  if (w <= 1024) return 2;
  return 3;
};

const ArrowLeft = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ArrowRight = () => <ArrowIcon strokeWidth={2} />;

const CaseStudiesCarousel = () => {
  const { t } = useTranslation('pages');
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(() =>
    typeof window === 'undefined' ? 3 : visibleForWidth(window.innerWidth)
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = CARDS.length;
  const maxIndex = Math.max(0, total - visible);

  // Resize listener
  useEffect(() => {
    let resizeT: number | undefined;
    const onResize = () => {
      if (resizeT) window.clearTimeout(resizeT);
      resizeT = window.setTimeout(() => {
        const v = visibleForWidth(window.innerWidth);
        setVisible(v);
        setIndex((i) => Math.min(i, Math.max(0, total - v)));
      }, 120);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      if (resizeT) window.clearTimeout(resizeT);
    };
  }, [total]);

  // Apply transform whenever index or visible changes (also on first paint)
  useLayoutEffect(() => {
    const track = trackRef.current;
    const card = cardRef.current;
    if (!track || !card) return;
    const cw = card.getBoundingClientRect().width;
    const gapStr = getComputedStyle(track).columnGap || getComputedStyle(track).gap;
    const gap = parseInt(gapStr, 10) || 24;
    track.style.transform = `translateX(-${index * (cw + gap)}px)`;
  }, [index, visible]);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => Math.max(0, Math.min(maxIndex, i + delta)));
    },
    [maxIndex]
  );

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  // Progress bar fill: minimum is "what fraction of total is visible", grows up to 100%
  const minFill = (visible / total) * 100;
  const span = 100 - minFill;
  const ratio = maxIndex === 0 ? 1 : index / maxIndex;
  const fillPct = `${minFill + span * ratio}%`;

  return (
    <section className="cs-carousel" id="cs-all">
      <div className="container-shell">
        <div className="cs-head">
          <div>
            <div className="cs-eyebrow">{t('caseStudies.carousel.eyebrow')}</div>
            <h2 className="cs-title">{t('caseStudies.carousel.title')}</h2>
          </div>
          <p className="cs-sub">{t('caseStudies.carousel.sub')}</p>
        </div>

        <div className="cs-slider" tabIndex={0} onKeyDown={onKey} aria-roledescription="carousel">
          <div className="cs-track-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="cs-track" ref={trackRef}>
              {CARDS.map((card, i) => {
                const localizedName = t(`caseStudies.studies.${card.id}.name`, card.name);
                return (
                  <Link
                    key={card.id}
                    ref={i === 0 ? cardRef : undefined}
                    to={`/case-studies/${card.id}`}
                    className="cs-card"
                    aria-label={t('caseStudies.carousel.readAriaLabel', { name: localizedName })}
                  >
                    <div className="cs-card-top">
                      <span className="cs-emoji" aria-hidden="true">
                        {card.emoji}
                      </span>
                      <div className="cs-metric">
                        <div className="cs-metric-num">{card.metricNum}</div>
                        <div className="cs-metric-lbl">
                          {t(`caseStudies.studies.${card.id}.metricLbl`, card.metricLbl)}
                        </div>
                      </div>
                    </div>
                    <span className="cs-sector">
                      {t(`caseStudies.studies.${card.id}.sector`, card.sector)}
                    </span>
                    <h3 className="cs-name">{localizedName}</h3>
                    <div className="cs-blocks">
                      {card.blocks.map((block) => {
                        const blockKey = block.label.toLowerCase();
                        return (
                          <div key={block.label} className="cs-block">
                            <span className="cs-block-lbl">
                              {t(`caseStudies.detail.phaseLabels.${block.label}`, block.label)}
                            </span>
                            <p className="cs-block-txt">
                              {t(
                                `caseStudies.studies.${card.id}.blocks.${blockKey}`,
                                block.text
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="cs-foot">
                      {t('caseStudies.carousel.readFullCase')}
                      <ArrowOutIcon />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="cs-controls">
            <button
              type="button"
              className="cs-btn cs-btn-prev"
              onClick={() => go(-1)}
              disabled={index <= 0}
              aria-label={t('caseStudies.carousel.prevAriaLabel')}
            >
              <ArrowLeft />
            </button>
            <div
              className="cs-progress"
              aria-hidden="true"
              style={{ '--cs-fill': fillPct } as CSSProperties}
            />
            <button
              type="button"
              className="cs-btn cs-btn-next"
              onClick={() => go(1)}
              disabled={index >= maxIndex}
              aria-label={t('caseStudies.carousel.nextAriaLabel')}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesCarousel;

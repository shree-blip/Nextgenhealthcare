import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MotionCard, useReducedMotion } from '@/lib/motion';
import { useHomeServices, useHomeServicesHead } from '@/content/home/services';

/*
 * Premium scroll-pinned horizontal slider.
 *
 * On desktop (>900px, non-touch, non-reduced-motion) we lazy-load GSAP
 * ScrollTrigger and pin the section while translating the card track on
 * vertical wheel input. Once the user has scrolled past the last card the
 * page resumes vertical flow normally.
 *
 * Mobile / touch / reduced motion fall back to the original native
 * `overflow-x: auto` snap-scroll behavior - no scroll hijacking.
 */

const CardArrow = () => (
  <span className="card-arrow" aria-hidden="true">
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  </span>
);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinActive, setPinActive] = useState(false);
  const reduced = useReducedMotion();
  const head = useHomeServicesHead();
  const services = useHomeServices();

  // GSAP pin + horizontal scroll - desktop, non-touch, non-reduced-motion only.
  // On mobile / reduced motion the native `overflow-x: auto` + scroll-snap on
  // .services-grid takes over (the user can swipe / drag).
  useEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(max-width: 900px)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Switch CSS to pinned mode before GSAP measures. Wait two frames
      // so React flushes + the browser applies the new layout (cards
      // overflow the wrap → scrollWidth > clientWidth = real distance).
      setPinActive(true);
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));
      if (cancelled) return;

      const getDistance = () => Math.max(0, track.scrollWidth - track.clientWidth);

      const ctx = gsap.context(() => {
        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          animation: tween,
          invalidateOnRefresh: true,
        });

        // Recompute now that the pinned-mode CSS is settled.
        ScrollTrigger.refresh();
      }, section);

      cleanup = () => {
        ctx.revert();
        setPinActive(false);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className={`services-section${pinActive ? ' is-pinned' : ''}`}
      id="services"
      aria-labelledby="services-title"
    >
      <div className="container-shell">
        <div className="services-head">
          <span className="services-eyebrow">{head.eyebrow}</span>
          <h2 id="services-title" className="services-h2">
            {head.title}
          </h2>
          <div className="services-aside">
            <Link to={head.allLinkTo} className="all-link">
              {head.allLinkText}
              <span className="ico" aria-hidden="true">
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </Link>
            <p className="services-sub">{head.sub}</p>
          </div>
        </div>

        <div className="services-track-wrap">
          <div className="services-grid" ref={trackRef}>
            {services.map(({ key, tag, title, sub, ariaLabel, image, imgFocus, to }) => (
              <MotionCard key={key} naked tilt={4} className="service-card-tilt">
                <Link to={to} className="service-card" aria-label={ariaLabel}>
                  <div className="card-img">
                    <CardArrow />
                    <img
                      src={image}
                      alt={title}
                      width={1448}
                      height={1086}
                      loading="lazy"
                      decoding="async"
                      style={
                        imgFocus && imgFocus !== 'center'
                          ? {
                              transform: 'scale(1.25)',
                              transformOrigin: `${imgFocus} center`,
                              objectPosition: `${imgFocus} center`,
                            }
                          : undefined
                      }
                    />
                  </div>
                  <span className="card-tag">{tag}</span>
                  <h3 className="card-title">{title}</h3>
                  <p className="card-sub">{sub}</p>
                </Link>
              </MotionCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

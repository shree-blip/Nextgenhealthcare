import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from '@/lib/motion';
import { useProcessSteps } from '@/content/services/process';

/*
 * GSAP is lazy-loaded inside useEffect below, ONLY when:
 *   - the Process section actually mounts (route hit)
 *   - viewport > 900px (desktop)
 *   - prefers-reduced-motion is NOT set
 *
 * Result: GSAP + ScrollTrigger (~120 KB minified) are split into a
 * separate chunk and never fetched on mobile or under reduced motion.
 */

const Process = () => {
  const { t } = useTranslation('services');
  const steps = useProcessSteps();
  const sectionRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined') return;
    // Skip GSAP entirely on small / touch viewports - keep page light
    if (window.matchMedia('(max-width: 900px)').matches) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      // Dynamic imports - Vite splits these into a separate chunk that
      // never reaches mobile / reduced-motion users.
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      const stepEls = section.querySelectorAll<HTMLElement>('.step-circle');
      stepEls.forEach((s) => {
        gsap.set(s, { opacity: 0.55, scale: 0.96 });
      });

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 4.5,
            ease: 'power1.inOut',
          },
          0
        );

        stepEls.forEach((s, i) => {
          tl.to(s, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }, 0.3 + i * 0.6);
        });
      }, section);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="process-section"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="container-shell">
        <div className="process-head">
          <span className="process-eyebrow">{t('process.indexEyebrow')}</span>
          <h2 id="process-title" className="process-h2">
            {t('process.indexTitle')}
          </h2>
          <p className="process-intro">{t('process.indexIntro')}</p>
        </div>

        <ol className="process-steps process-steps--curved">
          {/* Decorative wave connector - GSAP scrubs strokeDashoffset to draw it on scroll */}
          <svg
            className="process-curve"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={pathRef}
              d="M 100 60 C 200 60, 200 140, 300 140 S 400 60, 500 60 S 600 140, 700 140 S 800 60, 900 60 S 1000 140, 1100 140"
              fill="none"
              stroke="#B38B6D"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.75"
            />
          </svg>

          {steps.map(({ num, title, desc, active }) => (
            <li key={num} className={`step${active ? ' is-active' : ''}`}>
              <div className="step-circle" aria-hidden="true">
                <span>
                  <span className="step-num">{num}</span>
                  <span className="step-title-visible">{title}</span>
                </span>
              </div>
              {/* Screen-reader-only heading; the visible title above is hidden via aria-hidden */}
              <h3 className="sr-only">{title}</h3>
              <p className="step-desc">{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;

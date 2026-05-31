import { useEffect, useRef, useState } from 'react';

const Gauge = ({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) => {
  const radius = 30;
  const circ = 2 * Math.PI * radius;
  const target = (pct / 100) * circ;
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [dash, setDash] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!wrapRef.current) return;
    const node = wrapRef.current;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let startTime = 0;
    let pulseInterval: ReturnType<typeof setInterval> | null = null;

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const dur = 1400;

    const start = () => {
      setLive(true);
      if (reduce) {
        setDash(target);
        return;
      }
      const step = (now: number) => {
        if (!startTime) startTime = now;
        const t = Math.min(1, (now - startTime) / dur);
        setDash(target * ease(t));
        if (t < 1) raf = requestAnimationFrame(step);
        else {
          pulseInterval = setInterval(() => {
            setDash((d) => {
              const min = target * 0.94;
              const next = d <= target * 0.97 ? target : min;
              return next;
            });
          }, 2400);
        }
      };
      const startDelay = setTimeout(() => {
        raf = requestAnimationFrame(step);
      }, delay);
      return () => clearTimeout(startDelay);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      if (pulseInterval) clearInterval(pulseInterval);
    };
  }, [target, delay]);

  return (
    <div className="slax-gauge-svg-wrap" ref={wrapRef}>
      <svg viewBox="0 0 76 76" width={76} height={76} aria-hidden="true">
        <circle cx="38" cy="38" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="6" />
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 38 38)"
          style={{ transition: 'stroke-dasharray 1.6s cubic-bezier(0.22, 0.61, 0.36, 1)' }}
        />
        <circle
          className={live ? 'slax-gauge-dot is-live' : 'slax-gauge-dot'}
          cx={38 + radius * Math.cos(2 * Math.PI * (dash / circ) - Math.PI / 2)}
          cy={38 + radius * Math.sin(2 * Math.PI * (dash / circ) - Math.PI / 2)}
          r={3.4}
          fill={color}
        />
      </svg>
    </div>
  );
};

export default Gauge;

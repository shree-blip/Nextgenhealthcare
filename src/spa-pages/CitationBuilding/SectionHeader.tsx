import { COLORS } from './data';

const SectionHeader = ({
  no,
  eyebrow,
  title,
  kicker,
}: {
  no: string;
  eyebrow: string;
  title: React.ReactNode;
  kicker?: string;
}) => (
  <header className="mb-12 lg:mb-16 grid lg:grid-cols-12 gap-x-12 gap-y-4">
    <div className="lg:col-span-7">
      <div
        className="flex items-center gap-3 font-mono text-[12px] tracking-[0.22em] uppercase"
        style={{ color: COLORS.tan }}
      >
        <span className="font-bold">{no}</span>
        <span className="h-px w-12" style={{ background: COLORS.tan, opacity: 0.5 }} />
        <span className="font-bold">{eyebrow}</span>
      </div>
      <h2
        className="mt-5 font-extrabold tracking-[-0.024em] leading-[1.08] text-[clamp(28px,3.6vw,46px)]"
        style={{ color: COLORS.navy }}
      >
        {title}
      </h2>
    </div>
    {kicker && (
      <p
        className="lg:col-span-5 text-[15.5px] leading-[1.7] max-w-[44ch] self-end"
        style={{ color: COLORS.body }}
      >
        {kicker}
      </p>
    )}
  </header>
);

export default SectionHeader;

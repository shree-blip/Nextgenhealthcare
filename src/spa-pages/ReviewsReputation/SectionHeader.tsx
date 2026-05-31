/* ─── Editorial section header — bold all-caps + arrow chain on the right ─── */
const SectionHeader = ({
  no,
  eyebrow,
  title,
  kicker,
}: {
  no: string;
  eyebrow?: string;
  title: React.ReactNode;
  kicker?: string;
}) => (
  <header className="mb-[clamp(40px,5vw,72px)] grid lg:grid-cols-12 gap-x-12 gap-y-6 items-end">
    <div className="lg:col-span-8">
      <div className="flex items-center gap-3 text-line font-mono text-[12px] tracking-[0.24em] uppercase">
        <span className="font-bold">{no}</span>
        <span className="h-px w-16 bg-line-soft" />
        {eyebrow && <span>{eyebrow}</span>}
      </div>
      <h2 className="mt-5 text-heading font-extrabold uppercase leading-[1.02] tracking-[-0.022em] text-[clamp(28px,4.4vw,56px)]">
        {title}
      </h2>
    </div>
    {kicker && (
      <p className="lg:col-span-4 text-body text-[15px] leading-[1.7] max-w-[44ch]">{kicker}</p>
    )}
  </header>
);

export default SectionHeader;

import { ArrowIcon } from '@/components/icons';
import { useHomeFaqHead, useHomeFaqStillCard, useHomeFaqs } from '@/content/home/faqs';

interface FAQProps {
  onBook: () => void;
}

const FAQChevron = () => (
  <span className="faq-chev" aria-hidden="true">
    <span className="plus-h" />
    <span className="plus-v" />
  </span>
);

const FAQ = ({ onBook }: FAQProps) => {
  const head = useHomeFaqHead();
  const still = useHomeFaqStillCard();
  const faqs = useHomeFaqs();

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="container-shell">
        <div className="faq-grid">
          {/* LEFT: heading + still-have-questions card */}
          <div className="faq-left">
            <span className="faq-eyebrow">{head.eyebrow}</span>
            <h2 id="faq-title" className="faq-h2">
              {head.titleLine1} <br />
              {head.titleLine2Lead} <span className="accent-text">{head.titleLine2Accent}</span>.
            </h2>
            <p className="faq-intro">{head.intro}</p>

            <div className="still-card">
              <h3>{still.title}</h3>
              <p>{still.para1}</p>
              <p>{still.para2}</p>
              <button
                type="button"
                className="btn-primary"
                onClick={onBook}
                aria-haspopup="dialog"
                aria-controls="bookingModal"
              >
                {still.ctaText}
                <ArrowIcon size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* RIGHT: accordion */}
          <div className="faq-right">
            {faqs.map(({ key, q, a, defaultOpen }) => (
              <details
                key={key}
                className="faq-item"
                name="home-faq"
                {...(defaultOpen ? { open: true } : {})}
              >
                <summary>
                  <span className="faq-q">{q}</span>
                  <FAQChevron />
                </summary>
                <p className="faq-a">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

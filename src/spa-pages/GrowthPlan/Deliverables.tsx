import { useTranslation } from 'react-i18next';
import {
  FileIcon,
  ChartIcon,
  NetworkIcon,
  LinkIcon,
  ClockIcon,
  UsersIcon,
} from '@/components/icons';

interface DeliverableItem {
  title: string;
  body: string;
}

const ICONS = [FileIcon, ChartIcon, NetworkIcon, LinkIcon, ClockIcon, UsersIcon];

const Deliverables = () => {
  const { t } = useTranslation('pages');
  const items = t('pages:growthPlan.deliverables.items', { returnObjects: true }) as DeliverableItem[];

  return (
    <section className="border-t border-line-faint">
      <div className="container-shell py-[clamp(64px,9vw,128px)]">
        <div className="grid lg:grid-cols-12 gap-x-16 gap-y-6 mb-12 items-end">
          <div className="lg:col-span-7">
            <div className="text-line font-mono text-[12px] tracking-[0.24em] uppercase">
              {t('pages:growthPlan.deliverables.eyebrow')}
            </div>
            <h2 className="mt-4 text-heading text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.024em] leading-[1.1]">
              {t('pages:growthPlan.deliverables.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-body text-[15px] leading-[1.7] max-w-[44ch]">
              {t('pages:growthPlan.deliverables.lede')}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = ICONS[i] ?? FileIcon;
            return (
              <article
                key={it.title}
                className="group bg-white border border-line-faint rounded-[16px] p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(45,55,72,0.22)]"
              >
                <span
                  className="inline-grid place-items-center w-12 h-12 rounded-[12px] text-cta"
                  style={{ background: 'rgba(87, 109, 181, 0.10)' }}
                  aria-hidden="true"
                >
                  <Icon size={22} />
                </span>
                <h3 className="text-heading text-[18px] font-bold tracking-[-0.012em] leading-[1.25]">
                  {it.title}
                </h3>
                <p className="text-body text-[14px] leading-[1.65]">{it.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Deliverables;

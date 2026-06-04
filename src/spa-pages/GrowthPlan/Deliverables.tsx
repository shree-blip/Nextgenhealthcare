import { useTranslation } from 'react-i18next';
import {
  FileIcon,
  ChartIcon,
  NetworkIcon,
  LinkIcon,
  ClockIcon,
  UsersIcon,
} from '@/components/icons';
import { Eyebrow } from './parts';

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
        <div className="mb-14 grid items-end gap-x-16 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow color="#576DB5">{t('pages:growthPlan.deliverables.eyebrow')}</Eyebrow>
            <h2 className="mt-5 text-[clamp(28px,3vw,42px)] font-bold leading-[1.1] tracking-[-0.024em] text-heading">
              {t('pages:growthPlan.deliverables.title')}
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[44ch] text-[15px] leading-[1.7] text-body">
              {t('pages:growthPlan.deliverables.lede')}
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = ICONS[i] ?? FileIcon;
            return (
              <article
                key={it.title}
                className="group flex flex-col gap-4 rounded-[18px] border border-line-faint bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cta/30 hover:shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-grid h-12 w-12 place-items-center rounded-[14px] text-cta"
                    style={{ background: 'rgba(87, 109, 181, 0.10)' }}
                    aria-hidden="true"
                  >
                    <Icon size={22} />
                  </span>
                  <span className="font-mono text-[12px] font-bold text-line/40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-[18px] font-bold leading-[1.25] tracking-[-0.012em] text-heading">
                  {it.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-body">{it.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Deliverables;

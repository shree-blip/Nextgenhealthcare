import { useTranslation } from 'react-i18next';
import { FILTERS, type Category } from './data';

const FilterBar = ({
  filter,
  setFilter,
}: {
  filter: 'All' | Category;
  setFilter: (f: 'All' | Category) => void;
}) => {
  const { t } = useTranslation(['automation']);
  const hint =
    filter === 'All'
      ? t('automation:templates.page.filterBar.hintAll')
      : t('automation:templates.page.filterBar.hintCategory', { category: filter.toLowerCase() });

  return (
    <section
      className="atx-filters"
      aria-label={t('automation:templates.page.filterBar.ariaLabel')}
    >
      <div className="container-shell">
        <div className="atx-filter-head">
          <span className="atx-eyebrow">
            <span className="atx-eyebrow-dot" />
            {t('automation:templates.page.filterBar.eyebrow')}
          </span>
          <p className="atx-filter-hint">{hint}</p>
        </div>
        <div className="atx-filter-row" role="tablist">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              className={`atx-chip${filter === f ? ' is-active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {t(`automation:templates.page.filterBar.filters.${f}`)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterBar;

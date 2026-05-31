import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useFAQCategories } from '@/content/faq/categories';

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const FAQList = () => {
  const { t } = useTranslation('pages');
  const categories = useFAQCategories();
  const [query, setQuery] = useState('');
  const [openKey, setOpenKey] = useState<string | null>('cat-01:01.01');
  const [activeCat, setActiveCat] = useState(categories[0]?.id ?? '');
  const catRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const trimmed = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!trimmed) {
      return categories.map((c) => ({ ...c, matches: c.items }));
    }
    return categories.map((c) => ({
      ...c,
      matches: c.items.filter((i) => {
        const text = `${i.num} ${i.q}`.toLowerCase();
        return text.includes(trimmed);
      }),
    }));
  }, [trimmed, categories]);

  const totalMatches = filtered.reduce((sum, c) => sum + c.matches.length, 0);
  const isEmpty = trimmed !== '' && totalMatches === 0;

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.pageYOffset + 160;
      let active = categories[0]?.id ?? '';
      for (const c of categories) {
        const el = catRefs.current[c.id];
        if (el && el.offsetTop <= scrollY) active = c.id;
      }
      setActiveCat(active);
    };
    let t: ReturnType<typeof setTimeout>;
    const handler = () => {
      clearTimeout(t);
      t = setTimeout(onScroll, 50);
    };
    window.addEventListener('scroll', handler, { passive: true });
    onScroll();
    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', handler);
    };
  }, [categories]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
  };

  const toggleItem = (catId: string, num: string) => {
    const key = `${catId}:${num}`;
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const jumpTo = (id: string) => {
    const el = catRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section className="fp-section" id="fp-list">
      <div className="container-shell">
        <div className="fp-search">
          <SearchIcon />
          <input
            type="search"
            placeholder={t('faq.list.searchPlaceholder')}
            value={query}
            onChange={handleSearch}
          />
          {trimmed && (
            <button type="button" className="fp-search-clear" onClick={clearSearch}>
              {t('faq.list.clear')}
            </button>
          )}
        </div>

        <div className="fp-grid">
          <aside className="fp-nav">
            <h4 className="fp-nav-h">{t('faq.list.sectionsHeader')}</h4>
            <ul className="fp-nav-list">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    className={`fp-nav-link${activeCat === c.id ? ' is-active' : ''}`}
                    onClick={() => jumpTo(c.id)}
                  >
                    <span>{c.navLabel}</span>
                    <span className="fp-nav-num">{c.num}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="fp-content">
            {filtered.map((cat) => {
              if (trimmed && cat.matches.length === 0) return null;
              return (
                <div
                  key={cat.id}
                  className="fp-cat"
                  id={cat.id}
                  ref={(el) => {
                    catRefs.current[cat.id] = el;
                  }}
                >
                  <div className="fp-cat-head">
                    <span className="fp-cat-num">{cat.num}</span>
                    <h2 className="fp-cat-title">{cat.title}</h2>
                    <span className="fp-cat-count">{cat.items.length} {t('faq.list.countSuffix')}</span>
                  </div>

                  {cat.matches.map((item) => {
                    const key = `${cat.id}:${item.num}`;
                    const isOpen = openKey === key;
                    return (
                      <div key={item.num} className={`fp-item${isOpen ? ' is-open' : ''}`}>
                        <button
                          type="button"
                          className="fp-q"
                          onClick={() => toggleItem(cat.id, item.num)}
                          aria-expanded={isOpen}
                        >
                          <span className="fp-q-num">{item.num}</span>
                          <span className="fp-q-text">{item.q}</span>
                          <span className="fp-q-icon" aria-hidden="true">
                            <PlusIcon />
                          </span>
                        </button>
                        <div className="fp-a">
                          <div className="fp-a-inner">{item.a}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {isEmpty && (
              <div className="fp-empty is-visible">
                <strong>{t('faq.list.empty.title')}</strong>
                {t('faq.list.empty.body')} <a href="/contact">{t('faq.list.empty.linkText')}</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQList;

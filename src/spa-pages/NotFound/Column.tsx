import { Link } from 'react-router-dom';
import { ArrowIcon } from '@/components/icons';
import type { RecoveryLink } from './links';

const Column = ({ title, links }: { title: string; links: readonly RecoveryLink[] }) => (
  <div
    style={{
      background: '#fff',
      border: '1px solid rgba(45,55,72,0.10)',
      borderRadius: 18,
      padding: 'clamp(20px, 2.4vw, 28px)',
    }}
  >
    <h2
      style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#718096',
        margin: '0 0 18px',
      }}
    >
      {title}
    </h2>
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
      {links.map((link) => (
        <li key={link.to}>
          <Link
            to={link.to}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 12,
              alignItems: 'center',
              padding: '12px 14px',
              borderRadius: 12,
              border: '1px solid rgba(45,55,72,0.06)',
              transition: 'border-color .18s ease, transform .18s ease, background .18s ease',
              color: '#1A2438',
            }}
            className="nf-link"
          >
            <span>
              <span
                style={{
                  display: 'block',
                  fontWeight: 700,
                  fontSize: 15,
                  marginBottom: 2,
                }}
              >
                {link.label}
              </span>
              <span style={{ fontSize: 13, color: '#4A5568' }}>{link.hint}</span>
            </span>
            <span style={{ color: '#B38B6D', display: 'inline-flex' }}>
              <ArrowIcon size={13} strokeWidth={2} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Column;

/* ============ Inline illustration SVGs (Swiss-style geometric) ============ */

export const TechSeoSvg = () => (
  <svg viewBox="0 0 160 88" width="100%" height="88" fill="none">
    <rect x="2" y="14" width="156" height="60" rx="6" stroke="#2D3748" strokeWidth="1.4" />
    <line x1="2" y1="28" x2="158" y2="28" stroke="#2D3748" strokeWidth="1" />
    <circle cx="12" cy="21" r="2" fill="#B38B6D" />
    <circle cx="22" cy="21" r="2" fill="#2D3748" opacity="0.3" />
    <circle cx="32" cy="21" r="2" fill="#2D3748" opacity="0.3" />
    <rect x="14" y="38" width="60" height="6" rx="2" fill="#2D3748" opacity="0.85" />
    <rect x="14" y="50" width="92" height="4" rx="2" fill="#2D3748" opacity="0.3" />
    <rect x="14" y="58" width="76" height="4" rx="2" fill="#2D3748" opacity="0.3" />
    <g transform="translate(118,42)">
      <circle
        r="18"
        stroke="#B38B6D"
        strokeWidth="2"
        fill="none"
        strokeDasharray="113"
        strokeDashoffset="40"
        transform="rotate(-90)"
      />
      <text textAnchor="middle" dy="4" fontSize="11" fontWeight="800" fill="#2D3748">
        76
      </text>
    </g>
  </svg>
);

export const SchemaSvg = () => (
  <svg viewBox="0 0 160 88" width="100%" height="88" fill="none">
    <g stroke="#2D3748" strokeWidth="1.4">
      <rect x="56" y="6" width="48" height="22" rx="3" fill="#fff" />
      <rect x="6" y="56" width="44" height="22" rx="3" fill="#fff" />
      <rect x="58" y="56" width="44" height="22" rx="3" fill="#FFF8F0" />
      <rect x="110" y="56" width="44" height="22" rx="3" fill="#fff" />
      <line x1="80" y1="28" x2="28" y2="56" />
      <line x1="80" y1="28" x2="80" y2="56" />
      <line x1="80" y1="28" x2="132" y2="56" />
    </g>
    <text x="80" y="20" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2D3748">
      @MedicalClinic
    </text>
    <text x="28" y="70" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2D3748">
      FAQ
    </text>
    <text x="80" y="70" textAnchor="middle" fontSize="9" fontWeight="700" fill="#B38B6D">
      Service
    </text>
    <text x="132" y="70" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2D3748">
      Review
    </text>
  </svg>
);

export const GbpSvg = () => (
  <svg viewBox="0 0 160 88" width="100%" height="88" fill="none">
    <rect
      x="2"
      y="2"
      width="156"
      height="84"
      rx="6"
      stroke="#2D3748"
      strokeWidth="1.4"
      fill="#fff"
    />
    <circle cx="22" cy="22" r="10" fill="#B38B6D" />
    <path d="M22 16 L22 22 L26 24" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    <rect x="40" y="14" width="80" height="6" rx="2" fill="#2D3748" />
    <rect x="40" y="24" width="60" height="4" rx="2" fill="#2D3748" opacity="0.4" />
    <g transform="translate(40,40)">
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d="M0 8 L2.5 3 L8 2.4 L4 -1.2 L5 -6 L0 -3 L-5 -6 L-4 -1.2 L-8 2.4 L-2.5 3 Z"
          fill={i < 4 ? '#B38B6D' : '#E2E5E9'}
          transform={`translate(${i * 16},0)`}
        />
      ))}
    </g>
    <rect x="40" y="60" width="108" height="4" rx="2" fill="#2D3748" opacity="0.3" />
    <rect x="40" y="68" width="86" height="4" rx="2" fill="#2D3748" opacity="0.3" />
  </svg>
);

export const PaidSvg = () => (
  <svg viewBox="0 0 160 88" width="100%" height="88" fill="none">
    <line x1="6" y1="78" x2="154" y2="78" stroke="#2D3748" strokeWidth="1" />
    <line x1="10" y1="6" x2="10" y2="82" stroke="#2D3748" strokeWidth="1" />
    {[
      { x: 22, h: 32 },
      { x: 38, h: 48 },
      { x: 54, h: 28 },
      { x: 70, h: 56 },
      { x: 86, h: 38 },
      { x: 102, h: 24 },
      { x: 118, h: 60 },
      { x: 134, h: 18 },
    ].map((b, i) => (
      <rect
        key={i}
        x={b.x}
        y={78 - b.h}
        width="10"
        height={b.h}
        fill={b.h > 50 ? '#B38B6D' : '#2D3748'}
        opacity={b.h > 50 ? 1 : 0.85}
      />
    ))}
    <text x="148" y="20" textAnchor="end" fontSize="9" fontWeight="700" fill="#B38B6D">
      $184 CPL
    </text>
  </svg>
);

export const CroSvg = () => (
  <svg viewBox="0 0 160 88" width="100%" height="88" fill="none">
    <g stroke="#2D3748" strokeWidth="1.4" fill="#fff">
      <polygon points="6,12 154,12 134,30 26,30" />
      <polygon points="26,32 134,32 118,52 42,52" />
      <polygon points="42,54 118,54 106,72 54,72" fill="#FFF8F0" stroke="#B38B6D" />
    </g>
    <text x="80" y="24" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2D3748">
      100 clicks
    </text>
    <text x="80" y="45" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2D3748">
      52 engaged
    </text>
    <text x="80" y="66" textAnchor="middle" fontSize="9" fontWeight="700" fill="#B38B6D">
      8 booked
    </text>
  </svg>
);

export const DeskSvg = () => (
  <svg viewBox="0 0 160 88" width="100%" height="88" fill="none">
    <rect
      x="14"
      y="22"
      width="48"
      height="56"
      rx="6"
      stroke="#2D3748"
      strokeWidth="1.4"
      fill="#fff"
    />
    <rect x="22" y="32" width="32" height="4" rx="2" fill="#2D3748" />
    <rect x="22" y="40" width="24" height="4" rx="2" fill="#2D3748" opacity="0.4" />
    <circle cx="38" cy="62" r="10" fill="#B38B6D" />
    <path
      d="M34 60 c0 -2 2 -3 4 -3 s4 1 4 3 c0 1 -1 2 -2 3 v2 m-4 0 v-2 c-1 -1 -2 -2 -2 -3"
      stroke="#fff"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
    />
    <g transform="translate(86,30)">
      <line x1="0" y1="0" x2="60" y2="0" stroke="#2D3748" opacity="0.3" />
      <line x1="0" y1="12" x2="60" y2="12" stroke="#2D3748" opacity="0.3" />
      <line x1="0" y1="24" x2="60" y2="24" stroke="#2D3748" opacity="0.3" />
      <line x1="0" y1="36" x2="60" y2="36" stroke="#2D3748" opacity="0.3" />
      <rect x="0" y="-4" width="38" height="6" fill="#B38B6D" />
      <rect x="0" y="8" width="22" height="6" fill="#2D3748" />
      <rect x="0" y="20" width="48" height="6" fill="#2D3748" opacity="0.5" />
      <rect x="0" y="32" width="14" height="6" fill="#2D3748" />
      <text x="0" y="-8" fontSize="8" fontWeight="700" fill="#718096">
        CALL LOG
      </text>
    </g>
  </svg>
);

/* ============ Deliverable icons ============ */
export const IconDoc = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="14" y2="17" />
  </svg>
);
export const IconFunnel = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="3 4 21 4 14 12 14 20 10 18 10 12" />
  </svg>
);
export const IconList = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="9" y1="6" x2="20" y2="6" />
    <line x1="9" y1="12" x2="20" y2="12" />
    <line x1="9" y1="18" x2="20" y2="18" />
    <circle cx="4" cy="6" r="1.5" />
    <circle cx="4" cy="12" r="1.5" />
    <circle cx="4" cy="18" r="1.5" />
  </svg>
);
export const IconChart = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" y1="20" x2="20" y2="20" />
    <rect x="6" y="12" width="3" height="8" />
    <rect x="11" y="7" width="3" height="13" />
    <rect x="16" y="14" width="3" height="6" />
  </svg>
);

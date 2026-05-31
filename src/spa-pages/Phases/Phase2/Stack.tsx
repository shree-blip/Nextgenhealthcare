import { useTranslation } from 'react-i18next';

const Stack = () => {
  const { t } = useTranslation(['pages']);
  const rows = t('pages:phases.phase2.stack.rows', { returnObjects: true }) as Record<
    string,
    { letter: string; name: string; desc: string }
  >;
  return (
    <section className="ph2-stack" aria-labelledby="ph2-stack-title">
      <div className="ph2-stack-head">
        <span className="lbl">{t('pages:phases.phase2.stack.label')}</span>
        <h2 id="ph2-stack-title">{t('pages:phases.phase2.stack.title')}</h2>
        <span className="count">{t('pages:phases.phase2.stack.count')}</span>
      </div>

      <div className="ph2-stack-grid">
        <div className="ph2-stack-row">
          <div className="ph2-stack-cat">
            <div className="n">{rows.analytics.letter}</div>
            <div className="t">{rows.analytics.name}</div>
            <p className="d">{rows.analytics.desc}</p>
          </div>
          <div className="ph2-stack-tools">
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#5C8A5C' } as React.CSSProperties}
            >
              <i className="dot" />
              GA4
            </span>
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#5C8A5C' } as React.CSSProperties}
            >
              <i className="dot" />
              Google Search Console
            </span>
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#5C8A5C' } as React.CSSProperties}
            >
              <i className="dot" />
              Looker Studio
            </span>
          </div>
        </div>

        <div className="ph2-stack-row">
          <div className="ph2-stack-cat">
            <div className="n">{rows.conversion.letter}</div>
            <div className="t">{rows.conversion.name}</div>
            <p className="d">{rows.conversion.desc}</p>
          </div>
          <div className="ph2-stack-tools">
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#B38B6D' } as React.CSSProperties}
            >
              <i className="dot" />
              CallRail
            </span>
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#B38B6D' } as React.CSSProperties}
            >
              <i className="dot" />
              GTM
            </span>
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#B38B6D' } as React.CSSProperties}
            >
              <i className="dot" />
              Hotjar
            </span>
          </div>
        </div>

        <div className="ph2-stack-row">
          <div className="ph2-stack-cat">
            <div className="n">{rows.comms.letter}</div>
            <div className="t">{rows.comms.name}</div>
            <p className="d">{rows.comms.desc}</p>
          </div>
          <div className="ph2-stack-tools">
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#576DB5' } as React.CSSProperties}
            >
              <i className="dot" />
              Intercom
            </span>
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#576DB5' } as React.CSSProperties}
            >
              <i className="dot" />
              Twilio
            </span>
          </div>
        </div>

        <div className="ph2-stack-row">
          <div className="ph2-stack-cat">
            <div className="n">{rows.crm.letter}</div>
            <div className="t">{rows.crm.name}</div>
            <p className="d">{rows.crm.desc}</p>
          </div>
          <div className="ph2-stack-tools">
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#B38B6D' } as React.CSSProperties}
            >
              <i className="dot" />
              HubSpot
            </span>
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#B38B6D' } as React.CSSProperties}
            >
              <i className="dot" />
              Zapier
            </span>
          </div>
        </div>

        <div className="ph2-stack-row">
          <div className="ph2-stack-cat">
            <div className="n">{rows.paid.letter}</div>
            <div className="t">{rows.paid.name}</div>
            <p className="d">{rows.paid.desc}</p>
          </div>
          <div className="ph2-stack-tools">
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#5C8A5C' } as React.CSSProperties}
            >
              <i className="dot" />
              Google Ads
            </span>
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#5C8A5C' } as React.CSSProperties}
            >
              <i className="dot" />
              Meta Ads
            </span>
            <span
              className="ph2-tool"
              style={{ ['--td' as never]: '#5C8A5C' } as React.CSSProperties}
            >
              <i className="dot" />
              Google Business Profile
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stack;

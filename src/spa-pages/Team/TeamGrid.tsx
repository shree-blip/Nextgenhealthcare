import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import shreePhoto from '../../assets/team-thumbs/shree-gauli.jpg';
import bikashPhoto from '../../assets/team-thumbs/bikash-neupane.jpg';
import sonuPhoto from '../../assets/team-thumbs/sagar-dongol.jpg';
import bijeshPhoto from '../../assets/team-thumbs/bijesh-khadgi.jpg';
import sumitPhoto from '../../assets/team-thumbs/sumit-sharma.jpg';
import rahulPhoto from '../../assets/team-thumbs/rahul-roy.jpg';
import bidhitshaPhoto from '../../assets/team-thumbs/bidhitsha-khadka.jpg';
import sagarPhoto from '../../assets/team-thumbs/sagar-timalsina.jpg';

interface Member {
  id: string;
  name: string;
  role: string;
  craft: string;
  photo: string;
  linkedin: string;
}

interface MemberSpec {
  id: string;
  name: string;
  i18nKey: 'shree' | 'bikash' | 'sonu' | 'bijesh' | 'sumit' | 'rahul' | 'bidhitsha' | 'sagar';
  photo: string;
  linkedin: string;
}

const MEMBER_SPECS: readonly MemberSpec[] = [
  {
    id: '02',
    name: 'Shree Gauli',
    i18nKey: 'shree',
    photo: shreePhoto,
    linkedin: 'https://www.linkedin.com/in/gauli/',
  },
  {
    id: '03',
    name: 'Bikash Neupane',
    i18nKey: 'bikash',
    photo: bikashPhoto,
    linkedin: 'https://www.linkedin.com/in/bikash-neupane07/',
  },
  {
    id: '04',
    name: 'Sonu Sagar Dongol',
    i18nKey: 'sonu',
    photo: sonuPhoto,
    linkedin: 'https://www.linkedin.com/in/dongol526/',
  },
  {
    id: '05',
    name: 'Bijesh Khadgi',
    i18nKey: 'bijesh',
    photo: bijeshPhoto,
    linkedin: 'https://www.linkedin.com/in/bijesh-khadgi-9121a819a/',
  },
  {
    id: '06',
    name: 'Sumit Sharma',
    i18nKey: 'sumit',
    photo: sumitPhoto,
    linkedin: 'https://www.linkedin.com/in/sumitsharma101/',
  },
  {
    id: '07',
    name: 'Rahul Roy',
    i18nKey: 'rahul',
    photo: rahulPhoto,
    linkedin: 'https://www.linkedin.com/in/rahul-roy-485451168/',
  },
  {
    id: '08',
    name: 'Bidhitsha Khadka',
    i18nKey: 'bidhitsha',
    photo: bidhitshaPhoto,
    linkedin: 'https://www.linkedin.com/in/bidhitsha-khadka-852048315/',
  },
  {
    id: '09',
    name: 'Sagar Timalsina',
    i18nKey: 'sagar',
    photo: sagarPhoto,
    linkedin: 'https://www.linkedin.com/in/sagar-timalsina-916909321/',
  },
];

const LinkedInGlyph = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
    />
  </svg>
);

const TeamCard = memo(({ member, badge, linkedinAria }: { member: Member; badge: string; linkedinAria: string }) => (
  <article className="ngt-card">
    <div className="ngt-card-photo-wrap">
      <img
        src={member.photo}
        alt={member.name}
        className="ngt-card-photo"
        width={400}
        height={400}
        loading="lazy"
        decoding="async"
      />
      <span className="ngt-card-badge">{badge}</span>
    </div>
    <div className="ngt-card-body">
      <span className="ngt-card-craft">{member.craft}</span>
      <h3 className="ngt-card-name">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="ngt-card-link"
          aria-label={linkedinAria}
        >
          {member.name}
        </a>
      </h3>
      <p className="ngt-card-role">{member.role}</p>
      <span className="ngt-card-li" aria-hidden="true">
        <LinkedInGlyph />
      </span>
    </div>
  </article>
));
TeamCard.displayName = 'TeamCard';

const TeamGrid = () => {
  const { t } = useTranslation('pages');

  const members: Member[] = useMemo(
    () =>
      MEMBER_SPECS.map((spec) => ({
        id: spec.id,
        name: spec.name,
        role: t(`team.grid.members.${spec.i18nKey}.role`),
        craft: t(`team.grid.members.${spec.i18nKey}.craft`),
        photo: spec.photo,
        linkedin: spec.linkedin,
      })),
    [t]
  );

  return (
    <section className="ngt-section ngt-grid-sec">
      <div className="container-shell">
        <div className="ngt-mark">
          <span className="ngt-mark-num">{t('team.grid.markNum')}</span>
          <span className="ngt-mark-lbl">{t('team.grid.markLabel')}</span>
          <span className="ngt-mark-line" />
          <span className="ngt-mark-meta">{t('team.grid.markMeta')}</span>
        </div>

        <header className="ngt-grid-head">
          <h2 className="ngt-grid-h2">
            {t('team.grid.titleStart')} <em>{t('team.grid.titleEm')}</em>
          </h2>
          <p className="ngt-grid-lede">{t('team.grid.lede')}</p>
        </header>

        <div className="ngt-grid">
          {members.map((m) => (
            <TeamCard
              key={m.id}
              member={m}
              badge={t('team.grid.badge')}
              linkedinAria={t('team.grid.linkedinAria', { name: m.name })}
            />
          ))}
        </div>

        <footer className="ngt-grid-foot" aria-hidden="true">
          <span>{t('team.grid.footLeft')}</span>
          <span className="ngt-grid-foot-line" />
          <span>{t('team.grid.footRight')}</span>
        </footer>
      </div>
    </section>
  );
};

export default TeamGrid;

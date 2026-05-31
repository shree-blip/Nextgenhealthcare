import { useTranslation } from 'react-i18next';
import { TechSeoSvg, SchemaSvg, GbpSvg, PaidSvg, CroSvg, DeskSvg } from './helpers';

interface DimProps {
  num: string;
  title: string;
  text: string;
  signals: string[];
  illustration: React.ReactNode;
  signalsLabel: string;
}
const Dim = ({ num, title, text, signals, illustration, signalsLabel }: DimProps) => (
  <article className="ph1-dim">
    <span className="num">/ {num}</span>
    <div className="ill" aria-hidden="true">
      {illustration}
    </div>
    <h3 dangerouslySetInnerHTML={{ __html: title }} />
    <p dangerouslySetInnerHTML={{ __html: text }} />
    <div className="signals">
      <span className="lbl">{signalsLabel}</span>
      <ul>
        {signals.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  </article>
);

const Dimensions = () => {
  const { t } = useTranslation(['pages']);
  const signalsLabel = t('pages:phases.phase1.dimensions.signalsLabel');
  const items = t('pages:phases.phase1.dimensions.items', { returnObjects: true }) as Record<
    string,
    { title: string; text: string; signals: string[] }
  >;

  return (
    <>
      <div className="ph1-section-label">
        <span>{t('pages:phases.phase1.dimensions.label')}</span>
        <h2>{t('pages:phases.phase1.dimensions.title')}</h2>
      </div>

      <div className="ph1-dims">
        <Dim
          num="01"
          title={items.techSeo.title}
          text={items.techSeo.text}
          signals={items.techSeo.signals}
          illustration={<TechSeoSvg />}
          signalsLabel={signalsLabel}
        />
        <Dim
          num="02"
          title={items.schema.title}
          text={items.schema.text}
          signals={items.schema.signals}
          illustration={<SchemaSvg />}
          signalsLabel={signalsLabel}
        />
        <Dim
          num="03"
          title={items.gbp.title}
          text={items.gbp.text}
          signals={items.gbp.signals}
          illustration={<GbpSvg />}
          signalsLabel={signalsLabel}
        />
        <Dim
          num="04"
          title={items.paid.title}
          text={items.paid.text}
          signals={items.paid.signals}
          illustration={<PaidSvg />}
          signalsLabel={signalsLabel}
        />
        <Dim
          num="05"
          title={items.cro.title}
          text={items.cro.text}
          signals={items.cro.signals}
          illustration={<CroSvg />}
          signalsLabel={signalsLabel}
        />
        <Dim
          num="06"
          title={items.desk.title}
          text={items.desk.text}
          signals={items.desk.signals}
          illustration={<DeskSvg />}
          signalsLabel={signalsLabel}
        />
      </div>
    </>
  );
};

export default Dimensions;

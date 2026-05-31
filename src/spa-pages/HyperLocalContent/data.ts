import dallasImg from '../../assets/nextgen-image/Erofwhiterockimg.jpg';
import houstonImg from '../../assets/nextgen-image/Urgentcareimg.png';
import austinImg from '../../assets/nextgen-image/Medspas&wellnessimg.png';
import sanAntonioImg from '../../assets/nextgen-image/Primarycareimg.png';
import fortWorthImg from '../../assets/nextgen-image/Clinicalimg1.png';
import elPasoImg from '../../assets/nextgen-image/Hyperlocalcontent.png';

export interface Marker {
  value: string;
  label: string;
}

export type WhyKey = 'local' | 'hospitals' | 'ai';
export interface Why {
  key: WhyKey;
}
export const WHY: Why[] = [{ key: 'local' }, { key: 'hospitals' }, { key: 'ai' }];

export type MetroKey = 'dallas' | 'houston' | 'austin' | 'sanAntonio' | 'fortWorth' | 'elPaso';

export interface Metro {
  key: MetroKey;
  code: string;
  pages: number;
  coord: string;
  img: string;
}
export const METROS: Metro[] = [
  { key: 'dallas', code: 'TX-001', pages: 42, coord: '32.78°N · 96.80°W', img: dallasImg },
  { key: 'houston', code: 'TX-002', pages: 51, coord: '29.76°N · 95.37°W', img: houstonImg },
  { key: 'austin', code: 'TX-003', pages: 38, coord: '30.27°N · 97.74°W', img: austinImg },
  { key: 'sanAntonio', code: 'TX-004', pages: 34, coord: '29.42°N · 98.49°W', img: sanAntonioImg },
  { key: 'fortWorth', code: 'TX-005', pages: 29, coord: '32.75°N · 97.33°W', img: fortWorthImg },
  { key: 'elPaso', code: 'TX-006', pages: 22, coord: '31.76°N · 106.49°W', img: elPasoImg },
];

export type AnatomyKey = 'hero' | 'services' | 'proof';
export interface Block {
  key: AnatomyKey;
}
export const ANATOMY: Block[] = [{ key: 'hero' }, { key: 'services' }, { key: 'proof' }];

export const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Hyper-Local Content & Geo-Targeted Landing Pages',
  serviceType: 'Local SEO · Programmatic Catchment Pages',
  areaServed: 'Texas',
};

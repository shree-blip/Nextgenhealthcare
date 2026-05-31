import {
  AlertCircle,
  BarChart3,
  Calendar,
  CalendarX,
  Clock,
  FileText,
  Hourglass,
  Image,
  Layers,
  Megaphone,
  Network,
  Newspaper,
  PenLine,
  Rss,
  Send,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import WorkflowDetailPage from './_shared/WorkflowDetailPage';

const SocialAutoPosterWorkflow = () => (
  <WorkflowDetailPage
    i18nKey="socialAutoPoster"
    statIcons={[Network, Clock, Hourglass, Shield]}
    beforeIcons={[CalendarX, Image, AlertCircle, BarChart3]}
    afterIcons={[Megaphone, PenLine, ShieldCheck, FileText]}
    nodeIcons={[
      Clock,
      Rss,
      PenLine,
      Image,
      ShieldCheck,
      Layers,
      Calendar,
      Send,
      BarChart3,
    ]}
    outcomeIcons={[Megaphone, PenLine, Calendar, Newspaper]}
  />
);

export default SocialAutoPosterWorkflow;

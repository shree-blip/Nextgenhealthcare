import {
  AlertTriangle,
  Bell,
  CalendarCheck,
  Clock,
  Database,
  DollarSign,
  Download,
  FileCode,
  FileSearch,
  Hourglass,
  LayoutDashboard,
  Monitor,
  Network,
  Phone,
  PhoneOff,
  Receipt,
  Send,
  ShieldCheck,
} from 'lucide-react';
import WorkflowDetailPage from './_shared/WorkflowDetailPage';

const EligibilityBotWorkflow = () => (
  <WorkflowDetailPage
    i18nKey="eligibilityBot"
    statIcons={[Network, Clock, Hourglass, ShieldCheck]}
    beforeIcons={[Phone, AlertTriangle, Receipt, DollarSign]}
    afterIcons={[ShieldCheck, Receipt, AlertTriangle, LayoutDashboard]}
    nodeIcons={[
      CalendarCheck,
      Database,
      FileCode,
      Send,
      Download,
      FileSearch,
      AlertTriangle,
      Monitor,
      Bell,
    ]}
    outcomeIcons={[ShieldCheck, Receipt, AlertTriangle, PhoneOff]}
  />
);

export default EligibilityBotWorkflow;

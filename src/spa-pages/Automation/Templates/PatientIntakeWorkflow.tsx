import {
  AlertTriangle,
  Bell,
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  Clock,
  FileText,
  Hourglass,
  Inbox,
  Network,
  Phone,
  PhoneOff,
  Send,
  Shield,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import WorkflowDetailPage from './_shared/WorkflowDetailPage';

const PatientIntakeWorkflow = () => (
  <WorkflowDetailPage
    i18nKey="patientIntake"
    ampSeparator
    statIcons={[Network, Clock, Hourglass, ShieldCheck]}
    beforeIcons={[ClipboardList, Phone, FileText, AlertTriangle]}
    afterIcons={[Send, UserCheck, ShieldCheck, Inbox]}
    nodeIcons={[
      CalendarCheck,
      Send,
      ClipboardCheck,
      Shield,
      AlertTriangle,
      FileText,
      Bell,
    ]}
    outcomeIcons={[FileText, ShieldCheck, UserCheck, PhoneOff]}
  />
);

export default PatientIntakeWorkflow;

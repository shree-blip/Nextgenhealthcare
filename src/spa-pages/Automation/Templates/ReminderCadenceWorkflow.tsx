import {
  CalendarClock,
  CalendarPlus,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Hourglass,
  Mail,
  MessageCircle,
  MessageSquare,
  Moon,
  Network,
  Shield,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  AlertCircle,
  Inbox,
  PhoneOff,
} from 'lucide-react';
import WorkflowDetailPage from './_shared/WorkflowDetailPage';

const ReminderCadenceWorkflow = () => (
  <WorkflowDetailPage
    i18nKey="reminderCadence"
    statIcons={[Network, Clock, Hourglass, ShieldCheck]}
    beforeIcons={[PhoneOff, AlertCircle, Moon, Inbox]}
    afterIcons={[MessageSquare, ShieldCheck, Mail, ClipboardCheck]}
    nodeIcons={[
      CalendarPlus,
      UserCheck,
      CalendarClock,
      Moon,
      MessageSquare,
      Mail,
      MessageCircle,
      ClipboardCheck,
    ]}
    outcomeIcons={[TrendingUp, MessageSquare, Shield, CheckCircle2]}
  />
);

export default ReminderCadenceWorkflow;

import {
  Bell,
  Brain,
  CalendarCheck,
  CalendarDays,
  Clock,
  Database,
  GitBranch,
  Hourglass,
  Inbox,
  MessageCircle,
  Moon,
  Network,
  Shield,
  Sparkles,
  Tag,
  UserPlus,
  UserX,
} from 'lucide-react';
import WorkflowDetailPage from './_shared/WorkflowDetailPage';

const GptChatbotWorkflow = () => (
  <WorkflowDetailPage
    i18nKey="gptChatbot"
    statIcons={[Network, Clock, Hourglass, Shield]}
    beforeIcons={[Moon, UserX, Inbox, Brain]}
    afterIcons={[MessageCircle, Shield, UserPlus, CalendarCheck]}
    nodeIcons={[
      MessageCircle,
      Sparkles,
      Brain,
      Shield,
      GitBranch,
      UserPlus,
      CalendarDays,
      CalendarCheck,
      Database,
      Bell,
    ]}
    outcomeIcons={[Clock, Shield, CalendarCheck, Tag]}
  />
);

export default GptChatbotWorkflow;

import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  Clock,
  Frown,
  GitBranch,
  Inbox,
  MessageCircle,
  Network,
  Send,
  Shield,
  Smile,
  Star,
  ThumbsDown,
  ThumbsUp,
  TrendingUp,
} from 'lucide-react';
import WorkflowDetailPage from './_shared/WorkflowDetailPage';

const ReviewCollectionWorkflow = () => (
  <WorkflowDetailPage
    i18nKey="reviewCollection"
    statIcons={[Network, Clock, TrendingUp, Shield]}
    beforeIcons={[MessageCircle, ThumbsDown, AlertCircle, Frown]}
    afterIcons={[Send, GitBranch, Inbox, BarChart3]}
    nodeIcons={[
      CheckCircle2,
      Clock,
      Send,
      Star,
      GitBranch,
      ThumbsUp,
      Inbox,
      BarChart3,
    ]}
    outcomeIcons={[Star, Inbox, BarChart3, Smile]}
  />
);

export default ReviewCollectionWorkflow;

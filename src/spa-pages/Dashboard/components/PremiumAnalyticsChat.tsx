import { useState, useRef, useEffect, useCallback, type KeyboardEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Send,
  Sparkles,
  BarChart3,
  TrendingUp,
  Target,
  PieChart,
  Megaphone,
  Search,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';

/* ─── Types ─── */
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface PremiumAnalyticsChatProps {
  defaultExpanded?: boolean;
  userName?: string;
  clinicNames?: string[];
}

/* ─── Suggestion cards — shown on empty state ─── */
const SUGGESTIONS = [
  {
    icon: BarChart3,
    title: 'Performance Overview',
    prompt: 'How are my clinics performing this year?',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: TrendingUp,
    title: 'Growth Trends',
    prompt: 'Show me month-over-month patient growth trends',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Target,
    title: 'Google Ads ROI',
    prompt: 'Summarize my Google Ads performance and ROI',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: PieChart,
    title: 'Traffic Breakdown',
    prompt: 'Which clinic gets the most traffic and why?',
    color: 'from-orange-500 to-amber-600',
  },
  {
    icon: Megaphone,
    title: 'Social Media',
    prompt: 'How is my social media performing this year?',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: Search,
    title: 'Action Items',
    prompt: 'What should I focus on next to grow my practice?',
    color: 'from-indigo-500 to-violet-600',
  },
];

/* ─── Markdown-like renderer ─── */
function renderMarkdown(content: string) {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    // Headers
    if (line.startsWith('### ')) {
      const text = line.slice(4).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      return (
        <h4
          key={i}
          className="text-base font-bold mt-4 mb-1 text-slate-900 dark:text-white"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }
    if (line.startsWith('## ')) {
      const text = line.slice(3).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      return (
        <h3
          key={i}
          className="text-lg font-bold mt-4 mb-1 text-slate-900 dark:text-white"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }

    // Horizontal rule
    if (line.trim() === '---' || line.trim() === '___') {
      return <hr key={i} className="my-3 border-slate-200 dark:border-slate-700" />;
    }

    // Bold + emoji prefix lines
    let processed = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Numbered list
    const numberedMatch = processed.match(/^(\d+)\.\s(.+)/);
    if (numberedMatch) {
      return (
        <div key={i} className="flex gap-2 pl-1 py-0.5">
          <span className="text-violet-500 dark:text-violet-400 font-semibold shrink-0">
            {numberedMatch[1]}.
          </span>
          <span dangerouslySetInnerHTML={{ __html: numberedMatch[2] }} />
        </div>
      );
    }

    // Bullet points
    if (
      processed.trim().startsWith('- ') ||
      processed.trim().startsWith('• ') ||
      processed.trim().startsWith('* ')
    ) {
      const bulletContent = processed.trim().substring(2);
      return (
        <div key={i} className="flex gap-2 pl-1 py-0.5">
          <span className="text-violet-500 dark:text-violet-400 mt-1.5 shrink-0">
            <span className="block w-1.5 h-1.5 rounded-full bg-current" />
          </span>
          <span dangerouslySetInnerHTML={{ __html: bulletContent }} />
        </div>
      );
    }

    // Empty line
    if (processed.trim() === '') return <div key={i} className="h-2" />;

    // Regular paragraph
    return <p key={i} className="py-0.5" dangerouslySetInnerHTML={{ __html: processed }} />;
  });
}

/* ─── Typing indicator (3 bouncing dots) ─── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-2 h-2 rounded-full bg-violet-400 dark:bg-violet-500"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Copy button ─── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
      title="Copy message"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

/* ─── Main Component ─── */
export default function PremiumAnalyticsChat({
  userName,
  clinicNames,
}: PremiumAnalyticsChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* ─── auto-scroll ─── */
  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  /* ─── auto-resize textarea ─── */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  }, [input]);

  /* ─── send message ─── */
  const sendMessage = async (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const chatHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/ai/analytics-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistory }),
      });

      const data = await res.json();

      if (res.status === 403) {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: data.error || 'This feature requires a Premium (Scale Elite) plan.',
            timestamp: new Date(),
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          content: data.reply || data.error || 'Sorry, something went wrong.',
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: "Sorry, I couldn't connect to the analytics service. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  };

  const clearChat = () => setMessages([]);

  /* ─── keyboard: Enter sends, Shift+Enter newline ─── */
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const hasMessages = messages.length > 0;
  const firstName = userName?.split(' ')[0] || '';

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] min-h-[500px] rounded-3xl border border-slate-200/60 dark:border-slate-700/60 overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              Analytics AI
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Real-time insights · Powered by your data
            </p>
          </div>
        </div>

        {hasMessages && (
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              title="New conversation"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              New chat
            </button>
          </div>
        )}
      </div>

      {/* ─── Message Area ─── */}
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!hasMessages ? (
            /* ─── Empty / Welcome State ─── */
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center h-full px-6 py-10"
            >
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-500/25">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="block w-1.5 h-1.5 rounded-full bg-white" />
                </motion.div>
              </div>

              {/* Greeting */}
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">
                {firstName ? `Hi ${firstName}, what can I analyze?` : 'What can I analyze for you?'}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md text-center mb-8">
                I have access to your real clinic data — patients, traffic, ad performance, and more.
                Ask me anything about your analytics.
                {clinicNames && clinicNames.length > 0 && (
                  <span className="block mt-1 text-violet-600 dark:text-violet-400 font-medium">
                    Tracking {clinicNames.length} clinic{clinicNames.length > 1 ? 's' : ''}: {clinicNames.join(', ')}
                  </span>
                )}
              </p>

              {/* Suggestion Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-2xl">
                {SUGGESTIONS.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => sendMessage(s.prompt)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="group flex items-start gap-3 p-4 rounded-2xl text-left border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800/50 hover:border-violet-300 dark:hover:border-violet-600/50 hover:shadow-md hover:shadow-violet-500/5 transition-all"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0 shadow-sm`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white block leading-tight">
                          {s.title}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                          {s.prompt}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* ─── Conversation ─── */
            <motion.div
              key="conversation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="divide-y divide-slate-100 dark:divide-slate-800/50"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`group px-4 sm:px-6 py-5 ${
                    msg.role === 'assistant'
                      ? 'bg-slate-50/50 dark:bg-slate-800/30'
                      : 'bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="max-w-3xl mx-auto flex gap-4">
                    {/* Avatar */}
                    <div className="shrink-0 mt-0.5">
                      {msg.role === 'assistant' ? (
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-sm">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-slate-700 dark:bg-slate-600 flex items-center justify-center text-white text-xs font-bold">
                          {firstName ? firstName[0].toUpperCase() : <User className="h-4 w-4" />}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {msg.role === 'assistant' ? 'Analytics AI' : firstName || 'You'}
                        </span>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        {msg.role === 'assistant' && <CopyButton text={msg.content} />}
                      </div>
                      <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-none">
                        {msg.role === 'assistant' ? renderMarkdown(msg.content) : (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="px-4 sm:px-6 py-5 bg-slate-50/50 dark:bg-slate-800/30">
                  <div className="max-w-3xl mx-auto flex gap-4">
                    <div className="shrink-0 mt-0.5">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-sm">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          Analytics AI
                        </span>
                      </div>
                      <TypingIndicator />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* ─── Input Area ─── */}
      <div className="shrink-0 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-6 py-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto"
        >
          <div className="relative flex items-end gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus-within:border-violet-400 dark:focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/10 transition-all px-4 py-2.5">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your analytics..."
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none resize-none max-h-40 leading-relaxed py-0.5"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`shrink-0 p-2 rounded-xl transition-all ${
                input.trim() && !isLoading
                  ? 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/25 scale-100'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 scale-95'
              }`}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-[11px] text-center mt-2 text-slate-400 dark:text-slate-500">
            AI uses your real dashboard data. Responses may vary. Press Shift+Enter for a new line.
          </p>
        </form>
      </div>
    </div>
  );
}

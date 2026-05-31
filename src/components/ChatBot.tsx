import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, ArrowLeft, ExternalLink } from 'lucide-react';
import { useSitePreferences } from '../spa-pages/Dashboard/components/SitePreferencesProvider';

interface Source {
  url: string;
  title: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  timestamp: Date;
}

const suggestionChips = [
  { label: 'Services', labelEs: 'Servicios', query: 'What services do you offer?' },
  { label: 'Pricing', labelEs: 'Precios', query: 'What are your pricing plans?' },
  { label: 'Dashboard', labelEs: 'Dashboard', query: 'Tell me about the analytics dashboard' },
  { label: 'Results', labelEs: 'Resultados', query: 'What results do your clients get?' },
  { label: 'Industries', labelEs: 'Industrias', query: 'What healthcare specialties do you serve?' },
  { label: 'Book a Call', labelEs: 'Agendar', query: 'How can I book a free consultation?' },
];

/* ─── Minimal Markdown Renderer ─── */
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    // Bold
    let processed: React.ReactNode[] = [];
    const boldParts = line.split(/\*\*(.*?)\*\*/g);
    boldParts.forEach((part, j) => {
      if (j % 2 === 1) {
        processed.push(<strong key={`b-${i}-${j}`} className="font-semibold">{part}</strong>);
      } else {
        // Handle inline links [text](url)
        const linkParts = part.split(/\[([^\]]+)\]\(([^)]+)\)/g);
        linkParts.forEach((lp, k) => {
          if (k % 3 === 1) {
            // link text — next is URL
          } else if (k % 3 === 2) {
            processed.push(
              <a
                key={`l-${i}-${j}-${k}`}
                href={lp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-500 dark:text-violet-400 underline underline-offset-2 hover:text-violet-600 dark:hover:text-violet-300"
              >
                {linkParts[k - 1]}
              </a>
            );
          } else {
            if (lp) processed.push(lp);
          }
        });
      }
    });

    // Bullet points
    if (line.startsWith('- ') || line.startsWith('• ')) {
      elements.push(
        <li key={i} className="ml-4 list-disc text-sm leading-relaxed">
          {processed.length > 0 ? processed : line.slice(2)}
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<br key={i} />);
    } else {
      elements.push(
        <p key={i} className="text-sm leading-relaxed">
          {processed.length > 0 ? processed : line}
        </p>
      );
    }
  });

  return <div className="space-y-1">{elements}</div>;
}

export default function ChatBot() {
  const { theme, language } = useSitePreferences();
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [visitorId, setVisitorId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      const greeting: Message = {
        id: 'greeting',
        role: 'assistant',
        content: language === 'es'
          ? '¡Hola! 👋 Soy **Nex**, tu asistente de marketing médico. Puedo ayudarte con servicios, precios, nuestro dashboard, resultados y más. ¿Qué te gustaría saber?'
          : "Hey there! 👋 I'm **Nex**, your healthcare marketing assistant. I can help with services, pricing, our dashboard, results, and more. What would you like to know?",
        timestamp: new Date(),
      };
      setMessages([greeting]);
      setHasGreeted(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, hasGreeted, language]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existingSessionId = localStorage.getItem('chat_session_id');
    const existingVisitorId = localStorage.getItem('chat_visitor_id');

    const newSessionId = existingSessionId || `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const newVisitorId = existingVisitorId || `visitor-${Math.random().toString(36).slice(2, 10)}`;

    localStorage.setItem('chat_session_id', newSessionId);
    localStorage.setItem('chat_visitor_id', newVisitorId);

    setSessionId(newSessionId);
    setVisitorId(newVisitorId);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (chatContainerRef.current && !chatContainerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [...messages.filter((m) => m.id !== 'greeting'), userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatHistory,
          sessionId,
          visitorId,
          language,
        }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || data.error || (language === 'es' ? 'Lo siento, algo salió mal.' : 'Sorry, something went wrong.'),
        sources: data.sources || [],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: language === 'es'
            ? 'Lo siento, no pude conectarme. Por favor contáctenos en https://thenextgenhealth.com/contact'
            : "Sorry, I couldn't connect. Please reach out at https://thenextgenhealth.com/contact",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full shadow-2xl shadow-violet-500/30 hover:from-violet-500 hover:to-indigo-500 transition-all group"
            aria-label="Open chat"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-bold hidden sm:inline">Chat</span>
            {/* Pulse ring */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-300 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-violet-300" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            ref={chatContainerRef}
            className={`fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] sm:w-[420px] h-[600px] max-h-[85vh] flex flex-col rounded-3xl shadow-2xl border overflow-hidden ${
              isDark
                ? 'bg-slate-950 border-slate-800 shadow-black/40'
                : 'bg-white border-slate-200 shadow-slate-300/40'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Back"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-violet-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Nex</h3>
                  <p className="text-[11px] text-violet-100 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    {language === 'es' ? 'Asistente de Marketing' : 'Marketing Assistant'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div
                      className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                        msg.role === 'user'
                          ? 'bg-violet-500 text-white'
                          : isDark
                            ? 'bg-slate-800 text-violet-400'
                            : 'bg-violet-100 text-violet-600'
                      }`}
                    >
                      {msg.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                    </div>
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-br-md'
                          : isDark
                            ? 'bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700'
                            : 'bg-white text-slate-700 rounded-bl-md border border-slate-200 shadow-sm'
                      }`}
                    >
                      {msg.role === 'assistant' ? renderMarkdown(msg.content) : (
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      )}
                    </div>
                  </div>

                  {/* Source links */}
                  {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                    <div className="ml-9 mt-1.5 flex flex-wrap gap-1.5">
                      {msg.sources.map((src, si) => (
                        <a
                          key={si}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full transition-colors ${
                            isDark
                              ? 'bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 border border-violet-500/20'
                              : 'bg-violet-50 text-violet-600 hover:bg-violet-100 border border-violet-200'
                          }`}
                        >
                          <ExternalLink className="h-2.5 w-2.5" />
                          {src.title || 'Source'}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isDark ? 'bg-slate-800 text-violet-400' : 'bg-violet-100 text-violet-600'}`}>
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className={`px-4 py-3 rounded-2xl rounded-bl-md ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200 shadow-sm'}`}>
                    <div className="flex items-center gap-1.5">
                      <Loader2 className={`h-3.5 w-3.5 animate-spin ${isDark ? 'text-violet-400' : 'text-violet-500'}`} />
                      <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {language === 'es' ? 'Pensando...' : 'Thinking...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestion Chips (show only at start) */}
              {messages.length <= 1 && !isLoading && (
                <div className="space-y-2.5 pt-2">
                  <p className={`text-xs font-medium px-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    {language === 'es' ? 'Explora temas:' : 'Explore topics:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestionChips.map((chip, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(chip.query)}
                        className={`text-xs px-3.5 py-2 rounded-full font-medium transition-all hover:scale-[1.03] ${
                          isDark
                            ? 'bg-slate-800/80 text-violet-300 hover:bg-violet-500/20 border border-slate-700/50 hover:border-violet-500/40'
                            : 'bg-white text-violet-600 hover:bg-violet-50 border border-violet-200 hover:border-violet-400 shadow-sm'
                        }`}
                      >
                        {language === 'es' ? chip.labelEs : chip.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-3 border-t ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={language === 'es' ? 'Pregúntale a Nex...' : 'Ask Nex anything...'}
                  disabled={isLoading}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all ${
                    isDark
                      ? 'bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:border-violet-500'
                      : 'bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-200 focus:border-violet-500 focus:bg-white'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={`p-2.5 rounded-xl transition-all ${
                    input.trim() && !isLoading
                      ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:from-violet-400 hover:to-indigo-400 shadow-lg shadow-violet-500/20'
                      : isDark
                        ? 'bg-slate-800 text-slate-600'
                        : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className={`text-[10px] text-center mt-2 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                {language === 'es' ? 'Nex · Asistente IA · Respuestas basadas en nuestro sitio' : 'Nex · AI Assistant · Answers powered by our website'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

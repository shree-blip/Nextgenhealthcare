import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Loader2,
  Type,
  Image as ImageIcon,
  Video,
  Copy,
  Download,
  Sparkles,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

type Mode = 'text' | 'image' | 'video';
type Tone = 'professional' | 'casual' | 'creative';
type Format = 'square' | '16:9';

interface PromptTemplate {
  label: string;
  prompt: string;
  mode: Mode;
}

const promptTemplates: PromptTemplate[] = [
  {
    label: 'Blog Post',
    prompt: 'Write a comprehensive blog post about the benefits of healthcare technology',
    mode: 'text',
  },
  {
    label: 'Ad Copy',
    prompt: 'Create compelling ad copy for a healthcare marketing campaign',
    mode: 'text',
  },
  {
    label: 'Social Caption',
    prompt: 'Write an engaging social media caption for a healthcare clinic',
    mode: 'text',
  },
  {
    label: 'Promo Image',
    prompt: 'A professional healthcare clinic promotional image with modern design',
    mode: 'image',
  },
  {
    label: 'Hero Banner',
    prompt: 'A vibrant hero banner showcasing healthcare professionals helping patients',
    mode: 'image',
  },
  {
    label: 'Product Demo',
    prompt: 'A short promotional video showcasing a medical device in action',
    mode: 'video',
  },
  {
    label: 'Brand Story',
    prompt: 'An inspiring video about healthcare innovation and patient care',
    mode: 'video',
  },
];

export default function AiCreatorPage() {
  // TODO: Replace with actual authenticated user ID from your auth system
  // Example: const { user } = useAuth(); const userId = user.id;
  const userId = 'admin-user-1'; // Mock user ID for demonstration

  const [mode, setMode] = useState<Mode>('text');
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState<Tone>('professional');
  const [format, setFormat] = useState<Format>('square');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Show notification with auto-dismiss
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Handle template click
  const handleTemplateClick = (template: PromptTemplate) => {
    setMode(template.mode);
    setPrompt(template.prompt);
  };

  // Handle generate button click
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      showNotification('error', 'Please enter a prompt');
      return;
    }

    setLoading(true);
    setOutput('');

    try {
      let response;
      let result;

      if (mode === 'text') {
        response = await fetch('/api/ai/text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, tone, userId }),
        });
        result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to generate text');
        }

        setOutput(result.text);
        showNotification('success', 'Text generated successfully!');
      } else if (mode === 'image') {
        response = await fetch('/api/ai/image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, format, userId }),
        });
        result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to generate image');
        }

        setOutput(result.imageUrl);
        showNotification('success', 'Image generated successfully!');
      } else if (mode === 'video') {
        response = await fetch('/api/ai/video', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, userId }),
        });
        result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to generate video');
        }

        setOutput(result.videoUrl);
        showNotification('success', 'Video generated successfully!');
      }
    } catch (error: any) {
      console.error('Generation error:', error);
      showNotification('error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Handle copy text
  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      showNotification('success', 'Copied to clipboard!');
    }
  };

  // Handle download
  const handleDownload = () => {
    if (!output) return;

    const link = document.createElement('a');
    link.href = output;
    link.download = `${mode}-${Date.now()}.${mode === 'image' ? 'jpg' : 'mp4'}`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Download started!');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex items-center gap-3">
          <Sparkles className="h-8 w-8 text-emerald-500" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              AI Creator Studio
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Generate text, images, and videos with AI
            </p>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
        {/* Left Panel - Controls */}
        <div className="space-y-6">
          {/* Mode Selector */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
              Select Mode
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setMode('text')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                  mode === 'text'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Type className="h-6 w-6" />
                <span className="text-sm font-bold">Text</span>
              </button>
              <button
                onClick={() => setMode('image')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                  mode === 'image'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <ImageIcon className="h-6 w-6" />
                <span className="text-sm font-bold">Image</span>
              </button>
              <button
                onClick={() => setMode('video')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                  mode === 'video'
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Video className="h-6 w-6" />
                <span className="text-sm font-bold">Video</span>
              </button>
            </div>
          </div>

          {/* Prompt Templates */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
              Quick Templates
            </h2>
            <div className="flex flex-wrap gap-2">
              {promptTemplates
                .filter((t) => t.mode === mode)
                .map((template, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTemplateClick(template)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-full text-sm font-medium transition-colors"
                  >
                    {template.label}
                  </button>
                ))}
            </div>
          </div>

          {/* Settings */}
          {mode === 'text' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
                Tone
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {(['professional', 'casual', 'creative'] as Tone[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      tone === t
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === 'image' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
                Format
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {(['square', '16:9'] as Format[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      format === f
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {f === 'square' ? 'Square' : 'Widescreen (16:9)'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Prompt Input */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
              Your Prompt
            </h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe what you want to ${
                mode === 'text' ? 'write' : 'generate'
              }...`}
              rows={6}
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </>
            )}
          </button>
        </div>

        {/* Right Panel - Output Preview */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Preview
            </h2>
            <div className="flex items-center gap-2">
              {mode === 'text' && output && (
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </button>
              )}
              {(mode === 'image' || mode === 'video') && output && (
                <button
                  onClick={handleDownload}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </button>
              )}
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 p-6 overflow-auto">
            {!output && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  {mode === 'text' && <Type className="h-8 w-8 text-slate-400" />}
                  {mode === 'image' && <ImageIcon className="h-8 w-8 text-slate-400" />}
                  {mode === 'video' && <Video className="h-8 w-8 text-slate-400" />}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  No {mode} generated yet
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500">
                  Enter a prompt and click generate
                </p>
              </div>
            )}

            {loading && (
              <div className="h-full flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mb-4" />
                <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  Generating your {mode}...
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {mode === 'video'
                    ? 'This may take up to 60 seconds'
                    : 'Please wait a moment'}
                </p>
              </div>
            )}

            {output && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {mode === 'text' && (
                  <div className="prose dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-slate-900 dark:text-white font-sans text-base leading-relaxed">
                      {output}
                    </pre>
                  </div>
                )}
                {mode === 'image' && (
                  <img
                    src={output}
                    alt="Generated image"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                )}
                {mode === 'video' && (
                  <video
                    src={output}
                    controls
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Popup */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
          >
            <div
              className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl ${
                notification.type === 'success'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

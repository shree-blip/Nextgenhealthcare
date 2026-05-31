import { useRef, useCallback, useState, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Code,
  Undo,
  Redo,
  Upload,
  X,
  ExternalLink
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  onImageUpload?: () => void;
  blogTitle?: string; // For auto-generating ALT text
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start writing...',
  minHeight = '400px',
  blogTitle = ''
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const isInternalChange = useRef(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageAlt, setImageAlt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkTarget, setLinkTarget] = useState<'_self' | '_blank'>('_blank');

  // Sync editor content when value changes externally (e.g. loaded from DB)
  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  }, [onChange]);

  const handleFormat = (format: string, value?: string) => {
    execCommand(format, value);
  };

  const handleHeading = (level: string) => {
    execCommand('formatBlock', level);
  };

  const handleFontSize = (size: string) => {
    execCommand('fontSize', size);
  };

  const handleLink = () => {
    // Get selected text if any
    const selection = window.getSelection();
    const selectedText = selection?.toString();
    
    // Save the current selection range BEFORE modal opens and steals focus
    if (selection && selection.rangeCount > 0) {
      savedRangeRef.current = selection.getRangeAt(0).cloneRange();
    }
    
    setLinkText(selectedText || '');
    setLinkUrl('');
    setShowLinkModal(true);
  };

  const insertLink = () => {
    if (!linkUrl) return;
    
    // CRITICAL: Restore focus to the editor first - modal stole it
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    const selection = window.getSelection();
    if (!selection) return;

    // Restore the saved selection range from before the modal opened
    if (savedRangeRef.current) {
      try {
        selection.removeAllRanges();
        selection.addRange(savedRangeRef.current);
      } catch (e) {
        // If restoring fails, place cursor at end of editor
        if (editorRef.current) {
          const range = document.createRange();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }

    const hasSelectedText = selection.toString().length > 0;
    const displayText = linkText || selection.toString() || linkUrl;
    const linkHtml = `<a href="${linkUrl}" target="${linkTarget}" rel="${linkTarget === '_blank' ? 'noopener noreferrer' : ''}" style="color: #2563eb; text-decoration: underline; cursor: pointer;">${displayText}</a>`;

    if (hasSelectedText) {
      // Replace selected text with link
      execCommand('insertHTML', linkHtml);
    } else {
      // Insert link at cursor position
      execCommand('insertHTML', linkHtml + '&nbsp;');
    }

    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
    setLinkTarget('_blank');
    savedRangeRef.current = null;
  };

  const handleImageClick = () => {
    setShowImageModal(true);
    setImageFile(null);
    setImageUrl('');
    // Auto-generate ALT text from blog title
    const autoAlt = blogTitle ? `${blogTitle.substring(0, 60)} - Image` : 'Blog image';
    setImageAlt(autoAlt);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImageUrl(''); // Clear URL if file is selected
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile && !imageUrl) return;

    setUploadingImage(true);

    try {
      let finalUrl = imageUrl;

      // If uploading a file
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('alt', imageAlt);

        const response = await fetch('/api/upload/blog-image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        finalUrl = data.url;
      }

      // Insert image into editor
      if (finalUrl) {
        const imgHtml = `<img src="${finalUrl}" alt="${imageAlt || 'Blog image'}" class="max-w-full h-auto rounded-lg my-4" />`;
        execCommand('insertHTML', imgHtml);
      }

      setShowImageModal(false);
      setImageFile(null);
      setImageUrl('');
      setImageAlt('');
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleImageUpload();
  };

  const handleLinkInsertClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    insertLink();
  };

  const handleInput = () => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Undo: Ctrl+Z / Cmd+Z
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      document.execCommand('undo', false);
      if (editorRef.current) {
        isInternalChange.current = true;
        onChange(editorRef.current.innerHTML);
      }
    }
    // Redo: Ctrl+Shift+Z / Cmd+Shift+Z or Ctrl+Y / Cmd+Y
    if (((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
      e.preventDefault();
      document.execCommand('redo', false);
      if (editorRef.current) {
        isInternalChange.current = true;
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const ToolbarButton = ({ 
    onClick, 
    children, 
    title 
  }: { 
    onClick: () => void; 
    children: React.ReactNode; 
    title: string;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
  );

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80">
        {/* Undo/Redo */}
        <ToolbarButton onClick={() => execCommand('undo')} title="Undo">
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand('redo')} title="Redo">
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Font/Heading Dropdown */}
        <select
          onChange={(e) => handleHeading(e.target.value)}
          className="px-2 py-1 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-emerald-500"
          defaultValue=""
        >
          <option value="" disabled>Format</option>
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="blockquote">Quote</option>
          <option value="pre">Code Block</option>
        </select>

        {/* Font Size */}
        <select
          onChange={(e) => handleFontSize(e.target.value)}
          className="px-2 py-1 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-emerald-500"
          defaultValue="3"
        >
          <option value="1">Small</option>
          <option value="2">Normal</option>
          <option value="3">Medium</option>
          <option value="4">Large</option>
          <option value="5">X-Large</option>
          <option value="6">XX-Large</option>
        </select>

        <ToolbarDivider />

        {/* Text Formatting */}
        <ToolbarButton onClick={() => handleFormat('bold')} title="Bold">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleFormat('italic')} title="Italic">
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleFormat('underline')} title="Underline">
          <Underline className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Headings Quick Access */}
        <ToolbarButton onClick={() => handleHeading('h1')} title="Heading 1">
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleHeading('h2')} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleHeading('h3')} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Lists */}
        <ToolbarButton onClick={() => handleFormat('insertUnorderedList')} title="Bullet List">
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleFormat('insertOrderedList')} title="Numbered List">
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Alignment */}
        <ToolbarButton onClick={() => handleFormat('justifyLeft')} title="Align Left">
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleFormat('justifyCenter')} title="Align Center">
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleFormat('justifyRight')} title="Align Right">
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Link & Image */}
        <ToolbarButton onClick={handleLink} title="Insert Link">
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={handleImageClick} title="Insert Image">
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Quote & Code */}
        <ToolbarButton onClick={() => handleHeading('blockquote')} title="Block Quote">
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleFormat('insertHTML', '<code></code>')} title="Inline Code">
          <Code className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="editor-shell p-4 focus:outline-none prose dark:prose-invert max-w-none"
        style={{ minHeight }}
        data-placeholder={placeholder}
      />

      {/* Image/Link Helper Area */}
      <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border-2 border-dashed border-emerald-500/30 dark:border-emerald-500/20 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-sm text-slate-900 dark:text-slate-100">Insert Image</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Click the <strong>Image button</strong> above to upload an image or paste URL. ALT text will be auto-generated.
              </p>
              <button
                type="button"
                onClick={handleImageClick}
                className="w-full px-3 py-2 bg-emerald-500 text-black text-sm font-bold rounded-lg hover:bg-emerald-400 transition-colors"
              >
                Add Image
              </button>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border-2 border-dashed border-blue-500/30 dark:border-blue-500/20 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <LinkIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-sm text-slate-900 dark:text-slate-100">Insert Link</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Select text, then click the <strong>Link button</strong> above to create inbound or outbound links.
              </p>
              <button
                type="button"
                onClick={handleLink}
                className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-colors"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowLinkModal(false)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-200 dark:border-slate-700 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <LinkIcon className="h-5 w-5" />
                Insert Link
              </h3>
              <button type="button" onClick={() => setShowLinkModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Link URL *</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Link Text (optional)</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Click here"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">If empty, selected text or URL will be used</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Open link in:</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="linkTarget"
                      checked={linkTarget === '_blank'}
                      onChange={() => setLinkTarget('_blank')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      New tab <ExternalLink className="h-3 w-3" />
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="linkTarget"
                      checked={linkTarget === '_self'}
                      onChange={() => setLinkTarget('_self')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Same tab</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleLinkInsertClick}
                  disabled={!linkUrl}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Insert Link
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowLinkModal(false);
                  }}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowImageModal(false)} />
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-200 dark:border-slate-700 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <ImageIcon className="h-5 w-5" />
                Insert Image
              </h3>
              <button type="button" onClick={() => setShowImageModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 dark:text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Upload option */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Upload Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-emerald-500 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Upload className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                    <div>
                      <p className="font-medium text-sm text-slate-700 dark:text-slate-300">Click to upload</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </button>
                {imageFile && (
                  <p className="mt-2 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    {imageFile.name}
                  </p>
                )}
              </div>

              {/* OR divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">OR</span>
                </div>
              </div>

              {/* URL option */}
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImageFile(null);
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* ALT text */}
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Alt Text *</label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Describe the image for accessibility"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Auto-generated from blog title. Edit if needed for better SEO & accessibility.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleImageUploadClick}
                  disabled={(!imageFile && !imageUrl) || !imageAlt || uploadingImage}
                  className="flex-1 px-4 py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImage ? 'Uploading...' : 'Insert Image'}
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowImageModal(false);
                  }}
                  disabled={uploadingImage}
                  className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
        [contenteditable] h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
        }
        [contenteditable] h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
        }
        [contenteditable] h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        [contenteditable] h4 {
          font-size: 1em;
          font-weight: bold;
          margin: 0.83em 0;
        }
        [contenteditable] blockquote {
          border-left: 4px solid #10b981;
          padding-left: 1em;
          margin: 1em 0;
          color: #475569;
          font-style: italic;
        }
        [contenteditable] pre {
          background: #1e293b;
          color: #e2e8f0;
          padding: 1em;
          border-radius: 0.5em;
          overflow-x: auto;
        }
        [contenteditable] code {
          background: #f1f5f9;
          padding: 0.2em 0.4em;
          border-radius: 0.25em;
          font-family: monospace;
          font-size: 0.9em;
        }
        [contenteditable] ul, [contenteditable] ol {
          padding-left: 1.5em;
          margin: 1em 0;
        }
        [contenteditable] li {
          margin: 0.25em 0;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5em;
        }
        [contenteditable] a {
          color: #2563eb;
          text-decoration: underline;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        [contenteditable] a:hover {
          color: #1d4ed8;
        }
        [contenteditable] p {
          margin: 0.5em 0;
          line-height: 1.7;
        }
        /* Dark mode overrides via :where to keep specificity manageable */
        :global(.dark) [contenteditable] a,
        :global(.theme-dark) [contenteditable] a {
          color: #60a5fa;
        }
        :global(.dark) [contenteditable] a:hover,
        :global(.theme-dark) [contenteditable] a:hover {
          color: #93c5fd;
        }
        :global(.dark) [contenteditable] blockquote,
        :global(.theme-dark) [contenteditable] blockquote {
          color: #94a3b8;
        }
        :global(.dark) [contenteditable] code,
        :global(.theme-dark) [contenteditable] code {
          background: #334155;
          color: #e2e8f0;
        }
      `}</style>
    </div>
  );
}

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
  maxHeight?: string;
  onImageUpload?: () => void;
  blogTitle?: string; // For auto-generating ALT text
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start writing...',
  minHeight = '400px',
  maxHeight = '520px',
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
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkTarget, setLinkTarget] = useState<'_self' | '_blank'>('_blank');

  // The block tag at the cursor (e.g. 'p', 'h1', 'h2', 'blockquote'). Drives
  // BOTH the Format dropdown's selected option AND the H1/H2/H3 button active
  // styling, so the toolbar is always a live mirror of the cursor's context.
  // Empty string means the cursor isn't in a recognised block (e.g. editor is
  // unfocused or empty).
  const [activeBlock, setActiveBlock] = useState('');

  // Save the current editor selection. Used by toolbar controls that take focus
  // away from the contenteditable (notably <select>, which natively steals focus
  // when its dropdown opens). Without this, execCommand fires with no selection
  // and the formatting silently no-ops.
  const saveSelection = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (editorRef.current?.contains(range.startContainer)) {
      savedRangeRef.current = range.cloneRange();
    }
  }, []);

  const restoreSelection = useCallback(() => {
    if (!editorRef.current || !savedRangeRef.current) return;
    editorRef.current.focus();
    const sel = window.getSelection();
    if (!sel) return;
    try {
      sel.removeAllRanges();
      sel.addRange(savedRangeRef.current);
    } catch {
      // Range stale; place caret at end as a fallback so formatBlock still has
      // something to operate on.
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, []);

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
    // Some browsers (Chrome >= 117) require styleWithCSS=false for formatBlock
    // to produce semantic <h1>/<h2> tags instead of inline <span style>.
    // Setting it on every call is cheap and defensive.
    try { document.execCommand('styleWithCSS', false, 'false'); } catch {}
    document.execCommand(command, false, value);
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
    // After the DOM mutates, re-read the block tag so the toolbar reflects
    // the new state (button highlight, dropdown label).
    syncActiveBlock();
  }, [onChange, syncActiveBlock]);

  // Ensure the editor has an active selection before running a toolbar command.
  // If the editor isn't focused (e.g. the user clicked elsewhere then a toolbar
  // button), restore the saved range; if there is no saved range, place the
  // caret at the end of the editor so formatBlock has somewhere to apply.
  const ensureEditorFocus = useCallback(() => {
    if (!editorRef.current) return;
    const sel = window.getSelection();
    const hasEditorSel =
      sel && sel.rangeCount > 0 && editorRef.current.contains(sel.anchorNode);
    if (hasEditorSel) return;
    editorRef.current.focus();
    const fresh = window.getSelection();
    if (!fresh) return;
    if (savedRangeRef.current) {
      try {
        fresh.removeAllRanges();
        fresh.addRange(savedRangeRef.current);
        return;
      } catch {}
    }
    const range = document.createRange();
    range.selectNodeContents(editorRef.current);
    range.collapse(false);
    fresh.removeAllRanges();
    fresh.addRange(range);
  }, []);

  const handleFormat = (format: string, value?: string) => {
    ensureEditorFocus();
    execCommand(format, value);
  };

  // Returns the block-level tag the current selection sits in (lower-case), or ''
  const currentBlockTag = useCallback((): string => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return '';
    let node: Node | null = sel.getRangeAt(0).startContainer;
    const root = editorRef.current;
    while (node && node !== root) {
      if (node.nodeType === 1) {
        const tag = (node as HTMLElement).tagName.toLowerCase();
        if (['p', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'pre', 'div'].includes(tag)) return tag;
      }
      node = node.parentNode;
    }
    return '';
  }, []);

  // Sync activeBlock with the cursor. Called from every editor interaction so
  // the toolbar UI stays in lockstep with where the user is typing.
  const syncActiveBlock = useCallback(() => {
    const tag = currentBlockTag();
    // Normalise <div> wrappers (Chrome wraps fresh contenteditable text in <div>
    // by default) to 'p' so the dropdown shows "Paragraph" rather than nothing.
    setActiveBlock(tag === 'div' ? 'p' : tag);
  }, [currentBlockTag]);

  // Buttons: clicking the same heading button toggles back to a paragraph
  // (a common pattern users expect from word processors).
  const handleHeading = (level: string) => {
    ensureEditorFocus();
    const target = currentBlockTag() === level ? 'p' : level;
    execCommand('formatBlock', `<${target}>`);
  };

  // Dropdown: always set to the picked value (no toggle). The dropdown is
  // already a deliberate "choose this format" gesture; toggling back to p
  // would be surprising.
  const handleFormatSelect = (level: string) => {
    if (!level) return;
    ensureEditorFocus();
    execCommand('formatBlock', `<${level}>`);
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
    setUploadError(null);
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
    setUploadError(null);

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

        const data = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(data.error || `Upload failed (${response.status})`);

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
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
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
    // Insert Link: Ctrl+K / Cmd+K — opens the link popup with any selected
    // text pre-filled, instead of having to reach for the toolbar button.
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      handleLink();
      return;
    }
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
    title,
    active = false,
  }: {
    onClick: () => void;
    children: React.ReactNode;
    title: string;
    active?: boolean;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={
        'p-2 rounded-lg transition-colors ' +
        (active
          ? 'bg-[#F5C857] text-[#4A3208] dark:bg-[#F5C857] dark:text-[#4A3208] ring-1 ring-[#E5B73A]'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white')
      }
    >
      {children}
    </button>
  );

  const ToolbarDivider = () => (
    <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
  );

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900">
      {/* Toolbar — sticky so it stays visible while scrolling long posts.
          Note: the wrapper must NOT be overflow-hidden or sticky would be clipped. */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/80 rounded-t-xl">
        {/* Undo/Redo */}
        <ToolbarButton onClick={() => execCommand('undo')} title="Undo">
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => execCommand('redo')} title="Redo">
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarDivider />

        {/* Format Dropdown — bound to activeBlock so it always reflects the
            block at the cursor (e.g. cursor inside an <h2> → "Heading 2"
            shown). onMouseDown saves the selection because opening a native
            <select> dropdown unfocuses the contenteditable. */}
        <select
          value={['p','h1','h2','h3','h4','blockquote','pre'].includes(activeBlock) ? activeBlock : ''}
          onMouseDown={saveSelection}
          onChange={(e) => {
            const val = e.target.value;
            if (!val) return;
            restoreSelection();
            handleFormatSelect(val);
          }}
          className="px-2 py-1 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-[#E5B73A]"
        >
          <option value="">Format</option>
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="blockquote">Quote</option>
          <option value="pre">Code Block</option>
        </select>

        {/* Font Size — execCommand('fontSize') is global rather than per-block,
            so we don't track its active state. Pick → apply → caret returns to
            the editor; the dropdown keeps showing the last pick as a hint. */}
        <select
          onMouseDown={saveSelection}
          onChange={(e) => {
            const val = e.target.value;
            if (!val) return;
            restoreSelection();
            handleFontSize(val);
          }}
          defaultValue=""
          className="px-2 py-1 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:border-[#E5B73A]"
        >
          <option value="">Size</option>
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

        {/* Headings Quick Access — highlight when the cursor is inside a
            matching block, so the user always knows what's active. */}
        <ToolbarButton onClick={() => handleHeading('h1')} title="Heading 1" active={activeBlock === 'h1'}>
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleHeading('h2')} title="Heading 2" active={activeBlock === 'h2'}>
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleHeading('h3')} title="Heading 3" active={activeBlock === 'h3'}>
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

        {/* Quote & Code — Quote highlights when cursor is inside a blockquote. */}
        <ToolbarButton onClick={() => handleHeading('blockquote')} title="Block Quote" active={activeBlock === 'blockquote'}>
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => handleFormat('insertHTML', '<code></code>')} title="Inline Code">
          <Code className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor Area — onKeyUp/onMouseUp/onFocus do two things: save the caret
          (so toolbar selects that steal focus can restore it) AND re-read the
          current block tag (so the dropdown label and H1/H2/H3 button
          highlights track the cursor live as it moves). */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => { handleInput(); syncActiveBlock(); }}
        onKeyDown={handleKeyDown}
        onKeyUp={() => { saveSelection(); syncActiveBlock(); }}
        onMouseUp={() => { saveSelection(); syncActiveBlock(); }}
        onFocus={syncActiveBlock}
        className="editor-shell p-4 focus:outline-none prose dark:prose-invert max-w-none overflow-y-auto"
        style={{ minHeight, maxHeight }}
        data-placeholder={placeholder}
      />

      {/* Image/Link Helper Area */}
      <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-b-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border-2 border-dashed border-[#EAD08A] dark:border-[#EAD08A] flex-1">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="h-5 w-5 text-[#4A3208] dark:text-[#4A3208]" />
                <span className="font-medium text-sm text-slate-900 dark:text-slate-100">Insert Image</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Click the <strong>Image button</strong> above to upload an image or paste URL. ALT text will be auto-generated.
              </p>
              <button
                type="button"
                onClick={handleImageClick}
                className="w-full px-3 py-2 bg-[#F5C857] text-[#4A3208] text-sm font-bold rounded-lg hover:bg-[#E9B83A] transition-colors"
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
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
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
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
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
                      className="text-[#4A3208] focus:ring-[#E5B73A]"
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
                      className="text-[#4A3208] focus:ring-[#E5B73A]"
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
                  className="flex-1 px-4 py-2 bg-[#F5C857] text-[#4A3208] font-bold rounded-lg hover:bg-[#E9B83A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-[#E5B73A] transition-colors text-left"
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
                  <p className="mt-2 text-sm text-[#4A3208] dark:text-[#4A3208] flex items-center gap-2">
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
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
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
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#E5B73A]"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Auto-generated from blog title. Edit if needed for better SEO & accessibility.
                </p>
              </div>

              {uploadError && (
                <p role="alert" className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg px-3 py-2">
                  {uploadError}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleImageUploadClick}
                  disabled={(!imageFile && !imageUrl) || !imageAlt || uploadingImage}
                  className="flex-1 px-4 py-2 bg-[#F5C857] text-[#4A3208] font-bold rounded-lg hover:bg-[#E9B83A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          border-left: 4px solid #CC8F1A;
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

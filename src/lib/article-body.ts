/**
 * Renders article body text (blog posts + healthcare news) into clean,
 * styled HTML for `.bpx-content`.
 *
 * Stored content is plain text — the server sanitizer strips HTML tags — so a
 * naive `dangerouslySetInnerHTML` produces an unstyled wall of text. This
 * lightweight markdown-lite parser recovers structure (headings, lists, bold,
 * links, paragraphs) so the prose stylesheet has real elements to style. If the
 * content already contains block-level HTML it's trusted and returned as-is.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Inline formatting: **bold**, *italic*, `code`, and [text](url) links. */
function inline(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );
}

export function renderArticleHtml(raw: string | null | undefined): string {
  if (!raw || !raw.trim()) return '';

  // Already HTML (admin may paste rich content later) — trust it.
  if (/<(p|h[1-6]|ul|ol|li|blockquote|br|div|img)\b/i.test(raw)) return raw;

  const blocks = raw
    .replace(/\r\n/g, '\n')
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  const out: string[] = [];

  for (const block of blocks) {
    const lines = block.split('\n');

    // Markdown ATX heading: #, ##, ### → h2..h4
    const heading = lines.length === 1 ? block.match(/^(#{1,4})\s+(.*)$/) : null;
    if (heading) {
      const level = Math.min(heading[1].length + 1, 4);
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }

    // Blockquote
    if (lines.every((l) => /^\s*>\s?/.test(l))) {
      out.push(`<blockquote>${inline(block.replace(/^\s*>\s?/gm, ''))}</blockquote>`);
      continue;
    }

    // Unordered list
    if (lines.every((l) => /^\s*[-*•]\s+/.test(l))) {
      const items = lines.map((l) => `<li>${inline(l.replace(/^\s*[-*•]\s+/, ''))}</li>`).join('');
      out.push(`<ul>${items}</ul>`);
      continue;
    }

    // Ordered list
    if (lines.every((l) => /^\s*\d+[.)]\s+/.test(l))) {
      const items = lines.map((l) => `<li>${inline(l.replace(/^\s*\d+[.)]\s+/, ''))}</li>`).join('');
      out.push(`<ol>${items}</ol>`);
      continue;
    }

    // Heuristic heading: a short standalone line with no terminal punctuation
    // (handles AI prose that uses bare section titles instead of markdown #).
    if (lines.length === 1 && block.length <= 72 && !/[.:;,!?]$/.test(block) && !/^https?:/i.test(block)) {
      out.push(`<h2>${inline(block)}</h2>`);
      continue;
    }

    // Paragraph — single newlines become soft breaks.
    out.push(`<p>${lines.map((l) => inline(l)).join('<br>')}</p>`);
  }

  return out.join('\n');
}

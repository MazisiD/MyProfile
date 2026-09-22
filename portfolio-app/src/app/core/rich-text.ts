// Lightweight, safe formatting for admin-authored long-form text fields.
// Supports a tiny "mini markdown" syntax:
//   - blank line  -> paragraph break (formatParagraphs only)
//   - single \n   -> <br>
//   - **text**    -> <strong>text</strong>
// Everything else is HTML-escaped first, so pasted markup/script tags render
// as plain text instead of executing - safe to bind via [innerHTML].

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function applyBold(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/** Escapes + bolds text, converting single line breaks to `<br>` (no paragraph wrapping). */
export function formatInline(text: string | null | undefined): string {
  if (!text) return '';
  return applyBold(escapeHtml(text)).replace(/\n/g, '<br>');
}

/**
 * Escapes + bolds text, treating blank lines as paragraph breaks and single
 * line breaks as `<br>` within a paragraph. Ideal for long-form fields like
 * bios, intros, and project write-ups.
 */
export function formatParagraphs(text: string | null | undefined): string {
  if (!text) return '';
  return escapeHtml(text)
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .filter(Boolean)
    .map(block => `<p>${applyBold(block).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

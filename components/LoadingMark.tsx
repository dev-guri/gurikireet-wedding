export default function LoadingMark({ compact = false }: { compact?: boolean }) {
  return <span className={`loading-mark ${compact ? 'compact' : ''}`} role="status">
    <svg width="42" height="32" viewBox="0 0 60 44" fill="none" aria-hidden="true"><ellipse className="loading-ring first" cx="23" cy="22" rx="16" ry="13" stroke="var(--ink)" strokeWidth="2" transform="rotate(-25 23 22)" /><ellipse className="loading-ring second" cx="38" cy="22" rx="16" ry="13" stroke="var(--accent, #B49A55)" strokeWidth="2" transform="rotate(-25 38 22)" /></svg>
    <span className={compact ? 'sr-only' : ''}>A little love, loading…</span>
  </span>;
}

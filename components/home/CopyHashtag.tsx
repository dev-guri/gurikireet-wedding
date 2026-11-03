'use client';
import { useEffect, useState } from 'react';

export default function CopyHashtag({ hashtag }: { hashtag: string }) {
  const [status, setStatus] = useState<'ready' | 'copied' | 'error'>('ready');
  useEffect(() => {
    if (status !== 'copied') return;
    const timer = setTimeout(() => setStatus('ready'), 2500);
    return () => clearTimeout(timer);
  }, [status]);
  async function copy() {
    try { await navigator.clipboard.writeText(hashtag); setStatus('copied'); }
    catch { setStatus('error'); }
  }
  return <div className="landing-copy-tag"><button className="landing-text-link" onClick={copy}>{status === 'copied' ? 'Copied! ✓' : 'Copy our hashtag ↗'}</button><span role="status" className={status === 'error' ? 'landing-copy-message' : 'sr-only'}>{status === 'error' ? `Select ${hashtag} above to copy it.` : status === 'copied' ? 'Hashtag copied to clipboard.' : ''}</span></div>;
}

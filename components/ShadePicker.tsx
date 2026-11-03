'use client';
import { useState } from 'react';
import type { Shade } from '@/lib/constants';

export default function ShadePicker({ id, title, shades, selected, onChange }: {
  id: string;
  title: string;
  shades: Shade[];
  selected: number;
  onChange: (index: number) => void;
}) {
  const [hasTriedShade, setHasTriedShade] = useState(false);
  const hintId = `${id}-shade-hint`;
  return <div className="shade-picker" data-inviting={!hasTriedShade || undefined}>
    <div className="shade-dots" role="group" aria-label={`${title} outfit colors`} aria-describedby={hasTriedShade ? undefined : hintId}>
      {shades.map((color, index) => <button key={color.hex} type="button" className={`shade-dot ${selected === index ? 'selected' : ''}`} style={{ backgroundColor: color.hex }} aria-label={`Try ${color.name} on our outfits`} aria-pressed={selected === index} title={`Try ${color.name}`} onClick={() => { if (index !== selected) setHasTriedShade(true); onChange(index); }}>
        <span className="shade-tooltip">{color.name}</span>{selected === index && <span aria-hidden="true">✓</span>}
      </button>)}
    </div>
    <p id={hintId} className={`shade-invitation ${hasTriedShade ? 'is-dismissed' : ''}`} aria-hidden={hasTriedShade}>
      <svg className="shade-tap-hand" width="20" height="24" viewBox="0 0 24 28" fill="none" aria-hidden="true"><path d="M8 16V5a2 2 0 014 0v8-2a2 2 0 014 0v2-1a2 2 0 014 0v4-1a2 2 0 013 0v5c0 4-3 6-6 6h-4c-2 0-3-1-4-3l-4-6a2 2 0 013-2l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 3L4 1M14 3l2-2M10 1V0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
      Tap a shade to change our outfits
    </p>
    <p className="selection-label" aria-live="polite">{shades[selected].name}</p>
  </div>;
}

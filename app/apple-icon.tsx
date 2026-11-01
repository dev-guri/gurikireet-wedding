import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="150" height="150" viewBox="0 0 64 64" fill="none"><ellipse cx="24" cy="32" rx="18" ry="14" transform="rotate(-28 24 32)" stroke="#20201E" strokeWidth="4.5" /><ellipse cx="40" cy="32" rx="18" ry="14" transform="rotate(-28 40 32)" stroke="white" strokeWidth="7.5" /><ellipse cx="40" cy="32" rx="18" ry="14" transform="rotate(-28 40 32)" stroke="#B49A55" strokeWidth="4.5" /><path d="M25 45C29 45 33 43 36 40" stroke="white" strokeWidth="7.5" strokeLinecap="round" /><path d="M25 45C29 45 33 43 36 40" stroke="#20201E" strokeWidth="4.5" strokeLinecap="round" /></svg></div>, size);
}

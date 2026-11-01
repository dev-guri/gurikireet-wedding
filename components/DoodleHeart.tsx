export default function DoodleHeart({ className = '' }: { className?: string }) {
  return <svg className={`doodle-heart ${className}`} viewBox="0 0 60 80" fill="none" aria-hidden="true"><path d="M29 68C21 51 7 29 13 15C18 5 26 13 29 33C34 16 44 3 49 11C56 23 38 53 29 68Z" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

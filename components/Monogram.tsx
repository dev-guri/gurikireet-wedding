import DoodleImage from '@/components/DoodleImage';

export default function Monogram({ small = false }: { small?: boolean }) {
  return <span className={`wedding-brand ${small ? 'small' : ''}`} role="img" aria-label="Gurinder and Gurpreet">
    <DoodleImage className="brand-emblem" src="/images/gurkireet-rings.png" alt="" width={96} height={96} priority={!small} />
    <span className="brand-lettering" aria-hidden="true"><span className="brand-name">Gurinder</span><span className="brand-couple"><span>&amp;</span> Gurpreet</span></span>
  </span>;
}

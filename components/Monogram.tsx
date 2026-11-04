import Image from 'next/image';

export default function Monogram({ small = false }: { small?: boolean }) {
  return <span className={`wedding-brand ${small ? 'small' : ''}`} role="img" aria-label="Gurinder and Gurpreet">
    <Image className="brand-emblem" src="/images/dark/gurkireet-rings-v2.png" alt="" width={96} height={96} priority={!small} />
    <span className="brand-lettering" aria-hidden="true"><span className="brand-name">Gurinder</span><span className="brand-couple"><span>&amp;</span> Gurpreet</span></span>
  </span>;
}

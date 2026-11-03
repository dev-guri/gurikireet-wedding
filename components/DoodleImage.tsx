import Image, { type ImageProps } from 'next/image';
import { darkDoodles } from '@/lib/dark-doodles';

// Pre-rendered artwork avoids canvas memory limits and pixel processing on phones.
export default function DoodleImage({ className = '', ...props }: ImageProps) {
  const darkSrc = typeof props.src === 'string' ? darkDoodles[props.src] : undefined;
  if (!darkSrc) return <Image {...props} className={className} />;
  return <>
    <Image {...props} className={`${className} doodle-original has-cutout`} />
    <Image {...props} src={darkSrc} alt="" aria-hidden="true" className={`${className} doodle-cutout is-prepared`} />
  </>;
}

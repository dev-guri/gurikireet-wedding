'use client';
import { useEffect, useState } from 'react';
import { getCountdown } from '@/lib/countdown';

export default function WeddingCountdown({ target }: { target: string }) {
  const [time, setTime] = useState<ReturnType<typeof getCountdown> | null>(null);
  useEffect(() => {
    const update = () => setTime(getCountdown(target));
    let timer: ReturnType<typeof setInterval> | undefined;
    const syncVisibility = () => {
      clearInterval(timer);
      update();
      if (!document.hidden) timer = setInterval(update, 1000);
    };
    syncVisibility();
    document.addEventListener('visibilitychange', syncVisibility);
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', syncVisibility); };
  }, [target]);
  if (time?.finished) return <p className="landing-countdown-complete">The next chapter begins. ♡</p>;
  const units = ['days', 'hours', 'minutes', 'seconds'] as const;
  return <div className="landing-countdown" role="timer" aria-live="off" aria-label={time ? `${time.days} days, ${time.hours} hours, ${time.minutes} minutes and ${time.seconds} seconds until our wedding day` : 'Counting down to our wedding day'}>
    {units.map(unit => <div className="landing-countdown-unit" key={unit} aria-hidden="true"><span className="landing-countdown-value">{time ? String(time[unit]).padStart(2, '0') : '—'}</span><span>{unit}</span></div>)}
  </div>;
}

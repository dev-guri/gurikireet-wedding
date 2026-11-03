export function getCountdown(target: string, now = Date.now()) {
  const targetTime = new Date(target).getTime();
  if (!Number.isFinite(targetTime)) throw new Error('Invalid countdown date');
  const remaining = Math.max(0, Math.ceil((targetTime - now) / 1000));
  return {
    days: Math.floor(remaining / 86400),
    hours: Math.floor((remaining % 86400) / 3600),
    minutes: Math.floor((remaining % 3600) / 60),
    seconds: remaining % 60,
    finished: remaining === 0,
  };
}

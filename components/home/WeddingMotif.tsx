export default function WeddingMotif({ kind }: { kind: string }) {
  return <svg width="82" height="76" viewBox="0 0 100 90" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === 'western' && <><ellipse cx="38" cy="50" rx="21" ry="23" transform="rotate(-25 38 50)" /><ellipse cx="62" cy="50" rx="21" ry="23" transform="rotate(25 62 50)" stroke="#B49A55" /><path d="M44 17l6-9 7 9-7 8zM33 17h24" stroke="#B49A55" /><path d="M79 22c-12-15-14 3 0 11 14-16 11-22 0-11z" stroke="#C84B4B" /></>}
    {kind === 'haldi' && <><path d="M19 48q3 27 31 27t31-27zM23 57h54M33 75l-3 5h40l-3-5" /><path d="M29 47q8-15 19-13t24 13M50 33q-15-11-10-19 16 1 10 19zM52 33q1-18 14-18 2 13-14 18z" stroke="#5485AE" /><path d="M17 25v9m-4-4h8M80 17v8m-4-4h8" stroke="#B49A55" /></>}
    {kind === 'mehndi' && <><path d="M34 78q-3-11-11-23-7-14-1-16 5-1 12 11V20q0-10 6-9 5 0 5 10v22-31q1-10 6-8 5 0 5 9v30-25q1-9 6-7 5 0 5 9v28-17q1-8 6-6 4 1 4 9v21q0 18-10 24z" /><circle cx="52" cy="59" r="10" stroke="#D3662C" /><path d="M52 45v28m-14-14h28M42 49l20 20m0-20L42 69M40 79h22" stroke="#D3662C" /></>}
    {kind === 'jaggo' && <><g transform="rotate(-17 50 50)"><path d="M22 33h56v34H22zM22 33l14 34 14-34 14 34 14-34M22 67l14-34 14 34 14-34 14 34" /><ellipse cx="22" cy="50" rx="6" ry="17" /><ellipse cx="78" cy="50" rx="6" ry="17" stroke="#B49A55" /><path d="M29 30q20-25 43 0" stroke="#B49A55" /></g><path d="M79 18v-9l9-2v9m-9 3c-7-4-9 5-2 4 2 0 2-2 2-4zm9-3c-7-4-9 5-2 4 2 0 2-2 2-4z" stroke="#C84B4B" /></>}
    {kind === 'venue' && <><path d="M12 79h76M20 79V31h60v48M15 31h70L50 16zM43 79V55h14v24M29 43h8v10h-8zm34 0h8v10h-8zM29 63h8v10h-8zm34 0h8v10h-8z" /><path d="M40 14l-3-9 9 4 4-8 5 8 9-4-4 9z" stroke="#B49A55" /></>}
  </svg>;
}

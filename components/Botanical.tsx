export default function Botanical({ className = '' }: { className?: string }) {
  return <svg className={`botanical ${className}`} viewBox="0 0 180 240" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M39 226C76 172 90 119 126 28M65 181C39 158 31 135 33 114M83 140C113 139 138 123 153 101M99 96C78 77 74 57 77 35M113 61C138 57 154 42 161 23" />
      <path d="M52 199C27 196 13 176 13 162C32 163 49 177 52 199ZM67 173C91 173 106 161 112 146C89 143 73 154 67 173ZM72 164C48 161 37 145 37 130C59 134 70 145 72 164ZM87 131C107 117 113 99 109 85C89 96 83 113 87 131ZM101 91C81 91 66 78 63 64C85 64 96 74 101 91ZM114 60C111 40 118 23 132 14C140 36 133 51 114 60ZM130 34C134 14 150 5 166 7C160 23 149 32 130 34ZM36 133C20 120 17 105 23 90C38 104 43 117 36 133ZM131 123C131 104 143 90 161 86C159 108 150 119 131 123Z" />
      <circle cx="58" cy="211" r="3"/><circle cx="92" cy="175" r="2"/><circle cx="146" cy="63" r="3"/>
    </g>
  </svg>;
}

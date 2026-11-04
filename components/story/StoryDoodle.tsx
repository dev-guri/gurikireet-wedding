import type { StoryDoodleKind } from '@/lib/story';

export default function StoryDoodle({ kind }: { kind: StoryDoodleKind }) {
  return <svg className={`story-doodle story-doodle-${kind}`} viewBox="0 0 260 210" fill="none" aria-hidden="true">
    {kind === 'hello' && <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 43C40 32 139 30 149 44L146 94C138 106 72 106 62 102L40 117L45 98C32 94 27 54 32 43Z" />
      <path d="M117 99C136 86 213 90 226 104L229 151C219 165 181 167 169 163L190 182L154 165C125 164 108 153 117 99Z" />
      <path d="M57 58C73 53 99 55 116 58M57 73C71 69 90 71 103 73M140 117C159 112 191 115 208 117M139 135C155 130 177 133 187 135" opacity=".4" />
      <path d="M188 47C173 30 175 20 183 21C190 22 190 31 190 33C197 17 208 18 207 27C207 36 192 47 188 47Z" stroke="#C84B4B" />
      <path d="M36 151L41 141L45 152L56 155L45 158L41 169L37 158L28 155Z" stroke="#B49A55" strokeWidth="1.4" />
    </g>}
    {kind === 'meal' && <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="75" cy="133" rx="49" ry="17" /><path d="M28 137C32 169 116 169 122 137M45 126L56 118L63 124L52 133ZM66 123L77 115L83 121L72 130ZM85 128L97 119L104 125L91 136" />
      <ellipse cx="180" cy="143" rx="49" ry="17" /><path d="M134 147C142 177 216 177 227 147M151 139C165 124 178 151 197 135M154 145C171 130 182 152 209 140M163 132C181 119 196 140 211 131" />
      <path d="M111 45L116 109Q132 119 147 109L153 45M111 45Q132 35 153 45Q132 55 111 45ZM139 41L150 20L166 20" />
      <path d="M116 60L120 104Q132 110 143 104L148 60Q132 68 116 60Z" fill="#674738" stroke="#674738" />
    </g>}
    {kind === 'rings' && <g strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="101" cy="120" rx="45" ry="34" transform="rotate(-24 101 120)" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="155" cy="120" rx="45" ry="34" transform="rotate(-24 155 120)" stroke="var(--paper, white)" strokeWidth="6.5" />
      <ellipse cx="155" cy="120" rx="45" ry="34" transform="rotate(-24 155 120)" stroke="#B49A55" strokeWidth="2.5" />
      <path d="M91 151C104 151 118 144 128 133" stroke="var(--paper, white)" strokeWidth="6.5" />
      <path d="M91 151C104 151 118 144 128 133" stroke="currentColor" strokeWidth="2.5" />
      <path d="M126 64C111 45 113 35 120 36C127 37 128 46 128 49C137 28 148 32 145 42C143 50 132 61 126 64Z" stroke="#C84B4B" strokeWidth="2" />
      <path d="M61 61L67 48L71 61L83 65L70 68L66 81L62 68L49 65M190 56L194 46L198 57L208 60L198 63L194 74L190 63L180 60" stroke="#B49A55" strokeWidth="1.3" />
    </g>}
    {kind === 'flower' && <g strokeLinecap="round" strokeLinejoin="round">
      {Array.from({ length: 10 }, (_, index) => <ellipse key={index} cx="130" cy="49" rx="9" ry="23" transform={`rotate(${index * 36} 130 86)`} stroke="#B49A55" strokeWidth="1.5" />)}
      <circle cx="130" cy="86" r="19" stroke="currentColor" strokeWidth="2" />
      <path d="M130 106C127 133 131 152 126 185M130 151C106 151 99 140 99 128C117 127 128 138 130 151ZM129 164C153 161 159 150 158 138C142 139 132 151 129 164Z" stroke="currentColor" strokeWidth="1.7" />
    </g>}
  </svg>;
}

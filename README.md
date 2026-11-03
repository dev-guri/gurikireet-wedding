# Gurinder & Gurpreet Wedding

## Manual push

Changes stay local until you choose to push. Run:

```sh
npm run push -- "Update dress code"
```

This stages the current project changes, creates a commit if needed, and pushes `main` to `origin`. It uses your Git authentication; no credentials are stored in the script. Omitting the message uses `Update wedding website`.

New Next.js 14 App Router project with TypeScript and Tailwind CSS.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000 or http://localhost:3000/dress-code.

```sh
npm run build
npm start
npm run typecheck
```

## Structure

- `app/layout.tsx`: shared Header and Footer; all routes inherit them.
- `app/page.tsx`: landing page with Dress Code CTA.
- `app/loading.tsx` and `app/template.tsx`: actual route-loading fallback and brief page entrance animation.
- `app/icon.svg` and `app/apple-icon.tsx`: matching ring-emblem browser favicon and mobile home-screen icon, discovered automatically by Next.js.
- `app/dress-code/page.tsx`: interactive function cards.
- `app/our-story/page.tsx` and `app/our-story/story.css`: family-friendly illustrated story and the couple's confirmed milestones.
- `app/events`, `app/gallery`, `app/rsvp`, `app/location`, `app/faqs`: independent Coming Soon pages, ready to replace with real content.
- `components/`: reusable navigation, monogram, footer, Coming Soon, and outfit cards.
- `lib/constants.ts`: wedding names, navigation, palette, function data, image paths, and independent Jaggo outfit options for him and her.
- `lib/story.ts`: public story copy, confirmed dates, and optional photographs. Set `storyPhotos.firstMeeting.src`, `storyPhotos.roka.src`, and `storyPhotos.favourite.src` to the couple's selected public photo paths. Until then, illustrated memory cards are shown.
- `components/story/StoryPortrait.tsx`: personalized cartoon doodle in the Our Story hero, with a loading state. The current illustration is `public/images/gurinder-gurpreet-story-doodle-v3.png`, with a black-filled turban and plain black jeans; the supplied original photo stays outside the website project. The first-hello chapter uses a symbolic WhatsApp-inspired doodle with generic greetings, not a private-chat screenshot.
- `public/images/*-ink.png`: reference-inspired cartoon couple artwork for each function; generation briefs are in `public/images/ink-artwork-prompts.json`. Previous artwork assets are retained separately.

No backend or external state library is required. Outfit choices use local React state. To add a page, create its App Router directory and add its link in `lib/constants.ts`.

Our Story uses the couple-confirmed first hello (13 February 2026), first meeting in Connaught Place (1 March 2026), and roka (16 May 2026). Its narrative is written for a public, family audience. Raw WhatsApp exports stay outside the project and `_chat*.txt` is ignored by Git.

The first-meeting and roka cards use separate personalized cartoon illustrations based on the couple's supplied photos. First meeting: blue polo, white jeans, cream turban, and an ivory/blue-floral dress. The couple confirmed the first-meeting order was white sauce pasta, chilli garlic noodles, and a Belgian chocolate shake. Roka: ivory embroidered clothes, blue turban, and turquoise dupatta. These source photos are not copied into the public website assets. Generation briefs are in `public/images/story-milestone-doodle-prompts.json`, with subsequent corrections recorded alongside the updated artwork.

Navigation has a small progress indicator for internal route changes, and illustrations show a ring loader until their image loads. Outfit changes keep their fixed-size frames. Motion respects the device's reduced-motion preference; no artificial loading delays are added.

Haldi and Mehndi show a handwritten “Tap a shade to change our outfits” instruction with an animated hand and staggered rings around the unselected swatches. The cue starts when its card becomes visible and is dismissed after the guest chooses a different shade. Its reserved space keeps the controls steady. The text remains useful with reduced motion enabled.

Jaggo's corrected Sharara illustration has uninterrupted wide trouser legs; the Garara has fitted thighs, contrasting gold knee bands, and gathered tiers below them. These are separate v2 assets; the originals are retained. Built-in image-generation briefs are in `public/images/jaggo-silhouette-corrections.json`.

Great Vibes, Caveat, and Oooh Baby are hosted locally in `public/fonts`, with their SIL Open Font Licenses included. The two regular font files are preloaded by the shared layout; handwritten typography does not require a connection to Google Fonts. Supporting text and controls use Caveat; the Dress Code heading uses Oooh Baby, and the other script titles and couple's name lockup use Great Vibes. Next images are configured with `unoptimized: true`.

## Artwork limitations

The compact logo pairs a black-and-gold interlocking-ring emblem with the names Gurinder and Gurpreet in two lines of Great Vibes script. Header and footer share `components/Monogram.tsx`, with fixed sizes for the emblem and lettering. The emblem was created with built-in image generation; its brief is in `public/images/gurkireet-logo-prompt.txt`. Caveat carries navigation, supporting text, and controls; Great Vibes carries the main script titles. `wedding.hashtag` in `lib/constants.ts` supplies #GuriKiReet to the home page, Dress Code introduction, and shared footer. Every function has a distinct margin note in the same constants file.

The figures use the user's supplied illustrated poster as a style reference. A Western couple was generated first, then each traditional outfit was created by editing that reference to preserve identity and pose. Western Glam allows any color and displays a single couple illustration; the previous lookbook is no longer rendered. Shade controls use color matrices that preserve neutral black ink and white areas; actual fabric colors remain approximate because the source illustration contains shading. Both people follow the selected blue shade for Haldi and orange shade for Mehndi.

Jaggo allows any color and offers independent garment choices: Kurta Pyjama or Pathani for him; Patiala Suit, Sharara, or Garara for her. Each option has its own illustration. Both sets of images stay mounted inside fixed-size figure containers, so changing one person's outfit leaves the other person unchanged. The five Jaggo figures and the matching-orange Mehndi edit were created using built-in image generation; their prompts are recorded in `public/images/jaggo-wardrobe-prompts.json`.

## Verification

Production build and TypeScript validation are supported by the scripts above. No publishing or remote services are configured.

The initial npm audit reported one critical Next.js issue and one high issue in its bundled PostCSS dependency. The requested Next.js 14 line is retained. Review an upgrade to a patched supported Next.js release before production hosting. Browser visual QA could not run because the browser runtime failed to initialize in this environment.

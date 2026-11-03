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
npm run test:theme
```

## Structure

- `app/layout.tsx`: shared Header and Footer; all routes inherit them.
- `app/page.tsx` and `app/home.css`: illustrated wedding home page with an exclusive lehenga-and-sherwani hero, live countdown, story milestones, celebration links, venue directions, and a copyable hashtag.
- `components/home/`: home artwork loading states, wedding-day countdown, decorative celebration motifs, and hashtag clipboard feedback.
- `lib/countdown.ts`: countdown calculation, clamped at zero after the wedding day begins.
- `app/theme.css`, `components/ThemeToggle.tsx`, and `lib/theme.ts`: shared light/dark palette, accessible sun/moon switch, first-paint theme initialization, system preference, cross-tab updates, and saved preference under `gurikireet-theme`.
- `components/DoodleImage.tsx` and `lib/doodle-paper.ts`: reusable dark-theme canvas presentation. Exterior white paper and reviewed enclosed background gaps become transparent while faces/garments, black hair, and colored fabrics remain intact. `lib/doodle-cleanup.ts` records normalized background-only seed points for the exact versions of all 13 active character/scene illustrations. The café scene has a lower matte boundary to protect its cropped white jeans and floral skirt. Edge cleanup removes white anti-aliasing halos. A separate pass replaces small neutral flecks inside reviewed hair zones with neighboring black ink; explicit face/ear/neck exclusions protect facial details, and colored fabrics and large white areas are excluded. The same metadata covers all 13 illustrations, and the previous light drop shadow around figures has been removed. Review the seed points and crop boundary whenever replacing a source image. The prepared images are cached in memory and the original asset is used in light mode. Actual photographs bypass this treatment; external images that block canvas access fall back to their originals.
- `app/loading.tsx` and `app/template.tsx`: actual route-loading fallback and brief page entrance animation.
- `app/icon.svg` and `app/apple-icon.tsx`: matching ring-emblem browser favicon and mobile home-screen icon, discovered automatically by Next.js.
- `app/dress-code/page.tsx`: interactive function cards.
- `app/our-story/page.tsx` and `app/our-story/story.css`: family-friendly illustrated story and the couple's confirmed milestones.
- `app/faqs/page.tsx`, `app/faqs/faqs.css`, `components/FaqAccordion.tsx`, and `lib/faqs.ts`: handwritten guest FAQ with topic navigation, native keyboard-accessible accordions, shared light/dark palette, venue directions, outfit previews, and confirmed guest details.
- `app/gallery/page.tsx`, `app/gallery/gallery.css`, `lib/gallery.ts`, and `public/images/gallery/`: three photo-preview link cards for the roka photo album, cinematic film, and full 4K film. Links open Google Drive in a new tab; only three small local JPEG photo previews load on the page; full albums/videos and Drive embeds load only after following a link. The supplied cinematic URL’s trailing encoded newline has been removed. Full-resolution originals and films stay on Drive. Video cards use selected album photos as posters because the automatic video thumbnails were dark opening frames. Preview provenance is recorded in `public/images/gallery/sources.json`; the photos are not AI-generated or retouched.
- `app/events`, `app/rsvp`, `app/location`: independent Coming Soon pages, ready to replace with real content.
- `components/`: reusable navigation, monogram, footer, Coming Soon, and outfit cards.
- `lib/constants.ts`: wedding names, confirmed wedding date and venue, navigation, palette, function data, image paths, and independent Jaggo outfit options for him and her.
- `lib/story.ts`: public story copy, confirmed dates, and optional photographs. Set `storyPhotos.firstMeeting.src`, `storyPhotos.roka.src`, and `storyPhotos.favourite.src` to the couple's selected public photo paths. Until then, illustrated memory cards are shown.
- `components/story/StoryPortrait.tsx`: personalized cartoon doodle in the Our Story hero, with a loading state. The current illustration is `public/images/gurinder-gurpreet-story-doodle-v3.png`, with a black-filled turban and plain black jeans; the supplied original photo stays outside the website project. The first-hello chapter uses a symbolic WhatsApp-inspired doodle with generic greetings, not a private-chat screenshot.
- `public/images/*-ink.png`: reference-inspired cartoon couple artwork for each function; generation briefs are in `public/images/ink-artwork-prompts.json`. Previous artwork assets are retained separately.

The couple confirmed guest arrival at 11:00 am and valet parking at Majestic Crown. RSVP is by WhatsApp or call; no contact number or direct contact link is published on the FAQ page. Food, gifts, accommodation and guest policies are omitted because no specific arrangements were confirmed. The arrival time in `wedding.guestArrival` is separate from the home countdown’s start-of-day target.

No backend or external state library is required. Outfit choices use local React state. To add a page, create its App Router directory and add its link in `lib/constants.ts`.

The couple confirmed the wedding date as Sunday, 31 January 2027, at Majestic Crown, 24, Najafgarh Rd, Block C, Najafgarh Road Industrial Area, New Delhi, Delhi 110015. The home countdown targets the start of that calendar day in Asia/Kolkata; it does not imply a ceremony time. It changes to a celebratory message once that date arrives. Venue directions open Google Maps using the complete address. Function cards link directly to their existing Dress Code sections, without adding unconfirmed event dates or times. The home hero has an exclusive wedding doodle: ivory/gold sherwani and champagne turban for Gurinder, burgundy/gold lehenga for Gurpreet. It is saved at `public/images/home-wedding-lehenga-sherwani.png`; its built-in image-generation brief is recorded alongside it. The story teaser reuses the corrected first-meeting doodle. Our Story keeps its existing roka artwork. No original photographs or chat exports are added.

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

`npm run test:theme` checks system/saved theme initialization, restricted storage, and background removal, reviewed enclosed gaps, edge decontamination, cropped white clothes, and preservation of unmarked enclosed whites, black contours, and colored fabric. Theme changes do not remount the outfit controls. Local headless Chrome checks cover switching, refresh/navigation persistence, desktop/mobile layouts, mobile navigation, Haldi/Mehndi shade selections, independent Jaggo choices, and story doodles in dark mode. The browser plugin failed to initialize; these checks used a separate headless Chrome profile.

The initial npm audit reported one critical Next.js issue and one high issue in its bundled PostCSS dependency. The requested Next.js 14 line is retained. Review an upgrade to a patched supported Next.js release before production hosting. Browser visual QA could not run because the browser runtime failed to initialize in this environment.

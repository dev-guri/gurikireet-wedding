# Gurinder & Gurpreet Wedding

Next.js 16 App Router, React 19, TypeScript and Tailwind. A public, family-friendly
wedding website with local handwritten fonts, light/dark themes, and reusable
navigation and page components.

## Development

Requires Node.js 20.9 or newer and Yarn 3.6.4 (the pinned package manager).

```sh
yarn install
yarn dev
yarn build
yarn typecheck
yarn test:theme
yarn test:assets
```

The development preview uses `.next-dev`; production builds use `.next`.

## Pages and content

- `/`: wedding invitation, countdown, story teaser, celebration links and hashtag.
- `/dress-code`: Engagement, Haldi, Mehndi and independent Jaggo outfit choices.
- `/our-story`: the couple-confirmed, illustrated milestones.
- `/gallery`: three photo previews linking to the Drive album and films; large
  media stays on Drive and is not embedded or downloaded on page load.
- `/faqs`: confirmed guest details with one answer open across all topics.
- `/events`, `/rsvp`, `/location`: Coming Soon placeholders.

Shared Header/Footer live in `app/layout.tsx`. Names, wedding date, navigation,
function palettes and outfits are in `lib/constants.ts`; story, FAQ and gallery
content have their own files in `lib/`. Venue and location remain unpublished;
there are no public addresses or directions links. Raw chats, original private
photographs and public contact numbers are not included.

## Assets and performance

Only used, compressed images and WOFF2 fonts belong in `public/`.
`yarn test:assets` checks every runtime asset reference and rejects missing
or unused image/font exports.

Each doodle is a single, transparent **lossless WebP** shared by both themes.
White clothes and faces retain their fill. There are no duplicate light/dark
image layers or browser canvas processing. Haldi and Mehndi each use a single
image and color-matrix filter for both people. Jaggo's five small exports remain
mounted to keep independent outfit changes smooth and preserve the frame.
Below-fold images load lazily; only the page's initial artwork is prioritized.
Fonts are local, retain their original designs and licenses, and use WOFF2.
`images.unoptimized: true` is intentional: deployed assets are already compressed.
Page CSS loads once in the root layout to prevent navigation style flashes.

Original **active** artwork and fonts are retained outside `public/` for
reproducible maintenance, in `artwork/sources/` and `artwork/fonts/`. These files
are never served as website assets. Reviewed background masks and hair/edge
cleanup live in `artwork/doodle-cleanup.ts` and `artwork/doodle-paper.ts`.
Generation notes and gallery preview provenance are in `artwork/notes/`.
Superseded image exports and the former dual-theme rendering components have
been removed.

After replacing an original or changing its reviewed cleanup masks, run:

```sh
yarn prepare:assets
yarn test:theme
yarn test:assets
yarn build
```

The preparation command runs only during artwork maintenance; it does not run
on guests' devices. It uses build-only `sharp` and `wawoff2` dependencies.
Review the illustration's background points and protected faces when changing
an original. Source photos and private chat exports must remain outside the repo.

Theme selection follows the device until the guest saves a choice. It uses
`gurikireet-theme` in local storage, supports restricted storage, and synchronizes
browser metadata/backgrounds. Native Safari UI still needs real-device testing.
Animations respect reduced motion. Hash-only browser history does not show a
route loader; background tabs pause the countdown interval.

## Publishing

Changes stay local until explicitly pushed:

```sh
yarn push "Describe your changes"
```

This stages the project, commits if necessary and pushes `main` to `origin`
using the local Git authentication. Credentials are never stored in the script.

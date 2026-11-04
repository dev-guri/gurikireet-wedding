# Code review and performance cleanup

Reviewed 4 November 2026.

## Results

- Public assets: 56,513,836 → 6,643,301 bytes (**88.2% less**).
- Public images: 55,253,155 → 6,132,564 bytes (**88.9% less**).
- Public file count: 64 → 25. All 22 image/font exports are used.
- 14 transparent lossless WebP doodles replace separate original/dark PNGs.
- All 14 exports match the previous reviewed transparent PNGs exactly at every visible pixel; transparent-pixel RGB values are irrelevant.
- WOFF2 fonts replace public TTFs without changing font families or weights.
- Active originals and licenses remain available for maintenance; originals and generation notes are outside the public directory. Superseded versions, the old album cover, unused components, redundant CSS and the obsolete PNG build dependency were removed.
- Haldi/Mehndi use one image/filter each instead of three image layers and two equivalent filters. Home/Story also use a single image in either theme.
- Fixed the route loader remaining active after hash-only Back navigation.
- Removed pre-hydration metadata edits that caused duplicate browser theme tags in production. First-paint root theming remains; browser metadata synchronizes after hydration.
- Countdown intervals pause when the tab is hidden.

## Local transfer measurements

Production builds, 390px mobile viewport, cache disabled, same browser settings and 1.2-second settling interval. These are image payloads requested during initial loading, not total site size, a Lighthouse score, or a claim about real-world timing. Network/device conditions change loading times.

| Page | Theme | Before | After | Reduction |
|---|---|---:|---:|---:|
| / | light | 4.91 MB | 1.14 MB | 76.7% |
| /dress-code | light | 5.99 MB | 1.41 MB | 76.5% |
| / | dark | 6.43 MB | 1.14 MB | 82.2% |
| /dress-code | dark | 8.68 MB | 1.41 MB | 83.8% |

## Verification

- Production build, TypeScript and theme/artwork/asset checks pass.
- Browser checks passed for Home, Dress Code, Our Story, Gallery, FAQs, Events, Location and RSVP at 390px and 1440px, in both themes (32 page/layout combinations).
- Native lazy-loading images, Haldi/Mehndi shades, all six independent Jaggo combinations, single-open FAQ, mobile menus, browser theme metadata and hash-only Back navigation pass. No browser JavaScript exceptions were recorded.
- No unused/missing public image/font exports remain. Venue/address/directions stay unpublished.
- Real iPhone Safari UI and live Vercel performance were not tested.

## Security migration completed

The framework was upgraded from Next.js 14.2.35 / React 18.3.1 to **Next.js 16.4.5 / React 19.3.1**, following the [official Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16). React 19 TypeScript types and the automatic JSX runtime are in place; initial Image props use the current preload API. Next.js 16 is the Active LTS line in the [official support policy](https://nextjs.org/support-policy).

The project uses Yarn 3.6.4, a committed `yarn.lock`, and an explicit node-modules linker. Node.js **20.9 or newer** is required. No npm lockfile is introduced. Production compilation and static page generation use Turbopack. Scroll reveals use the Web Animations API instead of changing server-rendered classes, eliminating the React 19 hydration warning. Fresh development loads and changing reduced-motion preferences were checked. The pre-upgrade transfer comparisons above document the image/font cleanup; they are not new timing claims about the framework migration.

`yarn npm audit --recursive --json` on 4 November 2026 returned **zero known vulnerabilities** in the resolved dependency tree. This resolves the package-audit finding recorded during the initial review; it is a point-in-time registry check, not a guarantee against undiscovered issues.

## Maintenance

Run `yarn prepare:assets` after editing source artwork/fonts. Then run `yarn test:theme`, `yarn test:assets` and `yarn build`. The protected-region checks guard faces and white garments against accidental transparency changes.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file) {
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(code, { module, exports: module.exports });
  return module.exports;
}

const { themeInitScript } = load('lib/theme.ts');
function bootstrap(saved, dark, blocked = false) {
  const chrome = { content: '#ffffff' };
  const scheme = { content: 'light dark' };
  const document = {
    documentElement: { dataset: {}, style: {} },
    querySelectorAll: selector => selector.includes('theme-color') ? [chrome] : [scheme],
  };
  vm.runInNewContext(themeInitScript, {
    document,
    localStorage: { getItem() { if (blocked) throw Error('Storage blocked'); return saved; } },
    window: { matchMedia() { return { matches: dark }; } },
  });
  const theme = document.documentElement.dataset.theme;
  assert.equal(chrome.content, theme === 'dark' ? '#17191c' : '#ffffff', 'Browser chrome follows the resolved theme');
  assert.equal(scheme.content, theme);
  assert.equal(document.documentElement.style.backgroundColor, chrome.content, 'Overscroll background matches browser chrome');
  return theme;
}
assert.equal(bootstrap(null, false), 'light');
assert.equal(bootstrap(null, true), 'dark');
assert.equal(bootstrap('light', true), 'light');
assert.equal(bootstrap('dark', false), 'dark');
assert.equal(bootstrap('invalid', true), 'dark');
assert.equal(bootstrap(null, true, true), 'dark');
assert.equal(bootstrap(null, false, true), 'light');

const { removeDoodlePaper, defringeDoodle, cleanDoodleHair } = load('lib/doodle-paper.ts');
// A black closed contour surrounds a white center, like a face or white jeans.
const pixels = new Uint8ClampedArray(7 * 7 * 4).fill(255);
const paint = (x, y, rgb) => pixels.set([...rgb, 255], (y * 7 + x) * 4);
for (let i = 2; i <= 4; i++) {
  paint(i, 2, [0, 0, 0]); paint(i, 4, [0, 0, 0]);
  paint(2, i, [0, 0, 0]); paint(4, i, [0, 0, 0]);
}
paint(0, 3, [168, 197, 229]); // Blue fabric must survive even on the border.
const blue = Array.from(pixels.slice(3 * 7 * 4, 3 * 7 * 4 + 4));
removeDoodlePaper(pixels, 7, 7);
assert.equal(pixels[3], 0, 'Exterior white paper is removed');
assert.equal(pixels[(3 * 7 + 3) * 4 + 3], 255, 'Enclosed white garment/face is retained');
assert.equal(pixels[(2 * 7 + 3) * 4 + 3], 255, 'Black outlines are retained');
assert.deepEqual(Array.from(pixels.slice(3 * 7 * 4, 3 * 7 * 4 + 4)), blue, 'Fabric RGB/alpha is unchanged');
assert.deepEqual(Array.from(removeDoodlePaper(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)), [255, 255, 255, 0]);
assert.throws(() => removeDoodlePaper(new Uint8ClampedArray(4), 2, 2));

// Same white pixels, different meaning: one closed region is a face/garment,
// the other is a reviewed gap between figures. Only the marked gap disappears.
const enclosed = new Uint8ClampedArray(11 * 7 * 4).fill(255);
const black = (x, y) => enclosed.set([0, 0, 0, 255], (y * 11 + x) * 4);
for (const left of [1, 6]) {
  for (let x = left; x <= left + 3; x++) { black(x, 1); black(x, 5); }
  for (let y = 1; y <= 5; y++) { black(left, y); black(left + 3, y); }
}
removeDoodlePaper(enclosed, 11, 7, [[7.5 / 11, 3.5 / 7], [-1, 2]]);
defringeDoodle(enclosed, 11, 7);
assert.equal(enclosed[(3 * 11 + 7) * 4 + 3], 0, 'Reviewed enclosed background gap is removed');
assert.equal(enclosed[(3 * 11 + 2) * 4 + 3], 255, 'Unmarked enclosed white face/garment stays opaque');
assert.deepEqual(Array.from(enclosed.slice((1 * 11 + 2) * 4, (1 * 11 + 2) * 4 + 4)), [0, 0, 0, 255], 'Black contour stays unchanged');

const edge = new Uint8ClampedArray(5 * 5 * 4);
edge.set([180, 180, 180, 255], (2 * 5 + 2) * 4);
edge.set([0, 0, 0, 255], (2 * 5 + 3) * 4);
defringeDoodle(edge, 5, 5);
assert.deepEqual(Array.from(edge.slice((2 * 5 + 2) * 4, (2 * 5 + 2) * 4 + 4)), [0, 0, 0, 75], 'White edge matte becomes anti-aliased black ink');
assert.equal(edge[(2 * 5 + 3) * 4 + 3], 255, 'Edge cleanup does not erode solid ink');

// A garment cropped at the lower edge is open there; a scene baseline closes
// its matte while the blank margin below it is discarded.
const cropped = new Uint8ClampedArray(5 * 5 * 4).fill(255);
for (let y = 1; y < 4; y++) for (const x of [1, 3]) cropped.set([0, 0, 0, 255], (y * 5 + x) * 4);
cropped.set([0, 0, 0, 255], (1 * 5 + 2) * 4);
removeDoodlePaper(cropped, 5, 5, [], .8);
assert.equal(cropped[(2 * 5 + 2) * 4 + 3], 255, 'Cropped white jeans/skirt retain their fill');
assert.equal(cropped[3], 0, 'Exterior paper is still removed around the cropped scene');
assert.equal(cropped[(4 * 5 + 2) * 4 + 3], 0, 'Blank lower margin is discarded');
assert.throws(() => removeDoodlePaper(new Uint8ClampedArray(4), 1, 1, [], 0));

// Neutral edge noise inside dark hair gets its neighboring ink color, while
// protected faces, saturated colors and white clothes retain their pixels.
const hair = new Uint8ClampedArray(18 * 10 * 4);
for (let i = 0; i < hair.length; i += 4) hair.set([12, 11, 10, 255], i);
const sample = (x, y) => Array.from(hair.slice((y * 18 + x) * 4, (y * 18 + x) * 4 + 4));
hair.set([210, 210, 210, 255], (4 * 18 + 3) * 4);
hair.set([255, 255, 255, 255], (4 * 18 + 10) * 4);
hair.set([60, 130, 210, 255], (4 * 18 + 15) * 4);
hair.set([255, 255, 255, 255], (9 * 18 + 3) * 4);
cleanDoodleHair(hair, 18, 10, [{ bounds: [0, 0, 1, .8], protect: [.45, .2, .7, .7] }]);
assert.deepEqual(sample(3, 4), [12, 11, 10, 255], 'Small hair fleck follows surrounding black ink');
assert.deepEqual(sample(10, 4), [255, 255, 255, 255], 'Protected face highlight is unchanged');
assert.deepEqual(sample(15, 4), [60, 130, 210, 255], 'Colored fabric is unchanged');
assert.deepEqual(sample(3, 9), [255, 255, 255, 255], 'White clothes outside hair zones are unchanged');

const { doodleGapSeeds } = load('lib/doodle-cleanup.ts');
assert.equal(Object.keys(doodleGapSeeds).length, 13);
for (const points of Object.values(doodleGapSeeds)) for (const point of points) {
  assert.ok(point.length === 2 && point.every(value => value >= 0 && value < 1), 'Artwork seed is a normalized point');
}
// Every active illustration has a real, transparent, bounded-size PNG. These
// are the files mobile browsers load instead of allocating live canvases.
const { PNG } = require('pngjs');
const { darkDoodles } = load('lib/dark-doodles.ts');
assert.equal(Object.keys(darkDoodles).length, 14);
for (const [source, destination] of Object.entries(darkDoodles)) {
  assert.ok(fs.existsSync('public' + source));
  const png = PNG.sync.read(fs.readFileSync('public' + destination));
  assert.ok(Math.max(png.width, png.height) <= 1200);
  let transparent = 0, opaque = 0;
  for (let i = 3; i < png.data.length; i += 4) {
    if (png.data[i] === 0) transparent++;
    if (png.data[i] === 255) opaque++;
  }
  assert.ok(transparent > 0 && opaque > 0, destination + ' contains both cutout paper and preserved artwork');
}
console.log('Theme bootstrap and doodle paper-removal checks passed.');

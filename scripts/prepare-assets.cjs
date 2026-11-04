// Build-time only. The exact source artwork stays outside public/; guests load
// one transparent lossless WebP per illustration in either theme.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const sharp = require('sharp');
const woff2 = require('wawoff2');
function load(file) {
  const module = { exports: {} };
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText, { module, exports: module.exports });
  return module.exports;
}
const { removeDoodlePaper, defringeDoodle, cleanDoodleHair } = load('artwork/doodle-paper.ts');
const { doodleGapSeeds, doodleBottomCrops, doodleHairZones } = load('artwork/doodle-cleanup.ts');
// Preserve the exact reviewed pixel grid: changing resampling kernels can
// connect a tiny paper gap to a white face or garment during flood fill.
function resize(source, maxEdge) {
  const ratio = Math.min(1, maxEdge / Math.max(source.width, source.height));
  if (ratio === 1) return source;
  const target = { width: Math.round(source.width * ratio), height: Math.round(source.height * ratio) };
  target.data = new Uint8ClampedArray(target.width * target.height * 4);
  for (let y = 0; y < target.height; y++) for (let x = 0; x < target.width; x++) {
    const sx = Math.max(0, (x + .5) * source.width / target.width - .5);
    const sy = Math.max(0, (y + .5) * source.height / target.height - .5);
    const x0 = Math.floor(sx), y0 = Math.floor(sy);
    const x1 = Math.min(x0 + 1, source.width - 1), y1 = Math.min(y0 + 1, source.height - 1);
    const fx = sx - x0, fy = sy - y0;
    for (let channel = 0; channel < 4; channel++) {
      const top = source.data[(y0 * source.width + x0) * 4 + channel] * (1 - fx) + source.data[(y0 * source.width + x1) * 4 + channel] * fx;
      const bottom = source.data[(y1 * source.width + x0) * 4 + channel] * (1 - fx) + source.data[(y1 * source.width + x1) * 4 + channel] * fx;
      target.data[(y * target.width + x) * 4 + channel] = Math.round(top * (1 - fy) + bottom * fy);
    }
  }
  return target;
}
(async () => {
  const directory = 'public/images/doodles';
  fs.mkdirSync(directory, { recursive: true });
  for (const name of Object.keys(doodleGapSeeds)) {
    const original = await sharp(path.join('artwork/sources', name)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const resized = resize({ data: original.data, width: original.info.width, height: original.info.height }, name === 'gurkireet-rings.png' ? 160 : 1200);
    const info = resized;
    const pixels = new Uint8ClampedArray(resized.data);
    removeDoodlePaper(pixels, info.width, info.height, doodleGapSeeds[name], doodleBottomCrops[name]);
    defringeDoodle(pixels, info.width, info.height);
    cleanDoodleHair(pixels, info.width, info.height, doodleHairZones[name]);
    const output = path.join(directory, name.replace('.png', '.webp'));
    await sharp(Buffer.from(pixels), { raw: { width: info.width, height: info.height, channels: 4 } })
      .webp({ lossless: true, effort: 6 }).toFile(output);
    console.log(output);
  }
  for (const file of fs.readdirSync('artwork/fonts').filter(name => name.endsWith('.ttf'))) {
    const compressed = await woff2.compress(fs.readFileSync(path.join('artwork/fonts', file)));
    const output = path.join('public/fonts', file.replace('.ttf', '.woff2'));
    fs.writeFileSync(output, Buffer.from(compressed));
    console.log(output);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

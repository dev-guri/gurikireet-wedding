const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
const references = new Set();
for (const file of ['app', 'components', 'lib'].flatMap(walk).filter(file => /\.(tsx?|css)$/.test(file))) {
  for (const match of fs.readFileSync(file, 'utf8').matchAll(/\/(?:images|fonts)\/[\w./-]+\.(?:webp|png|jpe?g|svg|woff2|ttf)/g)) {
    references.add(match[0]);
    assert.ok(fs.existsSync('public' + match[0]), `${file} references a missing asset: ${match[0]}`);
  }
}
for (const file of walk('public').filter(file => /\.(webp|png|jpe?g|svg|woff2|ttf)$/.test(file))) {
  assert.ok(references.has('/' + path.relative('public', file)), `Unused public asset: ${file}`);
}
console.log(`Asset references passed: ${references.size} used assets; no missing or unused images/fonts.`);

export type DoodlePoint = readonly [number, number];
type DoodleRect = readonly [number, number, number, number];
export type DoodleHairZone = { bounds: DoodleRect; protect: DoodleRect };

/** Remove exterior paper plus reviewed enclosed background gaps, without
 * guessing which white areas are faces or clothes. Source assets stay intact. */
export function removeDoodlePaper(pixels: Uint8ClampedArray, width: number, height: number, gapSeeds: readonly DoodlePoint[] = [], bottomCrop = 1) {
  if (pixels.length !== width * height * 4 || width < 1 || height < 1) throw new Error('Invalid doodle dimensions');
  if (!(bottomCrop > 0 && bottomCrop <= 1)) throw new Error('Invalid doodle crop');
  // A cropped scene's garment outlines end at its baseline. Don't flood white
  // clothes from that open lower edge through the source's blank paper margin.
  const activeHeight = Math.ceil(height * bottomCrop);
  const visited = new Uint8Array(width * height);
  const queue = new Uint32Array(width * height);
  let head = 0;
  let tail = 0;
  const add = (index: number) => {
    if (visited[index]) return;
    visited[index] = 1;
    const offset = index * 4;
    const r = pixels[offset], g = pixels[offset + 1], b = pixels[offset + 2];
    const isPaper = pixels[offset + 3] < 16 || (Math.min(r, g, b) >= 230 && Math.max(r, g, b) - Math.min(r, g, b) < 25);
    if (isPaper) queue[tail++] = index;
  };
  for (let x = 0; x < width; x++) { add(x); if (bottomCrop === 1) add((height - 1) * width + x); }
  for (let y = 0; y < activeHeight; y++) { add(y * width); add(y * width + width - 1); }
  for (const [x, y] of gapSeeds) {
    if (x >= 0 && x < 1 && y >= 0 && y < bottomCrop) add(Math.floor(y * height) * width + Math.floor(x * width));
  }
  while (head < tail) {
    const index = queue[head++];
    pixels[index * 4 + 3] = 0;
    const x = index % width;
    if (x > 0) add(index - 1);
    if (x < width - 1) add(index + 1);
    if (index >= width) add(index - width);
    if (index < width * (activeHeight - 1)) add(index + width);
  }
  for (let index = activeHeight * width; index < width * height; index++) pixels[index * 4 + 3] = 0;
  return pixels;
}

/** Remove the white matte from anti-aliased OUTER edges only. A frozen alpha
 * snapshot prevents edge erosion from cascading into faces or white garments. */
export function defringeDoodle(pixels: Uint8ClampedArray, width: number, height: number) {
  const original = new Uint8ClampedArray(pixels);
  for (let y = 1; y < height - 1; y++) for (let x = 1; x < width - 1; x++) {
    const offset = (y * width + x) * 4;
    if (original[offset + 3] !== 255 || Math.min(original[offset], original[offset + 1], original[offset + 2]) < 64) continue;
    const neighbors = [offset - 4, offset + 4, offset - width * 4, offset + width * 4];
    if (!neighbors.some(index => original[index + 3] === 0)) continue;
    let foreground = offset;
    let darkest = original[offset] + original[offset + 1] + original[offset + 2];
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      if (x + dx < 0 || x + dx >= width || y + dy < 0 || y + dy >= height) continue;
      const candidate = ((y + dy) * width + x + dx) * 4;
      if (!original[candidate + 3]) continue;
      const brightness = original[candidate] + original[candidate + 1] + original[candidate + 2];
      if (brightness < darkest) { darkest = brightness; foreground = candidate; }
    }
    if (darkest > 600) continue;
    let alpha = 0;
    for (let channel = 0; channel < 3; channel++) {
      alpha = Math.max(alpha, (255 - original[offset + channel]) / Math.max(1, 255 - original[foreground + channel]));
    }
    alpha = Math.min(1, alpha);
    if (alpha <= 0 || alpha > .98) continue;
    for (let channel = 0; channel < 3; channel++) {
      pixels[offset + channel] = Math.max(0, Math.min(255, Math.round((original[offset + channel] - 255 * (1 - alpha)) / alpha)));
    }
    pixels[offset + 3] = Math.round(alpha * 255);
  }
  return pixels;
}

/** Small neutral flecks trapped inside black hair are not exterior matte.
 * Clean only reviewed hair zones, excluding the entire face/ear/neck region.
 * Large white regions and colored fabric never qualify as hair specks. */
export function cleanDoodleHair(pixels: Uint8ClampedArray, width: number, height: number, zones: readonly DoodleHairZone[] = []) {
  if (!zones.length) return pixels;
  const original = new Uint8ClampedArray(pixels);
  const seen = new Uint8Array(width * height);
  const queue = new Uint32Array(width * height);
  const neutral = (index: number) => {
    const offset = index * 4;
    const r = original[offset], g = original[offset + 1], b = original[offset + 2];
    return original[offset + 3] > 0 && Math.min(r, g, b) >= 48 && Math.max(r, g, b) - Math.min(r, g, b) < 24;
  };
  for (const { bounds, protect } of zones) {
    const left = Math.max(0, Math.floor(bounds[0] * width));
    const top = Math.max(0, Math.floor(bounds[1] * height));
    const right = Math.min(width, Math.ceil(bounds[2] * width));
    const bottom = Math.min(height, Math.ceil(bounds[3] * height));
    for (let y = top; y < bottom; y++) for (let x = left; x < right; x++) {
      const start = y * width + x;
      if (seen[start] || !neutral(start)) continue;
      let head = 0, tail = 1, darkEdges = 0, otherEdges = 0;
      let red = 0, green = 0, blue = 0, protectedRegion = false;
      queue[0] = start;
      seen[start] = 1;
      while (head < tail) {
        const index = queue[head++], cx = index % width, cy = Math.floor(index / width);
        if (cx / width >= protect[0] && cx / width <= protect[2] && cy / height >= protect[1] && cy / height <= protect[3]) protectedRegion = true;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          if ((!dx && !dy) || cx + dx < left || cx + dx >= right || cy + dy < top || cy + dy >= bottom) continue;
          const neighbor = (cy + dy) * width + cx + dx, offset = neighbor * 4;
          if (neutral(neighbor)) {
            if (!seen[neighbor]) { seen[neighbor] = 1; queue[tail++] = neighbor; }
          } else if (original[offset + 3] > 0) {
            if (Math.max(original[offset], original[offset + 1], original[offset + 2]) < 70) {
              darkEdges++; red += original[offset]; green += original[offset + 1]; blue += original[offset + 2];
            } else otherEdges++;
          }
        }
      }
      if (protectedRegion || tail > 400 || darkEdges < 2 || darkEdges / (darkEdges + otherEdges) < .7) continue;
      const color = [Math.round(red / darkEdges), Math.round(green / darkEdges), Math.round(blue / darkEdges)];
      for (let i = 0; i < tail; i++) {
        const offset = queue[i] * 4;
        pixels[offset] = color[0]; pixels[offset + 1] = color[1]; pixels[offset + 2] = color[2];
      }
    }
  }
  return pixels;
}

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const ROOT = path.resolve('public/assets');
const MAX_W = 1920;
const JPG_Q = 78;
const PNG_Q = 80;
const MIN_SIZE_BYTES = 200 * 1024; // skip files smaller than 200KB

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return null;

  const stat = await fs.stat(file);
  if (stat.size < MIN_SIZE_BYTES) return null;

  const before = stat.size;
  const tmp = file + '.tmp';

  try {
    const img = sharp(file, { failOn: 'none' });
    const meta = await img.metadata();
    const resize = meta.width && meta.width > MAX_W ? { width: MAX_W } : {};
    let pipe = sharp(file, { failOn: 'none' }).rotate();
    if (Object.keys(resize).length) pipe = pipe.resize(resize);

    if (ext === '.png') {
      await pipe.png({ quality: PNG_Q, compressionLevel: 9 }).toFile(tmp);
    } else {
      await pipe.jpeg({ quality: JPG_Q, mozjpeg: true }).toFile(tmp);
    }

    const newStat = await fs.stat(tmp);
    if (newStat.size < before * 0.95) {
      await fs.rename(tmp, file);
      return { file, before, after: newStat.size };
    } else {
      await fs.unlink(tmp);
      return null;
    }
  } catch (err) {
    try { await fs.unlink(tmp); } catch {}
    console.error('FAIL', file, err.message);
    return null;
  }
}

const files = await walk(ROOT);
let totalBefore = 0, totalAfter = 0, count = 0;
for (const f of files) {
  const r = await processFile(f);
  if (r) {
    totalBefore += r.before;
    totalAfter += r.after;
    count++;
    const rel = path.relative(ROOT, r.file);
    console.log(`${rel}: ${(r.before/1024/1024).toFixed(2)}MB -> ${(r.after/1024/1024).toFixed(2)}MB`);
  }
}
console.log(`\nDone. ${count} files. Total: ${(totalBefore/1024/1024).toFixed(1)}MB -> ${(totalAfter/1024/1024).toFixed(1)}MB (saved ${((1 - totalAfter/totalBefore) * 100).toFixed(1)}%)`);

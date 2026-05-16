/**
 * 图片优化：
 *   1. public/image/*.png → public/image/*.webp（质量 85）
 *   2. 保留 PNG 作为后备（.gitignore 里可按需忽略）
 *   3. 基于现有 hero 图生成 og-cover.jpg（1200×630，Open Graph / 微信分享用）
 *
 * 运行：npm run optimize:images
 */
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { dirname, resolve, basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const IMG_DIR = resolve(ROOT, "public", "image");
const OG_OUT = resolve(ROOT, "public", "og-cover.jpg");

/* ── PNG → WebP ─────────────────────────────── */
const files = readdirSync(IMG_DIR).filter(f => f.toLowerCase().endsWith(".png"));
console.log(`\n📸 发现 ${files.length} 个 PNG，开始转换...\n`);

let savedBytes = 0;
for (const f of files) {
  const inPath = join(IMG_DIR, f);
  const outPath = join(IMG_DIR, basename(f, extname(f)) + ".webp");
  const inSize = statSync(inPath).size;
  await sharp(inPath)
    .webp({ quality: 85, effort: 5 })
    .toFile(outPath);
  const outSize = statSync(outPath).size;
  const saved = inSize - outSize;
  savedBytes += saved;
  const pct = ((saved / inSize) * 100).toFixed(0);
  console.log(`✓ ${f.padEnd(44)} ${(inSize/1024).toFixed(0).padStart(5)}KB → ${(outSize/1024).toFixed(0).padStart(5)}KB  (-${pct}%)`);
}
console.log(`\n共节省 ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);

/* ── 生成 og-cover.jpg（用铜盘矩阵作为底图，居中裁切 1200×630）─ */
const ogSrc = join(IMG_DIR, "新兴电力回收-铜芯电缆盘矩阵.png");
console.log(`\n📐 生成 og-cover.jpg (1200×630) ...`);

// 先拿到图的文字叠加 SVG（简单白字阴影，给分享时"能一眼看到品牌和业务"）
const overlaySvg = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" x2="0" y1="1" y2="0">
      <stop offset="0%"  stop-color="rgba(9,9,11,0.92)"/>
      <stop offset="45%" stop-color="rgba(9,9,11,0.55)"/>
      <stop offset="100%" stop-color="rgba(9,9,11,0.15)"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="80" y="430" font-family="PingFang SC,Microsoft YaHei,sans-serif" font-size="64" font-weight="800" fill="#fcd34d" letter-spacing="2">废旧电缆回收 · 二手变压器</text>
  <text x="80" y="500" font-family="PingFang SC,Microsoft YaHei,sans-serif" font-size="34" font-weight="600" fill="#ffffff" letter-spacing="1">长三角及安徽 · 上门评估 · 现场过磅</text>
  <text x="80" y="560" font-family="PingFang SC,Microsoft YaHei,sans-serif" font-size="26" font-weight="500" fill="#d4d4d8" letter-spacing="1">新兴电力设备 · www.xinxingdianlis.com</text>
</svg>
`);

await sharp(ogSrc)
  .resize(1200, 630, { fit: "cover", position: "center" })
  .composite([{ input: overlaySvg, top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(OG_OUT);

const ogSize = statSync(OG_OUT).size;
console.log(`✓ public/og-cover.jpg  ${(ogSize/1024).toFixed(0)} KB`);

console.log(`\n✅ 完成。`);

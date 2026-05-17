import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function svgCard({ width, height, title, subtitle, accent = "#f4b942" }) {
  const safeTitle = title.replace(/[&<>]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m]));
  const safeSubtitle = subtitle.replace(/[&<>]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m]));
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#101720"/>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="18" fill="#141d29" stroke="rgba(255,255,255,.16)" stroke-width="2"/>
  <circle cx="${width - 56}" cy="56" r="28" fill="${accent}" opacity=".9"/>
  <path d="M${width - 58} 38 L${width - 74} 64 H${width - 58} L${width - 64} 84 L${width - 38} 52 H${width - 54} Z" fill="#101720"/>
  <text x="40" y="${Math.round(height * 0.46)}" fill="#f5f7fa" font-family="Microsoft YaHei, PingFang SC, Arial, sans-serif" font-size="${Math.max(22, Math.round(width / 17))}" font-weight="800">${safeTitle}</text>
  <text x="40" y="${Math.round(height * 0.46) + 44}" fill="#a8b3c3" font-family="Microsoft YaHei, PingFang SC, Arial, sans-serif" font-size="${Math.max(14, Math.round(width / 34))}">${safeSubtitle}</text>
  <text x="40" y="${height - 38}" fill="#657386" font-family="Arial, sans-serif" font-size="14">placeholder asset - replace before publishing</text>
</svg>`);
}

const imageDir = resolve(ROOT, "public", "image");
mkdirSync(imageDir, { recursive: true });

await sharp(svgCard({
  width: 360,
  height: 360,
  title: "微信二维码待上传",
  subtitle: "请替换为真实 wechat-qr.png",
  accent: "#2fbf71",
})).png({ compressionLevel: 9 }).toFile(resolve(imageDir, "wechat-qr.png"));

console.log("placeholder assets generated");

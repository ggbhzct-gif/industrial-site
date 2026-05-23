/**
 * 一键替换站点占位符
 *
 * 用法：
 *   1. 复制 site.config.example.json 为 site.config.json
 *   2. 填入真实值（电话 / 微信；统计 ID 可选）
 *   3. 运行：npm run apply:config
 *   4. 脚本会批量替换 src/App.jsx、index.html、scripts/gen-city-pages.mjs
 *   5. 最后会自动触发 npm run gen:cities 重生城市/业务页
 *
 * 设计说明：
 *   - 幂等：同一 config 可反复运行；如果已被替换过，第二次会报 "未找到占位符"，
 *     这是正常现象，不影响站点运行。
 *   - 替换有精确上下文匹配，避免误伤（例如 xinxingdianli 是微信号，
 *     xinxingdianlis.com 是域名，脚本用边界匹配只改前者）。
 *   - site.config.json 已进 .gitignore，不会把号码/ID 传到公开仓库。
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CONFIG_PATH = resolve(ROOT, "site.config.json");

/* ── 读配置 ───────────────────────────────────── */
if (!existsSync(CONFIG_PATH)) {
  console.error("\n❌ 找不到 site.config.json");
  console.error("   请先：cp site.config.example.json site.config.json 并填入真实值\n");
  process.exit(1);
}

const cfg = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
const isFilled = (value) =>
  Boolean(value) &&
  !String(value).includes("XXXX") &&
  !String(value).includes("填") &&
  String(value).trim() !== "";
const required = ["phone", "wechat"];
const missing = required.filter(k => !isFilled(cfg[k]));
if (missing.length) {
  console.error("\n❌ 以下字段未填或仍是占位符：", missing.join(", "));
  console.error("   请编辑 site.config.json 后再运行。\n");
  process.exit(1);
}

/* ── 电话号码格式化 ────────────────────────────── */
const rawPhone = String(cfg.phone).replace(/\D/g, ""); // 只留数字
if (rawPhone.length !== 11) {
  console.error(`\n❌ phone 必须是 11 位中国大陆手机号，现在是 ${rawPhone.length} 位\n`);
  process.exit(1);
}
const phoneDash = `${rawPhone.slice(0,3)}-${rawPhone.slice(3,7)}-${rawPhone.slice(7)}`; // 138-0000-0000
const phoneTel  = `tel:${rawPhone}`;                                                    // tel:13800000000

/* ── 替换规则表 ────────────────────────────────── */
const RULES = [
  // 电话（横杠格式）- App.jsx / gen-city-pages.mjs 里的 PHONE 常量，index.html 里的 meta
  { files: ["src/App.jsx","scripts/gen-city-pages.mjs","index.html"],
    find: /138-0000-0000/g, replace: phoneDash, label: "电话（横杠格式）" },
  // 电话（tel: 链接）
  { files: ["src/App.jsx","scripts/gen-city-pages.mjs","index.html"],
    find: /tel:13800000000/g, replace: phoneTel, label: "电话（tel: 链接）" },
  // 电话（E.164 格式 in JSON-LD）
  { files: ["index.html"],
    find: /\+86-138-0000-0000/g, replace: `+86-${phoneDash}`, label: "电话（E.164 + JSON-LD）" },
  // 微信号（小心不要误伤域名 xinxingdianlis.com）
  // 用否定先行断言 s（不跟 s 的 xinxingdianli 才替换）
  { files: ["src/App.jsx","scripts/gen-city-pages.mjs"],
    find: /xinxingdianli(?!s)/g, replace: cfg.wechat, label: "微信号" },
];

if (isFilled(cfg.icpBeian)) {
  RULES.push({
    files: ["src/App.jsx", "scripts/gen-city-pages.mjs"],
    find: /皖ICP备XXXXXXXX号/g,
    replace: cfg.icpBeian,
    label: "ICP 备案号",
  });
}
if (isFilled(cfg.baiduTongjiId)) {
  RULES.push({
    files: ["index.html"],
    find: /BAIDU_HM_ID/g,
    replace: cfg.baiduTongjiId,
    label: "百度统计 hm.js ID",
  });
}
if (isFilled(cfg.ga4Id)) {
  RULES.push({
    files: ["index.html"],
    find: /G-XXXXXXXXXX/g,
    replace: cfg.ga4Id,
    label: "Google Analytics 4 ID",
  });
}

/* ── 执行 ─────────────────────────────────────── */
let totalHits = 0, totalMiss = 0;

for (const rule of RULES) {
  for (const rel of rule.files) {
    const abs = resolve(ROOT, rel);
    if (!existsSync(abs)) continue;
    const src = readFileSync(abs, "utf8");
    const matches = src.match(rule.find);
    if (!matches) {
      console.log(`· ${rel.padEnd(32)} 无 "${rule.label}" 占位符（已替换过或不存在）`);
      totalMiss++;
      continue;
    }
    const out = src.replace(rule.find, rule.replace);
    writeFileSync(abs, out, "utf8");
    console.log(`✓ ${rel.padEnd(32)} ${rule.label} × ${matches.length}`);
    totalHits += matches.length;
  }
}

console.log(`\n替换汇总：共替换 ${totalHits} 处，跳过 ${totalMiss} 处（已替换过）\n`);

/* ── 重新生成静态页 ─────────────────────────────── */
if (totalHits > 0) {
  console.log("→ 重新生成城市页 / 业务页 / sitemap ...\n");
  execSync("node scripts/gen-city-pages.mjs", { cwd: ROOT, stdio: "inherit" });
  console.log("\n✅ 全部完成。建议现在：");
  console.log("   git diff  # 检查改动");
  console.log("   npm run build && git add -A && git commit -m 'Apply real site config'");
  console.log("   git push");
} else {
  console.log("（未做任何替换，无需重生静态页）");
}

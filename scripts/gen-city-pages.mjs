/**
 * 城市落地页生成器
 *
 * 使用：node scripts/gen-city-pages.mjs
 *
 * 输出：public/<slug>/index.html × 14
 * 每个页面针对该城市做 SEO：独立 title/description/keywords/H1/
 * canonical/JSON-LD LocalBusiness（areaServed）+ Breadcrumb。
 * 14 个城市页互相在页脚内链（SEO hub 结构）。
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const PHONE     = "138-0000-0000";
const PHONE_TEL = "tel:13800000000";
const WECHAT    = "xinxingdianli";
const SITE      = "https://www.xinxingdianlis.com";

/** 14 个城市及本地化数据（区县填充长尾） */
const CITIES = [
  { slug: "shanghai",  name: "上海",   prov: "上海市",   geo: "CN-31", areas: ["浦东新区","松江区","嘉定区","青浦区","奉贤区","金山区","宝山区","闵行区"] },
  { slug: "suzhou",    name: "苏州",   prov: "江苏省",   geo: "CN-32", areas: ["工业园区","高新区","相城区","吴中区","吴江区","常熟","张家港","太仓"] },
  { slug: "kunshan",   name: "昆山",   prov: "江苏省",   geo: "CN-32", areas: ["花桥","陆家","玉山","张浦","周市","千灯","锦溪"] },
  { slug: "wuxi",      name: "无锡",   prov: "江苏省",   geo: "CN-32", areas: ["滨湖区","惠山区","锡山区","梁溪区","新吴区","江阴","宜兴"] },
  { slug: "changzhou", name: "常州",   prov: "江苏省",   geo: "CN-32", areas: ["武进区","新北区","天宁区","钟楼区","金坛","溧阳"] },
  { slug: "nanjing",   name: "南京",   prov: "江苏省",   geo: "CN-32", areas: ["江宁区","浦口区","六合区","溧水区","高淳区","栖霞区","雨花台区"] },
  { slug: "hangzhou",  name: "杭州",   prov: "浙江省",   geo: "CN-33", areas: ["萧山区","余杭区","临平区","临安区","富阳区","钱塘区","滨江区"] },
  { slug: "ningbo",    name: "宁波",   prov: "浙江省",   geo: "CN-33", areas: ["鄞州区","镇海区","北仑区","奉化区","慈溪","余姚","象山"] },
  { slug: "jiaxing",   name: "嘉兴",   prov: "浙江省",   geo: "CN-33", areas: ["秀洲区","南湖区","平湖","海宁","桐乡","嘉善","海盐"] },
  { slug: "huzhou",    name: "湖州",   prov: "浙江省",   geo: "CN-33", areas: ["吴兴区","南浔区","长兴","德清","安吉"] },
  { slug: "hefei",     name: "合肥",   prov: "安徽省",   geo: "CN-34", areas: ["瑶海区","庐阳区","蜀山区","包河区","肥东","肥西","长丰","巢湖"] },
  { slug: "wuhu",      name: "芜湖",   prov: "安徽省",   geo: "CN-34", areas: ["镜湖区","弋江区","鸠江区","三山区","无为","繁昌","南陵"] },
  { slug: "maanshan",  name: "马鞍山", prov: "安徽省",   geo: "CN-34", areas: ["雨山区","花山区","博望区","含山","和县","当涂"] },
  { slug: "chuzhou",   name: "滁州",   prov: "安徽省",   geo: "CN-34", areas: ["琅琊区","南谯区","天长","明光","来安","全椒","定远","凤阳"] },
];

const SERVICES = [
  { t: "废旧电缆回收",      d: "铜芯 / 铝芯 / 高压电缆，按净金属 × 当日铜铝价 × 回收系数结算，价格透明。" },
  { t: "二手变压器回收",   d: "S9/S11/S13 油浸式、SCB10/SCB13 干式变压器及开关柜、配电柜、母线槽。" },
  { t: "二手变压器出售",   d: "多品牌多容量规格现货对接，支持参数核对与区域配送，适配扩产/应急。" },
  { t: "工厂拆除设备处理", d: "整厂搬迁、车间清退、配电房拆改等场景，打包评估，快速腾退场地。" },
];

const commonFaqs = [
  { q: "废旧电缆回收价格怎么算？",       a: "按净铜/净铝重量 × 当日长江有色金属价 × 回收系数综合评估。铜芯电缆（如 YJV）价格约为铝芯（YJLV）的 3–4 倍。建议拍照发微信，10 分钟内即可给出初步价格区间。" },
  { q: "二手变压器回收需要哪些信息？",   a: "铭牌照片（型号、容量、电压、厂家、出厂日期）+ 外观实景图 + 台数。我们会根据品牌、容量、使用年限与外观状态快速给出初步收购意向。" },
  { q: "工厂搬迁整体设备能一起处理吗？", a: "可以。变压器、开关柜、母线槽、电机水泵、控制柜等电气设备打包评估，一站式完成场地腾退，长三角核心区域最快 24 小时内到场。" },
];

/** 轻量暗色样式（与主站视觉统一，不依赖 Tailwind 产物，首屏极快） */
const css = /* css */ `
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:#09090b;color:#fff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.wrap{max-width:1200px;margin:0 auto;padding:0 20px}
header{position:sticky;top:0;z-index:50;border-bottom:1px solid rgba(255,255,255,.06);background:rgba(9,9,11,.8);backdrop-filter:blur(16px)}
header .wrap{display:flex;align-items:center;justify-content:space-between;padding:14px 20px}
.brand{font-weight:600;letter-spacing:.15em}
.brand small{display:block;font-size:10px;color:#71717a;letter-spacing:.05em;margin-top:2px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:700;transition:transform .15s}
.btn:hover{transform:translateY(-1px)}
.btn-primary{background:#fbbf24;color:#09090b;box-shadow:0 10px 25px -5px rgba(251,191,36,.35)}
.btn-ghost{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#e4e4e7}
.hero{padding:80px 0 60px;background:radial-gradient(ellipse 80% 50% at 50% -20%,rgba(251,191,36,.12),transparent)}
.hero h1{font-size:clamp(32px,5vw,56px);font-weight:800;letter-spacing:-.02em;line-height:1.1;margin:16px 0 20px}
.hero h1 em{font-style:normal;background:linear-gradient(90deg,#fcd34d,#f59e0b);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p{max-width:640px;font-size:15px;color:#a1a1aa;margin-bottom:28px}
.chip{display:inline-block;padding:4px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);font-size:11px;color:#a1a1aa;margin:0 6px 6px 0}
.chip-amber{border-color:rgba(251,191,36,.3);background:rgba(251,191,36,.08);color:#fcd34d}
.ctas{display:flex;flex-wrap:wrap;gap:12px}
section{padding:70px 0;border-top:1px solid rgba(255,255,255,.06)}
h2{font-size:clamp(24px,3vw,36px);font-weight:700;letter-spacing:-.01em;margin:0 0 12px}
h2 + p.lead{color:#a1a1aa;font-size:14px;margin:0 0 32px;max-width:680px}
.kicker{font-size:11px;font-weight:600;color:#fbbf24;letter-spacing:.25em;text-transform:uppercase;margin-bottom:8px}
.grid{display:grid;gap:14px}
.grid-2{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
.grid-3{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.grid-4{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
.card{padding:24px;border-radius:20px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);transition:border-color .2s,background .2s}
.card:hover{border-color:rgba(251,191,36,.25);background:rgba(251,191,36,.03)}
.card h3{margin:0 0 10px;font-size:17px;font-weight:700}
.card p{margin:0;color:#a1a1aa;font-size:13px;line-height:1.75}
.area-tag{display:block;padding:12px 8px;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);text-align:center;font-size:13px;color:#d4d4d8;transition:all .15s}
.area-tag:hover{border-color:rgba(251,191,36,.3);color:#fcd34d;transform:translateY(-1px)}
.faq{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);border-radius:16px;padding:20px 24px;margin-bottom:10px}
.faq h3{margin:0 0 10px;font-size:15px;color:#e4e4e7;font-weight:600}
.faq p{margin:0;color:#a1a1aa;font-size:13px;line-height:1.8}
.contact-box{margin:20px 0 40px;padding:32px;border-radius:24px;border:1px solid rgba(251,191,36,.2);background:linear-gradient(135deg,rgba(251,191,36,.08),rgba(251,191,36,.02))}
.contact-box h2{margin-bottom:8px}
.phone-big{display:inline-block;margin:16px 0;padding:16px 28px;border-radius:14px;background:#fbbf24;color:#09090b;font-weight:800;font-size:20px;letter-spacing:.08em}
.link-cloud{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.link-cloud a{padding:6px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);font-size:12px;color:#a1a1aa}
.link-cloud a:hover{color:#fcd34d;border-color:rgba(251,191,36,.3)}
footer{padding:40px 0;border-top:1px solid rgba(255,255,255,.06);color:#52525b;font-size:12px}
footer .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px}
.mobile-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:50;padding:12px;background:rgba(9,9,11,.9);backdrop-filter:blur(16px);border-top:1px solid rgba(255,255,255,.1);gap:8px}
.mobile-cta a{flex:1;text-align:center;padding:12px;border-radius:10px;font-size:14px;font-weight:700}
body{padding-bottom:80px}
@media(min-width:1024px){.mobile-cta{display:none!important}body{padding-bottom:0}}
@media(max-width:1023px){.mobile-cta{display:flex}}
`;

/** 生成 1 个城市的 HTML */
function renderCity(c) {
  const title = `${c.name}废旧电缆回收_二手变压器回收出售_上门高价回收 | 新兴电力设备`;
  const desc  = `${c.name}废旧电缆回收、二手变压器回收与出售、工厂拆除设备处理。覆盖${c.areas.slice(0,4).join("、")}等${c.name}主要工业区，当日上门评估，现场结算，电话${PHONE}。`;
  const kw    = [
    `${c.name}废旧电缆回收`, `${c.name}电缆回收价格`, `${c.name}二手变压器回收`, `${c.name}变压器回收出售`,
    `${c.name}废铜回收`, `${c.name}工厂设备处理`, `${c.name}配电房拆改`, `${c.name}高压电缆回收`,
    `${c.name}铜芯电缆回收`, `${c.name}油浸式变压器`, `${c.name}干式变压器`,
  ].join(",");
  const canonical = `${SITE}/${c.slug}/`;

  const otherCities = CITIES.filter(x => x.slug !== c.slug);

  const ldLocalBusiness = {
    "@context":"https://schema.org","@type":"LocalBusiness",
    name:"新兴电力设备",url:canonical,telephone:PHONE,
    description:desc,
    image:`${SITE}/image/新兴电力回收-废旧电缆回收堆场.png`,
    areaServed:{ "@type":"City", name:c.name, containedInPlace:{ "@type":"AdministrativeArea", name:c.prov } },
    address:{ "@type":"PostalAddress", addressCountry:"CN", addressRegion:c.prov, addressLocality:c.name },
    openingHours:"Mo-Su 08:00-20:00",
    priceRange:"$$",
  };
  const ldBreadcrumb = {
    "@context":"https://schema.org","@type":"BreadcrumbList",
    itemListElement:[
      {"@type":"ListItem",position:1,name:"首页",item:`${SITE}/`},
      {"@type":"ListItem",position:2,name:`${c.name}`,item:canonical},
    ],
  };
  const ldFaq = {
    "@context":"https://schema.org","@type":"FAQPage",
    mainEntity: commonFaqs.map(f => ({
      "@type":"Question", name:f.q.replace("？",`（${c.name}）？`),
      acceptedAnswer:{ "@type":"Answer", text:f.a }
    }))
  };

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title>
<meta name="description" content="${desc}"/>
<meta name="keywords" content="${kw}"/>
<link rel="canonical" href="${canonical}"/>
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large"/>
<meta name="geo.region" content="${c.geo}"/>
<meta name="geo.placename" content="${c.name}"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${desc}"/>
<meta property="og:image" content="${SITE}/image/新兴电力回收-废旧电缆回收堆场.png"/>
<meta property="og:locale" content="zh_CN"/>
<meta property="og:site_name" content="新兴电力设备"/>
<link rel="alternate" href="${SITE}/" hreflang="zh-CN"/>
<script type="application/ld+json">${JSON.stringify(ldLocalBusiness)}</script>
<script type="application/ld+json">${JSON.stringify(ldBreadcrumb)}</script>
<script type="application/ld+json">${JSON.stringify(ldFaq)}</script>
<style>${css}</style>
</head>
<body>
<header><div class="wrap">
  <a href="/" class="brand">新兴电力设备<small>长三角及安徽 · ${c.name}区域服务</small></a>
  <a href="${PHONE_TEL}" class="btn btn-primary">${PHONE}</a>
</div></header>

<main>
  <section class="hero"><div class="wrap">
    <nav aria-label="面包屑" style="font-size:12px;color:#71717a;margin-bottom:8px">
      <a href="/">首页</a> <span style="color:#3f3f46">›</span> <span style="color:#d4d4d8">${c.name}</span>
    </nav>
    <span class="chip chip-amber">● ${c.name} · 当日响应</span>
    <h1>${c.name}<em>废旧电缆回收</em><br/>· 二手变压器回收出售</h1>
    <p>新兴电力设备深耕${c.prov}${c.name}区域，为本地工厂、物业、电气承包商提供废旧电缆高价回收、二手变压器回收与出售、整厂拆除设备处理。覆盖${c.areas.join("、")}等${c.name}主要工业区，免费上门评估、当日响应、现场称重结算。</p>
    <div>
      ${["✓ 免费上门评估","✓ 当日响应","✓ 现场结算","✓ 正规单据"].map(x=>`<span class="chip">${x}</span>`).join("")}
    </div>
    <div class="ctas" style="margin-top:24px">
      <a href="${PHONE_TEL}" class="btn btn-primary">📞 立即免费报价 · ${PHONE}</a>
      <a href="/" class="btn btn-ghost">查看完整案例 →</a>
    </div>
  </div></section>

  <section><div class="wrap">
    <div class="kicker">Core Services · ${c.name}</div>
    <h2>${c.name}四大核心回收业务</h2>
    <p class="lead">覆盖电气设备全生命周期处置与流通，${c.name}工厂/园区/物业均可对接。</p>
    <div class="grid grid-2">
      ${SERVICES.map((s,i)=>`
        <article class="card">
          <div style="font-size:44px;font-weight:900;color:rgba(255,255,255,.06);line-height:1;margin-bottom:-16px">${String(i+1).padStart(2,"0")}</div>
          <h3>${s.t}（${c.name}区域）</h3>
          <p>${s.d}</p>
        </article>`).join("")}
    </div>
  </div></section>

  <section><div class="wrap">
    <div class="kicker">Local Coverage</div>
    <h2>${c.name}上门服务区域</h2>
    <p class="lead">以下区县/开发区均已建立本地服务响应，${c.name}核心区最快 24 小时内到场。</p>
    <div class="grid grid-4">
      ${c.areas.map(a=>`<span class="area-tag">${c.name} · ${a}</span>`).join("")}
    </div>
  </div></section>

  <section><div class="wrap">
    <div class="kicker">FAQ · ${c.name}</div>
    <h2>${c.name}回收常见问题</h2>
    ${commonFaqs.map(f=>`
      <div class="faq">
        <h3>${f.q.replace("？",`（${c.name}）？`)}</h3>
        <p>${f.a}</p>
      </div>`).join("")}
  </div></section>

  <section><div class="wrap">
    <div class="contact-box">
      <div class="kicker">Contact</div>
      <h2>${c.name}区域免费评估 · 一个电话上门</h2>
      <p style="color:#a1a1aa;font-size:14px;margin:0">发送铭牌照片与数量到微信 <strong style="color:#fcd34d">${WECHAT}</strong>，10 分钟内回复价格区间。</p>
      <a href="${PHONE_TEL}" class="phone-big">📞 ${PHONE}</a>
      <div style="color:#71717a;font-size:12px">服务时段：每日 08:00–20:00 · 急单可协商</div>
    </div>
    <div class="kicker" style="margin-top:40px">Other Regions</div>
    <h2 style="font-size:18px">其他服务城市</h2>
    <div class="link-cloud">
      ${otherCities.map(x=>`<a href="/${x.slug}/">${x.name}${"废旧电缆回收"}</a>`).join("")}
      <a href="/">← 返回首页</a>
    </div>
  </div></section>
</main>

<div class="mobile-cta">
  <a href="${PHONE_TEL}" class="btn-primary" style="background:#fbbf24;color:#09090b">📞 立即电话</a>
  <a href="/" class="btn-ghost" style="border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#e4e4e7">查看完整站点</a>
</div>

<footer><div class="wrap">
  <div>© 2026 新兴电力设备 · ${c.name}废旧电缆与二手变压器专业回收</div>
  <div>电话：${PHONE} · 微信：${WECHAT}</div>
</div></footer>
</body>
</html>`;
}

/** 生成 sitemap.xml（覆盖写入） */
function renderSitemap() {
  const today = new Date().toISOString().slice(0,10);
  const urls = [
    { loc:`${SITE}/`, pri:"1.0", freq:"weekly" },
    ...CITIES.map(c => ({ loc:`${SITE}/${c.slug}/`, pri:"0.8", freq:"monthly" })),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u=>`  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.pri}</priority>
  </url>`).join("\n")}
</urlset>
`;
}

/* ── 执行 ───────────────────────────────────────── */
let count = 0;
for (const c of CITIES) {
  const outDir  = resolve(ROOT, "public", c.slug);
  const outFile = resolve(outDir, "index.html");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, renderCity(c), "utf8");
  console.log(`✓ public/${c.slug}/index.html`);
  count++;
}
writeFileSync(resolve(ROOT, "public", "sitemap.xml"), renderSitemap(), "utf8");
console.log(`✓ public/sitemap.xml (${CITIES.length + 1} URLs)`);
console.log(`\n生成完成：${count} 个城市页 + 1 个 sitemap`);

import { useState } from "react";

const PHONE     = "138-0000-0000";
const PHONE_TEL = "tel:13800000000";
const WECHAT    = "xinxingdianli";

/* ── 数据 ─────────────────────────────────────────── */
const services = [
  {
    num: "01",
    title: "废旧电缆回收",
    tags: ["铜芯电缆", "铝芯电缆", "高压电缆"],
    desc: "面向工厂搬迁、园区改造、工地余料与配电房更新场景，提供废旧电缆上门回收与现场评估，按当日铜价出价，透明不压价。",
  },
  {
    num: "02",
    title: "二手变压器回收",
    tags: ["油浸式", "干式", "开关柜"],
    desc: "收购油浸式变压器、干式变压器及配套开关柜、母线槽等配电设备，铭牌确认、上门看货、合理估价全流程服务。",
  },
  {
    num: "03",
    title: "二手变压器出售",
    tags: ["多规格现货", "参数核对", "区域配送"],
    desc: "提供多品牌、多容量规格二手变压器展示对接，支持参数核对、现场看货与区域配送，满足工厂扩产或临时用电采购需求。",
  },
  {
    num: "04",
    title: "工厂拆除设备处理",
    tags: ["整厂搬迁", "车间清退", "配电房拆改"],
    desc: "覆盖工厂搬迁、车间清退、配电房拆改等场景，提供整厂电气设备打包评估与快速处置，助企业高效完成资产变现与场地腾退。",
  },
];

const advantages = [
  { icon: "↑", title: "高价回收", desc: "参照当日铜价与二手市场行情，给出同类最具竞争力报价。" },
  { icon: "◎", title: "上门评估", desc: "全程免费上门，专业人员现场核查铭牌、型号与数量。" },
  { icon: "⚡", title: "当日响应", desc: "7×12h 咨询接待，确认信息后最快当日安排上门排期。" },
  { icon: "✓", title: "手续合规", desc: "提供正规交接单据与收据，资产处置流程合规，方便财务做账。" },
  { icon: "🏙", title: "区域覆盖", desc: "长三角及安徽多城市均有服务网络，就近安排上门评估。" },
  { icon: "💬", title: "微信图片沟通", desc: "发送铭牌图与实景图，快速预判价值，省去往返成本。" },
];

const regions = ["上海","苏州","昆山","无锡","常州","南京","杭州","宁波","嘉兴","湖州","合肥","芜湖","马鞍山","滁州"];

const cases = [
  {
    img: "/image/新兴电力回收-工厂电缆清运.png",
    alt: "工厂配电房整体设备处理——工厂电缆清运现场",
    badge: "工厂搬迁",
    title: "工厂配电房整体设备处理",
    desc: "适用于工厂整体搬迁、车间产线调整、园区设备更新，提供变压器、开关柜、母线槽打包评估与快速处置。",
    large: true,
  },
  {
    img: "/image/新兴电力回收-大型电缆盘收购.png",
    alt: "废旧电缆高价回收——大型电缆盘收购现场",
    badge: "电缆回收",
    title: "废旧电缆高价回收对接",
    desc: "工地余料、库存积压、拆除铜芯铝芯及高压电缆回收，上门称重，参照铜价，现场结算。",
    large: false,
  },
  {
    img: "/image/新兴电力回收-废旧变压器回收.png",
    alt: "二手变压器展示与流通——废旧变压器回收现场",
    badge: "变压器买卖",
    title: "二手变压器回收与流通",
    desc: "按品牌、容量、型号、状态展示，既可收购也可出售，适配企业扩产或应急采购需求。",
    large: false,
  },
];

/* 作业现场图库 */
const gallery = [
  { src: "/image/新兴电力回收-电缆盘回收现场.png",    label: "电缆盘回收现场" },
  { src: "/image/新兴电力回收-配电柜回收现场.png",    label: "配电柜回收现场" },
  { src: "/image/新兴电力回收-废旧电缆回收堆场.png",  label: "废旧电缆堆场" },
  { src: "/image/新兴电力回收-电缆整理打包.png",      label: "电缆整理打包" },
  { src: "/image/新兴电力回收-散装电线回收.png",      label: "散装电线回收" },
  { src: "/image/新兴电力回收-电机水泵回收.png",      label: "电机水泵回收" },
];

const steps = [
  "电话或微信联系，简述业务需求",
  "发送设备图片 / 铭牌照片 / 数量信息",
  "我方初步评估，判断价值区间",
  "安排上门看货，现场确认报价",
  "双方确认方案，推进设备交割与结算",
];

const faqs = [
  { q: "废旧电缆回收价格怎么算？",      a: "废旧电缆回收价格主要根据铜铝含量、线缆规格型号及当日市场铜价综合评估。我们提供免费上门看货服务，现场给出准确报价，价格透明，不压价。" },
  { q: "二手变压器回收需要提供哪些信息？", a: "建议提前拍摄变压器铭牌照片、外观实景图及台数，通过微信或电话发给我们。我们会根据品牌、容量、使用年限快速给出初步收购意向，支持上门看货确认最终价格。" },
  { q: "服务范围覆盖哪些城市？",         a: "主要覆盖长三角地区及安徽省，包括上海、苏州、昆山、无锡、常州、南京、杭州、宁波、嘉兴、湖州，以及安徽省合肥、芜湖、马鞍山、滁州等主要城市均可上门服务。" },
  { q: "工厂搬迁设备处理多久可以上门？",  a: "电话或微信沟通需求并发送设备图片后，我们通常可在1–3个工作日内安排上门评估，急单可优先协调，根据项目规模灵活排期。" },
  { q: "支持油浸式和干式变压器回收吗？",  a: "支持。我们回收油浸式变压器、干式变压器及配套开关柜、配电柜、母线槽等配电设备，无论单台还是整套配电房均可咨询，不限规模。" },
];

/* ── 组件 ─────────────────────────────────────────── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${open ? "border-amber-400/30 bg-amber-400/[0.04]" : "border-white/8 bg-white/[0.02]"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-zinc-200 leading-6">{q}</span>
        <span className={`mt-0.5 shrink-0 text-amber-400 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path d="M8 2a.75.75 0 0 1 .75.75v4.5h4.5a.75.75 0 0 1 0 1.5h-4.5v4.5a.75.75 0 0 1-1.5 0v-4.5h-4.5a.75.75 0 0 1 0-1.5h4.5v-4.5A.75.75 0 0 1 8 2Z" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm leading-7 text-zinc-400 border-t border-white/8 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

/* ── 主页面 ───────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen scroll-smooth bg-zinc-950 text-white selection:bg-amber-300 selection:text-zinc-950">

      {/* ── 导航 ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div>
            <div className="text-sm font-semibold tracking-widest text-zinc-100 sm:text-base">新兴电力设备</div>
            <div className="mt-0.5 text-[10px] tracking-wide text-zinc-500">长三角及安徽 · 废旧电缆与变压器专业团队</div>
          </div>
          <nav className="hidden items-center gap-7 text-xs font-medium tracking-wider text-zinc-400 lg:flex" aria-label="主导航">
            {[["业务","#services"],["优势","#advantages"],["区域","#regions"],["案例","#cases"],["现场","#gallery"],["FAQ","#faq"],["联系","#contact"]].map(([label, href]) => (
              <a key={href} href={href} className="transition hover:text-zinc-100">{label}</a>
            ))}
          </nav>
          <a href={PHONE_TEL} className="shrink-0 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold tracking-wider text-amber-300 transition hover:bg-amber-400/20">
            {PHONE}
          </a>
        </div>
        {/* 移动端 tab */}
        <div className="border-t border-white/[0.06] px-4 py-2.5 lg:hidden">
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {[["业务","#services"],["优势","#advantages"],["区域","#regions"],["案例","#cases"],["现场","#gallery"],["FAQ","#faq"],["联系","#contact"]].map(([label, href]) => (
              <a key={href} href={href} className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-zinc-300">{label}</a>
            ))}
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden" aria-label="业务介绍">
          {/* 背景装饰 */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
            {/* 点阵背景 */}
            <div className="absolute inset-0 opacity-[0.15]"
              style={{backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.5) 1px,transparent 1px)",backgroundSize:"32px 32px"}} />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pt-28 lg:pb-24">

            {/* 左：文字 */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                长三角 & 安徽 · 专业回收团队
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                废旧电缆
                <br />
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  回收 · 变压器
                </span>
                <br />
                买卖专家
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                新兴电力设备专注长三角及安徽地区废旧电缆高价回收、二手变压器回收与出售、工厂拆除设备整体处理。<strong className="text-zinc-300">上门评估 · 当日响应 · 现场结算</strong>。
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={PHONE_TEL} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-400/25 transition hover:-translate-y-0.5 hover:shadow-amber-400/40">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-8.284 0-15-6.716-15-15V3.5Z" clipRule="evenodd"/>
                  </svg>
                  立即电话咨询
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white">
                  查看联系方式
                </a>
              </div>

              {/* 数据亮点 */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/8 pt-8">
                {[
                  { val: "10", unit: "年+", label: "行业经验" },
                  { val: "7×12", unit: "h", label: "每日响应" },
                  { val: "4", unit: "项", label: "核心业务" },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-3xl font-bold text-amber-400 sm:text-4xl">{item.val}</span>
                      <span className="text-sm font-semibold text-amber-400/70">{item.unit}</span>
                    </div>
                    <div className="mt-1 text-xs text-zinc-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 右：实景图卡片 */}
            <div className="relative mt-12 lg:mt-0">
              {/* 装饰光晕 */}
              <div className="absolute -inset-4 rounded-[3rem] bg-amber-400/5 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
                <img
                  src="/image/新兴电力回收-电缆盘回收现场.png"
                  alt="专业废旧电缆与二手变压器回收——电缆盘回收堆场现场"
                  width="900" height="600"
                  loading="eager"
                  fetchpriority="high"
                  className="h-64 w-full object-cover sm:h-80 lg:h-[460px]"
                />
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                {/* 浮动信息卡 */}
                <div className="absolute bottom-5 left-5 right-5 flex gap-3">
                  <div className="flex-1 rounded-xl border border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur-xl">
                    <div className="text-[10px] text-zinc-500">服务覆盖</div>
                    <div className="mt-0.5 text-xs font-semibold text-zinc-200">上海 · 苏州 · 无锡 · 南京 · 杭州 · 合肥…</div>
                  </div>
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-950/60 px-4 py-3 backdrop-blur-xl">
                    <div className="text-[10px] text-emerald-400">状态</div>
                    <div className="mt-0.5 text-xs font-semibold text-emerald-300">接单中</div>
                  </div>
                </div>
              </div>
              {/* 右上角浮动徽章 */}
              <div className="absolute -right-3 -top-3 rounded-2xl bg-amber-400 px-4 py-2.5 text-center shadow-xl shadow-amber-400/30">
                <div className="text-xs font-black tracking-wider text-zinc-950">当日响应</div>
                <div className="text-[9px] font-bold tracking-wider text-zinc-950/70">上门评估</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 主营业务 ── */}
        <section id="services" className="scroll-mt-28 mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Core Services</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">主营业务</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-zinc-500">
              四大业务方向，覆盖电气设备全生命周期的资产处置与流通需求。
            </p>
          </div>

          <div className="grid gap-px rounded-[2rem] overflow-hidden border border-white/8 bg-white/8 sm:grid-cols-2">
            {services.map((svc, i) => (
              <article key={svc.num}
                className={`group relative bg-zinc-950 p-7 transition hover:bg-zinc-900/80 ${i === 0 ? "rounded-tl-[2rem]" : ""} ${i === 1 ? "rounded-tr-[2rem]" : ""} ${i === 2 ? "rounded-bl-[2rem]" : ""} ${i === 3 ? "rounded-br-[2rem]" : ""}`}>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-5xl font-black text-white/[0.06] group-hover:text-amber-400/10 transition select-none">{svc.num}</span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {svc.tags.map(tag => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-zinc-400">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{svc.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">{svc.desc}</p>
                <a href="#contact" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 opacity-0 group-hover:opacity-100 transition">
                  立即咨询
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/>
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── 服务优势 ── */}
        <section id="advantages" className="scroll-mt-28 border-y border-white/[0.06]">
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(245,158,11,0.05),transparent)]" />
            <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
              <div className="mb-12">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Why Choose Us</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">为什么选择新兴电力设备</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {advantages.map((adv) => (
                  <div key={adv.title} className="group rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition hover:border-amber-400/20 hover:bg-amber-400/[0.03]">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-amber-400 group-hover:border-amber-400/30">
                      {adv.icon}
                    </div>
                    <div className="font-semibold text-zinc-100">{adv.title}</div>
                    <p className="mt-2 text-sm leading-7 text-zinc-500">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 服务区域 ── */}
        <section id="regions" className="scroll-mt-28 mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Service Regions</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">覆盖长三角<br/>及安徽主要城市</h2>
              <p className="mt-5 text-sm leading-7 text-zinc-400">
                服务范围涵盖上海全市、江苏省、浙江省主要城市及安徽省核心城市。其他区域可来电确认可行性。
              </p>
              <a href={PHONE_TEL} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white">
                来电确认服务城市
              </a>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
              {regions.map((region) => (
                <div key={region}
                  className="group relative rounded-xl border border-white/8 bg-white/[0.02] py-3 text-center text-xs font-medium text-zinc-400 transition hover:border-amber-400/30 hover:text-amber-300">
                  {region}
                </div>
              ))}
              <div className="rounded-xl border border-dashed border-white/10 py-3 text-center text-xs text-zinc-600">
                更多…
              </div>
            </div>
          </div>
        </section>

        {/* ── 典型场景（不对称） ── */}
        <section id="cases" className="scroll-mt-28 border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Business Scenarios</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">典型业务场景</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-zinc-500">涵盖电缆回收、变压器买卖与工厂设备整体处理，欢迎对号入座后来电咨询。</p>
            </div>

            {/* 不对称网格：大 + 2小 */}
            <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
              {/* 大卡 */}
              {cases.filter(c => c.large).map(item => (
                <article key={item.title} className="group relative overflow-hidden rounded-[1.75rem] border border-white/8 h-64 sm:h-80 lg:min-h-[420px]"
                  style={item.bgStyle || {}}>
                  {item.bgOverlay}
                  {item.bgIcon}
                  {item.img && (
                    <img src={item.img} alt={item.alt} width="1200" height="800" loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold tracking-wider text-zinc-950 mb-3">{item.badge}</span>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">{item.desc}</p>
                  </div>
                </article>
              ))}

              {/* 2 小卡 */}
              <div className="flex flex-col gap-4">
                {cases.filter(c => !c.large).map(item => (
                  <article key={item.title} className="group relative flex-1 overflow-hidden rounded-[1.75rem] border border-white/8 h-44 sm:h-48"
                    style={item.bgStyle || {}}>
                    {item.bgOverlay}
                    {item.bgIcon}
                    {item.img && (
                      <img src={item.img} alt={item.alt} width="800" height="480" loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="inline-block rounded-full bg-amber-400/90 px-3 py-0.5 text-[10px] font-bold tracking-wider text-zinc-950 mb-2">{item.badge}</span>
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-1.5 text-xs leading-5 text-zinc-400">{item.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 作业现场图库 ── */}
        <section id="gallery" className="scroll-mt-28 mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Field Photos</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">真实作业现场</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-zinc-500">
              现场实拍：电缆堆场、配电柜拆解、变压器回收——所见即所得，拒绝美化。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g) => (
              <figure key={g.src} className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
                <img
                  src={g.src}
                  alt={`新兴电力设备 · ${g.label}`}
                  loading="lazy"
                  className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4">
                  <span className="text-sm font-semibold text-zinc-100">{g.label}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/80">现场实拍</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── 咨询流程 ── */}
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
            <div className="lg:sticky lg:top-32">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Process</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">咨询与<br/>对接流程</h2>
              <p className="mt-5 text-sm leading-7 text-zinc-400">从初步咨询到现场交割，全程专人对接，流程清晰透明。</p>
              <a href={PHONE_TEL} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-400/20 transition hover:-translate-y-0.5">
                立即开始咨询
              </a>
            </div>
            <ol className="relative space-y-0">
              {/* 连线 */}
              <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-amber-400/40 via-white/10 to-transparent" />
              {steps.map((step, idx) => (
                <li key={step} className="relative flex gap-5 pb-8 last:pb-0">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-zinc-950 text-sm font-bold text-amber-400">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-sm leading-7 text-zinc-300">
                    {step}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-28 border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:items-start">
              <div className="lg:sticky lg:top-32">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">FAQ</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">常见问题</h2>
                <p className="mt-5 text-sm leading-7 text-zinc-400">
                  关于废旧电缆回收价格、二手变压器收购流程、服务城市等常见疑问。
                </p>
                <a href={PHONE_TEL} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-400/20 transition hover:-translate-y-0.5">
                  直接电话咨询
                </a>
              </div>
              <div className="space-y-2">
                {faqs.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ── 联系 ── */}
        <section id="contact" className="scroll-mt-28 mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950">
            {/* 装饰光 */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-400/8 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-amber-400/5 blur-3xl" />

            <div className="relative grid gap-0 lg:grid-cols-2">
              <div className="p-8 sm:p-10 lg:p-14">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Contact</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">欢迎来电<br/>或微信咨询</h2>
                <p className="mt-5 text-sm leading-7 text-zinc-400">
                  废旧电缆回收报价、二手变压器收购出售、整厂设备处理，均可直接联系，专人对接，快速响应。
                </p>

                {/* 大号电话 */}
                <a href={PHONE_TEL} className="mt-8 flex items-center gap-4 rounded-2xl border border-amber-400/20 bg-amber-400/8 px-6 py-5 transition hover:bg-amber-400/15">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-zinc-950">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-8.284 0-15-6.716-15-15V3.5Z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">点击直接拨号</div>
                    <div className="text-xl font-bold tracking-widest text-amber-300">{PHONE}</div>
                  </div>
                </a>

                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-green-400">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.16c-1.47 0-2.93-.39-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.265 8.265 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.21 3.7 8.21 8.24.01 4.54-3.66 8.24-8.2 8.24z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">微信号</div>
                    <div className="text-sm font-semibold text-zinc-200">{WECHAT}</div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-zinc-600">服务时段：每日 08:00 – 20:00 · 急单可协商</div>
              </div>

              <div className="border-t border-white/8 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
                <div className="text-sm font-semibold text-zinc-300 mb-5">业务咨询范围</div>
                <ul className="space-y-3">
                  {[
                    "废旧电缆回收报价（铜芯 / 铝芯 / 高压）",
                    "二手变压器收购（油浸式 / 干式）",
                    "二手变压器出售与参数对接",
                    "工厂搬迁 / 配电房整体设备处理",
                    "长三角及安徽主要城市上门评估",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-zinc-400">
                      <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-amber-400/40 bg-amber-400/10 flex items-center justify-center text-[10px] font-bold text-amber-400">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 悬浮拨打 */}
      <a href={PHONE_TEL} aria-label="一键电话咨询"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 shadow-2xl shadow-amber-400/30 transition hover:-translate-y-0.5 sm:bottom-7 sm:right-7">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-8.284 0-15-6.716-15-15V3.5Z" clipRule="evenodd"/>
        </svg>
        一键电话咨询
      </a>

      {/* ── 页脚 ── */}
      <footer className="border-t border-white/[0.06] bg-zinc-950">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-sm font-semibold text-zinc-200">新兴电力设备</div>
              <p className="mt-3 text-xs leading-6 text-zinc-500">长三角及安徽专业废旧电缆回收与二手变压器回收出售服务商</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">主营业务</div>
              <ul className="space-y-2 text-xs leading-6 text-zinc-500">
                {["废旧电缆回收","二手变压器回收","二手变压器出售","工厂拆除设备处理"].map(b => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">服务城市</div>
              <p className="text-xs leading-6 text-zinc-500">{regions.join(" · ")}</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">联系我们</div>
              <ul className="space-y-2 text-xs leading-6 text-zinc-500">
                <li>电话：{PHONE}</li>
                <li>微信：{WECHAT}</li>
                <li>服务时段：08:00 – 20:00</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-[11px] text-zinc-700 sm:flex-row sm:justify-between">
            <div>© 2026 新兴电力设备 · 长三角及安徽废旧电缆与二手变压器专业回收</div>
            <div>皖ICP备XXXXXXXX号</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

const PHONE     = "138-0000-0000";
const PHONE_TEL = "tel:13800000000";
const WECHAT    = "xinxingdianli";

/* ── 数据 ─────────────────────────────────────────── */
const services = [
  {
    num: "01",
    title: "废旧电缆回收",
    tags: ["铜芯电缆", "铝芯电缆", "高压电缆"],
    desc: "面向工厂搬迁、园区改造、工地余料与配电房更新场景，提供废旧电缆上门回收与现场过磅。按材质、规格、重量和清运条件评估，结算依据清楚。",
    href: "/cable-recycling/",
  },
  {
    num: "02",
    title: "二手变压器回收",
    tags: ["油浸式", "干式", "开关柜"],
    desc: "收购油浸式变压器、干式变压器及配套开关柜、母线槽等配电设备，铭牌确认、上门看货、合理估价全流程服务。",
    href: "/transformer-recycling/",
  },
  {
    num: "03",
    title: "二手变压器出售",
    tags: ["多规格现货", "参数核对", "区域配送"],
    desc: "提供多品牌、多容量规格二手变压器展示对接，支持参数核对、现场看货与区域配送，满足工厂扩产或临时用电采购需求。",
    href: "/transformer-recycling/#sell",
  },
  {
    num: "04",
    title: "工厂拆除设备处理",
    tags: ["整厂搬迁", "车间清退", "配电房拆改"],
    desc: "覆盖工厂搬迁、车间清退、配电房拆改等场景，提供整厂电气设备打包评估与快速处置，助企业高效完成资产变现与场地腾退。",
    href: "/factory-demolition/",
  },
];

const advantages = [
  { icon: "↑", title: "报价透明", desc: "按材质、规格、重量、成色、行情与清运条件现场说明报价依据。" },
  { icon: "◎", title: "上门评估", desc: "全程免费上门，专业人员现场核查铭牌、型号与数量。" },
  { icon: "⚡", title: "当日响应", desc: "7×12h 咨询接待，确认信息后最快当日安排上门排期。" },
  { icon: "✓", title: "手续合规", desc: "提供正规交接单据与收据，资产处置流程合规，方便财务做账。" },
  { icon: "🏙", title: "区域覆盖", desc: "以安徽为重点，长三角多城市均有服务网络，就近安排上门评估。" },
  { icon: "💬", title: "微信图片沟通", desc: "发送铭牌图与实景图，快速预判价值，省去往返成本。" },
];

const regions = [
  { name: "安徽",   slug: "anhui"     },
  { name: "合肥",   slug: "hefei"     },
  { name: "芜湖",   slug: "wuhu"      },
  { name: "马鞍山", slug: "maanshan"  },
  { name: "滁州",   slug: "chuzhou"   },
  { name: "铜陵",   slug: "tongling"  },
  { name: "安庆",   slug: "anqing"    },
  { name: "宣城",   slug: "xuancheng" },
  { name: "蚌埠",   slug: "bengbu"    },
  { name: "淮南",   slug: "huainan"   },
  { name: "六安",   slug: "luan"      },
  { name: "池州",   slug: "chizhou"   },
  { name: "阜阳",   slug: "fuyang"    },
  { name: "上海",   slug: "shanghai"  },
  { name: "苏州",   slug: "suzhou"    },
  { name: "昆山",   slug: "kunshan"   },
  { name: "无锡",   slug: "wuxi"      },
  { name: "常州",   slug: "changzhou" },
  { name: "南京",   slug: "nanjing"   },
  { name: "杭州",   slug: "hangzhou"  },
  { name: "宁波",   slug: "ningbo"    },
  { name: "嘉兴",   slug: "jiaxing"   },
  { name: "湖州",   slug: "huzhou"    },
];

const cases = [
  {
    img: "/image/新兴电力回收-工厂电缆清运.webp",
    alt: "工厂配电房整体设备处理——工厂电缆清运现场",
    badge: "工厂搬迁",
    title: "工厂配电房整体设备处理",
    desc: "适用于工厂整体搬迁、车间产线调整、园区设备更新，提供变压器、开关柜、母线槽打包评估与快速处置。",
    large: true,
  },
  {
    img: "/image/新兴电力回收-电缆盘回收现场.webp",
    alt: "废旧电缆回收——电缆盘现场称重结算作业",
    badge: "电缆回收",
    title: "废旧电缆回收对接",
    desc: "工地余料、库存积压、拆除铜芯铝芯及高压电缆回收，上门称重，参照铜价，现场结算。",
    large: false,
  },
  {
    img: "/image/新兴电力回收-废旧变压器回收.webp",
    alt: "二手变压器展示与流通——废旧变压器回收现场",
    badge: "变压器买卖",
    title: "二手变压器回收与流通",
    desc: "按品牌、容量、型号、状态展示，既可收购也可出售，适配企业扩产或应急采购需求。",
    large: false,
  },
];

/* 作业现场图库 */
const gallery = [
  { src: "/image/新兴电力回收-大型电缆盘收购.webp",    label: "大型电缆盘收购" },
  { src: "/image/新兴电力回收-废旧电缆回收堆场.webp",  label: "废旧电缆堆场" },
  { src: "/image/新兴电力回收-配电柜回收现场.webp",    label: "配电柜回收现场" },
  { src: "/image/新兴电力回收-电缆整理打包.webp",      label: "电缆整理打包" },
  { src: "/image/新兴电力回收-散装电线回收.webp",      label: "散装电线回收" },
  { src: "/image/新兴电力回收-电机水泵回收.webp",      label: "电机水泵回收" },
];

const steps = [
  "电话或微信联系，简述业务需求",
  "发送设备图片 / 铭牌照片 / 数量信息",
  "我方初步评估，判断价值区间",
  "安排上门看货，现场确认报价",
  "双方确认方案，推进设备交割与结算",
];

const faqs = [
  { q: "废旧电缆回收价格怎么算？一米多少钱？", a: "废旧电缆回收通常按重量和材质评估，不能只按长度报价。价格主要取决于铜/铝芯含量、线径、屏蔽结构、外护套、现场拆卸难度和当日金属行情。建议拍铭牌和实物图发微信，我们可先给出初步范围，再现场称重确认。" },
  { q: "二手变压器回收需要提供哪些信息？", a: "建议提前拍摄变压器铭牌照片（含型号、容量、电压、生产厂家、出厂日期）、外观实景图及台数，通过微信或电话发给我们。我们会根据品牌、容量、使用年限、外观状态快速给出初步收购意向，支持上门看货确认最终价格。" },
  { q: "服务范围覆盖哪些城市？", a: "以安徽为重点覆盖合肥、芜湖、马鞍山、滁州、铜陵、安庆、宣城、蚌埠、淮南、六安、池州、阜阳等工业城市，同时承接上海、苏州、昆山、无锡、常州、南京、杭州、宁波、嘉兴、湖州等长三角项目。非核心城市的整厂拆除项目也可来电协商。" },
  { q: "工厂搬迁设备处理多久可以上门？", a: "电话或微信沟通需求并发送设备图片后，我们通常可在 1–3 个工作日内安排上门评估；急单可优先协调，根据项目规模灵活排期。安徽重点城市与长三角核心区域可优先排期。" },
  { q: "支持油浸式和干式变压器回收吗？", a: "支持。我们回收 S9/S11/S13/SCB10/SCB13 等油浸式与干式变压器，及配套开关柜（GGD、GCK、KYN28）、配电柜、母线槽等配电设备，无论单台还是整套配电房均可咨询，不限规模。" },
  { q: "铜芯电缆与铝芯电缆回收价差大吗？", a: "差距较大。铜芯和铝芯要分开评估，实际价格受芯材、重量、线径、护套、钢带铠装和现场清运条件影响。建议现场称重并核对材质后再确认最终报价。" },
  { q: "回收过程是否开具正规单据？", a: "会。我们提供正规回收交接单、过磅单、收据/发票（根据客户需求类型开具），资产处置流程合规，方便企业财务做账及内部审计留痕。大宗业务可签订正式合同。" },
  { q: "高压电缆（10kV / 35kV）也回收吗？", a: "回收。YJV22、YJLV22 等 10kV/35kV 交联聚乙烯高压电缆是我们的主要回收品类之一。由于截面大、铜含量高，回收单价相对较好，工程剩余、改造拆除的新旧高压电缆都可处理。" },
  { q: "工厂整体拆除，除了电缆变压器还能处理什么？", a: "整厂拆除业务中，我们可一并处理配电柜/开关柜、母线槽、电机、水泵、控制柜、UPS 等电气设备，以及部分金属结构件。可打包评估报价，一站式完成场地腾退。" },
  { q: "如何防止被低价收购？", a: "建议：1) 同时咨询 2–3 家回收方对比报价；2) 要求对方说明材质、重量、行情和清运成本等报价依据；3) 过磅时到场监督；4) 查看对方是否具备再生资源经营资质。我们支持现场核对，欢迎对比。" },
];

/* 能力承诺带 */
const trustStats = [
  {
    head: "报价",
    sub: "依据清楚",
    label: "材质 重量 行情 清运条件 逐项说明",
  },
  {
    head: "过磅",
    sub: "客户监督",
    label: "地磅清单当场签字 全程可拍摄",
  },
  {
    head: "单据",
    sub: "对公结算",
    label: "过磅单 收据 发票 财务可入账",
  },
  {
    head: "覆盖",
    sub: "14 城上门",
    label: "安徽重点城市 + 长三角覆盖",
  },
];

/* 报价评估指南：只展示影响报价的真实因素，不展示无法统一背书的固定系数。 */
const priceGuide = [
  {
    cat: "废旧电缆",
    items: [
      { name: "铜芯电力电缆 YJV",     spec: "常见电力线缆",   formula: "看净铜重量、线径规格、护套/钢带情况、拆解难度", note: "现场确认材质和重量后，结合当日铜价给出报价" },
      { name: "铝芯电力电缆 YJLV",    spec: "铝芯电缆",        formula: "看净铝重量、线缆规格、成色、装车与运输距离", note: "铜芯与铝芯价格差异较大，需按实际芯材分别评估" },
      { name: "高压交联电缆 YJV22",   spec: "10kV / 35kV",     formula: "看电压等级、截面、米数、是否带铠装及现场条件", note: "大截面电缆需核对铭牌、截面和实际重量后报价" },
      { name: "控制电缆 KVV",         spec: "多芯控制线",      formula: "看铜芯数量、外护套、屏蔽层、钢带和分拣难度", note: "小线径、多芯线缆需按实际含铜情况评估" },
    ],
  },
  {
    cat: "二手变压器",
    items: [
      { name: "油浸式变压器 S11/S13",    spec: "315–2500kVA",                  formula: "看品牌、容量、出厂年份、外观、油箱状态和检测资料", note: "铭牌清晰、运行记录完整的设备更容易给出明确报价" },
      { name: "干式变压器 SCB10/SCB13",  spec: "400–2000kVA",                  formula: "看品牌、容量、绕组完整度、绝缘状态、外观与出厂年份", note: "能提供铭牌和实拍图，可先给出初步收购意向" },
      { name: "箱式变电站",              spec: "户外整套（YB / ZGS）",          formula: "看变压器、高低压柜、箱体完整度和是否需要拆分处置", note: "现场看货后可给出整套或拆分两种处理方案" },
      { name: "开关柜 / 配电柜",         spec: "GGD / GCK / KYN28 / MNS",      formula: "看型号、数量、铜排截面、断路器品牌和柜体完整度", note: "高压柜、低压柜、控制柜按实际配置分别评估" },
    ],
  },
];

/* 行业服务说明：按服务对象类型展示可执行流程。 */
const serviceSegments = [
  {
    industry: "制造业 · 整厂搬迁与产线升级",
    typical: "电子 / 光伏 / 精密机械 / 新能源汽车工厂",
    scope: "干式变压器、母线槽、开关柜、高低压电缆整批处置",
    method: "现场清点 → 铭牌登记 → 分类评估 → 分类清运 → 过磅结算 → 票据交付。提供资产处置档案，便于企业财务与审计留痕。",
  },
  {
    industry: "物业 / 园区 · 配电房改造",
    typical: "住宅小区、产业园区、写字楼配电室",
    scope: "S 系列油浸变压器、低压配电柜、控制电缆、计量设备",
    method: "支持业委会 / 物业方现场监督，过磅清单当场签字；油浸变压器内残油由我们的危废合作渠道合规处置并留存联单。",
  },
  {
    industry: "电气工程 / 工地余料",
    typical: "电气施工方、安装公司、电缆经销库存",
    scope: "工地剩余 YJV / KVV / 工地剪头线、库存积压电缆",
    method: "微信发铭牌图与卷数即可初步评估；批量上门提货，现场核对规格、重量与装车条件后结算。",
  },
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
  // 滚到 footer 时隐藏右下/底部悬浮 CTA，避免遮挡公司地址与备案信息
  const footerRef = useRef(null);
  const [hideFloating, setHideFloating] = useState(false);
  useEffect(() => {
    if (!footerRef.current) return;
    const obs = new IntersectionObserver(([entry]) => setHideFloating(entry.isIntersecting), { rootMargin: "0px 0px -40% 0px" });
    obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;

    const id = decodeURIComponent(window.location.hash.slice(1));
    const scrollToHashTarget = () => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    };

    const frame = window.requestAnimationFrame(scrollToHashTarget);
    const timer = window.setTimeout(scrollToHashTarget, 120);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen scroll-smooth bg-zinc-950 pb-20 text-white selection:bg-amber-300 selection:text-zinc-950 lg:pb-0">

      {/* ── 导航 ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div>
            <div className="text-sm font-semibold tracking-widest text-zinc-100 sm:text-base">新兴电力设备</div>
            <div className="mt-0.5 text-[10px] tracking-wide text-zinc-500">安徽及长三角 · 废旧电缆与变压器专业团队</div>
          </div>
          <nav className="hidden items-center gap-6 text-xs font-medium tracking-wider text-zinc-400 lg:flex" aria-label="主导航">
            {[
              ["电缆回收","/cable-recycling/", true],
              ["变压器","/transformer-recycling/", true],
              ["工厂拆除","/factory-demolition/", true],
              ["报价","#price", false],
              ["案例","#cases", false],
              ["FAQ","#faq", false],
              ["联系","#contact", false],
            ].map(([label, href, isSubPage]) => (
              <a key={href} href={href} className="inline-flex items-center gap-1 transition hover:text-zinc-100">
                {label}
                {isSubPage && (
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-2.5 w-2.5 opacity-50">
                    <path d="M3 9 9 3M5 3h4v4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </a>
            ))}
          </nav>
          <a href={PHONE_TEL} className="shrink-0 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold tracking-wider text-amber-300 transition hover:bg-amber-400/20">
            {PHONE}
          </a>
        </div>
        {/* 移动端 tab */}
        <div className="border-t border-white/[0.06] px-4 py-2.5 lg:hidden">
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {[
              ["电缆回收","/cable-recycling/", true],
              ["变压器","/transformer-recycling/", true],
              ["工厂拆除","/factory-demolition/", true],
              ["报价","#price", false],
              ["案例","#cases", false],
              ["FAQ","#faq", false],
              ["联系","#contact", false],
            ].map(([label, href, isSubPage]) => (
              <a key={href} href={href} className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] ${isSubPage ? "border-amber-400/25 bg-amber-400/[0.06] text-amber-300" : "border-white/10 bg-white/5 text-zinc-300"}`}>
                {label}
                {isSubPage && (
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-2.5 w-2.5 opacity-70">
                    <path d="M3 9 9 3M5 3h4v4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </a>
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
                安徽重点城市 + 长三角覆盖 · 上门评估
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">废旧电缆回收</span>
                <br />
                二手变压器买卖
                <br />
                <span className="text-zinc-300 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">安徽 · 上门服务</span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                新兴电力设备以安徽为重点，承接安徽及长三角地区废旧电缆回收、二手变压器回收与出售、工厂拆除设备整体处理。<strong className="text-zinc-300">报价依据清楚 · 现场过磅结算 · 提供正规票据</strong>。
              </p>

              {/* 信任小徽章 */}
              <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-zinc-400">
                {["✓ 免费上门评估","✓ 当日响应","✓ 现场结算","✓ 正规单据"].map(x => (
                  <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{x}</span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={PHONE_TEL} className="group inline-flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-400/25 transition hover:-translate-y-0.5 hover:shadow-amber-400/40">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-8.284 0-15-6.716-15-15V3.5Z" clipRule="evenodd"/>
                  </svg>
                  立即免费报价 · {PHONE}
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="#price" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white">
                  查看价格指南
                </a>
              </div>

              {/* 业务点 — 替代之前的数据带，数据统一放下方信任带，避免重复 */}
              <div className="mt-10 flex flex-wrap gap-2 border-t border-white/8 pt-6">
                {["铜芯 / 铝芯电缆", "10kV / 35kV 高压", "S 系列油浸变压器", "SCB 系列干变", "GGD / KYN28 开关柜", "整厂打包"].map(t => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-400">{t}</span>
                ))}
              </div>
            </div>

            {/* 右：实景图卡片 */}
            <div className="relative mt-12 lg:mt-0">
              {/* 装饰光晕 */}
              <div className="absolute -inset-4 rounded-[3rem] bg-amber-400/5 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
                <img
                  src="/image/新兴电力回收-铜芯电缆盘矩阵.webp"
                  alt="安徽及长三角专业废旧电缆回收——铜芯电缆盘规模化堆场"
                  width="1600" height="1000"
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
                    <div className="mt-0.5 text-xs font-semibold text-zinc-200">合肥 · 芜湖 · 马鞍山 · 滁州 · 铜陵 · 安庆…</div>
                  </div>
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-950/60 px-4 py-3 backdrop-blur-xl">
                    <div className="text-[10px] text-emerald-400">服务时段</div>
                    <div className="mt-0.5 text-xs font-semibold text-emerald-300">每日 08:00–20:00</div>
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

        {/* ── 信任数据带 ── */}
        <section aria-label="服务承诺" className="border-y border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.06] md:grid-cols-4">
              {trustStats.map((s) => (
                <div key={s.head} className="flex flex-col gap-1.5 bg-zinc-950 p-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black tracking-tight text-white">{s.head}</span>
                    <span className="text-xs font-bold text-amber-400">· {s.sub}</span>
                  </div>
                  <div className="text-[11px] leading-5 text-zinc-500">{s.label}</div>
                </div>
              ))}
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
              <a
                key={svc.num}
                href={svc.href || "#contact"}
                aria-label={`${svc.title} · 查看详情`}
                className={`group relative block bg-zinc-950 p-7 transition hover:bg-zinc-900/80 ${i === 0 ? "rounded-tl-[2rem]" : ""} ${i === 1 ? "rounded-tr-[2rem]" : ""} ${i === 2 ? "rounded-bl-[2rem]" : ""} ${i === 3 ? "rounded-br-[2rem]" : ""}`}>
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
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 lg:opacity-60 lg:group-hover:opacity-100 transition">
                  查看详情
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/>
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── 报价指南（SEO长尾） ── */}
        <section id="price" className="scroll-mt-28 border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Quote Factors</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">报价看哪些因素</h2>
              </div>
              <p className="text-sm leading-7 text-zinc-400">
                电缆和设备回收没有统一固定单价，主要看材质、规格、重量、成色、拆卸清运难度和当日行情。
                下方列出常见品类的评估重点，方便您提前判断需要准备哪些信息。
                <br className="hidden md:block"/>
                拍照发微信 <span className="text-amber-300">{WECHAT}</span>，结合具体规格、数量与位置，可先给出初步报价范围。
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {priceGuide.map((g) => (
                <div key={g.cat} className="rounded-[1.75rem] border border-white/8 bg-zinc-950/60 p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <h3 className="text-lg font-bold text-white">{g.cat}</h3>
                  </div>
                  <div className="space-y-3">
                    {g.items.map((it) => (
                      <div key={it.name} className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="text-sm font-semibold text-zinc-100">{it.name}</div>
                          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-zinc-400">{it.spec}</span>
                        </div>
                        <div className="mt-2.5 rounded-md border border-amber-400/15 bg-amber-400/[0.04] px-3 py-2">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/70">评估重点</div>
                          <div className="mt-0.5 text-[12.5px] leading-5 text-amber-200">{it.formula}</div>
                        </div>
                        <div className="mt-2 text-xs leading-6 text-zinc-500">{it.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/[0.04] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm leading-6 text-zinc-300">
                <strong className="text-amber-300">免费获取精准报价：</strong>发送铭牌照片与数量，专人 10 分钟内回复。
              </div>
              <a href={PHONE_TEL} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-zinc-950 transition hover:-translate-y-0.5">
                立即获取报价 →
              </a>
            </div>
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
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">覆盖安徽<br/>及长三角主要城市</h2>
              <p className="mt-5 text-sm leading-7 text-zinc-400">
                服务范围以安徽为重点，覆盖合肥、芜湖、马鞍山、滁州、铜陵、安庆、宣城、蚌埠、淮南、六安、池州、阜阳等城市，同时承接上海、江苏、浙江主要工业区项目。
              </p>
              <a href={PHONE_TEL} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/10 hover:text-white">
                来电确认服务城市
              </a>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-5">
              {regions.map((r) => (
                <a
                  key={r.slug}
                  href={`/${r.slug}/`}
                  aria-label={`${r.name}废旧电缆与二手变压器回收`}
                  className="group relative flex items-center justify-center gap-1.5 rounded-xl border border-white/8 bg-white/[0.02] py-3 text-center text-xs font-semibold text-zinc-300 transition hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-amber-400/[0.06] hover:text-amber-300">
                  {r.name}
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 opacity-0 transition group-hover:opacity-100">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd"/>
                  </svg>
                </a>
              ))}
              <a
                href="#contact"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-amber-400/30 bg-amber-400/[0.04] py-3 text-center text-xs font-semibold text-amber-300 transition hover:bg-amber-400/10">
                其他城市 →
              </a>
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
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Work Types</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">作业类型示意</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-zinc-500">
              下列为我们日常承接的作业类型示意——电缆堆场、配电柜拆解、变压器回收等。上门时欢迎参观我司堆场与过磅设备核实作业能力。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g, idx) => (
              <a
                key={g.src}
                href={g.src}
                target="_blank"
                rel="noopener"
                aria-label={`查看大图：${g.label}`}
                className="group relative block overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
                <figure className="contents">
                  <img
                    src={g.src}
                    alt={`新兴电力设备 · ${g.label}`}
                    loading="lazy"
                    className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                  {/* 点击放大提示 */}
                  <div className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950/70 text-amber-300 opacity-0 backdrop-blur transition group-hover:opacity-100">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 3.218 9.964l3.659 3.659a.75.75 0 1 0 1.06-1.06l-3.659-3.66A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Zm4-2.25a.75.75 0 0 1 .75.75v.75h.75a.75.75 0 0 1 0 1.5h-.75v.75a.75.75 0 0 1-1.5 0v-.75h-.75a.75.75 0 0 1 0-1.5h.75V7.5A.75.75 0 0 1 9 6.75Z" clipRule="evenodd"/></svg>
                  </div>
                  <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4">
                    <span className="text-sm font-semibold text-zinc-100">{g.label}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">类型示意</span>
                  </figcaption>
                </figure>
              </a>
            ))}
          </div>
        </section>

        {/* ── 行业服务说明 ── */}
        <section id="testimonials" className="scroll-mt-28 border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Service Patterns</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">不同行业的服务方式</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
                按常见服务对象整理三类场景，方便您快速判断我们是否覆盖您的项目。
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {serviceSegments.map((s, i) => (
                <article key={s.industry} className="group relative flex h-full flex-col rounded-[1.5rem] border border-white/8 bg-zinc-950/60 p-7 transition hover:border-amber-400/20">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold tracking-wider text-zinc-400">0{i + 1}</span>
                    <span className="text-[11px] font-semibold tracking-wider text-amber-400/80">服务对象</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold leading-snug text-white">{s.industry}</h3>
                  <div className="mt-3 space-y-2.5 text-xs leading-6 text-zinc-400">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">典型客户</div>
                      <div className="text-zinc-300">{s.typical}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">处置范围</div>
                      <div className="text-zinc-300">{s.scope}</div>
                    </div>
                  </div>
                  <div className="mt-5 flex-1 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs leading-6 text-zinc-400">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/70">处置方式</div>
                    <div className="mt-1 text-zinc-300">{s.method}</div>
                  </div>
                </article>
              ))}
            </div>
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
        <section id="faq" className="relative scroll-mt-28 overflow-hidden border-y border-white/[0.06]">
          {/* 晨雾铁塔背景 */}
          <div className="pointer-events-none absolute inset-0">
            <img
              src="/image/新兴电力回收-晨雾铁塔.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover opacity-[0.12]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/80 to-zinc-950/95" />
          </div>
          <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
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

                {/* 公司地址 */}
                <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-amber-400">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M9.69 18.933.18 14.65a.5.5 0 0 1-.18-.385V3.65a.5.5 0 0 1 .315-.464L9.815.117a.5.5 0 0 1 .37 0l9.5 3.069A.5.5 0 0 1 20 3.65v10.615a.5.5 0 0 1-.18.385l-9.51 4.283a.5.5 0 0 1-.62 0ZM10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-zinc-500">公司地址</div>
                      <div className="mt-0.5 text-sm font-semibold text-zinc-200">上海市嘉定区鹤望路365弄</div>
                      <div className="mt-2 text-[11px] leading-5 text-zinc-500">
                        安徽及长三角全境上门看货，欢迎实地考察堆场与过磅设备
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/8 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
                {/* 微信二维码 */}
                <div id="wechat-qr" className="scroll-mt-28 mb-6 flex items-center gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                  <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white">
                    <img
                      src="/image/wechat-qr.png"
                      alt="新兴电力设备 微信二维码"
                      width="112" height="112"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling.style.display = "flex"; }}
                      className="h-full w-full object-contain"
                    />
                    <div style={{display:"none"}} className="absolute inset-0 flex-col items-center justify-center bg-zinc-100 p-2 text-center text-[10px] leading-4 text-zinc-500">
                      二维码待上传<br/>public/image/<br/>wechat-qr.png
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">扫码加微信</div>
                    <div className="mt-0.5 text-base font-bold text-zinc-100">{WECHAT}</div>
                    <div className="mt-2 text-[11px] leading-5 text-zinc-500">
                      发送铭牌图 / 现场图<br/>
                      <span className="text-amber-300">10 分钟内回复</span>初步报价
                    </div>
                  </div>
                </div>

                <div className="text-sm font-semibold text-zinc-300 mb-4">业务咨询范围</div>
                <ul className="space-y-2.5">
                  {[
                    "废旧电缆回收报价（铜芯 / 铝芯 / 高压）",
                    "二手变压器收购（油浸式 / 干式）",
                    "二手变压器出售与参数对接",
                    "工厂搬迁 / 配电房整体设备处理",
                    "安徽及长三角主要城市上门评估",
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

      {/* 桌面端：右下悬浮双 CTA（滚到 footer 自动隐藏） */}
      <div className={`fixed bottom-7 right-7 z-50 hidden flex-col gap-3 transition-opacity duration-300 lg:flex ${hideFloating ? "pointer-events-none opacity-0" : "opacity-100"}`}>
        <a href="#wechat-qr" aria-label="微信咨询 · 跳到二维码"
          className="group flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/15 px-5 py-3 text-sm font-bold text-green-300 backdrop-blur transition hover:-translate-y-0.5 hover:bg-green-500/25">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z"/>
          </svg>
          微信咨询
        </a>
        <a href={PHONE_TEL} aria-label="一键电话咨询"
          className="flex items-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 shadow-2xl shadow-amber-400/30 transition hover:-translate-y-0.5">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-8.284 0-15-6.716-15-15V3.5Z" clipRule="evenodd"/>
          </svg>
          一键电话咨询
        </a>
      </div>

      {/* 移动端：底部双 CTA 栏（滚到 footer 自动隐藏） */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-zinc-950/90 backdrop-blur-xl transition-transform duration-300 lg:hidden ${hideFloating ? "translate-y-full" : "translate-y-0"}`}>
        <div className="grid grid-cols-2 gap-2 p-3" style={{paddingBottom:"max(12px,env(safe-area-inset-bottom))"}}>
          <a href={PHONE_TEL} className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-400/25">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-8.284 0-15-6.716-15-15V3.5Z" clipRule="evenodd"/>
            </svg>
            立即电话
          </a>
          <a href="#wechat-qr" className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-zinc-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-green-400">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z"/>
            </svg>
            微信咨询
          </a>
        </div>
      </div>

      {/* ── 页脚 ── */}
      <footer ref={footerRef} className="border-t border-white/[0.06] bg-zinc-950">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <div className="text-sm font-semibold text-zinc-200">新兴电力设备</div>
              <p className="mt-3 text-xs leading-6 text-zinc-500">安徽及长三角专业废旧电缆回收与二手变压器回收出售服务商</p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">主营业务</div>
              <ul className="space-y-2 text-xs leading-6 text-zinc-500">
                {[
                  ["废旧电缆回收","/cable-recycling/"],
                  ["二手变压器回收","/transformer-recycling/"],
                  ["二手变压器出售","/transformer-recycling/"],
                  ["工厂拆除设备处理","/factory-demolition/"],
                ].map(([t,h]) => (
                  <li key={t}><a href={h} className="transition hover:text-amber-300">{t}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">回收指南</div>
              <ul className="space-y-2 text-xs leading-6 text-zinc-500">
                {[
                  ["电缆价格怎么算","/guides/cable-recycling-price/"],
                  ["变压器估价资料","/guides/transformer-recycling-checklist/"],
                  ["配电房拆除流程","/guides/factory-demolition-process/"],
                ].map(([t,h]) => (
                  <li key={t}><a href={h} className="transition hover:text-amber-300">{t}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">服务城市</div>
              <p className="text-xs leading-6 text-zinc-500">
                {regions.map((r, i) => (
                  <span key={r.slug}>
                    <a href={`/${r.slug}/`} className="transition hover:text-amber-300">{r.name}</a>
                    {i < regions.length - 1 && <span className="text-zinc-700"> · </span>}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">联系我们</div>
              <ul className="space-y-2 text-xs leading-6 text-zinc-500">
                <li>电话：{PHONE}</li>
                <li>微信：{WECHAT}</li>
                <li>官网：www.xinxingdianlis.com</li>
                <li>服务时段：08:00 – 20:00</li>
                <li className="pt-2 border-t border-white/[0.04] mt-2">地址：上海市嘉定区鹤望路365弄</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-[11px] text-zinc-700 sm:flex-row sm:justify-between">
            <div>© 2026 新兴电力设备 · 安徽及长三角废旧电缆与二手变压器回收</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

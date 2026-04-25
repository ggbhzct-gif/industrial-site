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
  { icon: "↑", title: "高价回收", desc: "参照当日铜价与二手市场行情，给出同类最具竞争力报价。" },
  { icon: "◎", title: "上门评估", desc: "全程免费上门，专业人员现场核查铭牌、型号与数量。" },
  { icon: "⚡", title: "当日响应", desc: "7×12h 咨询接待，确认信息后最快当日安排上门排期。" },
  { icon: "✓", title: "手续合规", desc: "提供正规交接单据与收据，资产处置流程合规，方便财务做账。" },
  { icon: "🏙", title: "区域覆盖", desc: "长三角及安徽多城市均有服务网络，就近安排上门评估。" },
  { icon: "💬", title: "微信图片沟通", desc: "发送铭牌图与实景图，快速预判价值，省去往返成本。" },
];

const regions = [
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
  { name: "合肥",   slug: "hefei"     },
  { name: "芜湖",   slug: "wuhu"      },
  { name: "马鞍山", slug: "maanshan"  },
  { name: "滁州",   slug: "chuzhou"   },
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
    alt: "废旧电缆高价回收——电缆盘回收现场称重结算",
    badge: "电缆回收",
    title: "废旧电缆高价回收对接",
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
  { q: "废旧电缆回收价格怎么算？一米多少钱？", a: "废旧电缆回收按重量结算而非长度，价格主要取决于铜/铝芯含量、线径、屏蔽结构及当日长江有色铜价（Cu1 现货）。以 YJV 3×95+1×50 铜芯电缆为例，每米净铜约 3.4kg，按当日铜价再根据回收系数折算。我们提供免费上门称重 + 现场出价，价格透明不压价。" },
  { q: "二手变压器回收需要提供哪些信息？", a: "建议提前拍摄变压器铭牌照片（含型号、容量、电压、生产厂家、出厂日期）、外观实景图及台数，通过微信或电话发给我们。我们会根据品牌、容量、使用年限、外观状态快速给出初步收购意向，支持上门看货确认最终价格。" },
  { q: "服务范围覆盖哪些城市？", a: "主要覆盖长三角地区及安徽省，包括上海、苏州、昆山、无锡、常州、南京、杭州、宁波、嘉兴、湖州，以及安徽省合肥、芜湖、马鞍山、滁州等主要城市均可上门服务。非核心城市的整厂拆除项目也可来电协商。" },
  { q: "工厂搬迁设备处理多久可以上门？", a: "电话或微信沟通需求并发送设备图片后，我们通常可在 1–3 个工作日内安排上门评估；急单可优先协调，根据项目规模灵活排期。长三角核心区域最快 24 小时内到场。" },
  { q: "支持油浸式和干式变压器回收吗？", a: "支持。我们回收 S9/S11/S13/SCB10/SCB13 等油浸式与干式变压器，及配套开关柜（GGD、GCK、KYN28）、配电柜、母线槽等配电设备，无论单台还是整套配电房均可咨询，不限规模。" },
  { q: "铜芯电缆与铝芯电缆回收价差大吗？", a: "差距较大。铜芯按净铜重量 × 当日铜价 × 回收系数结算，铝芯按净铝重量 × 当日铝价 × 回收系数结算。目前铜价约为铝价的 3–4 倍，且铜芯电缆外护套、钢带铠装等附件也会影响净含金属量，建议现场称重评估更准确。" },
  { q: "回收过程是否开具正规单据？", a: "会。我们提供正规回收交接单、过磅单、收据/发票（根据客户需求类型开具），资产处置流程合规，方便企业财务做账及内部审计留痕。大宗业务可签订正式合同。" },
  { q: "高压电缆（10kV / 35kV）也回收吗？", a: "回收。YJV22、YJLV22 等 10kV/35kV 交联聚乙烯高压电缆是我们的主要回收品类之一。由于截面大、铜含量高，回收单价相对较好，工程剩余、改造拆除的新旧高压电缆都可处理。" },
  { q: "工厂整体拆除，除了电缆变压器还能处理什么？", a: "整厂拆除业务中，我们可一并处理配电柜/开关柜、母线槽、电机、水泵、控制柜、UPS 等电气设备，以及部分金属结构件。可打包评估报价，一站式完成场地腾退。" },
  { q: "如何防止被低价收购？", a: "建议：1) 同时咨询 2–3 家回收方对比报价；2) 要求对方说明计价公式（铜/铝价 × 系数）；3) 过磅时到场监督；4) 查看对方是否具备再生资源经营资质。我们报价公式完全透明，欢迎对比。" },
];

/* 信任数据带 */
const trustStats = [
  { val: "11", unit: "年", label: "行业经验" },
  { val: "528", unit: "家", label: "合作企业" },
  { val: "3,247", unit: "吨", label: "累计回收" },
  { val: "24", unit: "h",  label: "最快响应" },
];

/* 价格参考指南（SEO 长尾内容；区间随市场波动每月更新） */
const priceGuide = [
  {
    cat: "废旧电缆",
    items: [
      { name: "铜芯电力电缆 YJV",     spec: "3×95+1×50 及以上",   price: "¥56,000–62,000 / 吨", note: "按净铜重量 × 当日长江有色铜价 × 回收系数" },
      { name: "铝芯电力电缆 YJLV",    spec: "3×120+1×70 及以上",  price: "¥14,000–17,000 / 吨", note: "按净铝重量 × 当日铝价 × 回收系数" },
      { name: "高压交联电缆 YJV22",   spec: "10kV / 35kV",          price: "¥58,000–65,000 / 吨", note: "截面大、铜含量高，单价相对优于普通低压电缆" },
      { name: "控制电缆 KVV",         spec: "多芯控制线",            price: "¥42,000–52,000 / 吨", note: "按铜芯折算，外护套与钢带重量剔除" },
    ],
  },
  {
    cat: "二手变压器",
    items: [
      { name: "油浸式变压器 S11/S13",    spec: "315–2500kVA",                    price: "¥6,000–28,000 / 台", note: "按品牌、容量、年限、外观综合评估" },
      { name: "干式变压器 SCB10/SCB13",  spec: "400–2000kVA",                    price: "¥8,000–32,000 / 台", note: "绕组完整、铭牌清晰、近 5 年内出厂者估价更高" },
      { name: "箱式变电站",              spec: "户外整套",                        price: "¥30,000 起 / 套",     note: "可连箱体整体回收，亦可拆分评估" },
      { name: "开关柜 / 配电柜",         spec: "GGD / GCK / KYN28 / MNS",        price: "¥1,500–5,000 / 面",   note: "按柜体数量、铜排截面、断路器品牌配置估价" },
    ],
  },
];

/* 企业资质与保障（图片放 public/image/cert/，命名见 img 字段；未替换前显示占位） */
const credentials = [
  { title: "营业执照",        desc: "合法工商注册主体，可对公结算",        img: "/image/cert/营业执照.jpg" },
  { title: "再生资源经营备案", desc: "资质齐全，规范处置，合规票据",        img: "/image/cert/再生资源备案.jpg" },
  { title: "道路运输许可",    desc: "自有车辆，大宗设备安全转运",          img: "/image/cert/运输许可.jpg" },
  { title: "场地与过磅设备",  desc: "固定堆场 + 地磅，全程可视化",         img: "/image/cert/过磅地磅.jpg" },
];

/* 客户评价（带日期 + 规格 + 体量，便于客户判断是否同类项目） */
const testimonials = [
  {
    name: "王经理",
    role: "苏州工业园区 · 某机械制造厂 设备部",
    project: "2025.09 整厂搬迁",
    spec: "3 台 SCB10-1000kVA 干变 + 800m YJV22 10kV 高压电缆",
    text: "找了三家对比，他们计价公式现场写在纸上，铜价系数全公开。48 小时内完成评估清运，过磅单当场签字，财务对账没卡壳。",
  },
  {
    name: "陈主任",
    role: "上海闵行 · 某住宅小区物业管理处",
    project: "2025.08 配电改造",
    spec: "2 台 S11-630kVA 油浸变压器 + GGD 低压配电柜 6 面",
    text: "小区设备更新拆下来一批老变压器，发了铭牌照片当天就给了价。来车带过磅器现场称重，业委会监督全程，发票合规。",
  },
  {
    name: "李工",
    role: "无锡新吴区 · 某电气工程承包商",
    project: "2025.10 工地余料",
    spec: "YJV 3×95+1×50 铜芯电缆约 2.3 吨 + 控制电缆若干",
    text: "工地经常有边角料，微信发照片 10 分钟就有初步价。这次称重 2,310kg，按当日铜价系数算下来比上一家高了 4,200 块，长期合作。",
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
  return (
    <div className="min-h-screen scroll-smooth bg-zinc-950 pb-20 text-white selection:bg-amber-300 selection:text-zinc-950 lg:pb-0">

      {/* ── 导航 ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div>
            <div className="text-sm font-semibold tracking-widest text-zinc-100 sm:text-base">新兴电力设备</div>
            <div className="mt-0.5 text-[10px] tracking-wide text-zinc-500">长三角及安徽 · 废旧电缆与变压器专业团队</div>
          </div>
          <nav className="hidden items-center gap-6 text-xs font-medium tracking-wider text-zinc-400 lg:flex" aria-label="主导航">
            {[
              ["电缆回收","/cable-recycling/"],
              ["变压器","/transformer-recycling/"],
              ["工厂拆除","/factory-demolition/"],
              ["报价","#price"],
              ["案例","#cases"],
              ["资质","#credentials"],
              ["FAQ","#faq"],
              ["联系","#contact"],
            ].map(([label, href]) => (
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
            {[
              ["电缆回收","/cable-recycling/"],
              ["变压器","/transformer-recycling/"],
              ["工厂拆除","/factory-demolition/"],
              ["报价","#price"],
              ["案例","#cases"],
              ["资质","#credentials"],
              ["FAQ","#faq"],
              ["联系","#contact"],
            ].map(([label, href]) => (
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
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">废旧电缆回收</span>
                <br />
                二手变压器买卖
                <br />
                <span className="text-zinc-400 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">长三角 · 上门服务</span>
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                新兴电力设备专注长三角及安徽地区废旧电缆高价回收、二手变压器回收与出售、工厂拆除设备整体处理。<strong className="text-zinc-300">上门评估 · 当日响应 · 现场结算</strong>。
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

              {/* 数据亮点 */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/8 pt-8">
                {[
                  { val: "11", unit: "年", label: "行业经验" },
                  { val: "14", unit: "城", label: "服务覆盖" },
                  { val: "24", unit: "h", label: "最快上门" },
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
                  src="/image/新兴电力回收-铜芯电缆盘矩阵.webp"
                  alt="长三角及安徽专业废旧电缆回收——铜芯电缆盘规模化堆场"
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

        {/* ── 信任数据带 ── */}
        <section aria-label="服务数据" className="border-y border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid grid-cols-2 divide-x divide-white/[0.06] md:grid-cols-4">
              {trustStats.map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center gap-1 py-7 text-center">
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-3xl font-black tracking-tight text-white sm:text-4xl">{s.val}</span>
                    <span className="text-sm font-bold text-amber-400">{s.unit}</span>
                  </div>
                  <div className="text-[11px] tracking-widest text-zinc-500">{s.label}</div>
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

        {/* ── 价格指南（SEO长尾） ── */}
        <section id="price" className="scroll-mt-28 border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Price Guide</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">回收价格参考指南</h2>
              </div>
              <p className="text-sm leading-7 text-zinc-400">
                下表为废旧电缆与二手变压器的常见品类参考价区间（<span className="text-zinc-200">2025 Q4 长三角市场行情</span>），实际价格以<strong className="text-zinc-200">当日铜/铝现货行情</strong>、设备状态、数量与物流条件综合评估为准。
                <br className="hidden md:block"/>
                <strong className="text-zinc-200">建议：</strong>拍照发微信 <span className="text-amber-300">{WECHAT}</span>，10 分钟内即可给出针对性报价。
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
                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-base font-bold tracking-tight text-amber-300">{it.price}</span>
                          <span className="text-[10px] text-zinc-600">参考</span>
                        </div>
                        <div className="mt-1.5 text-xs leading-6 text-zinc-500">{it.note}</div>
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
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">覆盖长三角<br/>及安徽主要城市</h2>
              <p className="mt-5 text-sm leading-7 text-zinc-400">
                服务范围涵盖上海全市、江苏省、浙江省主要城市及安徽省核心城市。其他区域可来电确认可行性。
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
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Field Photos</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">真实作业现场</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-zinc-500">
              现场实拍：电缆堆场、配电柜拆解、变压器回收——所见即所得，拒绝美化。
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
                    {idx === 0 && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400/80">现场实拍</span>
                    )}
                  </figcaption>
                </figure>
              </a>
            ))}
          </div>
        </section>

        {/* ── 客户评价 ── */}
        <section id="testimonials" className="scroll-mt-28 border-y border-white/[0.06] bg-white/[0.015]">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
            <div className="mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Clients Say</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">合作企业真实反馈</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">来自长三角机械制造、物业管理、电气工程等不同行业客户的真实评价。</p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.name} className="group relative flex h-full flex-col rounded-[1.5rem] border border-white/8 bg-zinc-950/60 p-7 transition hover:border-amber-400/20">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">{t.project}</span>
                  </div>
                  <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-[11px] leading-5 text-zinc-400">
                    <span className="text-zinc-500">项目体量：</span>{t.spec}
                  </div>
                  <svg viewBox="0 0 32 24" fill="currentColor" className="mt-5 h-6 w-6 text-amber-400/40">
                    <path d="M0 24V12C0 5.373 5.373 0 12 0v4c-4.418 0-8 3.582-8 8h8v12H0Zm20 0V12c0-6.627 5.373-12 12-12v4c-4.418 0-8 3.582-8 8h8v12H20Z"/>
                  </svg>
                  <blockquote className="mt-3 flex-1 text-sm leading-7 text-zinc-300">{t.text}</blockquote>
                  <figcaption className="mt-6 border-t border-white/8 pt-4">
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="mt-0.5 text-xs text-zinc-500">{t.role}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 资质与保障 ── */}
        <section id="credentials" className="scroll-mt-28 mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          {/* 全幅变电站图带 */}
          <div className="relative mb-14 overflow-hidden rounded-[2rem] border border-white/10">
            <img
              src="/image/新兴电力回收-变电站夜景.webp"
              alt="新兴电力设备 · 合规再生资源回收企业 · 变电站夜景"
              loading="lazy"
              className="h-72 w-full object-cover sm:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl px-8 sm:px-14">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">Credentials</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">资质齐全<br/>合规回收</h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-zinc-300">
                  合法注册的再生资源回收企业，具备整厂设备处置所需完整资质，可对公结算、开具正规票据，合作流程清晰可追溯。
                </p>
                <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-zinc-950 transition hover:-translate-y-0.5">
                  索取资质复印件 →
                </a>
              </div>
            </div>
          </div>

          {/* 资质卡（带证照实拍） */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c, i) => (
              <a
                key={c.title}
                href={c.img}
                target="_blank"
                rel="noopener"
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-zinc-950 transition hover:border-amber-400/40">
                {/* 证照实拍占位 / 真实图 */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                  <img
                    src={c.img}
                    alt={`新兴电力设备 · ${c.title}`}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-[10px] tracking-widest text-zinc-600">
                    证照待上传
                  </div>
                  <div className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-amber-400/90 text-zinc-950">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5"><path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd"/></svg>
                  </div>
                  <span className="absolute left-3 top-3 z-10 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white backdrop-blur">{String(i + 1).padStart(2, "0")} / 04</span>
                </div>
                <div className="p-5">
                  <div className="text-sm font-bold text-white">{c.title}</div>
                  <p className="mt-1.5 text-xs leading-6 text-zinc-400">{c.desc}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-amber-400/80">点击查看大图 →</div>
                </div>
              </a>
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

                {/* 公司地址 + 静态地图 */}
                <div className="mt-6 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-amber-400">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path fillRule="evenodd" d="M9.69 18.933.18 14.65a.5.5 0 0 1-.18-.385V3.65a.5.5 0 0 1 .315-.464L9.815.117a.5.5 0 0 1 .37 0l9.5 3.069A.5.5 0 0 1 20 3.65v10.615a.5.5 0 0 1-.18.385l-9.51 4.283a.5.5 0 0 1-.62 0ZM10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-zinc-500">公司地址</div>
                      <div className="mt-0.5 text-sm font-semibold text-zinc-200">安徽省合肥市 XX 区 XX 路 XX 号 · 新兴电力设备回收堆场</div>
                      <div className="mt-2 text-[11px] leading-5 text-zinc-500">
                        长三角及安徽全境上门看货，欢迎实地考察堆场与过磅设备
                      </div>
                    </div>
                  </div>
                  {/* 静态地图（待替换：截图保存为 public/image/map.jpg） */}
                  <div className="mt-4 overflow-hidden rounded-xl border border-white/8">
                    <img
                      src="/image/map.jpg"
                      alt="新兴电力设备 公司位置"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling.style.display = "flex"; }}
                      className="h-40 w-full object-cover"
                    />
                    <div style={{display:"none"}} className="h-40 w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 text-[11px] text-zinc-600">
                      地图截图待上传 (public/image/map.jpg)
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/8 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-14">
                {/* 微信二维码 */}
                <div className="mb-6 flex items-center gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-5">
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

      {/* 桌面端：悬浮拨打 */}
      {/* 桌面端：右下悬浮双 CTA */}
      <div className="fixed bottom-7 right-7 z-50 hidden flex-col gap-3 lg:flex">
        <a href="#contact" aria-label="微信咨询"
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

      {/* 移动端：底部双 CTA 栏 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-zinc-950/90 backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-2 gap-2 p-3" style={{paddingBottom:"max(12px,env(safe-area-inset-bottom))"}}>
          <a href={PHONE_TEL} className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-amber-400/25">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 0 0 6.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 0 1 1.767-1.052l3.223.716A1.5 1.5 0 0 1 18 16.352V17.5a1.5 1.5 0 0 1-1.5 1.5H15c-8.284 0-15-6.716-15-15V3.5Z" clipRule="evenodd"/>
            </svg>
            立即电话
          </a>
          <a href="#contact" className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-zinc-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-green-400">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z"/>
            </svg>
            微信咨询
          </a>
        </div>
      </div>

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
                <li>服务时段：08:00 – 20:00</li>
                <li className="pt-2 border-t border-white/[0.04] mt-2">地址：安徽省合肥市 XX 区 XX 路 XX 号</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t border-white/[0.06] pt-6 text-[11px] text-zinc-700 sm:flex-row sm:justify-between">
            <div>© 2026 新兴电力设备 · 长三角及安徽废旧电缆与二手变压器专业回收</div>
            <div>
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="nofollow noopener" className="hover:text-zinc-500">皖ICP备XXXXXXXX号</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function IndustrialRecyclingLandingPage() {
  const services = [
    {
      title: "废旧电缆回收",
      desc: "面向工厂搬迁、园区改造、工地余料与配电房更新场景，提供电缆回收与现场评估服务。",
    },
    {
      title: "二手变压器回收",
      desc: "支持油浸式、干式及相关配电设备回收，适配企业设备升级与资产处理需求。",
    },
    {
      title: "二手变压器出售",
      desc: "提供多规格二手变压器展示与对接服务，支持参数确认、现场看货与区域配送沟通。",
    },
    {
      title: "工厂拆除设备处理",
      desc: "覆盖工厂搬迁、车间清退、配电房拆改等场景，帮助客户更高效完成设备处置。",
    },
  ];

  const stats = [
    { value: "长三角 + 安徽", label: "服务区域" },
    { value: "4 大核心业务", label: "展示方向" },
    { value: "7×12h", label: "咨询响应" },
    { value: "现场图/参数/流程", label: "沟通方式" },
  ];

  const regions = [
    "上海",
    "苏州",
    "昆山",
    "无锡",
    "常州",
    "南京",
    "杭州",
    "宁波",
    "嘉兴",
    "湖州",
    "合肥",
    "芜湖",
    "马鞍山",
    "滁州",
  ];

  const process = [
    "电话或微信沟通需求",
    "发送设备图片 / 铭牌 / 数量信息",
    "初步评估与场景判断",
    "安排现场看货或进一步对接",
    "确认方案并推进后续处理",
  ];

  const cases = [
    {
      title: "工厂配电房设备处理",
      desc: "适用于工厂搬迁、车间产线调整、园区设备更新等项目场景。",
    },
    {
      title: "废旧电缆回收对接",
      desc: "支持工地余料、库存电缆、拆除下来的铜芯与高压电缆等业务咨询。",
    },
    {
      title: "二手变压器展示与流通",
      desc: "围绕容量、型号、状态与使用场景进行展示和沟通。",
    },
  ];

  return (
    <div className="min-h-screen scroll-smooth bg-zinc-950 text-white selection:bg-amber-300 selection:text-zinc-950">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <div className="truncate text-base font-semibold tracking-[0.18em] text-zinc-200 sm:text-lg">
              CX INDUSTRIAL
            </div>
            <div className="mt-1 text-[11px] text-zinc-500 sm:text-xs">
              长三角及安徽 · 电缆与变压器业务展示
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 lg:flex">
            <a href="#services" className="transition hover:text-white">业务</a>
            <a href="#regions" className="transition hover:text-white">区域</a>
            <a href="#cases" className="transition hover:text-white">场景</a>
            <a href="#contact" className="transition hover:text-white">联系</a>
          </nav>

          <a
            href="tel:13800000000"
            className="shrink-0 rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-2 text-xs font-medium text-amber-300 transition hover:bg-amber-400/20 sm:px-4 sm:text-sm"
          >
            电话咨询
          </a>
        </div>

        <div className="border-t border-white/10 px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1 text-xs text-zinc-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <a href="#services" className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10">业务</a>
            <a href="#regions" className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10">区域</a>
            <a href="#cases" className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10">场景</a>
            <a href="#contact" className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10">联系</a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.16),transparent_28%),radial-gradient(circle_at_left,rgba(255,255,255,0.08),transparent_18%)]" />
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-16 md:gap-12 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="relative z-10">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-zinc-300 sm:text-xs">
                Industrial Recycling Showcase
              </div>
              <h1 className="mt-6 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                长三角及安徽
                <span className="mt-2 block text-amber-300">废旧电缆与二手变压器业务展示站</span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8 md:text-lg">
                适用于电缆回收、二手变压器回收与出售、工厂拆除设备处理等业务展示场景。先上线门头，再逐步扩展城市页、业务页与 SEO 页面。
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  href="tel:13800000000"
                  className="rounded-2xl bg-amber-400 px-6 py-3 text-center text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-400/20 transition hover:-translate-y-0.5"
                >
                  立即电话咨询
                </a>
                <a
                  href="#contact"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  查看联系方式
                </a>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-4">
                {stats.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-base font-semibold text-white sm:text-lg">{item.value}</div>
                    <div className="mt-1 text-[11px] text-zinc-400 sm:text-xs">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex items-center">
              <div className="w-full rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 shadow-2xl shadow-black/30 sm:p-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-zinc-950 p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-sm text-zinc-400">业务概览</div>
                      <div className="truncate text-lg font-semibold text-white sm:text-xl">展示型官网首页</div>
                    </div>
                    <div className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] text-emerald-300 sm:text-xs">
                      在线展示
                    </div>
                  </div>
                  <div className="grid gap-4">
                    {services.slice(0, 3).map((service) => (
                      <div key={service.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="text-sm font-semibold text-white">{service.title}</div>
                        <div className="mt-2 text-sm leading-7 text-zinc-400">{service.desc}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-7 text-amber-100">
                    建议把真实设备图、装车图、铭牌图替换进去。这个区域可以直接换成你的现场照片轮播。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-sm uppercase tracking-[0.2em] text-amber-300">Core Services</div>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">主营业务展示</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
              第一版网站建议先把业务说清楚，不必先上复杂功能。先让客户看懂你做什么、服务哪里、怎么联系你。
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <div key={service.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 text-sm font-semibold text-amber-300">
                  0{index + 1}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="regions" className="scroll-mt-28 border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-amber-300">Service Regions</div>
                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">覆盖长三角及安徽主要城市</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                  第一阶段先把区域说清楚，后面再逐步扩成单独的城市页，比如“苏州废旧电缆回收”“合肥二手变压器回收”等页面。
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {regions.map((region) => (
                  <div key={region} className="rounded-2xl border border-white/10 bg-zinc-900/70 px-4 py-4 text-center text-sm text-zinc-200">
                    {region}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="cases" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="text-sm uppercase tracking-[0.2em] text-amber-300">Business Scenarios</div>
              <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">适配场景与展示模块</h2>
            </div>
            <div className="text-sm leading-7 text-zinc-400 md:max-w-xl">
              你后面可以把这里替换成真实案例、现场实拍、设备清单、装车记录、工厂搬迁项目等内容。
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {cases.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-900/80">
                <div className="h-44 bg-[linear-gradient(135deg,rgba(245,158,11,0.18),rgba(255,255,255,0.04))] sm:h-48" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-b from-zinc-950 to-zinc-900">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-amber-300">Process</div>
                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">咨询与沟通流程</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                  展示站不用先做复杂询价系统，把电话、微信、流程和业务边界写清楚，转化会更直接。
                </p>
              </div>
              <div className="space-y-4">
                {process.map((step, idx) => (
                  <div key={step} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-sm font-semibold text-zinc-950">
                      {idx + 1}
                    </div>
                    <div className="pt-1 text-sm leading-7 text-zinc-300">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]">
            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-6 sm:p-8 md:p-10 lg:p-12">
                <div className="text-sm uppercase tracking-[0.2em] text-amber-300">Contact</div>
                <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">欢迎来电或微信沟通</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                  把你的真实电话、微信、公司名、现场图替换进去，这个网站就能先上线作为第一版展示站。后面我再带你继续加 SEO 页面。
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <a href="tel:13800000000" className="rounded-2xl bg-amber-400 px-6 py-3 text-center text-sm font-semibold text-zinc-950">
                    电话：138-0000-0000
                  </a>
                  <div className="rounded-2xl border border-white/10 bg-zinc-900 px-6 py-3 text-center text-sm text-zinc-200">
                    微信：your_wechat_id
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 bg-zinc-950/70 p-6 sm:p-8 md:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <div className="rounded-[1.5rem] border border-white/10 bg-zinc-900 p-6">
                  <div className="text-sm text-zinc-400">建议替换内容</div>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
                    <li>• 公司名 / 品牌名</li>
                    <li>• 联系电话 / 微信</li>
                    <li>• 真实设备图 / 现场图</li>
                    <li>• 服务城市</li>
                    <li>• 主打业务与案例</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <a
        href="tel:13800000000"
        className="fixed bottom-4 right-4 z-50 rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-xl shadow-black/30 transition hover:-translate-y-0.5 sm:bottom-6 sm:right-6"
      >
        一键电话咨询
      </a>

      <footer className="border-t border-white/10 bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-zinc-500 sm:px-6 sm:text-sm md:flex-row md:items-center md:justify-between lg:px-8">
          <div>© 2026 CX INDUSTRIAL. All rights reserved.</div>
          <div>纯展示网站第一版 · 后续可扩展 SEO 城市页 / 业务页 / 案例页</div>
        </div>
      </footer>
    </div>
  );
}

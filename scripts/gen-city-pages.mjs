/**
 * 站点静态落地页生成器
 *
 * 输出：
 *   public/<slug>/index.html × 14                    城市落地页
 *   public/cable-recycling/index.html                业务中枢：废旧电缆回收
 *   public/transformer-recycling/index.html          业务中枢：二手变压器回收
 *   public/factory-demolition/index.html             业务中枢：工厂拆除设备处理
 *   public/sitemap.xml                               18 URL
 *
 * 关键词矩阵：业务（3） × 城市（14） + 首页
 * 城市页 ↔ 业务页 双向互链，构建 SEO hub-and-spoke 结构。
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

/* ═══ 城市数据（含本地产业语境，用于提升内容独特性）═══ */
const CITIES = [
  { slug:"shanghai",  name:"上海",   prov:"上海市", geo:"CN-31",
    areas:["浦东新区","松江区","嘉定区","青浦区","奉贤区","金山区","宝山区","闵行区"],
    context:"上海是中国最大的工业与外贸港口城市，覆盖临港、张江、漕河泾、金桥、松江 G60 等多个国家级产业园区，集成电路、新能源汽车、大型装备制造对高低压配电设备的更换频次极高。上海老厂房改造、产线升级、外资企业搬迁带来大量废旧电缆、二手变压器、开关柜处置需求。",
    landmark:"临港产业区、张江科学城、金桥出口加工区",
    caseNote:"上海典型场景：汽车零部件 / 集成电路 / 大型装备制造工厂的产线升级、外资工厂搬迁，常见处置对象为油浸式变压器、YJV 铜芯电缆、低压配电柜整批回收。" },
  { slug:"suzhou",    name:"苏州",   prov:"江苏省", geo:"CN-32",
    areas:["工业园区","高新区","相城区","吴中区","吴江区","常熟","张家港","太仓"],
    context:"苏州工业园区、昆山、张家港、常熟、太仓一带聚集了电子信息、光伏、生物医药、精密机械等制造业集群，外资工厂密度居全国前列。产线更新周期短、设备迭代快，使得苏州全域废旧电缆、干式/油浸变压器、配电柜处置量长期位居长三角前列。",
    landmark:"苏州工业园区（SIP）、苏州高新区、吴江汾湖高新区",
    caseNote:"苏州典型场景：电子信息 / 光伏 / 精密机械 / 生物医药工厂的整厂搬迁、产线技改，常见处置对象为 SCB 干式变压器、铜芯电缆、GGD 低压开关柜整批评估。" },
  { slug:"kunshan",   name:"昆山",   prov:"江苏省", geo:"CN-32",
    areas:["花桥","陆家","玉山","张浦","周市","千灯","锦溪"],
    context:"昆山以电子信息、精密模具、笔记本电脑代工闻名，花桥、陆家、玉山、张浦等镇工业园区高度密集，工厂电气设备以 SCB 系列干式变压器、GCK/GCS 开关柜为主，技改与搬迁需求频繁。",
    landmark:"花桥经济开发区、昆山高新区、昆山开发区",
    caseNote:"昆山典型场景：电子信息 / 笔记本代工 / 精密模具厂的扩产或技改，常见处置对象为 SCB 系列干式变压器、GCK / GCS 低压开关柜、控制电缆。" },
  { slug:"wuxi",      name:"无锡",   prov:"江苏省", geo:"CN-32",
    areas:["滨湖区","惠山区","锡山区","梁溪区","新吴区","江阴","宜兴"],
    context:"无锡是长三角北翼重要制造业城市，江阴、宜兴两地拥有大量纺织、特钢、电线电缆、化工企业。无锡新吴区集成电路与物联网产业带动配电设备升级；江阴沿江重工区则是大型变压器、高压电缆集中处置区域。",
    landmark:"无锡高新区（新吴区）、江阴高新区、宜兴经济开发区",
    caseNote:"无锡典型场景：江阴特钢、宜兴电缆、新吴集成电路企业的变电站改造，常见处置对象为大容量油浸变压器、YJV22 10kV 高压电缆、高压开关柜。" },
  { slug:"changzhou", name:"常州",   prov:"江苏省", geo:"CN-32",
    areas:["武进区","新北区","天宁区","钟楼区","金坛","溧阳"],
    context:"常州以动力电池、新能源汽车、装备制造为支柱产业，武进国家高新区、常州国家高新区（新北）聚集大量电气/机械工厂。动力电池工厂产线扩建带来大量干式变压器、母线槽、配电柜更新。",
    landmark:"常州国家高新区、武进高新区、溧阳动力电池产业园",
    caseNote:"常州典型场景：动力电池 / 新能源汽车 / 装备制造工厂的产线扩建，常见处置对象为 SCB13 干式变压器、母线槽、低压配电柜、铜芯电缆。" },
  { slug:"nanjing",   name:"南京",   prov:"江苏省", geo:"CN-32",
    areas:["江宁区","浦口区","六合区","溧水区","高淳区","栖霞区","雨花台区"],
    context:"南京石化、钢铁、汽车、电子四大支柱产业带动大型电气设备长期处置需求，江宁、浦口、六合板块工厂密集，老工业区配电房拆改与整厂搬迁频繁。",
    landmark:"南京江宁开发区、南京化工园（六合）、南京浦口经开区",
    caseNote:"南京典型场景：石化 / 钢铁 / 汽车 / 大型电子工厂的变电所改造、配电房整体拆改，常见处置对象为大容量油浸变压器、35kV 高压电缆、KYN28 高压开关柜。" },
  { slug:"hangzhou",  name:"杭州",   prov:"浙江省", geo:"CN-33",
    areas:["萧山区","余杭区","临平区","临安区","富阳区","钱塘区","滨江区"],
    context:"杭州数字经济、高端装备、生物医药产业带动工业园区持续扩张。钱塘新区、萧山经济技术开发区、余杭良渚数字经济产业园为变压器、配电柜、电缆集中处置片区。",
    landmark:"钱塘新区、萧山临空经济示范区、余杭数字经济产业园",
    caseNote:"杭州典型场景：数据中心扩容、数字经济产业园配套工程、生物医药工厂技改，常见处置对象为 SCB 干式变压器、低压配电柜、铜芯电力电缆。" },
  { slug:"ningbo",    name:"宁波",   prov:"浙江省", geo:"CN-33",
    areas:["鄞州区","镇海区","北仑区","奉化区","慈溪","余姚","象山"],
    context:"宁波是长三角南翼重化工与港口城市，北仑临港、镇海炼化、慈溪小家电、余姚模具等产业集群对高压变压器、35kV/10kV 高压电缆需求与处置量大。",
    landmark:"宁波北仑经开区、镇海工业区、慈溪经济开发区",
    caseNote:"宁波典型场景：港口机械 / 重化工 / 小家电 / 模具行业的设备升级，常见处置对象为 10kV / 35kV 高压电缆、油浸式变压器、大容量开关柜。" },
  { slug:"jiaxing",   name:"嘉兴",   prov:"浙江省", geo:"CN-33",
    areas:["秀洲区","南湖区","平湖","海宁","桐乡","嘉善","海盐"],
    context:"嘉兴地处长三角几何中心，嘉善、平湖、海宁、桐乡皆为强县经济，装备制造、纺织印染、光伏新能源工厂密布，配电设备处置与二手变压器流通活跃。",
    landmark:"嘉善经济技术开发区、平湖经济技术开发区、桐乡经济开发区",
    caseNote:"嘉兴典型场景：光伏 / 装备制造 / 纺织印染工厂的设备扩产或老旧更换，可同时承接二手变压器调配（用于扩产采购）与老变压器回收。" },
  { slug:"huzhou",    name:"湖州",   prov:"浙江省", geo:"CN-33",
    areas:["吴兴区","南浔区","长兴","德清","安吉"],
    context:"湖州长兴、德清、南浔、安吉板块以绿色家居、新能源电池、高端装备制造见长。工厂技改与腾笼换鸟政策带动大量老旧配电设备、铜芯电缆集中处置。",
    landmark:"长兴经济技术开发区、德清高新区、南浔经济开发区",
    caseNote:"湖州典型场景：新能源电池 / 绿色家居 / 高端装备工厂的整厂退出、腾笼换鸟改造，常见处置对象为干式变压器、铜芯电缆、低压配电柜。" },
  { slug:"hefei",     name:"合肥",   prov:"安徽省", geo:"CN-34",
    areas:["瑶海区","庐阳区","蜀山区","包河区","肥东","肥西","长丰","巢湖"],
    context:"合肥新桥科学城、合肥高新区、经开区聚集新型显示、集成电路、新能源汽车（蔚来、大众、比亚迪）、家电四大产业集群。大量新建/扩建工厂与老厂搬迁，带动合肥全域废旧电缆、二手变压器处置市场快速扩张。",
    landmark:"合肥高新区、合肥经开区、新桥科学城（蜀山区）、下塘（长丰）新能源汽车基地",
    caseNote:"合肥典型场景：新型显示 / 集成电路 / 新能源汽车（蔚来 / 大众 / 比亚迪配套）/ 家电工厂的新建扩建，常见处置对象为 SCB 干式变压器、铜芯电力电缆、配电柜。" },
  { slug:"wuhu",      name:"芜湖",   prov:"安徽省", geo:"CN-34",
    areas:["镜湖区","弋江区","鸠江区","三山区","无为","繁昌","南陵"],
    context:"芜湖是安徽工业重镇，奇瑞汽车、海螺水泥、机器人及智能装备产业园推动变压器、开关柜、母线槽的持续流转。无为、繁昌老工业基地配电房拆改需求稳定。",
    landmark:"芜湖经济技术开发区、三山经济开发区、奇瑞汽车产业园",
    caseNote:"芜湖典型场景：汽车（奇瑞配套）/ 智能装备 / 机器人产业园工厂的产线调整与配电房升级，常见处置对象为油浸变压器、铜 / 铝芯电缆、低压开关柜。" },
  { slug:"maanshan",  name:"马鞍山", prov:"安徽省", geo:"CN-34",
    areas:["雨山区","花山区","博望区","含山","和县","当涂"],
    context:"马鞍山作为长三角南翼重要重工基地，马钢、郑蒲港物流、博望机床产业集群对高压变压器、10kV/35kV 电缆、大容量开关柜需求长期稳定，老设备处置量大。",
    landmark:"马鞍山经济技术开发区、郑蒲港新区、博望高端装备制造产业园",
    caseNote:"当涂某机械制造集团变电站升级，整批回收 S9 油浸变压器 4 台 + 高压电缆约 1.2 公里。" },
  { slug:"chuzhou",   name:"滁州",   prov:"安徽省", geo:"CN-34",
    areas:["琅琊区","南谯区","天长","明光","来安","全椒","定远","凤阳"],
    context:"滁州紧邻南京，是长三角产业转移承接重镇。天长仪表电缆产业、来安汊河轨道交通装备、全椒家电配套带动工厂电气设备频繁更换，二手变压器采购与老设备回收需求并存。",
    landmark:"滁州经济技术开发区、天长经济开发区、来安汊河轨道交通装备产业园",
    caseNote:"来安汊河某轨交装备厂变电所扩建，本司调配 SCB10-1600kVA 干式变压器 2 台，并回收旧 S9 变压器 1 台。" },
  { slug:"anhui",     name:"安徽",   prov:"安徽省", geo:"CN-34",
    areas:["合肥","芜湖","马鞍山","滁州","铜陵","安庆","宣城","蚌埠","淮南","六安","池州","阜阳"],
    context:"安徽承接长三角制造业转移，合肥新能源汽车与新型显示、芜湖汽车与机器人、马鞍山钢铁重工、滁州家电与轨交装备、铜陵有色金属、安庆化工与装备制造等产业带形成稳定的电力设备更新需求。新兴电力设备以安徽为重点服务区域，承接废旧电缆、二手变压器、开关柜、配电柜、整厂拆除设备处理等项目。",
    landmark:"合肥经开区、合肥高新区、芜湖经开区、马鞍山经开区、滁州经开区、铜陵经开区",
    caseNote:"安徽典型场景：工厂扩产、园区搬迁、配电房改造、老厂腾退，常见处置对象为 SCB 干式变压器、S11/S13 油浸式变压器、铜芯电缆、铝芯电缆、高低压开关柜。" },
  { slug:"tongling",  name:"铜陵",   prov:"安徽省", geo:"CN-34",
    areas:["铜官区","义安区","郊区","枞阳","铜陵经开区","狮子山高新区"],
    context:"铜陵是安徽重要有色金属与化工基地，铜冶炼、电子材料、装备制造、港口物流企业集中，厂区改造与设备更新会产生大量高低压电缆、变压器、配电柜和电机水泵处置需求。",
    landmark:"铜陵经济技术开发区、狮子山高新区、义安经济开发区",
    caseNote:"铜陵典型场景：有色金属、化工、电子材料企业配电系统改造，常见回收品类为铜芯电缆、油浸式变压器、KYN28 高压柜和低压配电柜。" },
  { slug:"anqing",   name:"安庆",   prov:"安徽省", geo:"CN-34",
    areas:["迎江区","大观区","宜秀区","怀宁","桐城","潜山","太湖","望江"],
    context:"安庆石化、汽车零部件、纺织服装和装备制造产业基础较强，老厂区技改、化工园区更新、县域工业园扩建带来废旧电缆、二手变压器和配电房拆改需求。",
    landmark:"安庆经开区、安庆高新区、桐城经开区、怀宁经开区",
    caseNote:"安庆典型场景：化工、汽配、纺织和装备制造企业的配电房升级，常见处置对象为油浸变压器、铝芯电缆、铜芯动力电缆和开关柜。" },
  { slug:"xuancheng", name:"宣城",   prov:"安徽省", geo:"CN-34",
    areas:["宣州区","郎溪","广德","宁国","泾县","绩溪","旌德"],
    context:"宣城承接苏浙沪产业转移，宁国汽车零部件、广德电子电路、郎溪装备制造、宣州工业园区企业密集，产线扩建与厂房腾退时电缆、变压器、开关柜处置需求明显。",
    landmark:"宣城经开区、广德经开区、宁国经开区、郎溪经开区",
    caseNote:"宣城典型场景：汽车零部件、电子电路、装备制造企业的生产线调整，常见回收品类为 SCB 干式变压器、控制电缆、铜芯电力电缆和低压配电柜。" },
  { slug:"bengbu",   name:"蚌埠",   prov:"安徽省", geo:"CN-34",
    areas:["龙子湖区","蚌山区","禹会区","淮上区","怀远","五河","固镇"],
    context:"蚌埠玻璃新材料、电子信息、生物化工、装备制造产业持续发展，工业园区老旧配电设施更新、厂房搬迁和设备清退会产生二手变压器、电缆、配电柜打包处置需求。",
    landmark:"蚌埠高新区、蚌埠经开区、怀远经开区、固镇经开区",
    caseNote:"蚌埠典型场景：玻璃新材料、电子信息、装备制造工厂配电房改造，常见处置对象为油浸式变压器、低压柜、铜铝芯电缆。" },
  { slug:"huainan",  name:"淮南",   prov:"安徽省", geo:"CN-34",
    areas:["田家庵区","大通区","谢家集区","八公山区","潘集区","凤台","寿县"],
    context:"淮南能源、电力、煤化工和新材料产业集中，矿区、化工园区、老工业厂房更新时，常见大容量变压器、高压电缆、开关柜和电机水泵等电气设备处置项目。",
    landmark:"淮南经开区、潘集煤化工园区、寿县新桥产业园",
    caseNote:"淮南典型场景：能源化工、矿区配套、园区厂房升级，常见回收品类为 10kV 高压电缆、油浸式变压器、高低压开关柜。" },
  { slug:"luan",     name:"六安",   prov:"安徽省", geo:"CN-34",
    areas:["金安区","裕安区","叶集区","霍山","舒城","金寨","霍邱"],
    context:"六安装备制造、电子信息、新能源、绿色食品加工产业发展较快，霍山、舒城、金寨等县域工业园扩建与搬迁时，常见电缆、变压器、配电柜、电机水泵回收需求。",
    landmark:"六安经开区、金安经开区、舒城经开区、金寨现代产业园",
    caseNote:"六安典型场景：县域工业园扩建、老厂区改造、生产线搬迁，常见处置对象为干式变压器、铝芯电缆、低压配电柜和电机水泵。" },
  { slug:"chizhou",  name:"池州",   prov:"安徽省", geo:"CN-34",
    areas:["贵池区","东至","石台","青阳","江南产业集中区","池州经开区"],
    context:"池州新材料、非金属矿深加工、装备制造和江南产业集中区持续承接长三角项目，园区建设与老厂改造带来配电设备、废旧电缆、变压器回收需求。",
    landmark:"池州经开区、江南新兴产业集中区、东至经开区",
    caseNote:"池州典型场景：新材料、矿物加工、装备制造企业的配电系统更新，常见回收品类为铜芯电缆、油浸式变压器、配电柜和母线槽。" },
  { slug:"fuyang",   name:"阜阳",   prov:"安徽省", geo:"CN-34",
    areas:["颍州区","颍东区","颍泉区","临泉","太和","阜南","颍上","界首"],
    context:"阜阳农产品加工、装备制造、新能源材料、医药化工等产业园区加速发展，厂房新建扩容、老设备退役和园区搬迁会形成电缆、变压器、开关柜回收需求。",
    landmark:"阜阳经开区、阜合产业园、界首高新区、太和经开区",
    caseNote:"阜阳典型场景：园区工厂扩建、老厂退租、配电容量升级，常见处置对象为干式变压器、低压配电柜、铜铝芯电缆。" },
];

const ANHUI_FOCUS_SLUGS = new Set([
  "anhui","hefei","wuhu","maanshan","chuzhou","tongling","anqing",
  "xuancheng","bengbu","huainan","luan","chizhou","fuyang",
]);
const priorityCities = (items = CITIES) => [
  ...items.filter(c => ANHUI_FOCUS_SLUGS.has(c.slug)),
  ...items.filter(c => !ANHUI_FOCUS_SLUGS.has(c.slug)),
];

/* ═══ 3 大业务（用于业务中枢页）═══ */
const SERVICES_HUB = [
  {
    slug: "cable-recycling",
    name: "废旧电缆回收",
    kicker: "Cable Recycling",
    title: "安徽废旧电缆回收（合肥芜湖马鞍山滁州）· 铜芯 / 铝芯 / 高压电缆 | 新兴电力设备",
    h1html: "<em>废旧电缆</em>回收<br/>铜芯 · 铝芯 · 高压电缆",
    desc: "安徽及长三角区域废旧电缆上门评估结算：合肥、芜湖、马鞍山、滁州、铜陵、安庆等地铜芯 YJV / 铝芯 YJLV / 10kV·35kV 高压交联电缆 / 低压电力电缆 / 控制电缆 / 电机引出线。按材质、规格、重量、拆解难度和当日行情综合评估，现场过磅，正规单据。",
    kw: [
      "废旧电缆回收","废旧电缆回收价格","铜芯电缆回收","铝芯电缆回收","高压电缆回收",
      "YJV电缆回收","YJLV电缆回收","10kV电缆回收","35kV电缆回收","工地余料电缆回收",
      "库存电缆回收","控制电缆回收","电机引出线回收","废铜电缆价格",
    ],
    schemaType: "Service",
    sections: [
      {
        h2: "我们回收哪些电缆",
        lead: "按材质、电压等级、结构分类覆盖。工地余料、库存积压、拆除旧线一并可收。",
        grid: [
          ["铜芯电力电缆", "YJV、YJV22、VV、VV22 等铜芯电力电缆，重点看净铜重量、线径规格、护套与铠装情况。"],
          ["铝芯电力电缆", "YJLV、YJLV22、VLV 等铝芯电力电缆，重点看净铝重量、规格型号、成色与装车距离。"],
          ["高压交联电缆", "YJV22、YJLV22 的 10kV / 35kV 高压铜/铝芯电缆，截面大、铜含量高，单价较好。"],
          ["控制/电机线", "KVV、KVVP 控制电缆，电机引出线（橡胶护套、硅橡胶），逐卷评估。"],
          ["工地余料/库存", "工地剩余新电缆、过期库存电缆，按接近新线价折算，量大上门提货。"],
          ["拆除旧电缆", "变电站、厂房、地下管廊拆除废旧电缆，支持整批打包、现场剥皮或毛重收购。"],
        ],
      },
      {
        h2: "报价看哪些因素",
        lead: "不同规格差异较大，最终报价以现场核实的材质、重量、成色和清运条件为准。",
        grid: [
          ["铜芯电缆","看净铜重量、线径、护套/钢带情况、拆解难度和当日铜价"],
          ["铝芯电缆","看净铝重量、规格、成色、装车条件和当日铝价"],
          ["高压交联","看电压等级、截面、米数、是否带铠装及现场拆除条件"],
          ["未剥皮毛收","可按现场抽样、称重和拆解难度综合评估"],
        ],
      },
      {
        h2: "上门回收流程",
        lead: "5 步到账，最快当日完成。",
        grid: [
          ["1. 微信发图","拍摄铭牌/实物图 + 估重 → 微信发给我们"],
          ["2. 初步报价","10 分钟内给出价格区间，说明报价依据"],
          ["3. 上门看货","预约时间，核心区 24 小时内到场"],
          ["4. 过磅称重","现场过磅、复核规格、双方确认"],
          ["5. 当场结算","签回收单，现金 / 对公转账 / 开具单据"],
        ],
      },
    ],
    faq: [
      { q:"铜芯电缆与铝芯电缆回收价差大吗？", a:"差距较大。铜价约为铝价的 3–4 倍，同规格下铜芯电缆回收单价明显高于铝芯。建议将铜铝分拣后分别称重，价格更准确。" },
      { q:"高压 10kV/35kV 电缆也收吗？", a:"收。YJV22、YJLV22 这类交联聚乙烯高压电缆是主要品类，铜含量高、单价好，支持整批打包回收。" },
      { q:"工地剩余新电缆能按接近新线价回收吗？", a:"可以。未使用的工地余料、库存积压新电缆按接近新线价评估，远高于废线价格，具体看品牌、规格、是否原包装。" },
      { q:"是否必须剥皮？", a:"不强制。大批量可毛重按折算系数收购；小批量或需要更高单价可现场剥皮，双方确认净重后结算。" },
      { q:"回收过程开单据吗？", a:"开。提供正规回收交接单、过磅单、收据或发票，方便企业财务做账、资产处置合规留痕。" },
      { q:"覆盖哪些城市？", a:"以安徽为重点覆盖合肥、芜湖、马鞍山、滁州、铜陵、安庆、宣城、蚌埠、淮南、六安、池州、阜阳等城市，同时承接上海、苏州、无锡、南京、杭州、宁波等长三角项目。" },
    ],
  },
  {
    slug: "transformer-recycling",
    name: "二手变压器回收与出售",
    kicker: "Transformer",
    title: "二手变压器回收出售 · 油浸式 / 干式 / 箱式变压器（S9·S11·SCB10·SCB13）| 新兴电力设备",
    h1html: "<em>二手变压器</em>回收出售<br/>油浸 · 干式 · 箱变",
    desc: "安徽及长三角区域二手变压器回收与出售：合肥、芜湖、马鞍山、滁州、铜陵、安庆等地 S9/S11/S13 油浸式变压器、SCB10/SCB13 干式变压器、YB/ZGS 箱式变电站，10kV/35kV 电压等级，按品牌、容量、年限、状态评估，既可收购也可对接二手库存采购。",
    kw: [
      "二手变压器回收","二手变压器出售","二手变压器价格","油浸式变压器回收","干式变压器回收",
      "S9变压器回收","S11变压器回收","S13变压器回收","SCB10变压器","SCB13变压器",
      "箱式变压器回收","10kV变压器","35kV变压器","配电变压器回收",
    ],
    schemaType: "Service",
    sections: [
      {
        h2: "回收与出售的变压器品类",
        lead: "油浸、干式、箱式三大类主流容量段全覆盖。",
        grid: [
          ["S9 油浸式","能效较低但保有量大，315/500/630/800/1000kVA 常规段持续流转"],
          ["S11 / S13 油浸","节能型，10kV 配电变压器主力，容量 100kVA–2500kVA"],
          ["SCB10 干式","环氧树脂浇注，防火适用于室内，常规 400–1600kVA"],
          ["SCB13 / SCB14","更节能干式变压器，数据中心 / 工业园区 / 地下变电所常选"],
          ["YB / ZGS 箱变","预装式箱式变电站，适用于户外、工地、临时用电"],
          ["特殊容量","2500kVA 以上大容量、非标专用变压器，单独评估"],
        ],
      },
      {
        h2: "评估依据",
        lead: "价格由 5 个核心因素决定，透明可核。",
        grid: [
          ["品牌","正泰 / ABB / 西门子 / 特变电工 / 华鹏 等一线品牌溢价明显"],
          ["容量 & 电压","kVA 越大、电压等级越高（35kV > 10kV），价值越高"],
          ["年限","5 年内近新品接近二手市场价上限，10 年以上按残值评估"],
          ["状态","外观、油位、绝缘测试、历史运行记录影响估价"],
          ["配套","是否含基础、风机、温控器、中性点柜等附件"],
        ],
      },
      {
        h2: "出售：二手库存对接",
        lead: "本司常备部分 SCB10/S11 常规容量二手库存，支持企业应急采购。",
        grid: [
          ["适合场景","产线扩容、应急备机、低成本上电、临时工地"],
          ["验货流程","现场查看铭牌 / 绝缘耐压 / 历史检测报告"],
          ["质保","提供有限质保期限，支持上门安装调试对接"],
          ["运输","自有运输资源，安徽及长三角全域配送"],
        ],
      },
    ],
    faq: [
      { q:"二手变压器回收需要提供哪些信息？", a:"铭牌照片（型号、容量、电压、厂家、出厂日期）+ 外观实景图 + 台数 + 大致使用年限。我们会根据品牌、容量、年限、外观快速给出初步收购意向。" },
      { q:"回收与出售是同一主体吗？", a:"是。我们既收老设备也出二手库存，既能一站式处理企业退役设备，也能为扩产/应急的工厂对接合适容量的二手机。" },
      { q:"油浸式变压器油怎么处理？", a:"我们有正规危废油品处置渠道，变压器油合规处置并留存联单，企业无需担心环保合规问题。" },
      { q:"二手变压器买回去能直接用吗？", a:"需要做绝缘耐压、直阻、变比、空载短路等出厂测试，合格后方可上电。我们提供测试报告或支持第三方复测。" },
      { q:"SCB10 和 SCB13 哪个好？", a:"SCB13 比 SCB10 更节能（能效等级更高），新工程首选 SCB13，预算紧或非高耗能场景 SCB10 仍是主力选择。" },
      { q:"能提供过户 / 资产处置单据吗？", a:"能。大宗交易提供正规交接单、收据或发票，满足企业资产处置与财务记账合规要求。" },
    ],
  },
  {
    slug: "factory-demolition",
    name: "工厂拆除设备处理",
    kicker: "Factory Demolition",
    title: "工厂拆除设备处理 · 整厂搬迁 / 配电房拆改 / 车间清退一站式处置 | 新兴电力设备",
    h1html: "<em>工厂拆除</em>设备处理<br/>整厂搬迁 · 配电房拆改",
    desc: "安徽及长三角区域工厂拆除设备处理：整厂搬迁、车间清退、配电房拆改、生产线拆除的电气设备一站式回收与腾退。合肥、芜湖、马鞍山、滁州、铜陵、安庆等安徽工业城市可优先安排上门，变压器、开关柜、母线槽、电机水泵、控制柜、电缆线路打包评估，快速清场。",
    kw: [
      "工厂拆除","工厂拆除设备处理","整厂搬迁回收","配电房拆改","车间设备清退",
      "工厂腾退","开关柜回收","配电柜回收","母线槽回收","电机水泵回收",
      "整厂设备回收","生产线拆除","老厂房拆除","工业设备回收",
    ],
    schemaType: "Service",
    sections: [
      {
        h2: "我们接的项目类型",
        lead: "从单台设备到整厂腾退，灵活匹配。",
        grid: [
          ["整厂搬迁","工厂外迁、闭厂清退、园区腾笼换鸟，整体电气设备打包评估"],
          ["配电房拆改","用电扩容、设备更新、合规整改场景的配电房整体拆旧"],
          ["车间产线拆除","单条产线退役、车间整改的机电设备回收"],
          ["园区改造","老园区改造升级、产业转型中的旧设备集中处置"],
          ["政府/国企资产处置","合规流程、正规单据、资产流转档案留痕"],
          ["应急腾退","限期清场、事故后处置等急单，24 小时到场"],
        ],
      },
      {
        h2: "打包处置的主要设备",
        lead: "电气设备 + 金属物料一体化评估。",
        grid: [
          ["变压器","油浸 / 干式 / 箱变，单台或批量"],
          ["开关柜 / 配电柜","GGD、GCK、GCS、KYN28、XGN 等高低压柜"],
          ["母线槽","密集型母线、空气型母线，含分接箱"],
          ["电缆线路","高压 / 低压 / 控制电缆 全部回收"],
          ["电机 / 水泵","Y系列 / YE3 / YE4 电机、水泵机组"],
          ["金属结构","电缆桥架、支架、铁件等辅助金属物料"],
        ],
      },
      {
        h2: "标准作业流程",
        lead: "安全、合规、可追溯——这是我们承接国企/外企项目的核心前提。",
        grid: [
          ["1. 项目踏勘","免费上门查看，列设备清单 + 出整体处置方案"],
          ["2. 分类估价","按回收 / 残值 / 报废三类分别评估，出具总价"],
          ["3. 安全拆除","专业班组持证作业，停电操作票、验电、接地规范"],
          ["4. 过磅装车","现场磅单、照片留档、影像可追溯"],
          ["5. 结算 & 单据","签交接单，对公转账，提供收据或发票"],
          ["6. 场地清理","场地清扫、垃圾清运，交付一个干净的空场地"],
        ],
      },
    ],
    faq: [
      { q:"工厂搬迁整体设备能一起处理吗？", a:"可以。我们一站式承接变压器、开关柜、母线槽、电机水泵、电缆线路、金属支架等全部电气与附属金属的打包评估与清场，长三角核心区最快 24 小时内到场。" },
      { q:"拆除施工是否有资质？", a:"有。作业团队持电工进网作业证、高空作业证等相关资质，严格执行停电操作票、验电、接地等安全流程。" },
      { q:"有大项目是否需要先签合同？", a:"需要。10 万元以上的项目建议签署正式回收 / 拆除合同，明确范围、价格、周期、安全、付款条款，降低双方风险。" },
      { q:"能提供处置单据用于资产审计吗？", a:"能。大宗项目提供过磅单、现场照片、交接清单、收据 / 发票、付款凭证全套档案，满足国企 / 上市公司资产处置审计要求。" },
      { q:"老厂房整体拆除也做吗？", a:"电气设备部分我们直接承接；土建拆除、厂房钢结构拆除我们有合作方对接，可出统一方案。" },
      { q:"政府招拍挂的资产处置可以参与吗？", a:"可以。我们有参与国企、园区资产处置的经验，支持正规招投标、合同、档案管理流程。" },
    ],
  },
];

/* ═══ SEO 指南页：承接百度长尾搜索，避免只靠首页与城市页抢词 ═══ */
const GUIDE_PAGES = [
  {
    slug: "guides/cable-recycling-price",
    title: "废旧电缆回收价格怎么算_铜芯铝芯电缆报价看哪些因素 | 新兴电力设备",
    h1: "废旧电缆回收价格怎么算",
    desc: "废旧电缆回收价格不能只按一米多少钱判断，主要看铜芯或铝芯材质、线径规格、实际重量、护套铠装、拆解难度和当日金属行情。",
    kw: ["废旧电缆回收价格","电缆回收多少钱一米","铜芯电缆回收价格","铝芯电缆回收价格","高压电缆回收报价"],
    service: "废旧电缆回收",
    serviceUrl: "/cable-recycling/",
    sections: [
      {
        h2: "为什么不能只问一米多少钱",
        lead: "同样是电缆，铜芯和铝芯、低压和高压、带不带铠装，价格差异都很大。只看长度容易误判，现场评估通常要结合重量和材质。",
        grid: [
          ["芯材差异", "铜芯和铝芯要分开评估，芯材不同会直接影响回收价值。"],
          ["线径规格", "截面越大、金属含量越高，通常越需要按实际重量核对。"],
          ["护套与铠装", "外护套、钢带、屏蔽层会影响净金属比例和拆解难度。"],
          ["现场条件", "楼层、装车距离、是否需要拆除和吊装，都会影响最终报价。"],
        ],
      },
      {
        h2: "发图报价需要准备什么",
        lead: "先发图能缩短沟通时间，也能避免电话里反复描述规格。",
        grid: [
          ["铭牌照片", "拍清型号、规格、电压等级、生产厂家等信息。"],
          ["现场照片", "拍清电缆盘、散线、桥架或管廊内的实际状态。"],
          ["数量估计", "提供大致米数、卷数或估重，便于判断是否需要整车上门。"],
          ["位置说明", "告知城市、园区、楼层和装车条件，方便核算清运成本。"],
        ],
      },
    ],
    faq: [
      { q: "废旧电缆是按米收还是按斤收？", a: "多数回收场景按重量和材质评估，而不是简单按米。长度只能辅助估算，最终仍建议现场称重确认。" },
      { q: "高压电缆和普通电缆报价一样吗？", a: "不一样。高压交联电缆通常要看电压等级、截面、铠装结构和实际重量，不能套用普通低压电缆报价。" },
      { q: "只有少量工地余料能上门吗？", a: "可以先发图确认数量和位置。量少可合并路线安排，量大可单独上门。" },
    ],
  },
  {
    slug: "guides/transformer-recycling-checklist",
    title: "二手变压器回收估价需要哪些资料_铭牌容量品牌年份 | 新兴电力设备",
    h1: "二手变压器回收估价需要哪些资料",
    desc: "二手变压器回收估价主要看铭牌、容量、品牌、出厂年份、外观状态、绕组完整度和历史运行资料。提前准备照片可更快获得初步报价。",
    kw: ["二手变压器回收估价","变压器回收需要什么资料","油浸式变压器回收","干式变压器回收","箱式变电站回收"],
    service: "二手变压器回收",
    serviceUrl: "/transformer-recycling/",
    sections: [
      {
        h2: "必须拍清的 4 类信息",
        lead: "变压器不是单纯按重量回收，设备能否再次流通、参数是否清晰，会明显影响评估结果。",
        grid: [
          ["铭牌", "型号、容量、电压等级、厂家、出厂日期要尽量拍清。"],
          ["整体外观", "拍正面、侧面、油箱或外壳、散热片、接线端子等位置。"],
          ["运行状态", "说明是否仍在运行、是否停用、是否有检测记录或维修记录。"],
          ["配套设备", "高低压柜、母线槽、电缆、箱体等是否一起处置。"],
        ],
      },
      {
        h2: "哪些情况需要现场看货",
        lead: "如果容量较大、数量较多或涉及整套配电房，建议直接预约现场评估。",
        grid: [
          ["铭牌缺失", "需要通过外观、尺寸、现场资料和配套设备综合判断。"],
          ["整套箱变", "可评估整套出售、拆分回收或打包清场三种方式。"],
          ["设备较新", "需判断能否作为二手设备流通，避免只按废料处理。"],
          ["企业资产处置", "可提供交接单、过磅单、收据或发票，便于财务留档。"],
        ],
      },
    ],
    faq: [
      { q: "没有铭牌的变压器还能回收吗？", a: "可以，但估价会更依赖现场看货和辅助资料。建议拍清外观、尺寸、接线端、容量线索和配套设备。" },
      { q: "油浸式和干式变压器都收吗？", a: "都可以评估。油浸式重点看容量、年份、油箱状态；干式重点看绕组完整度、绝缘状态和外观。" },
      { q: "可以回收后再购买二手变压器吗？", a: "可以。旧设备处置和二手设备采购可以一起对接，方便工厂改造或扩容。" },
    ],
  },
  {
    slug: "guides/factory-demolition-process",
    title: "工厂配电房拆除设备处理流程_清点断电过磅结算 | 新兴电力设备",
    h1: "工厂配电房拆除设备处理流程",
    desc: "工厂搬迁、配电房改造或车间清退时，电缆、变压器、开关柜、母线槽等设备可打包评估处理，流程包括清点、断电确认、拆除、装车、过磅和结算。",
    kw: ["工厂拆除设备处理","配电房拆除回收","工厂搬迁设备回收","开关柜回收","母线槽回收"],
    service: "工厂拆除设备处理",
    serviceUrl: "/factory-demolition/",
    sections: [
      {
        h2: "标准处理流程",
        lead: "大宗设备处置最重要的是范围清楚、现场安全、过磅透明和单据完整。",
        grid: [
          ["现场清点", "登记变压器、开关柜、配电柜、电缆、母线槽和电机水泵等设备。"],
          ["断电确认", "拆除前确认停电、验电、接地和现场安全边界。"],
          ["分类拆除", "按设备、线缆、铜铝金属和可流通部件分类处理。"],
          ["过磅结算", "装车前后核对重量和清单，企业可安排人员现场监督。"],
        ],
      },
      {
        h2: "企业需要提前确认的事项",
        lead: "提前准备现场资料，能缩短排期和报价时间。",
        grid: [
          ["处置范围", "明确哪些设备归回收方处理，哪些设备需保留。"],
          ["施工条件", "确认车辆进出、叉车吊装、楼层、电梯和装车距离。"],
          ["单据要求", "提前说明是否需要合同、过磅单、收据、发票或资产处置档案。"],
          ["时间窗口", "工厂不停产或园区限时施工时，要提前确定进场时间。"],
        ],
      },
    ],
    faq: [
      { q: "配电房整套设备可以一次处理吗？", a: "可以。变压器、开关柜、配电柜、母线槽、电缆线路可打包评估，按现场范围制定清运方案。" },
      { q: "拆除施工是否需要企业配合？", a: "需要确认停电、现场通行、设备归属和安全边界，具体拆除与清运由作业人员执行。" },
      { q: "能提供资产处置留档吗？", a: "可以根据企业要求提供交接清单、过磅单、现场照片、收据或发票等资料。" },
    ],
  },
];

/* ═══ 重点区县/园区二手变压器长尾页 ═══ */
const LOCAL_TRANSFORMER_PAGES = [
  {
    slug: "shanghai/jiading-transformer-recycling",
    citySlug: "shanghai",
    cityName: "上海",
    areaName: "嘉定",
    titleArea: "上海嘉定",
    areas: ["嘉定工业区", "安亭", "南翔", "马陆", "江桥", "外冈"],
    landmark: "嘉定工业区、安亭汽车产业基地、南翔智地",
    context: "嘉定聚集汽车零部件、智能制造、物流仓储和机械加工企业，工厂配电房改造、产线迁移和老旧设备更新时，经常需要处理油浸式变压器、干式变压器、箱式变电站和配套开关柜。",
  },
  {
    slug: "shanghai/songjiang-transformer-recycling",
    citySlug: "shanghai",
    cityName: "上海",
    areaName: "松江",
    titleArea: "上海松江",
    areas: ["松江 G60 科创走廊", "车墩", "泗泾", "九亭", "洞泾", "新桥"],
    landmark: "松江 G60 科创走廊、松江经济技术开发区",
    context: "松江 G60 科创走廊周边电子信息、装备制造和仓储物流企业密集，配电房更新、厂房改造和产线调整会产生二手变压器、配电柜、母线槽和废旧电缆处置需求。",
  },
  {
    slug: "shanghai/pudong-transformer-recycling",
    citySlug: "shanghai",
    cityName: "上海",
    areaName: "浦东",
    titleArea: "上海浦东",
    areas: ["金桥", "张江", "外高桥", "临港", "康桥", "周浦"],
    landmark: "金桥出口加工区、张江科学城、临港产业区",
    context: "浦东覆盖集成电路、生物医药、汽车制造和临港装备产业，企业扩产、设备退役和园区改造时，常见处置对象包括干式变压器、箱式变电站、KYN28 高压柜和铜芯电缆。",
  },
  {
    slug: "suzhou/industrial-park-transformer-recycling",
    citySlug: "suzhou",
    cityName: "苏州",
    areaName: "工业园区",
    titleArea: "苏州工业园区",
    areas: ["胜浦", "唯亭", "斜塘", "娄葑", "综合保税区", "生物医药产业园"],
    landmark: "苏州工业园区、综合保税区、生物医药产业园",
    context: "苏州工业园区外资企业、电子信息、生物医药和精密制造企业密集，厂房搬迁、设备更新和配电房改造会带来干式变压器、油浸式变压器、开关柜和电缆回收需求。",
  },
  {
    slug: "suzhou/high-tech-zone-transformer-recycling",
    citySlug: "suzhou",
    cityName: "苏州",
    areaName: "高新区",
    titleArea: "苏州高新区",
    areas: ["浒墅关", "狮山", "枫桥", "科技城", "通安", "东渚"],
    landmark: "苏州高新区、浒墅关经开区、苏州科技城",
    context: "苏州高新区装备制造、电子信息和研发生产企业集中，旧厂改造、配电容量升级和生产线调整时，可对二手变压器、配电柜、母线槽及旧电缆进行打包评估。",
  },
  {
    slug: "hefei/gaoxin-transformer-recycling",
    citySlug: "hefei",
    cityName: "合肥",
    areaName: "高新区",
    titleArea: "合肥高新区",
    areas: ["合肥高新区", "柏堰科技园", "南岗科技园", "蜀山经开区", "新桥科学城", "运河新城"],
    landmark: "合肥高新区、柏堰科技园、新桥科学城",
    context: "合肥高新区聚集新型显示、集成电路、智能制造和研发生产企业，工厂扩产、配电容量升级和实验线调整时，经常需要处理 SCB 干式变压器、油浸式变压器、箱变、配电柜和铜芯电缆。",
  },
  {
    slug: "hefei/economic-zone-transformer-recycling",
    citySlug: "hefei",
    cityName: "合肥",
    areaName: "经开区",
    titleArea: "合肥经开区",
    areas: ["合肥经开区", "肥西产城融合示范区", "桃花工业园", "始信路", "莲花路", "临湖"],
    landmark: "合肥经开区、肥西产城融合示范区、桃花工业园",
    context: "合肥经开区汽车、家电、新能源和装备制造企业集中，产线扩建、老厂改造、设备退役时，常见处置对象包括干式变压器、油浸式变压器、低压配电柜、母线槽和废旧电缆。",
  },
  {
    slug: "wuhu/economic-zone-transformer-recycling",
    citySlug: "wuhu",
    cityName: "芜湖",
    areaName: "经开区",
    titleArea: "芜湖经开区",
    areas: ["芜湖经开区", "鸠江开发区", "三山经开区", "弋江高新区", "奇瑞产业园", "无为经开区"],
    landmark: "芜湖经济技术开发区、奇瑞汽车产业园、三山经济开发区",
    context: "芜湖经开区汽车整车、零部件、机器人和智能装备企业密集，工厂配电房改造和设备更新时，可对变压器、开关柜、电缆、母线槽进行打包评估。",
  },
  {
    slug: "maanshan/dangtu-transformer-recycling",
    citySlug: "maanshan",
    cityName: "马鞍山",
    areaName: "当涂",
    titleArea: "马鞍山当涂",
    areas: ["当涂经开区", "太白镇", "姑孰镇", "博望高新区", "郑蒲港新区", "雨山经开区"],
    landmark: "当涂经济开发区、博望高端装备制造产业园、郑蒲港新区",
    context: "当涂、博望和郑蒲港板块机械加工、钢铁配套、港口物流企业较多，老厂搬迁、变电站升级和产线调整会产生大容量变压器、高压电缆、配电柜处置需求。",
  },
  {
    slug: "chuzhou/laian-transformer-recycling",
    citySlug: "chuzhou",
    cityName: "滁州",
    areaName: "来安",
    titleArea: "滁州来安",
    areas: ["来安汊河", "汊河经开区", "滁州经开区", "全椒经开区", "天长经开区", "南谯区"],
    landmark: "来安汊河轨道交通装备产业园、滁州经开区、全椒经开区",
    context: "滁州来安汊河承接南京都市圈制造项目，轨道交通装备、家电配套、电子加工企业集中，工厂退租、配电房改造时常见二手变压器、箱变、开关柜和电缆回收需求。",
  },
];

/* ═══ 通用 FAQ（3 条）+ 城市特有 FAQ（3 条）═══ */
const commonFaqs = [
  { q: "废旧电缆回收价格怎么算？",       a: "按材质、规格、重量、成色、拆卸清运难度和当日金属行情综合评估。铜芯与铝芯价格差异较大，建议拍照发微信，10 分钟内给出初步价格区间。" },
  { q: "二手变压器回收需要哪些信息？",   a: "铭牌照片（型号、容量、电压、厂家、出厂日期）+ 外观实景图 + 台数。根据品牌、容量、使用年限与外观状态给出初步收购意向。" },
  { q: "工厂搬迁整体设备能一起处理吗？", a: "可以。变压器、开关柜、母线槽、电机水泵、控制柜、电缆线路打包评估，一站式完成场地腾退，长三角核心区最快 24 小时内到场。" },
];
function cityLocalFaqs(c) {
  return [
    { q:`在${c.name}多久能安排上门？`,
      a:`${c.name}核心区（${c.areas.slice(0,3).join("、")}等）一般 24 小时内到场；${c.prov}周边县市 1–3 个工作日内到场。急单可电话沟通插单。` },
    // 修：避免 "苏州苏州工业园区" 这种 city × landmark 双重前缀（堆砌触发）
    { q:`${c.landmark||c.areas.slice(0,3).join("、")} 等区域都接单吗？`,
      a:`接。${c.areas.join("、")}均在日常服务范围内。${c.landmark?c.landmark+"等重点园区设有专项响应机制，":""}大项目可驻场对接。` },
    { q:`${c.name}本地有类似案例吗？`,
      a:`${c.caseNote}可作为同类项目流程参考，具体报价和清运安排以现场情况为准。` },
  ];
}

/* ═══ 共享 CSS ═══ */
const css = /* css */ `
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:#09090b;color:#fff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.wrap{max-width:1200px;margin:0 auto;padding:0 20px}
header{position:sticky;top:0;z-index:50;border-bottom:1px solid rgba(255,255,255,.06);background:rgba(9,9,11,.8);backdrop-filter:blur(16px)}
header .wrap{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;gap:16px}
.brand{font-weight:600;letter-spacing:.15em;flex-shrink:0}
.brand small{display:block;font-size:10px;color:#71717a;letter-spacing:.05em;margin-top:2px}
.hnav{display:none;gap:18px;font-size:13px;color:#a1a1aa}
.hnav a:hover{color:#fcd34d}
@media(min-width:1024px){.hnav{display:flex}}
.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:700;transition:transform .15s}
.btn:hover{transform:translateY(-1px)}
.btn-primary{background:#fbbf24;color:#09090b;box-shadow:0 10px 25px -5px rgba(251,191,36,.35)}
.btn-ghost{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#e4e4e7}
.hero{padding:80px 0 60px;background:radial-gradient(ellipse 80% 50% at 50% -20%,rgba(251,191,36,.12),transparent)}
.hero h1{font-size:clamp(32px,5vw,56px);font-weight:800;letter-spacing:-.02em;line-height:1.15;margin:16px 0 20px}
.hero h1 em{font-style:normal;background:linear-gradient(90deg,#fcd34d,#f59e0b);-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p{max-width:720px;font-size:15px;color:#a1a1aa;margin-bottom:20px}
.chip{display:inline-block;padding:4px 12px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);font-size:11px;color:#a1a1aa;margin:0 6px 6px 0}
.chip-amber{border-color:rgba(251,191,36,.3);background:rgba(251,191,36,.08);color:#fcd34d}
.ctas{display:flex;flex-wrap:wrap;gap:12px}
section{padding:70px 0;border-top:1px solid rgba(255,255,255,.06)}
h2{font-size:clamp(24px,3vw,36px);font-weight:700;letter-spacing:-.01em;margin:0 0 12px}
h2 + p.lead{color:#a1a1aa;font-size:14px;margin:0 0 32px;max-width:760px}
.kicker{font-size:11px;font-weight:600;color:#fbbf24;letter-spacing:.25em;text-transform:uppercase;margin-bottom:8px}
.grid{display:grid;gap:14px}
.grid-2{grid-template-columns:repeat(auto-fit,minmax(280px,1fr))}
.grid-3{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.grid-4{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
.card{padding:24px;border-radius:20px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);transition:border-color .2s,background .2s}
.card:hover{border-color:rgba(251,191,36,.25);background:rgba(251,191,36,.03)}
.card h3{margin:0 0 10px;font-size:17px;font-weight:700}
.card p{margin:0;color:#a1a1aa;font-size:13px;line-height:1.75}
.bigp{color:#d4d4d8;font-size:15px;line-height:1.9;max-width:860px;margin:0 0 24px}
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
.cross-links{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));margin-top:16px}
.cross-links a{display:block;padding:18px 20px;border-radius:16px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.02);transition:all .2s}
.cross-links a:hover{border-color:rgba(251,191,36,.3);background:rgba(251,191,36,.04)}
.cross-links b{display:block;color:#fcd34d;font-size:14px;margin-bottom:4px}
.cross-links span{color:#a1a1aa;font-size:12px}
footer{padding:40px 0;border-top:1px solid rgba(255,255,255,.06);color:#52525b;font-size:12px}
footer .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px}
.mobile-cta{display:none;position:fixed;bottom:0;left:0;right:0;z-index:50;padding:12px;background:rgba(9,9,11,.9);backdrop-filter:blur(16px);border-top:1px solid rgba(255,255,255,.1);gap:8px}
.mobile-cta a{flex:1;text-align:center;padding:12px;border-radius:10px;font-size:14px;font-weight:700}
body{padding-bottom:80px}
@media(min-width:1024px){.mobile-cta{display:none!important}body{padding-bottom:0}}
@media(max-width:1023px){.mobile-cta{display:flex}}
`;

/* ═══ 公用页头 / 页脚 ═══ */
const headerHtml = (activeSlug) => `
<header><div class="wrap">
  <a href="/" class="brand">新兴电力设备<small>安徽及长三角 · 电力设备与电缆回收</small></a>
  <nav class="hnav">
    <a href="/cable-recycling/" ${activeSlug==="cable-recycling"?'style="color:#fcd34d"':""}>废旧电缆</a>
    <a href="/transformer-recycling/" ${activeSlug==="transformer-recycling"?'style="color:#fcd34d"':""}>二手变压器</a>
    <a href="/factory-demolition/" ${activeSlug==="factory-demolition"?'style="color:#fcd34d"':""}>工厂拆除</a>
    <a href="#regions">服务城市</a>
    <a href="#faq">常见问题</a>
  </nav>
  <a href="${PHONE_TEL}" class="btn btn-primary">${PHONE}</a>
</div></header>`;

const mobileCtaHtml = `
<div class="mobile-cta">
  <a href="${PHONE_TEL}" class="btn-primary" style="background:#fbbf24;color:#09090b">📞 立即电话</a>
  <a href="/" class="btn-ghost" style="border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#e4e4e7">返回首页</a>
</div>`;

const footerHtml = () => `
<footer><div class="wrap">
  <div>© 2026 新兴电力设备 · 安徽及长三角废旧电缆与二手变压器专业回收</div>
  <div>官网：www.xinxingdianlis.com · 电话：${PHONE} · 微信：${WECHAT}</div>
  <div style="flex-basis:100%;display:flex;flex-wrap:wrap;gap:12px;margin-top:8px;color:#71717a;font-size:11px">
    <span>回收指南：</span>
    ${GUIDE_PAGES.map(g => `<a href="/${g.slug}/">${g.h1}</a>`).join("")}
  </div>
</div></footer>`;

/* ═══ 城市页渲染 ═══ */
function renderCity(c) {
  const title = `${c.name}废旧电缆回收_二手变压器回收出售_上门评估结算 | 新兴电力设备`;
  const desc  = `${c.name}废旧电缆回收、二手变压器回收与出售、工厂拆除设备处理。覆盖${c.areas.slice(0,4).join("、")}等${c.name}主要工业区，上门评估，现场过磅，清楚报价，电话${PHONE}。`;
  const kw    = [
    `${c.name}废旧电缆回收`, `${c.name}电缆回收价格`, `${c.name}二手变压器回收`, `${c.name}变压器回收出售`,
    `${c.name}废铜回收`, `${c.name}工厂设备处理`, `${c.name}配电房拆改`, `${c.name}高压电缆回收`,
    `${c.name}铜芯电缆回收`, `${c.name}油浸式变压器`, `${c.name}干式变压器`,
  ].join(",");
  const canonical = `${SITE}/${c.slug}/`;
  const otherCities = priorityCities(CITIES.filter(x => x.slug !== c.slug));
  // 去掉每条 FAQ 标题尾巴的 "（城市）" 后缀 —— 14 城重复同一标题反而被搜索引擎判堆砌；FAQ JSON-LD 内的城市信号靠 areaServed 即可
  const faqs = [...commonFaqs, ...cityLocalFaqs(c)];

  const ldLocalBusiness = {
    "@context":"https://schema.org","@type":"LocalBusiness",
    name:"新兴电力设备",url:canonical,telephone:PHONE,
    description:desc,
    image:`${SITE}/og-cover.jpg`,
    areaServed:{ "@type":"City", name:c.name, containedInPlace:{ "@type":"AdministrativeArea", name:c.prov } },
    address:{ "@type":"PostalAddress", addressCountry:"CN", addressRegion:c.prov, addressLocality:c.name },
    openingHours:"Mo-Su 08:00-20:00", priceRange:"$$",
  };
  const ldBreadcrumb = {
    "@context":"https://schema.org","@type":"BreadcrumbList",
    itemListElement:[
      {"@type":"ListItem",position:1,name:"首页",item:`${SITE}/`},
      {"@type":"ListItem",position:2,name:c.name,item:canonical},
    ],
  };
  const ldFaq = {
    "@context":"https://schema.org","@type":"FAQPage",
    mainEntity: faqs.map(f => ({ "@type":"Question", name:f.q, acceptedAnswer:{ "@type":"Answer", text:f.a } }))
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
<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large"/>
<meta name="geo.region" content="${c.geo}"/>
<meta name="geo.placename" content="${c.name}"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${desc}"/>
<meta property="og:image" content="${SITE}/og-cover.jpg"/>
<meta property="og:locale" content="zh_CN"/>
<meta property="og:site_name" content="新兴电力设备"/>
<link rel="alternate" href="${SITE}/" hreflang="zh-CN"/>
<script type="application/ld+json">${JSON.stringify(ldLocalBusiness)}</script>
<script type="application/ld+json">${JSON.stringify(ldBreadcrumb)}</script>
<script type="application/ld+json">${JSON.stringify(ldFaq)}</script>
<style>${css}</style>
</head>
<body>
${headerHtml(c.slug)}

<main>
  <section class="hero"><div class="wrap">
    <nav aria-label="面包屑" style="font-size:12px;color:#71717a;margin-bottom:8px">
      <a href="/">首页</a> <span style="color:#3f3f46">›</span> <span style="color:#d4d4d8">${c.name}</span>
    </nav>
    <span class="chip chip-amber">● ${c.name} · 当日响应</span>
    <h1>${c.name}<em>废旧电缆回收</em><br/>· 二手变压器回收出售</h1>
    <p>新兴电力设备深耕${c.prov}${c.name}区域，为本地工厂、物业、电气承包商提供废旧电缆回收、二手变压器回收与出售、整厂拆除设备处理。覆盖${c.areas.join("、")}等${c.name}主要工业区，免费上门评估、清楚报价、现场称重结算。</p>
    <div>
      ${["✓ 免费上门评估","✓ 当日响应","✓ 现场结算","✓ 正规单据"].map(x=>`<span class="chip">${x}</span>`).join("")}
    </div>
    <div class="ctas" style="margin-top:24px">
      <a href="${PHONE_TEL}" class="btn btn-primary">📞 立即免费报价 · ${PHONE}</a>
      <a href="#case" class="btn btn-ghost">查看完整案例 →</a>
    </div>
  </div></section>

  <section><div class="wrap">
    <div class="kicker">Local Context · ${c.name}</div>
    <h2>${c.name}产业结构与回收需求</h2>
    <p class="bigp">${c.context}</p>
    <p class="bigp">重点服务园区：<b style="color:#fcd34d">${c.landmark||c.areas.slice(0,3).join("、")}</b>。我们为${c.name}本地工厂提供电缆、变压器、开关柜、母线槽、电机水泵等电气设备的专业回收服务，既支持单台小批量处置，也能承接整厂搬迁、配电房拆改等大型项目。</p>
  </div></section>

  <section><div class="wrap">
    <div class="kicker">Core Services · ${c.name}</div>
    <h2>${c.name}三大核心业务</h2>
    <p class="lead">覆盖电气设备全生命周期处置与流通——点击查看完整业务说明与报价评估重点。</p>
    <div class="cross-links">
      <a href="/cable-recycling/"><b>▸ ${c.name}废旧电缆回收 →</b><span>铜芯 / 铝芯 / 高压电缆，按材质、规格、重量和现场条件评估</span></a>
      <a href="/${c.slug}/transformer-recycling/"><b>▸ ${c.name}二手变压器回收出售 →</b><span>S9/S11/S13 油浸、SCB10/SCB13 干式、箱式变压器评估与流通</span></a>
      <a href="/factory-demolition/"><b>▸ ${c.name}工厂拆除设备处理 →</b><span>整厂搬迁、配电房拆改、车间清退一站式腾退</span></a>
    </div>
  </div></section>

  <section id="case"><div class="wrap">
    <div class="kicker">Local Case · ${c.name}</div>
    <h2>${c.name}本地案例参考</h2>
    <p class="bigp">${c.caseNote}</p>
    <p style="color:#71717a;font-size:13px;margin-top:8px">说明：上述案例规格与时间已做简化处理，仅作为同类项目流程参考。</p>
  </div></section>

  <section id="regions"><div class="wrap">
    <div class="kicker">Local Coverage</div>
    <h2>${c.name}上门服务区域</h2>
    <p class="lead">以下区县/开发区均已建立本地服务响应，${c.name}核心区最快 24 小时内到场。</p>
    <div class="grid grid-4">
      ${c.areas.map(a=>`<span class="area-tag">${c.name} · ${a}</span>`).join("")}
    </div>
  </div></section>

  <section id="faq"><div class="wrap">
    <div class="kicker">FAQ · ${c.name}</div>
    <h2>${c.name}回收常见问题</h2>
    ${faqs.map(f=>`
      <div class="faq">
        <h3>${f.q}</h3>
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
      ${otherCities.map(x=>`<a href="/${x.slug}/">${x.name}废旧电缆回收</a>`).join("")}
      <a href="/">← 返回首页</a>
    </div>
  </div></section>
</main>

${mobileCtaHtml}
${footerHtml()}
</body>
</html>`;
}

/* ═══ 业务中枢页渲染 ═══ */
function renderService(s) {
  const canonical = `${SITE}/${s.slug}/`;
  const kw = s.kw.join(",");
  const ldService = {
    "@context":"https://schema.org","@type":"Service",
    serviceType: s.name, provider:{ "@type":"LocalBusiness", name:"新兴电力设备", telephone:PHONE, url:SITE },
    areaServed: priorityCities().map(c => ({ "@type":"City", name:c.name })),
    description: s.desc, url:canonical,
  };
  const ldBreadcrumb = {
    "@context":"https://schema.org","@type":"BreadcrumbList",
    itemListElement:[
      {"@type":"ListItem",position:1,name:"首页",item:`${SITE}/`},
      {"@type":"ListItem",position:2,name:s.name,item:canonical},
    ],
  };
  const ldFaq = {
    "@context":"https://schema.org","@type":"FAQPage",
    mainEntity: s.faq.map(f => ({ "@type":"Question", name:f.q, acceptedAnswer:{ "@type":"Answer", text:f.a } }))
  };

  const otherServices = SERVICES_HUB.filter(x => x.slug !== s.slug);

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${s.title}</title>
<meta name="description" content="${s.desc}"/>
<meta name="keywords" content="${kw}"/>
<link rel="canonical" href="${canonical}"/>
<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:title" content="${s.title}"/>
<meta property="og:description" content="${s.desc}"/>
<meta property="og:image" content="${SITE}/og-cover.jpg"/>
<meta property="og:locale" content="zh_CN"/>
<meta property="og:site_name" content="新兴电力设备"/>
<script type="application/ld+json">${JSON.stringify(ldService)}</script>
<script type="application/ld+json">${JSON.stringify(ldBreadcrumb)}</script>
<script type="application/ld+json">${JSON.stringify(ldFaq)}</script>
<style>${css}</style>
</head>
<body>
${headerHtml(s.slug)}

<main>
  <section class="hero"><div class="wrap">
    <nav aria-label="面包屑" style="font-size:12px;color:#71717a;margin-bottom:8px">
      <a href="/">首页</a> <span style="color:#3f3f46">›</span> <span style="color:#d4d4d8">${s.name}</span>
    </nav>
    <span class="chip chip-amber">● ${s.kicker} · 安徽及长三角全域</span>
    <h1>${s.h1html}</h1>
    <p>${s.desc}</p>
    <div class="ctas" style="margin-top:24px">
      <a href="${PHONE_TEL}" class="btn btn-primary">📞 立即免费报价 · ${PHONE}</a>
      <a href="#regions" class="btn btn-ghost">查看服务城市 →</a>
    </div>
  </div></section>

  ${s.sections.map(sec => {
    // "出售" 段落带 id="sell" 锚点，首页服务卡 03 (/transformer-recycling/#sell) 才能精确跳转
    const anchorId = sec.h2.startsWith("出售：") ? "sell" : "";
    return `
  <section${anchorId ? ` id="${anchorId}" style="scroll-margin-top:90px"` : ""}><div class="wrap">
    <div class="kicker">${s.kicker}</div>
    <h2>${sec.h2}</h2>
    ${sec.lead ? `<p class="lead">${sec.lead}</p>` : ""}
    <div class="grid grid-2">
      ${sec.grid.map(([t,d],i)=>`
        <article class="card">
          <div style="font-size:44px;font-weight:900;color:rgba(255,255,255,.06);line-height:1;margin-bottom:-16px">${String(i+1).padStart(2,"0")}</div>
          <h3>${t}</h3>
          <p>${d}</p>
        </article>`).join("")}
    </div>
  </div></section>
  `;
  }).join("")}

  <section id="regions"><div class="wrap">
    <div class="kicker">Coverage</div>
    <h2>${s.name}——覆盖城市</h2>
    <p class="lead">点击进入对应城市页面，查看本地服务区域、案例与联系方式。</p>
    <div class="grid grid-4">
      ${priorityCities().map(c => {
        const href = s.slug === "transformer-recycling" ? `/${c.slug}/transformer-recycling/` : `/${c.slug}/`;
        return `<a class="area-tag" href="${href}">${c.name}${s.name.replace("与出售","")}</a>`;
      }).join("")}
    </div>
  </div></section>

  <section id="faq"><div class="wrap">
    <div class="kicker">FAQ</div>
    <h2>${s.name}常见问题</h2>
    ${s.faq.map(f=>`
      <div class="faq">
        <h3>${f.q}</h3>
        <p>${f.a}</p>
      </div>`).join("")}
  </div></section>

  <section><div class="wrap">
    <div class="contact-box">
      <div class="kicker">Contact</div>
      <h2>${s.name}——免费评估 · 当日上门</h2>
      <p style="color:#a1a1aa;font-size:14px;margin:0">发送铭牌照片、规格、数量到微信 <strong style="color:#fcd34d">${WECHAT}</strong>，10 分钟内回复价格区间。</p>
      <a href="${PHONE_TEL}" class="phone-big">📞 ${PHONE}</a>
      <div style="color:#71717a;font-size:12px">服务时段：每日 08:00–20:00 · 急单可协商</div>
    </div>
    <div class="kicker" style="margin-top:40px">Other Services</div>
    <h2 style="font-size:18px">其他业务</h2>
    <div class="cross-links">
      ${otherServices.map(x=>`<a href="/${x.slug}/"><b>▸ ${x.name} →</b><span>${x.desc.slice(0,52)}…</span></a>`).join("")}
    </div>
  </div></section>
</main>

${mobileCtaHtml}
${footerHtml()}
</body>
</html>`;
}

/* ═══ 城市 × 二手变压器长尾页 ═══ */
function renderCityTransformer(c) {
  const canonical = `${SITE}/${c.slug}/transformer-recycling/`;
  const title = `${c.name}二手变压器回收_油浸式干式箱变回收出售_上门估价 | 新兴电力设备`;
  const desc = `${c.name}二手变压器回收与出售服务，覆盖${c.areas.slice(0,4).join("、")}等区域，回收 S9/S11/S13 油浸式变压器、SCB10/SCB13 干式变压器、箱式变电站和配套开关柜。`;
  const kw = [
    `${c.name}二手变压器回收`,
    `${c.name}变压器回收`,
    `${c.name}油浸式变压器回收`,
    `${c.name}干式变压器回收`,
    `${c.name}箱式变电站回收`,
    `${c.name}二手变压器出售`,
    `${c.name}配电柜回收`,
  ].join(",");
  const ldService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${c.name}二手变压器回收`,
    serviceType: "二手变压器回收与出售",
    provider: { "@type": "LocalBusiness", name: "新兴电力设备", telephone: PHONE, url: SITE },
    areaServed: [{ "@type": "City", name: c.name }],
    description: desc,
    url: canonical,
  };
  const ldBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: c.name, item: `${SITE}/${c.slug}/` },
      { "@type": "ListItem", position: 3, name: `${c.name}二手变压器回收`, item: canonical },
    ],
  };
  const localFaqs = [
    { q: `${c.name}二手变压器回收需要提供哪些照片？`, a: `建议提供铭牌、整体外观、接线端、油箱或外壳、配套开关柜照片，并说明设备所在区域（如${c.areas.slice(0,3).join("、")}）和台数。` },
    { q: `${c.name}哪些区域可以上门看变压器？`, a: `${c.name}${c.areas.join("、")}均可对接，${c.landmark ? `重点园区如${c.landmark}可优先安排。` : "核心区可优先安排。"}` },
    { q: `${c.name}箱式变电站可以整套处理吗？`, a: `可以。箱式变电站可按整套或拆分（变压器、高低压柜、箱体、电缆）两种方式评估，现场看货后给出方案。` },
  ];
  const ldFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  const nearby = priorityCities(CITIES.filter(x => x.slug !== c.slug)).slice(0, 10);
  const localPages = LOCAL_TRANSFORMER_PAGES.filter(p => p.citySlug === c.slug);

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title>
<meta name="description" content="${desc}"/>
<meta name="keywords" content="${kw}"/>
<link rel="canonical" href="${canonical}"/>
<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${desc}"/>
<meta property="og:image" content="${SITE}/og-cover.jpg"/>
<meta property="og:locale" content="zh_CN"/>
<meta property="og:site_name" content="新兴电力设备"/>
<script type="application/ld+json">${JSON.stringify(ldService)}</script>
<script type="application/ld+json">${JSON.stringify(ldBreadcrumb)}</script>
<script type="application/ld+json">${JSON.stringify(ldFaq)}</script>
<style>${css}</style>
</head>
<body>
${headerHtml("transformer-recycling")}

<main>
  <section class="hero"><div class="wrap">
    <nav aria-label="面包屑" style="font-size:12px;color:#71717a;margin-bottom:8px">
      <a href="/">首页</a> <span style="color:#3f3f46">›</span> <a href="/${c.slug}/">${c.name}</a> <span style="color:#3f3f46">›</span> <span style="color:#d4d4d8">二手变压器回收</span>
    </nav>
    <span class="chip chip-amber">● ${c.name} · 二手变压器回收</span>
    <h1>${c.name}<em>二手变压器回收</em><br/>油浸式 · 干式 · 箱式变电站</h1>
    <p>${desc}${c.context}</p>
    <div class="ctas" style="margin-top:24px">
      <a href="${PHONE_TEL}" class="btn btn-primary">📞 ${c.name}变压器免费估价 · ${PHONE}</a>
      <a href="#regions" class="btn btn-ghost">查看${c.name}服务区域 →</a>
    </div>
  </div></section>

  <section><div class="wrap">
    <div class="kicker">Transformer Types</div>
    <h2>${c.name}常见回收品类</h2>
    <p class="lead">工厂搬迁、配电房改造、园区设备更新产生的旧变压器和配套设备，均可先发图评估。</p>
    <div class="grid grid-2">
      ${[
        ["油浸式变压器", "S9/S11/S13 等 10kV 配电变压器，重点看容量、品牌、年份、油箱和运行状态。"],
        ["干式变压器", "SCB10/SCB13/SCB14 等干式变压器，重点看绕组完整度、绝缘状态和铭牌清晰度。"],
        ["箱式变电站", "YB/ZGS 户外箱变，可整套评估，也可拆分为变压器、高低压柜、箱体处理。"],
        ["开关柜配电柜", "KYN28、GGD、GCK、MNS 等高低压柜可随变压器一起打包处置。"],
      ].map(([t,d],i)=>`
        <article class="card">
          <div style="font-size:44px;font-weight:900;color:rgba(255,255,255,.06);line-height:1;margin-bottom:-16px">${String(i+1).padStart(2,"0")}</div>
          <h3>${t}</h3>
          <p>${d}</p>
        </article>`).join("")}
    </div>
  </div></section>

  <section><div class="wrap">
    <div class="kicker">Quote Checklist</div>
    <h2>${c.name}变压器估价要看什么</h2>
    <p class="lead">二手变压器不是只按废铁重量处理，设备能否二次流通、参数是否完整，会影响估价。</p>
    <div class="grid grid-3">
      ${[
        ["铭牌参数", "型号、容量、电压等级、生产厂家、出厂日期。"],
        ["设备状态", "外观、油箱或外壳、绕组、端子、风机温控和附件。"],
        ["项目位置", `${c.name}具体区域、园区、楼层、装车距离和是否需要吊装。`],
        ["配套清单", "高低压柜、母线槽、电缆、箱体是否一起处置。"],
        ["单据要求", "是否需要合同、交接单、过磅单、收据或发票。"],
        ["处置方式", "回收、出售、置换、整套清场可按现场需求组合。"],
      ].map(([t,d])=>`<article class="card"><h3>${t}</h3><p>${d}</p></article>`).join("")}
    </div>
  </div></section>

  <section id="regions"><div class="wrap">
    <div class="kicker">Local Coverage</div>
    <h2>${c.name}上门服务区域</h2>
    <p class="lead">${c.landmark ? `重点覆盖 ${c.landmark} 等产业园区，` : ""}也可对接周边工厂、物业、安装公司和资产处置项目。</p>
    <div class="grid grid-4">
      ${c.areas.map(a=>`<span class="area-tag">${c.name} · ${a}变压器回收</span>`).join("")}
    </div>
  </div></section>

${localPages.length ? `
  <section><div class="wrap">
    <div class="kicker">Local Areas</div>
    <h2>${c.name}重点区域二手变压器回收</h2>
    <p class="lead">以下区县/园区有更细的服务说明，适合搜索本地上门评估的客户直接进入。</p>
    <div class="cross-links">
      ${localPages.map(p=>`<a href="/${p.slug}/"><b>▸ ${p.titleArea}二手变压器回收 →</b><span>${p.landmark}，油浸式、干式、箱式变电站上门评估</span></a>`).join("")}
    </div>
  </div></section>` : ""}

  <section id="faq"><div class="wrap">
    <div class="kicker">FAQ</div>
    <h2>${c.name}二手变压器回收常见问题</h2>
    ${localFaqs.map(f=>`<div class="faq"><h3>${f.q}</h3><p>${f.a}</p></div>`).join("")}
  </div></section>

  <section><div class="wrap">
    <div class="contact-box">
      <div class="kicker">Contact</div>
      <h2>${c.name}二手变压器回收免费评估</h2>
      <p style="color:#a1a1aa;font-size:14px;margin:0">发送铭牌、外观、容量、台数和位置到微信 <strong style="color:#fcd34d">${WECHAT}</strong>，先判断回收或二次流通价值。</p>
      <a href="${PHONE_TEL}" class="phone-big">📞 ${PHONE}</a>
      <div style="color:#71717a;font-size:12px">服务时段：每日 08:00–20:00 · 急单可协商</div>
    </div>
    <div class="kicker" style="margin-top:40px">Nearby Cities</div>
    <h2 style="font-size:18px">周边城市二手变压器回收</h2>
    <div class="link-cloud">
      ${nearby.map(x=>`<a href="/${x.slug}/transformer-recycling/">${x.name}二手变压器回收</a>`).join("")}
      <a href="/transformer-recycling/">长三角二手变压器回收</a>
    </div>
  </div></section>
</main>

${mobileCtaHtml}
${footerHtml()}
</body>
</html>`;
}

/* ═══ 区县/园区 × 二手变压器长尾页 ═══ */
function renderLocalTransformer(p) {
  const canonical = `${SITE}/${p.slug}/`;
  const title = `${p.titleArea}二手变压器回收_油浸式干式箱变上门估价 | 新兴电力设备`;
  const desc = `${p.titleArea}二手变压器回收服务，覆盖${p.areas.slice(0,4).join("、")}等区域，回收油浸式变压器、干式变压器、箱式变电站、开关柜和配电柜。`;
  const city = CITIES.find(c => c.slug === p.citySlug);
  const localFaqs = [
    { q: `${p.titleArea}二手变压器回收多久能上门？`, a: `可先通过电话或微信发送铭牌、外观、容量、台数和位置。${p.titleArea}核心区域如${p.areas.slice(0,3).join("、")}可根据项目规模安排上门评估。` },
    { q: `${p.areaName}箱式变电站可以整套回收吗？`, a: "可以。箱式变电站可按整套或拆分方式评估，通常会分别查看变压器、高低压柜、箱体和进出线电缆。" },
    { q: `${p.areaName}配电房改造旧设备能一起处理吗？`, a: "可以。变压器、开关柜、配电柜、母线槽、电缆线路可打包评估，适合工厂搬迁、园区改造和配电容量升级项目。" },
  ];
  const ldService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${p.titleArea}二手变压器回收`,
    serviceType: "二手变压器回收",
    provider: { "@type": "LocalBusiness", name: "新兴电力设备", telephone: PHONE, url: SITE },
    areaServed: [{ "@type": "AdministrativeArea", name: p.titleArea }],
    description: desc,
    url: canonical,
  };
  const ldBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: city?.name || p.cityName, item: `${SITE}/${p.citySlug}/` },
      { "@type": "ListItem", position: 3, name: `${p.titleArea}二手变压器回收`, item: canonical },
    ],
  };
  const ldFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: localFaqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const siblingPages = LOCAL_TRANSFORMER_PAGES.filter(x => x.slug !== p.slug);

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title>
<meta name="description" content="${desc}"/>
<meta name="keywords" content="${p.titleArea}二手变压器回收,${p.areaName}二手变压器回收,${p.titleArea}变压器回收,${p.titleArea}干式变压器回收,${p.titleArea}油浸式变压器回收"/>
<link rel="canonical" href="${canonical}"/>
<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:title" content="${title}"/>
<meta property="og:description" content="${desc}"/>
<meta property="og:image" content="${SITE}/og-cover.jpg"/>
<meta property="og:locale" content="zh_CN"/>
<meta property="og:site_name" content="新兴电力设备"/>
<script type="application/ld+json">${JSON.stringify(ldService)}</script>
<script type="application/ld+json">${JSON.stringify(ldBreadcrumb)}</script>
<script type="application/ld+json">${JSON.stringify(ldFaq)}</script>
<style>${css}</style>
</head>
<body>
${headerHtml("transformer-recycling")}

<main>
  <section class="hero"><div class="wrap">
    <nav aria-label="面包屑" style="font-size:12px;color:#71717a;margin-bottom:8px">
      <a href="/">首页</a> <span style="color:#3f3f46">›</span> <a href="/${p.citySlug}/">${p.cityName}</a> <span style="color:#3f3f46">›</span> <span style="color:#d4d4d8">${p.areaName}二手变压器回收</span>
    </nav>
    <span class="chip chip-amber">● ${p.titleArea} · 本地上门评估</span>
    <h1>${p.titleArea}<em>二手变压器回收</em><br/>油浸式 · 干式 · 箱式变电站</h1>
    <p>${desc}${p.context}</p>
    <div class="ctas" style="margin-top:24px">
      <a href="${PHONE_TEL}" class="btn btn-primary">📞 ${p.areaName}变压器免费估价 · ${PHONE}</a>
      <a href="#regions" class="btn btn-ghost">查看覆盖区域 →</a>
    </div>
  </div></section>

  <section><div class="wrap">
    <div class="kicker">Local Demand</div>
    <h2>${p.titleArea}常见处置场景</h2>
    <p class="lead">${p.landmark}周边工厂、园区、仓储和物业项目，可先发铭牌与现场图判断回收或二次流通价值。</p>
    <div class="grid grid-2">
      ${[
        ["工厂配电房改造", "老旧油浸式变压器、干式变压器、高低压柜和进出线电缆可打包评估。"],
        ["产线搬迁或退租", "设备迁移前可提前清点旧变压器和配电设备，缩短现场腾退时间。"],
        ["箱式变电站处置", "户外箱变可整套评估，也可拆分为变压器、高低压柜和箱体处理。"],
        ["二手设备采购", "扩产、临时用电或应急备机，可对接合适容量的二手变压器。"],
      ].map(([t,d],i)=>`
        <article class="card">
          <div style="font-size:44px;font-weight:900;color:rgba(255,255,255,.06);line-height:1;margin-bottom:-16px">${String(i+1).padStart(2,"0")}</div>
          <h3>${t}</h3>
          <p>${d}</p>
        </article>`).join("")}
    </div>
  </div></section>

  <section id="regions"><div class="wrap">
    <div class="kicker">Coverage</div>
    <h2>${p.titleArea}服务范围</h2>
    <p class="lead">覆盖${p.landmark}及周边工业区、园区、厂房、仓库和配电房改造项目。</p>
    <div class="grid grid-4">
      ${p.areas.map(a=>`<span class="area-tag">${a}变压器回收</span>`).join("")}
    </div>
  </div></section>

  <section id="faq"><div class="wrap">
    <div class="kicker">FAQ</div>
    <h2>${p.titleArea}二手变压器回收常见问题</h2>
    ${localFaqs.map(f=>`<div class="faq"><h3>${f.q}</h3><p>${f.a}</p></div>`).join("")}
  </div></section>

  <section><div class="wrap">
    <div class="contact-box">
      <div class="kicker">Contact</div>
      <h2>${p.titleArea}二手变压器回收免费评估</h2>
      <p style="color:#a1a1aa;font-size:14px;margin:0">发送铭牌、外观、容量、台数和位置到微信 <strong style="color:#fcd34d">${WECHAT}</strong>，先判断是否适合上门。</p>
      <a href="${PHONE_TEL}" class="phone-big">📞 ${PHONE}</a>
      <div style="color:#71717a;font-size:12px">服务时段：每日 08:00–20:00 · 急单可协商</div>
    </div>
    <div class="kicker" style="margin-top:40px">Related Areas</div>
    <h2 style="font-size:18px">相关区域二手变压器回收</h2>
    <div class="link-cloud">
      ${siblingPages.map(x=>`<a href="/${x.slug}/">${x.titleArea}二手变压器回收</a>`).join("")}
      <a href="/${p.citySlug}/transformer-recycling/">${p.cityName}二手变压器回收</a>
    </div>
  </div></section>
</main>

${mobileCtaHtml}
${footerHtml()}
</body>
</html>`;
}

/* ═══ SEO 指南页渲染 ═══ */
function renderGuide(g) {
  const canonical = `${SITE}/${g.slug}/`;
  const ldArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.desc,
    author: { "@type": "Organization", name: "新兴电力设备" },
    publisher: { "@type": "Organization", name: "新兴电力设备" },
    mainEntityOfPage: canonical,
  };
  const ldBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "回收指南", item: `${SITE}/guides/` },
      { "@type": "ListItem", position: 3, name: g.h1, item: canonical },
    ],
  };
  const ldFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const relatedGuides = GUIDE_PAGES.filter(x => x.slug !== g.slug);

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${g.title}</title>
<meta name="description" content="${g.desc}"/>
<meta name="keywords" content="${g.kw.join(",")}"/>
<link rel="canonical" href="${canonical}"/>
<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large"/>
<meta property="og:type" content="article"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:title" content="${g.title}"/>
<meta property="og:description" content="${g.desc}"/>
<meta property="og:image" content="${SITE}/og-cover.jpg"/>
<meta property="og:locale" content="zh_CN"/>
<meta property="og:site_name" content="新兴电力设备"/>
<script type="application/ld+json">${JSON.stringify(ldArticle)}</script>
<script type="application/ld+json">${JSON.stringify(ldBreadcrumb)}</script>
<script type="application/ld+json">${JSON.stringify(ldFaq)}</script>
<style>${css}</style>
</head>
<body>
${headerHtml("")}

<main>
  <section class="hero"><div class="wrap">
    <nav aria-label="面包屑" style="font-size:12px;color:#71717a;margin-bottom:8px">
      <a href="/">首页</a> <span style="color:#3f3f46">›</span> <a href="/${g.serviceUrl.replace(/^\//,"")}">${g.service}</a> <span style="color:#3f3f46">›</span> <span style="color:#d4d4d8">${g.h1}</span>
    </nav>
    <span class="chip chip-amber">● 回收指南 · ${g.service}</span>
    <h1>${g.h1}</h1>
    <p>${g.desc}</p>
    <div class="ctas" style="margin-top:24px">
      <a href="${PHONE_TEL}" class="btn btn-primary">📞 立即免费报价 · ${PHONE}</a>
      <a href="${g.serviceUrl}" class="btn btn-ghost">查看${g.service}服务 →</a>
    </div>
  </div></section>

  ${g.sections.map(sec => `
  <section><div class="wrap">
    <div class="kicker">Guide</div>
    <h2>${sec.h2}</h2>
    <p class="lead">${sec.lead}</p>
    <div class="grid grid-2">
      ${sec.grid.map(([t,d],i)=>`
        <article class="card">
          <div style="font-size:44px;font-weight:900;color:rgba(255,255,255,.06);line-height:1;margin-bottom:-16px">${String(i+1).padStart(2,"0")}</div>
          <h3>${t}</h3>
          <p>${d}</p>
        </article>`).join("")}
    </div>
  </div></section>`).join("")}

  <section id="regions"><div class="wrap">
    <div class="kicker">Coverage</div>
    <h2>服务城市</h2>
    <p class="lead">安徽及长三角主要城市均可上门评估。点击城市查看本地服务范围与案例参考。</p>
    <div class="grid grid-4">
      ${priorityCities().map(c => `<a class="area-tag" href="/${c.slug}/">${c.name}${g.service}</a>`).join("")}
    </div>
  </div></section>

  <section id="faq"><div class="wrap">
    <div class="kicker">FAQ</div>
    <h2>${g.h1}常见问题</h2>
    ${g.faq.map(f=>`
      <div class="faq">
        <h3>${f.q}</h3>
        <p>${f.a}</p>
      </div>`).join("")}
  </div></section>

  <section><div class="wrap">
    <div class="contact-box">
      <div class="kicker">Contact</div>
      <h2>需要上门评估？</h2>
      <p style="color:#a1a1aa;font-size:14px;margin:0">发送铭牌、现场图、数量和位置到微信 <strong style="color:#fcd34d">${WECHAT}</strong>，先判断是否适合上门。</p>
      <a href="${PHONE_TEL}" class="phone-big">📞 ${PHONE}</a>
      <div style="color:#71717a;font-size:12px">服务时段：每日 08:00–20:00 · 急单可协商</div>
    </div>
    <div class="kicker" style="margin-top:40px">Related Guides</div>
    <h2 style="font-size:18px">相关回收指南</h2>
    <div class="cross-links">
      ${relatedGuides.map(x=>`<a href="/${x.slug}/"><b>▸ ${x.h1} →</b><span>${x.desc.slice(0,58)}…</span></a>`).join("")}
    </div>
  </div></section>
</main>

${mobileCtaHtml}
${footerHtml()}
</body>
</html>`;
}

/* ═══ sitemap ═══ */
function renderSitemap() {
  const today = new Date().toISOString().slice(0,10);
  const urls = [
    { loc:`${SITE}/`, pri:"1.0", freq:"weekly" },
    ...SERVICES_HUB.map(s => ({ loc:`${SITE}/${s.slug}/`, pri:"0.9", freq:"monthly" })),
    ...priorityCities().map(c => ({ loc:`${SITE}/${c.slug}/`, pri:ANHUI_FOCUS_SLUGS.has(c.slug) ? "0.86" : "0.8", freq:"monthly" })),
    ...priorityCities().map(c => ({ loc:`${SITE}/${c.slug}/transformer-recycling/`, pri:ANHUI_FOCUS_SLUGS.has(c.slug) ? "0.8" : "0.75", freq:"monthly" })),
    ...LOCAL_TRANSFORMER_PAGES.map(p => ({ loc:`${SITE}/${p.slug}/`, pri:"0.72", freq:"monthly" })),
    ...GUIDE_PAGES.map(g => ({ loc:`${SITE}/${g.slug}/`, pri:"0.7", freq:"monthly" })),
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

/* ═══ 执行 ═══ */
let cityCount = 0, cityTransformerCount = 0, localTransformerCount = 0, svcCount = 0, guideCount = 0;
for (const c of CITIES) {
  const outDir  = resolve(ROOT, "public", c.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), renderCity(c), "utf8");
  console.log(`✓ public/${c.slug}/index.html`);
  cityCount++;

  const transformerDir = resolve(ROOT, "public", c.slug, "transformer-recycling");
  mkdirSync(transformerDir, { recursive: true });
  writeFileSync(resolve(transformerDir, "index.html"), renderCityTransformer(c), "utf8");
  console.log(`✓ public/${c.slug}/transformer-recycling/index.html`);
  cityTransformerCount++;
}
for (const s of SERVICES_HUB) {
  const outDir = resolve(ROOT, "public", s.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), renderService(s), "utf8");
  console.log(`✓ public/${s.slug}/index.html`);
  svcCount++;
}
for (const p of LOCAL_TRANSFORMER_PAGES) {
  const outDir = resolve(ROOT, "public", p.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), renderLocalTransformer(p), "utf8");
  console.log(`✓ public/${p.slug}/index.html`);
  localTransformerCount++;
}
for (const g of GUIDE_PAGES) {
  const outDir = resolve(ROOT, "public", g.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), renderGuide(g), "utf8");
  console.log(`✓ public/${g.slug}/index.html`);
  guideCount++;
}
writeFileSync(resolve(ROOT, "public", "sitemap.xml"), renderSitemap(), "utf8");
const total = 1 + svcCount + cityCount + cityTransformerCount + localTransformerCount + guideCount;
console.log(`✓ public/sitemap.xml (${total} URLs)`);
console.log(`\n生成完成：${cityCount} 个城市页 + ${cityTransformerCount} 个城市变压器页 + ${localTransformerCount} 个区县变压器页 + ${svcCount} 个业务中枢页 + ${guideCount} 个指南页 + 1 个 sitemap`);

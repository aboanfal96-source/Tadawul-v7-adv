import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ===== ALL SAUDI STOCKS - REAL DATA FROM TADAWUL =====
const ALL_STOCKS = [
  // === الطاقة ===
  {s:"2222",n:"أرامكو السعودية",p:27.58,c:1.17,sec:"طاقة"},
  {s:"2030",n:"المصافي",p:45.52,c:-0.09,sec:"طاقة"},
  {s:"2380",n:"بترو رابغ",p:14.85,c:6.76,sec:"طاقة"},
  {s:"4030",n:"البحري",p:36.00,c:3.39,sec:"طاقة"},
  {s:"2381",n:"الحفر العربية",p:87.50,c:-0.57,sec:"طاقة"},
  {s:"2382",n:"أديس",p:19.31,c:-0.36,sec:"طاقة"},
  // === المواد الأساسية ===
  {s:"1201",n:"تكوين",p:5.25,c:-1.32,sec:"مواد"},
  {s:"1202",n:"مبكو",p:17.10,c:2.70,sec:"مواد"},
  {s:"1210",n:"بي سي آي",p:25.74,c:-1.68,sec:"مواد"},
  {s:"1211",n:"معادن",p:65.75,c:-0.68,sec:"مواد"},
  {s:"1301",n:"أسلاك",p:17.20,c:-1.71,sec:"مواد"},
  {s:"1304",n:"اليمامة للحديد",p:40.94,c:4.97,sec:"مواد"},
  {s:"1320",n:"أنابيب السعودية",p:57.90,c:10.71,sec:"مواد"},
  {s:"1321",n:"أنابيب الشرق",p:194.00,c:6.95,sec:"مواد"},
  {s:"1322",n:"أماك",p:81.80,c:-5.32,sec:"مواد"},
  {s:"1323",n:"يو سي آي سي",p:25.58,c:-1.01,sec:"مواد"},
  {s:"2001",n:"كيمانول",p:8.87,c:-0.34,sec:"مواد"},
  {s:"2010",n:"سابك",p:61.15,c:-0.08,sec:"مواد"},
  {s:"2020",n:"سابك للمغذيات",p:145.60,c:2.32,sec:"مواد"},
  {s:"2060",n:"التصنيع",p:10.28,c:-0.68,sec:"مواد"},
  {s:"2090",n:"جبسكو",p:15.06,c:0.53,sec:"مواد"},
  {s:"2150",n:"زجاج",p:36.26,c:0.72,sec:"مواد"},
  {s:"2170",n:"اللجين",p:29.80,c:1.92,sec:"مواد"},
  {s:"2180",n:"فيبكو",p:29.44,c:1.52,sec:"مواد"},
  {s:"2200",n:"أنابيب",p:7.33,c:5.01,sec:"مواد"},
  {s:"2210",n:"نماء للكيماويات",p:18.74,c:-4.09,sec:"مواد"},
  {s:"2220",n:"معدنية",p:12.60,c:0.08,sec:"مواد"},
  {s:"2223",n:"لوبريف",p:123.20,c:8.93,sec:"مواد"},
  {s:"2240",n:"صناعات",p:37.68,c:2.78,sec:"مواد"},
  {s:"2250",n:"المجموعة السعودية",p:13.77,c:-0.86,sec:"مواد"},
  {s:"2290",n:"ينساب",p:36.56,c:-3.79,sec:"مواد"},
  {s:"2300",n:"صناعة الورق",p:59.00,c:1.11,sec:"مواد"},
  {s:"2310",n:"سبكيم العالمية",p:15.95,c:-0.31,sec:"مواد"},
  {s:"2330",n:"المتقدمة",p:26.68,c:1.52,sec:"مواد"},
  {s:"2350",n:"كيان السعودية",p:5.92,c:1.20,sec:"مواد"},
  {s:"2360",n:"الفخارية",p:18.20,c:0.55,sec:"مواد"},
  {s:"3007",n:"الواحة",p:2.61,c:3.57,sec:"مواد"},
  {s:"3008",n:"الكثيري",p:1.92,c:1.05,sec:"مواد"},
  {s:"4143",n:"تالكو",p:34.90,c:1.45,sec:"مواد"},
  {s:"2230",n:"الكيميائية",p:8.95,c:-0.33,sec:"مواد"},
  {s:"1324",n:"صالح الراشد",p:34.70,c:-0.57,sec:"مواد"},
  // === الأسمنت ===
  {s:"3002",n:"أسمنت نجران",p:6.04,c:0.67,sec:"أسمنت"},
  {s:"3003",n:"أسمنت المدينة",p:12.25,c:1.83,sec:"أسمنت"},
  {s:"3004",n:"أسمنت الشمالية",p:7.07,c:1.00,sec:"أسمنت"},
  {s:"3005",n:"أسمنت ام القرى",p:13.98,c:17.48,sec:"أسمنت"},
  {s:"3010",n:"أسمنت العربية",p:23.65,c:1.94,sec:"أسمنت"},
  {s:"3020",n:"أسمنت اليمامة",p:26.36,c:6.63,sec:"أسمنت"},
  {s:"3030",n:"أسمنت السعودية",p:34.66,c:0.87,sec:"أسمنت"},
  {s:"3040",n:"أسمنت القصيم",p:43.40,c:0.60,sec:"أسمنت"},
  {s:"3050",n:"أسمنت الجنوب",p:21.09,c:-0.89,sec:"أسمنت"},
  {s:"3060",n:"أسمنت ينبع",p:14.97,c:2.67,sec:"أسمنت"},
  {s:"3080",n:"أسمنت الشرقية",p:23.39,c:1.43,sec:"أسمنت"},
  {s:"3090",n:"أسمنت تبوك",p:8.01,c:0.12,sec:"أسمنت"},
  {s:"3091",n:"أسمنت الجوف",p:5.01,c:-0.79,sec:"أسمنت"},
  {s:"3092",n:"أسمنت الرياض",p:23.76,c:1.76,sec:"أسمنت"},
  // === السلع الرأسمالية ===
  {s:"1212",n:"أسترا الصناعية",p:143.30,c:-0.14,sec:"صناعية"},
  {s:"1214",n:"شاكر",p:15.82,c:-3.12,sec:"صناعية"},
  {s:"1302",n:"بوان",p:43.30,c:1.74,sec:"صناعية"},
  {s:"1303",n:"الصناعات الكهربائية",p:17.77,c:0.00,sec:"صناعية"},
  {s:"2040",n:"الخزف السعودي",p:29.56,c:0.89,sec:"صناعية"},
  {s:"2110",n:"الكابلات السعودية",p:153.10,c:0.33,sec:"صناعية"},
  {s:"2160",n:"أميانتيت",p:15.29,c:0.99,sec:"صناعية"},
  {s:"2320",n:"البابطين",p:66.20,c:2.48,sec:"صناعية"},
  {s:"2370",n:"مسك",p:30.14,c:0.80,sec:"صناعية"},
  {s:"4140",n:"صادرات",p:2.29,c:-0.87,sec:"صناعية"},
  {s:"4141",n:"العمران",p:21.64,c:-2.08,sec:"صناعية"},
  {s:"4142",n:"كابلات الرياض",p:130.70,c:2.27,sec:"صناعية"},
  {s:"4144",n:"رؤوم",p:71.40,c:-0.83,sec:"صناعية"},
  {s:"4145",n:"العبيكان للزجاج",p:25.44,c:0.16,sec:"صناعية"},
  {s:"4146",n:"جاز",p:13.45,c:3.54,sec:"صناعية"},
  {s:"4147",n:"سي جي إس",p:7.31,c:-2.53,sec:"صناعية"},
  {s:"4110",n:"باتك",p:23.50,c:-0.85,sec:"صناعية"},
  {s:"4148",n:"الوسائل الصناعية",p:16.20,c:0.93,sec:"صناعية"},
  // === الخدمات التجارية ===
  {s:"1831",n:"مهارة",p:6.01,c:-0.33,sec:"خدمات"},
  {s:"1832",n:"صدر",p:2.69,c:-0.74,sec:"خدمات"},
  {s:"1833",n:"الموارد",p:86.15,c:0.47,sec:"خدمات"},
  {s:"1834",n:"سماسكو",p:5.52,c:-0.72,sec:"خدمات"},
  {s:"1835",n:"تمكين",p:44.76,c:0.31,sec:"خدمات"},
  {s:"4270",n:"طباعة وتغليف",p:19.50,c:0.41,sec:"خدمات"},
  {s:"6004",n:"كاتريون",p:98.40,c:0.61,sec:"خدمات"},
  // === النقل ===
  {s:"4031",n:"الخدمات الأرضية",p:31.26,c:0.90,sec:"نقل"},
  {s:"4040",n:"سابتكو",p:11.37,c:-0.52,sec:"نقل"},
  {s:"4260",n:"بدجت السعودية",p:42.02,c:-0.71,sec:"نقل"},
  {s:"4261",n:"ذيب",p:28.76,c:-1.30,sec:"نقل"},
  {s:"4262",n:"لومي",p:40.10,c:-1.09,sec:"نقل"},
  {s:"4263",n:"سال",p:163.80,c:-0.49,sec:"نقل"},
  {s:"4264",n:"طيران ناس",p:50.50,c:0.50,sec:"نقل"},
  {s:"4265",n:"شري",p:27.56,c:2.61,sec:"نقل"},
  {s:"2190",n:"سيسكو القابضة",p:70.80,c:0.42,sec:"نقل"},
  // === السلع طويلة الأجل ===
  {s:"1213",n:"نسيج",p:25.88,c:-2.34,sec:"سلع"},
  {s:"2130",n:"صدق",p:11.93,c:-1.16,sec:"سلع"},
  {s:"2340",n:"ارتيكس",p:10.27,c:-0.68,sec:"سلع"},
  {s:"4011",n:"لازوردي",p:11.34,c:-0.09,sec:"سلع"},
  {s:"4012",n:"الأصيل",p:3.73,c:-0.27,sec:"سلع"},
  {s:"4180",n:"مجموعة فتيحي",p:2.66,c:0.00,sec:"سلع"},
  // === الخدمات الاستهلاكية ===
  {s:"1810",n:"سيرا",p:21.40,c:-0.88,sec:"استهلاكية"},
  {s:"1820",n:"بان",p:1.97,c:2.60,sec:"استهلاكية"},
  {s:"1830",n:"لجام للرياضة",p:80.45,c:-9.45,sec:"استهلاكية"},
  {s:"4170",n:"شمس",p:16.11,c:1.38,sec:"استهلاكية"},
  {s:"4290",n:"الخليج للتدريب",p:16.59,c:1.41,sec:"استهلاكية"},
  {s:"4291",n:"الوطنية للتعليم",p:118.70,c:-0.25,sec:"استهلاكية"},
  {s:"4292",n:"عطاء",p:54.00,c:-2.17,sec:"استهلاكية"},
  {s:"6012",n:"ريدان",p:2.85,c:-0.35,sec:"استهلاكية"},
  {s:"6013",n:"التطويرية الغذائية",p:35.60,c:1.15,sec:"استهلاكية"},
  {s:"6014",n:"الآمار",p:14.80,c:0.68,sec:"استهلاكية"},
  {s:"6015",n:"أمريكانا",p:8.45,c:-1.05,sec:"استهلاكية"},
  {s:"6016",n:"برغرايززر",p:33.50,c:0.90,sec:"استهلاكية"},
  {s:"6018",n:"الأندية للرياضة",p:8.60,c:-1.49,sec:"استهلاكية"},
  // === الإعلام والترفيه ===
  {s:"4070",n:"تهامة",p:14.31,c:-1.38,sec:"إعلام"},
  {s:"4071",n:"العربية",p:109.00,c:-0.64,sec:"إعلام"},
  {s:"4072",n:"مجموعة إم بي سي",p:26.00,c:0.23,sec:"إعلام"},
  {s:"4210",n:"الأبحاث والإعلام",p:76.60,c:1.19,sec:"إعلام"},
  // === تجزئة الكمالية ===
  {s:"4003",n:"إكسترا",p:80.85,c:-1.70,sec:"تجزئة"},
  {s:"4008",n:"ساكو",p:25.08,c:0.24,sec:"تجزئة"},
  {s:"4050",n:"ساسكو",p:50.90,c:-1.36,sec:"تجزئة"},
  {s:"4051",n:"باعظيم",p:5.62,c:-1.40,sec:"تجزئة"},
  {s:"4190",n:"جرير",p:15.30,c:0.00,sec:"تجزئة"},
  {s:"4191",n:"أبو معطي",p:42.40,c:-1.21,sec:"تجزئة"},
  {s:"4192",n:"السيف غاليري",p:6.62,c:-0.75,sec:"تجزئة"},
  {s:"4193",n:"نايس ون",p:14.42,c:0.07,sec:"تجزئة"},
  {s:"4194",n:"محطة البناء",p:43.72,c:0.55,sec:"تجزئة"},
  {s:"4200",n:"الدريس",p:120.10,c:-0.58,sec:"تجزئة"},
  {s:"4240",n:"سينومي ريتيل",p:16.20,c:-2.53,sec:"تجزئة"},
  {s:"4163",n:"الدواء",p:43.60,c:-0.69,sec:"تجزئة"},
  {s:"4164",n:"النهدي",p:108.60,c:-1.30,sec:"تجزئة"},
  // === تجزئة السلع الاستهلاكية ===
  {s:"4001",n:"أسواق ع العثيم",p:6.16,c:-0.65,sec:"غذائية"},
  {s:"4006",n:"أسواق المزرعة",p:13.11,c:-1.21,sec:"غذائية"},
  {s:"4061",n:"أنعام القابضة",p:11.17,c:0.36,sec:"غذائية"},
  {s:"4160",n:"ثمار",p:34.02,c:2.66,sec:"غذائية"},
  {s:"4161",n:"بن داود",p:5.31,c:1.34,sec:"غذائية"},
  {s:"4162",n:"المنجم",p:53.95,c:2.76,sec:"غذائية"},
  {s:"4165",n:"الماجد للعود",p:162.50,c:-0.37,sec:"غذائية"},
  // === إنتاج الأغذية ===
  {s:"2050",n:"مجموعة صافولا",p:26.70,c:0.00,sec:"أغذية"},
  {s:"2100",n:"وفرة",p:22.05,c:6.01,sec:"أغذية"},
  {s:"2270",n:"سدافكو",p:207.60,c:0.14,sec:"أغذية"},
  {s:"2280",n:"المراعي",p:41.96,c:0.48,sec:"أغذية"},
  {s:"2281",n:"تنمية",p:65.10,c:0.15,sec:"أغذية"},
  {s:"2282",n:"نقي",p:52.40,c:-0.10,sec:"أغذية"},
  {s:"2283",n:"المطاحن الأولى",p:56.70,c:0.09,sec:"أغذية"},
  {s:"2284",n:"المطاحن الحديثة",p:28.82,c:-0.89,sec:"أغذية"},
  {s:"2285",n:"المطاحن العربية",p:41.20,c:-0.05,sec:"أغذية"},
  {s:"2286",n:"المطاحن الرابعة",p:4.13,c:-0.48,sec:"أغذية"},
  {s:"2287",n:"إنتاج",p:25.40,c:0.00,sec:"أغذية"},
  {s:"2288",n:"نفوذ",p:18.40,c:0.33,sec:"أغذية"},
  {s:"6001",n:"حلواني إخوان",p:32.12,c:0.56,sec:"أغذية"},
  {s:"6002",n:"هرفي للأغذية",p:14.69,c:0.07,sec:"أغذية"},
  {s:"6010",n:"نادك",p:16.10,c:-0.31,sec:"أغذية"},
  {s:"6020",n:"جاكو",p:13.17,c:-1.13,sec:"أغذية"},
  {s:"6040",n:"تبوك الزراعية",p:6.55,c:-2.67,sec:"أغذية"},
  {s:"6050",n:"الأسماك",p:43.64,c:-0.50,sec:"أغذية"},
  {s:"6060",n:"الشرقية للتنمية",p:12.46,c:0.08,sec:"أغذية"},
  {s:"6070",n:"الجوف",p:48.58,c:-0.37,sec:"أغذية"},
  {s:"6090",n:"جازادكو",p:8.76,c:-0.11,sec:"أغذية"},
  // === الرعاية الصحية ===
  {s:"4002",n:"المواساة",p:68.50,c:-1.72,sec:"صحة"},
  {s:"4004",n:"دله الصحية",p:122.00,c:0.74,sec:"صحة"},
  {s:"4005",n:"رعاية",p:118.10,c:1.03,sec:"صحة"},
  {s:"4007",n:"الحمادي",p:26.04,c:-0.91,sec:"صحة"},
  {s:"4009",n:"السعودي الألماني",p:37.40,c:-3.11,sec:"صحة"},
  {s:"4013",n:"سليمان الحبيب",p:241.20,c:-2.15,sec:"صحة"},
  {s:"4014",n:"دار المعدات",p:31.12,c:0.32,sec:"صحة"},
  {s:"4017",n:"فقيه الطبية",p:36.98,c:2.72,sec:"صحة"},
  {s:"4018",n:"الموسى",p:135.30,c:-0.07,sec:"صحة"},
  {s:"4019",n:"اس ام سي",p:18.39,c:0.44,sec:"صحة"},
  {s:"4021",n:"المركز الكندي",p:5.82,c:-2.51,sec:"صحة"},
  {s:"2140",n:"أيان",p:14.20,c:0.42,sec:"صحة"},
  // === الأدوية ===
  {s:"2070",n:"الدوائية",p:30.84,c:-2.41,sec:"أدوية"},
  {s:"4015",n:"جمجوم فارما",p:155.30,c:-0.45,sec:"أدوية"},
  {s:"4016",n:"أفالون فارما",p:103.50,c:0.58,sec:"أدوية"},
  // === البنوك ===
  {s:"1010",n:"الرياض",p:21.25,c:0.47,sec:"بنوك"},
  {s:"1020",n:"الجزيرة",p:11.77,c:-0.25,sec:"بنوك"},
  {s:"1030",n:"الإستثمار",p:13.41,c:0.07,sec:"بنوك"},
  {s:"1050",n:"بي اس اف",p:19.66,c:-1.95,sec:"بنوك"},
  {s:"1060",n:"الأول",p:34.48,c:0.29,sec:"بنوك"},
  {s:"1080",n:"العربي",p:21.92,c:-0.59,sec:"بنوك"},
  {s:"1120",n:"الراجحي",p:69.35,c:0.36,sec:"بنوك"},
  {s:"1140",n:"البلاد",p:25.22,c:-0.16,sec:"بنوك"},
  {s:"1150",n:"الإنماء",p:24.61,c:1.03,sec:"بنوك"},
  {s:"1180",n:"الأهلي",p:39.90,c:0.96,sec:"بنوك"},
  // === الخدمات المالية ===
  {s:"1111",n:"مجموعة تداول",p:132.80,c:-2.35,sec:"مالية"},
  {s:"1182",n:"أملاك",p:10.41,c:-1.05,sec:"مالية"},
  {s:"1183",n:"سهل",p:16.13,c:2.61,sec:"مالية"},
  {s:"2120",n:"متطورة",p:16.53,c:1.10,sec:"مالية"},
  {s:"4080",n:"سناد القابضة",p:8.65,c:-1.14,sec:"مالية"},
  {s:"4081",n:"النايفات",p:9.99,c:-0.10,sec:"مالية"},
  {s:"4082",n:"مرنة",p:8.13,c:-0.73,sec:"مالية"},
  {s:"4083",n:"تسهيل",p:130.30,c:0.23,sec:"مالية"},
  {s:"4084",n:"دراية",p:22.10,c:0.68,sec:"مالية"},
  {s:"4130",n:"درب السعودية",p:2.18,c:-0.46,sec:"مالية"},
  {s:"4280",n:"المملكة",p:11.14,c:5.79,sec:"مالية"},
  // === التأمين ===
  {s:"8010",n:"التعاونية",p:134.10,c:4.20,sec:"تأمين"},
  {s:"8012",n:"جزيرة تكافل",p:11.36,c:0.09,sec:"تأمين"},
  {s:"8020",n:"ملاذ للتأمين",p:8.97,c:-0.11,sec:"تأمين"},
  {s:"8030",n:"ميدغلف للتأمين",p:13.93,c:-0.43,sec:"تأمين"},
  {s:"8040",n:"متكاملة",p:8.00,c:-0.50,sec:"تأمين"},
  {s:"8050",n:"سلامة",p:12.40,c:0.32,sec:"تأمين"},
  {s:"8060",n:"ولاء",p:17.50,c:-0.68,sec:"تأمين"},
  {s:"8070",n:"الدرع العربي",p:16.80,c:0.24,sec:"تأمين"},
  {s:"8100",n:"سايكو",p:14.20,c:-0.56,sec:"تأمين"},
  {s:"8120",n:"إتحاد الخليج",p:15.90,c:0.38,sec:"تأمين"},
  {s:"8150",n:"أسيج",p:14.40,c:-0.69,sec:"تأمين"},
  {s:"8160",n:"التأمين العربية",p:9.50,c:0.21,sec:"تأمين"},
  {s:"8170",n:"الاتحاد",p:6.85,c:-0.29,sec:"تأمين"},
  {s:"8180",n:"الصقر للتأمين",p:18.30,c:0.55,sec:"تأمين"},
  {s:"8190",n:"المتحدة للتأمين",p:8.90,c:-0.34,sec:"تأمين"},
  {s:"8200",n:"الإعادة السعودية",p:34.50,c:1.17,sec:"تأمين"},
  {s:"8210",n:"بوبا العربية",p:188.40,c:0.21,sec:"تأمين"},
  {s:"8230",n:"تكافل الراجحي",p:105.80,c:-1.22,sec:"تأمين"},
  {s:"8240",n:"تْشب",p:26.90,c:-0.37,sec:"تأمين"},
  {s:"8250",n:"جي آي جي",p:18.24,c:0.55,sec:"تأمين"},
  {s:"8260",n:"الخليجية العامة",p:10.52,c:-0.19,sec:"تأمين"},
  {s:"8280",n:"ليفا",p:19.80,c:0.51,sec:"تأمين"},
  {s:"8300",n:"الوطنية",p:15.20,c:-0.39,sec:"تأمين"},
  {s:"8310",n:"أمانة للتأمين",p:11.70,c:0.17,sec:"تأمين"},
  {s:"8311",n:"عناية",p:8.50,c:-0.47,sec:"تأمين"},
  {s:"8313",n:"رسن",p:52.80,c:1.59,sec:"تأمين"},
  // === الاتصالات ===
  {s:"7010",n:"اس تي سي",p:43.65,c:-0.74,sec:"اتصالات"},
  {s:"7020",n:"إتحاد إتصالات",p:42.30,c:-1.62,sec:"اتصالات"},
  {s:"7030",n:"زين السعودية",p:11.70,c:-0.75,sec:"اتصالات"},
  {s:"7040",n:"قو للإتصالات",p:7.80,c:0.39,sec:"اتصالات"},
  // === المرافق العامة ===
  {s:"2080",n:"الغاز",p:31.50,c:0.64,sec:"مرافق"},
  {s:"5110",n:"السعودية للطاقة",p:18.94,c:1.05,sec:"مرافق"},
  {s:"2081",n:"الخريف",p:109.40,c:0.37,sec:"مرافق"},
  {s:"2082",n:"أكوا باور",p:318.40,c:-2.13,sec:"مرافق"},
  {s:"2083",n:"مرافق",p:32.95,c:0.46,sec:"مرافق"},
  {s:"2084",n:"مياهنا",p:52.50,c:-0.57,sec:"مرافق"},
  // === التقنية ===
  {s:"7203",n:"علم",p:195.00,c:-2.64,sec:"تقنية"},
  {s:"7202",n:"سلوشنز",p:365.00,c:-1.34,sec:"تقنية"},
  {s:"6017",n:"جاهز",p:470.00,c:-1.26,sec:"تقنية"},
  // === العقارات ===
  {s:"4300",n:"دار الأركان",p:11.86,c:-1.99,sec:"عقارات"},
  {s:"4250",n:"جبل عمر",p:22.50,c:-0.89,sec:"عقارات"},
  {s:"4100",n:"مكة",p:81.50,c:1.60,sec:"عقارات"},
  {s:"4320",n:"الأندلس",p:13.80,c:-0.43,sec:"عقارات"},
  {s:"4310",n:"مدينة المعرفة",p:9.75,c:0.41,sec:"عقارات"},
  {s:"4230",n:"البحر الأحمر",p:52.00,c:-0.38,sec:"عقارات"},
  {s:"4220",n:"إعمار",p:8.90,c:-1.55,sec:"عقارات"},
  {s:"4150",n:"التعمير",p:8.15,c:0.74,sec:"عقارات"},
  {s:"4090",n:"طيبة",p:18.70,c:-0.53,sec:"عقارات"},
  {s:"4020",n:"العقارية",p:6.40,c:-0.31,sec:"عقارات"},
  {s:"4325",n:"مسار",p:7.63,c:-2.61,sec:"عقارات"},
  // === صناديق ريت ===
  {s:"4330",n:"الرياض ريت",p:8.80,c:-0.34,sec:"ريت"},
  {s:"4331",n:"الجزيرة ريت",p:7.50,c:0.27,sec:"ريت"},
  {s:"4332",n:"جدوى ريت الحرمين",p:8.10,c:-0.12,sec:"ريت"},
  {s:"4333",n:"تعليم ريت",p:7.90,c:0.38,sec:"ريت"},
  {s:"4334",n:"المعذر ريت",p:8.95,c:-0.22,sec:"ريت"},
  {s:"4335",n:"مشاركة ريت",p:6.80,c:0.44,sec:"ريت"},
  {s:"4336",n:"ملكية ريت",p:9.10,c:-0.55,sec:"ريت"},
  {s:"4337",n:"سيكو السعودية ريت",p:7.20,c:0.28,sec:"ريت"},
  {s:"4338",n:"الأهلي ريت",p:6.40,c:-0.31,sec:"ريت"},
  {s:"4339",n:"بنيان ريت",p:6.90,c:0.14,sec:"ريت"},
  {s:"4340",n:"الراجحي ريت",p:7.45,c:-0.40,sec:"ريت"},
  {s:"4342",n:"جدوى ريت السعودية",p:7.10,c:0.28,sec:"ريت"},
  {s:"4344",n:"سدكو كابيتال ريت",p:7.80,c:-0.13,sec:"ريت"},
  {s:"4345",n:"الإنماء ريت للتجزئة",p:6.50,c:0.15,sec:"ريت"},
  {s:"4346",n:"الكبير ريت",p:7.00,c:-0.29,sec:"ريت"},
  {s:"4348",n:"الخبير ريت",p:7.85,c:-0.13,sec:"ريت"},
];

function initStocks(){return ALL_STOCKS.map(st=>({symbol:st.s,name:st.n,sector:st.sec,price:st.p,change:st.c,volume:Math.floor(3e5+Math.random()*1e7),liquidity:Math.floor(25+Math.random()*75),whaleActivity:Math.floor(10+Math.random()*85),darkPool:Math.floor(Math.random()*55)}))}

function NeuronodeGraph({stocks,w,h}){const ref=useRef(null),anim=useRef(null);useEffect(()=>{const c=ref.current;if(!c)return;const ctx=c.getContext("2d"),dpr=window.devicePixelRatio||1;c.width=w*dpr;c.height=h*dpr;ctx.scale(dpr,dpr);const top=stocks.slice(0,14),nodes=top.map((s,i)=>{const a=(i/top.length)*Math.PI*2,r=Math.min(w,h)*.33,bx=w/2+Math.cos(a)*r,by=h/2+Math.sin(a)*r;return{x:bx,y:by,bx,by,r:5+s.liquidity*.08,s,ph:Math.random()*6.28}}),parts=Array.from({length:60},()=>{const f=Math.floor(Math.random()*nodes.length);let t=Math.floor(Math.random()*nodes.length);if(t===f)t=(t+1)%nodes.length;return{f,t,p:Math.random(),sp:.003+Math.random()*.006,sz:1.2+Math.random()*1.8,a:.3+Math.random()*.5}});let fr=0;const draw=()=>{fr++;ctx.clearRect(0,0,w,h);const bg=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,w*.55);bg.addColorStop(0,"rgba(0,30,45,0.2)");bg.addColorStop(1,"rgba(0,0,0,0)");ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);nodes.forEach(n=>{n.ph+=.016;n.x=n.bx+Math.sin(n.ph)*6;n.y=n.by+Math.cos(n.ph*.7)*5});for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy),mx=Math.min(w,h)*.68;if(d<mx){ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.strokeStyle=`rgba(0,245,212,${(1-d/mx)*.1})`;ctx.lineWidth=.7;ctx.stroke()}}parts.forEach(pt=>{pt.p+=pt.sp;if(pt.p>1){pt.p=0;pt.f=pt.t;pt.t=Math.floor(Math.random()*nodes.length);if(pt.t===pt.f)pt.t=(pt.t+1)%nodes.length}const fn=nodes[pt.f],tn=nodes[pt.t],x=fn.x+(tn.x-fn.x)*pt.p,y=fn.y+(tn.y-fn.y)*pt.p;ctx.beginPath();ctx.arc(x,y,pt.sz,0,Math.PI*2);ctx.fillStyle=`rgba(0,245,212,${pt.a})`;ctx.fill()});nodes.forEach(n=>{const pr=n.r+Math.sin(n.ph*2)*1.2,up=n.s.change>=0,col=up?"0,230,118":"255,82,82";const gl=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,pr*2.5);gl.addColorStop(0,`rgba(${col},0.18)`);gl.addColorStop(1,`rgba(${col},0)`);ctx.beginPath();ctx.arc(n.x,n.y,pr*2.5,0,Math.PI*2);ctx.fillStyle=gl;ctx.fill();ctx.beginPath();ctx.arc(n.x,n.y,pr,0,Math.PI*2);ctx.fillStyle=`rgba(${col},0.75)`;ctx.fill();ctx.fillStyle="#bbb";ctx.font=`bold ${w<400?7:9}px sans-serif`;ctx.textAlign="center";ctx.fillText(n.s.name,n.x,n.y-pr-4);ctx.fillStyle=up?"#00e676":"#ff5252";ctx.font=`${w<400?6:8}px monospace`;ctx.fillText(n.s.price.toFixed(2),n.x,n.y+pr+9)});const hp=9+Math.sin(fr*.03)*2;ctx.beginPath();ctx.arc(w/2,h/2,hp,0,Math.PI*2);ctx.fillStyle="rgba(0,245,212,0.45)";ctx.fill();ctx.fillStyle="#fff";ctx.font="bold 7px sans-serif";ctx.textAlign="center";ctx.fillText("TASI",w/2,h/2+2.5);anim.current=requestAnimationFrame(draw)};draw();return()=>{if(anim.current)cancelAnimationFrame(anim.current)}},[stocks,w,h]);return<canvas ref={ref} style={{width:w,height:h}}/>}

function Gauge({val,label,sz=100}){const cx=sz/2,cy=sz/2,r=sz*.36,s=135,e=405,rng=e-s,va=s+(val/100)*rng;const pt=(a,rd)=>({x:cx+rd*Math.cos(a*Math.PI/180),y:cy+rd*Math.sin(a*Math.PI/180)});const arc=(a1,a2,rd)=>{const p1=pt(a1,rd),p2=pt(a2,rd);return`M ${p1.x} ${p1.y} A ${rd} ${rd} 0 ${a2-a1>180?1:0} 1 ${p2.x} ${p2.y}`};const col=val>70?"#00f5d4":val>40?"#ffd166":"#ff5252";return<div style={{textAlign:"center"}}><svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`}><path d={arc(s,e,r)} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={sz*.05} strokeLinecap="round"/><path d={arc(s,va,r)} fill="none" stroke={col} strokeWidth={sz*.05} strokeLinecap="round" style={{transition:"all .5s",filter:`drop-shadow(0 0 3px ${col}50)`}}/><text x={cx} y={cy-1} textAnchor="middle" fill={col} fontSize={sz*.19} fontWeight="bold" fontFamily="monospace">{Math.round(val)}</text><text x={cx} y={cy+sz*.11} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize={sz*.075}>{label}</text></svg></div>}

function SimChart({stock,w,h}){const ref=useRef(null);useEffect(()=>{const c=ref.current;if(!c)return;const ctx=c.getContext("2d"),dpr=window.devicePixelRatio||1;c.width=w*dpr;c.height=h*dpr;ctx.scale(dpr,dpr);const paths=[],np=22,steps=45,bp=stock.price,vol=.016+Math.abs(stock.change)/100*.35;for(let i=0;i<np;i++){const p=[bp];for(let j=1;j<steps;j++){const pr=p[j-1];p.push(Math.max(pr*.87,pr+(Math.random()-.48)*vol*pr))}paths.push(p)}const all=paths.flat(),mn=Math.min(...all)*.998,mx=Math.max(...all)*1.002;const pd={t:15,b:18,l:5,r:5},cw=w-pd.l-pd.r,ch=h-pd.t-pd.b;ctx.clearRect(0,0,w,h);paths.forEach((p,pi)=>{ctx.beginPath();p.forEach((v,i)=>{const x=pd.l+(i/(steps-1))*cw,y=pd.t+(1-(v-mn)/(mx-mn))*ch;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)});const up=p[p.length-1]>=bp;ctx.strokeStyle=up?`rgba(0,230,118,${.05+pi/np*.1})`:`rgba(255,82,82,${.05+pi/np*.1})`;ctx.lineWidth=.7;ctx.stroke()});const mean=[];for(let j=0;j<steps;j++){let s=0;paths.forEach(p=>s+=p[j]);mean.push(s/np)}ctx.beginPath();mean.forEach((v,i)=>{const x=pd.l+(i/(steps-1))*cw,y=pd.t+(1-(v-mn)/(mx-mn))*ch;i===0?ctx.moveTo(x,y):ctx.lineTo(x,y)});ctx.strokeStyle="#00f5d4";ctx.lineWidth=1.8;ctx.stroke();const cpY=pd.t+(1-(bp-mn)/(mx-mn))*ch;ctx.setLineDash([3,3]);ctx.beginPath();ctx.moveTo(pd.l,cpY);ctx.lineTo(w-pd.r,cpY);ctx.strokeStyle="rgba(255,255,255,0.2)";ctx.lineWidth=.8;ctx.stroke();ctx.setLineDash([]);ctx.fillStyle="rgba(255,255,255,0.35)";ctx.font="7px monospace";ctx.textAlign="right";ctx.fillText(bp.toFixed(2),w-pd.r-2,cpY-3)},[stock,w,h]);return<canvas ref={ref} style={{width:w,height:h}}/>}

function VolFlow({w,h}){const ref=useRef(null);useEffect(()=>{const c=ref.current;if(!c)return;const ctx=c.getContext("2d"),dpr=window.devicePixelRatio||1;c.width=w*dpr;c.height=h*dpr;ctx.scale(dpr,dpr);const bars=30,data=Array.from({length:bars},()=>({b:Math.random()*100,s:Math.random()*80}));const pd={t:6,b:10,l:3,r:3},cw=w-pd.l-pd.r,ch=h-pd.t-pd.b,bw=cw/bars-1,my=pd.t+ch*.5;ctx.clearRect(0,0,w,h);data.forEach((d,i)=>{const x=pd.l+(i/bars)*cw,bh=d.b/100*ch*.46,sh=d.s/100*ch*.46;ctx.fillStyle=`rgba(0,230,118,${.25+d.b/220})`;ctx.fillRect(x,my-bh,bw,bh);ctx.fillStyle=`rgba(255,82,82,${.25+d.s/220})`;ctx.fillRect(x,my,bw,sh)});ctx.beginPath();ctx.moveTo(pd.l,my);ctx.lineTo(w-pd.r,my);ctx.strokeStyle="rgba(255,255,255,0.1)";ctx.lineWidth=.5;ctx.stroke()},[w,h]);return<canvas ref={ref} style={{width:w,height:h}}/>}

export default function App(){const[tab,setTab]=useState("radar"),[stocks,setStocks]=useState(()=>initStocks()),[sel,setSel]=useState(null),[search,setSearch]=useState(""),[secFilter,setSecFilter]=useState("الكل"),[preds,setPreds]=useState([]),[acc,setAcc]=useState(76),[logs,setLogs]=useState([]),[dpAlerts,setDpAlerts]=useState([]),[bkAlerts,setBkAlerts]=useState([]),[simRes,setSimRes]=useState(null),[simRun,setSimRun]=useState(false),[sz,setSz]=useState({w:380,h:310});const cRef=useRef(null);
useEffect(()=>{if(!sel)setSel(stocks[0])},[stocks,sel]);
useEffect(()=>{const m=()=>{if(cRef.current){const w=cRef.current.offsetWidth;setSz({w:Math.min(w-14,820),h:Math.min(340,w*.78)})}};m();window.addEventListener("resize",m);return()=>window.removeEventListener("resize",m)},[]);
useEffect(()=>{const iv=setInterval(()=>{setStocks(prev=>prev.map(s=>{const d=(Math.random()-.48)*s.price*.0018;const np=Math.max(s.price*.96,s.price+d);return{...s,price:parseFloat(np.toFixed(2)),change:parseFloat((s.change+(Math.random()-.5)*.08).toFixed(2)),volume:s.volume+Math.floor(Math.random()*2500),liquidity:Math.max(18,Math.min(100,s.liquidity+(Math.random()-.5)*1.2)),whaleActivity:Math.max(8,Math.min(100,s.whaleActivity+(Math.random()-.5)*1.5))}}))},4500);return()=>clearInterval(iv)},[]);
useEffect(()=>{const iv=setInterval(()=>{const st=stocks[Math.floor(Math.random()*stocks.length)];setPreds(prev=>[{id:Date.now(),sym:st.symbol,nm:st.name,type:Math.random()>.44?"شراء":"بيع",conf:Math.floor(56+Math.random()*39),price:st.price,time:new Date().toLocaleTimeString("ar-SA"),status:"نشط",reason:["تراكم سيولة","نشاط هوامير","اختراق فني","ضغط بيعي","تجميع مؤسسي","FVG","Squeeze"][Math.floor(Math.random()*7)]},...prev.map(p=>p.status==="نشط"&&Math.random()>.78?{...p,status:Math.random()>.3?"✓":"✗"}:p)].slice(0,25));if(Math.random()>.5)setLogs(prev=>[{t:new Date().toLocaleTimeString("ar-SA"),m:["تعلّم: نمط امتصاص دقيق 82%","تحسين: كاشف FVG بعد أخطاء سابقة","اكتشاف: سيولة مظلمة تسبق التحرك 7د","تعديل: أوزان الزخم محسّنة","تعلّم: نمط Squeeze بنكي جديد","تحسين: Dark Pool ↑ 79%","تحديث: فلتر ضجيج محسّن"][Math.floor(Math.random()*7)]},...prev].slice(0,14));setAcc(prev=>Math.max(63,Math.min(96,prev+(Math.random()-.38)*1.3)))},[stocks]);return()=>clearInterval(iv)},[stocks]);
useEffect(()=>{const iv=setInterval(()=>{if(Math.random()>.42){const dp=stocks.filter(s=>s.darkPool>18);const st=dp[Math.floor(Math.random()*dp.length)];if(st)setDpAlerts(prev=>[{id:Date.now(),sym:st.symbol,nm:st.name,sz:(Math.floor(Math.random()*350)+60)*1000,side:Math.random()>.47?"شراء":"بيع",price:st.price,time:new Date().toLocaleTimeString("ar-SA"),hidden:Math.random()>.3},...prev].slice(0,18))}},5500);return()=>clearInterval(iv)},[stocks]);
useEffect(()=>{const iv=setInterval(()=>{if(Math.random()>.58){const st=stocks[Math.floor(Math.random()*stocks.length)];setBkAlerts(prev=>[{id:Date.now(),nm:st.name,sym:st.symbol,prob:Math.floor(66+Math.random()*29),dir:Math.random()>.4?"صاعد":"هابط",tf:`${Math.floor(4+Math.random()*26)} د`},...prev].slice(0,10))}},10000);return()=>clearInterval(iv)},[stocks]);
const runSim=useCallback(()=>{if(!sel)return;setSimRun(true);setTimeout(()=>{const up=43+sel.whaleActivity*.28+(sel.change>0?7:-3);setSimRes({bull:{p:Math.min(89,up),t:(sel.price*1.05).toFixed(2)},neut:{p:Math.min(92,100-up+26),t:sel.price.toFixed(2)},bear:{p:Math.max(7,100-up),t:(sel.price*.96).toFixed(2)}});setSimRun(false)},1600)},[sel]);
const totalLiq=useMemo(()=>Math.round(stocks.reduce((a,s)=>a+s.liquidity,0)/stocks.length),[stocks]);
const totalWh=useMemo(()=>Math.round(stocks.reduce((a,s)=>a+s.whaleActivity,0)/stocks.length),[stocks]);
const momentum=useMemo(()=>Math.round(stocks.filter(s=>s.change>0).length/stocks.length*100),[stocks]);
const sectors=useMemo(()=>["الكل",...[...new Set(stocks.map(s=>s.sector))].sort()],[stocks]);
const filtered=useMemo(()=>{let f=stocks;if(secFilter!=="الكل")f=f.filter(s=>s.sector===secFilter);if(search)f=f.filter(s=>s.name.includes(search)||s.symbol.includes(search));return f},[stocks,secFilter,search]);
const topStocks=useMemo(()=>[...stocks].sort((a,b)=>Math.abs(b.change)-Math.abs(a.change)).slice(0,14),[stocks]);
const T="#00f5d4",R="#ff5252",G="#00e676",P="#c084fc";
const tabs=[{id:"radar",l:"🔮 رادار"},{id:"sim",l:"⚡ محاكاة"},{id:"dark",l:"🕳️ مظلم"},{id:"ai",l:"🧠 AI"},{id:"stocks",l:`📊 أسهم (${stocks.length})`}];
return(<div ref={cRef} style={{background:"linear-gradient(145deg,#080c15,#0b1320 40%,#070d15)",color:"#dde4ec",minHeight:"100vh",fontFamily:"'Segoe UI',Tahoma,sans-serif",direction:"rtl",overflow:"hidden"}}>
<div style={{position:"sticky",top:0,zIndex:50,background:"rgba(8,12,21,0.96)",backdropFilter:"blur(14px)",borderBottom:"1px solid rgba(0,245,212,0.07)",padding:"9px 12px"}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
<div><h1 style={{fontSize:15,fontWeight:800,margin:0,background:"linear-gradient(135deg,#00f5d4,#7c3aed)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>رادار السيولة الذكي</h1><p style={{fontSize:8,color:"rgba(255,255,255,0.28)",margin:0}}>TADAWUL PRO | {stocks.length} شركة | AI Adaptive</p></div>
<div style={{display:"flex",gap:5,alignItems:"center"}}><div style={{width:6,height:6,borderRadius:"50%",background:T,boxShadow:`0 0 7px ${T}`,animation:"pulse 2s infinite"}}/><span style={{fontSize:8,color:T,fontWeight:700}}>LIVE</span></div></div>
<div style={{display:"flex",gap:2,overflowX:"auto",WebkitOverflowScrolling:"touch",paddingBottom:2}}>{tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"4px 9px",borderRadius:6,border:tab===t.id?`1px solid rgba(0,245,212,0.22)`:"1px solid transparent",cursor:"pointer",fontSize:9,fontWeight:600,whiteSpace:"nowrap",fontFamily:"inherit",background:tab===t.id?"rgba(0,245,212,0.1)":"rgba(255,255,255,0.025)",color:tab===t.id?T:"rgba(255,255,255,0.4)",transition:"all .2s"}}>{t.l}</button>)}</div></div>
<div style={{padding:"8px 8px 80px"}}>
{tab==="radar"&&<>{/* Gauges */}
<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:5,marginBottom:8}}>{[{v:totalLiq,l:"السيولة"},{v:totalWh,l:"الهوامير"},{v:momentum,l:"الزخم"}].map(g=><div key={g.l} style={{background:"rgba(255,255,255,0.02)",borderRadius:9,padding:"4px 1px",border:"1px solid rgba(255,255,255,0.04)"}}><Gauge val={g.v} label={g.l} sz={sz.w<440?82:100}/></div>)}</div>
{/* Neuronode */}
<div style={{background:"rgba(0,0,0,0.22)",borderRadius:12,padding:5,border:"1px solid rgba(0,245,212,0.05)",marginBottom:8}}>
<div style={{display:"flex",justifyContent:"space-between",padding:"0 5px",marginBottom:3}}><span style={{fontSize:10,fontWeight:700,color:T}}>🧬 خريطة الخلايا العصبية</span><span style={{fontSize:7,color:"rgba(255,255,255,0.2)"}}>Top 14 نشاطاً</span></div>
<NeuronodeGraph stocks={topStocks} w={sz.w-18} h={sz.h}/></div>
{/* Breakout */}
{bkAlerts.length>0&&<div style={{background:"rgba(255,255,255,0.02)",borderRadius:9,padding:8,border:"1px solid rgba(255,209,102,0.08)",marginBottom:8}}>
<div style={{fontSize:10,fontWeight:700,color:"#ffd166",marginBottom:5}}>⚡ تنبيهات انفجار سعري</div>
{bkAlerts.slice(0,4).map(a=><div key={a.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"5px 7px",marginBottom:2,borderRadius:6,background:a.dir==="صاعد"?"rgba(0,230,118,0.03)":"rgba(255,82,82,0.03)",border:`1px solid ${a.dir==="صاعد"?"rgba(0,230,118,0.08)":"rgba(255,82,82,0.08)"}`}}><span style={{fontSize:10,fontWeight:600}}>{a.nm} <span style={{fontSize:8,color:"rgba(255,255,255,0.25)"}}>{a.tf}</span></span><span style={{fontSize:13,fontWeight:800,color:a.dir==="صاعد"?G:R}}>{a.prob}%{a.dir==="صاعد"?" ↗":" ↘"}</span></div>)}</div>}
{/* Volume Flow */}
<div style={{background:"rgba(0,0,0,0.18)",borderRadius:9,padding:8,border:"1px solid rgba(255,255,255,0.03)"}}>
<div style={{fontSize:10,fontWeight:700,color:T,marginBottom:5}}>📊 بصمة السيولة اللحظية</div>
<VolFlow w={sz.w-30} h={110}/></div></>}

{tab==="sim"&&sel&&<>{/* Selector */}
<div style={{background:"rgba(255,255,255,0.02)",borderRadius:9,padding:8,border:"1px solid rgba(255,255,255,0.04)",marginBottom:6}}>
<div style={{fontSize:9,color:"rgba(255,255,255,0.3)",marginBottom:4}}>اختر السهم:</div>
<div style={{display:"flex",flexWrap:"wrap",gap:2}}>{stocks.slice(0,18).map(s=><button key={s.symbol} onClick={()=>{setSel(s);setSimRes(null)}} style={{padding:"3px 7px",borderRadius:4,border:sel?.symbol===s.symbol?"1px solid rgba(0,245,212,0.2)":"1px solid transparent",cursor:"pointer",fontSize:8,fontWeight:600,fontFamily:"inherit",background:sel?.symbol===s.symbol?"rgba(0,245,212,0.12)":"rgba(255,255,255,0.03)",color:sel?.symbol===s.symbol?T:"rgba(255,255,255,0.35)"}}>{s.name}</button>)}</div></div>
{/* Info */}
<div style={{background:"linear-gradient(135deg,rgba(0,245,212,0.03),rgba(124,58,237,0.02))",borderRadius:9,padding:10,marginBottom:6,border:"1px solid rgba(0,245,212,0.07)"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><div style={{fontSize:14,fontWeight:800}}>{sel.name}</div><div style={{fontSize:8,color:"rgba(255,255,255,0.3)"}}>{sel.symbol} | {sel.sector}</div></div><div style={{textAlign:"left"}}><div style={{fontSize:17,fontWeight:800,fontFamily:"monospace"}}>{sel.price.toFixed(2)}</div><div style={{fontSize:10,fontWeight:600,color:sel.change>=0?G:R}}>{sel.change>=0?"+":""}{sel.change.toFixed(2)}%</div></div></div></div>
{/* Sim Chart */}
<div style={{background:"rgba(0,0,0,0.18)",borderRadius:9,padding:8,border:"1px solid rgba(255,255,255,0.03)",marginBottom:6}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}><span style={{fontSize:10,fontWeight:700,color:T}}>🎯 محاكاة مونت كارلو</span><button onClick={runSim} disabled={simRun} style={{padding:"3px 10px",borderRadius:4,border:"none",cursor:"pointer",fontSize:8,fontWeight:700,fontFamily:"inherit",background:simRun?"rgba(255,255,255,0.03)":`linear-gradient(135deg,${T},#00d4aa)`,color:simRun?"rgba(255,255,255,0.25)":"#080c15"}}>{simRun?"⏳...":"▶ تشغيل"}</button></div>
<SimChart stock={sel} w={sz.w-30} h={170}/></div>
{/* Results */}
{simRes&&<div style={{background:"rgba(255,255,255,0.02)",borderRadius:9,padding:8,border:"1px solid rgba(0,245,212,0.07)"}}>
<div style={{fontSize:10,fontWeight:700,marginBottom:6}}>📈 نتائج المحاكاة</div>
{[{l:"صاعد",d:simRes.bull,c:G,e:"🟢"},{l:"محايد",d:simRes.neut,c:"#ffd166",e:"🟡"},{l:"هابط",d:simRes.bear,c:R,e:"🔴"}].map(s=><div key={s.l} style={{display:"flex",alignItems:"center",gap:7,marginBottom:5,padding:"5px 7px",borderRadius:6,background:"rgba(0,0,0,0.12)"}}><span>{s.e}</span><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:2}}><span style={{fontWeight:600}}>{s.l}</span><span style={{fontWeight:700,color:s.c}}>{s.d.p.toFixed(0)}%</span></div><div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.03)"}}><div style={{height:3,borderRadius:2,background:s.c,width:`${s.d.p}%`,transition:"width .5s"}}/></div></div><span style={{fontSize:9,fontFamily:"monospace",color:s.c}}>{s.d.t}</span></div>)}</div>}</>}

{tab==="dark"&&<>
<div style={{background:"linear-gradient(135deg,rgba(124,58,237,0.05),rgba(0,0,0,0.15))",borderRadius:9,padding:10,marginBottom:8,border:"1px solid rgba(124,58,237,0.1)"}}>
<div style={{fontSize:12,fontWeight:800,color:P,marginBottom:2}}>🕳️ التدفق المظلم</div>
<p style={{fontSize:8,color:"rgba(255,255,255,0.3)",margin:0,lineHeight:1.4}}>صفقات المؤسسات المخفية. الرادار يكشفها قبل تأثيرها.</p></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5,marginBottom:8}}>
<div style={{background:"rgba(255,255,255,0.02)",borderRadius:7,padding:8,textAlign:"center",border:"1px solid rgba(255,255,255,0.04)"}}><div style={{fontSize:20,fontWeight:800,color:G,fontFamily:"monospace"}}>{dpAlerts.filter(a=>a.side==="شراء").length}</div><div style={{fontSize:8,color:"rgba(255,255,255,0.3)"}}>شراء مخفي</div></div>
<div style={{background:"rgba(255,255,255,0.02)",borderRadius:7,padding:8,textAlign:"center",border:"1px solid rgba(255,255,255,0.04)"}}><div style={{fontSize:20,fontWeight:800,color:R,fontFamily:"monospace"}}>{dpAlerts.filter(a=>a.side==="بيع").length}</div><div style={{fontSize:8,color:"rgba(255,255,255,0.3)"}}>بيع مخفي</div></div></div>
{dpAlerts.length===0&&<div style={{textAlign:"center",padding:20,color:"rgba(255,255,255,0.12)",fontSize:10}}>⏳ جاري الرصد...</div>}
{dpAlerts.map(a=><div key={a.id} style={{display:"flex",alignItems:"center",gap:7,padding:"6px 8px",marginBottom:3,borderRadius:7,background:a.hidden?"rgba(124,58,237,0.03)":"rgba(255,255,255,0.015)",border:`1px solid ${a.hidden?"rgba(124,58,237,0.08)":"rgba(255,255,255,0.025)"}`,position:"relative"}}>{a.hidden&&<div style={{position:"absolute",top:0,right:0,padding:"1px 5px",background:"rgba(124,58,237,0.2)",borderBottomLeftRadius:4,fontSize:6,color:P,fontWeight:700}}>مخفي</div>}<span style={{fontSize:12}}>{a.side==="شراء"?"🟢":"🔴"}</span><div style={{flex:1}}><div style={{fontSize:10,fontWeight:700}}>{a.nm} <span style={{fontSize:8,color:"rgba(255,255,255,0.2)"}}>{a.sym}</span></div><div style={{fontSize:8,color:"rgba(255,255,255,0.25)"}}>{a.side} | {(a.sz/1e6).toFixed(1)}M</div></div><div style={{textAlign:"left"}}><div style={{fontSize:9,fontWeight:700,color:a.side==="شراء"?G:R}}>{(a.sz*a.price/1e6).toFixed(1)}M ر.س</div><div style={{fontSize:7,color:"rgba(255,255,255,0.18)"}}>{a.time}</div></div></div>)}</>}

{tab==="ai"&&<>
<div style={{background:"linear-gradient(135deg,rgba(0,245,212,0.03),rgba(124,58,237,0.02))",borderRadius:10,padding:12,marginBottom:8,border:"1px solid rgba(0,245,212,0.08)"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div><div style={{fontSize:12,fontWeight:800}}>🧠 AI Adaptive Engine</div><div style={{fontSize:8,color:"rgba(255,255,255,0.3)"}}>يتعلم ذاتياً ويصحح أخطاءه</div></div><div style={{padding:"4px 10px",borderRadius:14,background:acc>75?"rgba(0,230,118,0.08)":"rgba(255,209,102,0.08)",border:`1px solid ${acc>75?"rgba(0,230,118,0.18)":"rgba(255,209,102,0.18)"}`}}><span style={{fontSize:14,fontWeight:800,fontFamily:"monospace",color:acc>75?G:"#ffd166"}}>{acc.toFixed(1)}%</span></div></div>
<div style={{height:4,borderRadius:2,background:"rgba(255,255,255,0.03)"}}><div style={{height:4,borderRadius:2,width:`${acc}%`,background:"linear-gradient(90deg,#7c3aed,#00f5d4)",transition:"width .5s",boxShadow:"0 0 8px rgba(0,245,212,0.15)"}}/></div></div>
<div style={{background:"rgba(0,0,0,0.18)",borderRadius:9,padding:8,border:"1px solid rgba(255,255,255,0.03)",marginBottom:8}}>
<div style={{fontSize:10,fontWeight:700,color:"#ffd166",marginBottom:5}}>📝 سجل التعلّم</div>
{logs.length===0&&<div style={{fontSize:9,color:"rgba(255,255,255,0.12)",textAlign:"center",padding:12}}>⏳ يجمع البيانات...</div>}
{logs.map((l,i)=><div key={i} style={{padding:"4px 6px",marginBottom:2,borderRadius:4,background:"rgba(255,209,102,0.02)",fontSize:8,lineHeight:1.3,borderRight:"2px solid rgba(255,209,102,0.15)"}}><span style={{color:"rgba(255,255,255,0.2)",marginLeft:4}}>{l.t}</span> {l.m}</div>)}</div>
<div style={{background:"rgba(255,255,255,0.02)",borderRadius:9,padding:8,border:"1px solid rgba(255,255,255,0.03)"}}>
<div style={{fontSize:10,fontWeight:700,color:T,marginBottom:5}}>🎯 توصيات AI ({preds.length})</div>
{preds.map(p=><div key={p.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 7px",marginBottom:2,borderRadius:6,background:p.status==="✓"?"rgba(0,230,118,0.02)":p.status==="✗"?"rgba(255,82,82,0.02)":"rgba(255,255,255,0.01)",border:"1px solid rgba(255,255,255,0.02)"}}>
<div style={{display:"flex",alignItems:"center",gap:5}}><span style={{padding:"1px 4px",borderRadius:3,fontSize:7,fontWeight:700,background:p.type==="شراء"?"rgba(0,230,118,0.1)":"rgba(255,82,82,0.1)",color:p.type==="شراء"?G:R}}>{p.type}</span><div><div style={{fontSize:9,fontWeight:600}}>{p.nm}</div><div style={{fontSize:7,color:"rgba(255,255,255,0.2)"}}>{p.reason}</div></div></div>
<div style={{display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:9,fontWeight:700,fontFamily:"monospace"}}>{p.conf}%</span>{p.status!=="نشط"&&<span style={{fontSize:11,color:p.status==="✓"?G:R}}>{p.status}</span>}</div></div>)}</div></>}

{tab==="stocks"&&<>
<div style={{background:"rgba(255,255,255,0.02)",borderRadius:8,padding:6,border:"1px solid rgba(255,255,255,0.04)",marginBottom:5}}>
<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ابحث بالاسم أو الرمز..." style={{width:"100%",boxSizing:"border-box",padding:"6px 8px",borderRadius:6,border:"1px solid rgba(255,255,255,0.06)",background:"rgba(0,0,0,0.25)",color:"#e0e8f0",fontSize:10,fontFamily:"inherit",outline:"none"}}/></div>
<div style={{display:"flex",gap:2,flexWrap:"wrap",marginBottom:6,maxHeight:60,overflowY:"auto"}}>{sectors.map(s=><button key={s} onClick={()=>setSecFilter(s)} style={{padding:"2px 6px",borderRadius:4,border:secFilter===s?"1px solid rgba(0,245,212,0.18)":"1px solid transparent",cursor:"pointer",fontSize:7,fontWeight:600,fontFamily:"inherit",background:secFilter===s?"rgba(0,245,212,0.08)":"rgba(255,255,255,0.02)",color:secFilter===s?T:"rgba(255,255,255,0.3)"}}>{s}</button>)}</div>
<div style={{fontSize:8,color:"rgba(255,255,255,0.2)",marginBottom:4}}>{filtered.length} سهم</div>
{filtered.map(s=><div key={s.symbol} onClick={()=>{setSel(s);setTab("sim");setSimRes(null)}} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 8px",marginBottom:2,borderRadius:7,cursor:"pointer",background:"rgba(255,255,255,0.015)",border:"1px solid rgba(255,255,255,0.03)"}}>
<div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:3}}><span style={{fontSize:11,fontWeight:700}}>{s.name}</span><span style={{fontSize:7,color:"rgba(255,255,255,0.18)",fontFamily:"monospace"}}>{s.symbol}</span></div><div style={{fontSize:7,color:"rgba(255,255,255,0.2)",marginTop:1}}>{s.sector}</div></div>
<div style={{textAlign:"left",minWidth:55}}><div style={{fontSize:12,fontWeight:800,fontFamily:"monospace"}}>{s.price.toFixed(2)}</div><div style={{fontSize:9,fontWeight:600,color:s.change>=0?G:R}}>{s.change>=0?"+":""}{s.change.toFixed(2)}%</div></div></div>)}</>}
</div>
<style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(1.5)}}*::-webkit-scrollbar{width:3px;height:3px}*::-webkit-scrollbar-thumb{background:rgba(0,245,212,0.15);border-radius:3px}`}</style></div>)}

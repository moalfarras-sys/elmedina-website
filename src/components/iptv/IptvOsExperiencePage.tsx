import {
  Activity,
  BrainCircuit,
  CloudSun,
  DatabaseZap,
  Film,
  Gamepad2,
  Layers3,
  MonitorPlay,
  RadioTower,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Trophy,
  Tv,
  Wifi,
} from 'lucide-react'

const pillars = [
  {
    icon: Tv,
    title: 'Android TV أولًا',
    body: 'D-pad كامل، Focus Engine، ضغطات ذكية، Back stack تدريجي، وتجربة 10-foot UI مصممة للريموت قبل اللمس.',
  },
  {
    icon: RadioTower,
    title: 'IPTV Server Core',
    body: 'M3U/M3U8، ملفات محلية، Xtream Codes، Auto Detection، تحويل M3U داخليًا إلى Live/Movies/Series/EPG.',
  },
  {
    icon: Activity,
    title: 'Streaming Engine',
    body: 'Media3 ExoPlayer مع HLS/DASH/TS/MP4، اختيار جودة وصوت وترجمات، Buffer Profiles، ومشغلات خارجية VLC/MX.',
  },
  {
    icon: DatabaseZap,
    title: 'Millions Ready',
    body: 'Room + Paging 3 + Incremental Parsing + Background Sync لتصفح 200K قناة و500K عنصر بدون ANR أو Memory spikes.',
  },
]

const architecture = [
  'Kotlin 100% + Jetpack Compose + Material 3 + Compose for TV',
  'MVVM + Clean Architecture + Modular feature boundaries',
  'Hilt DI + Coroutines + Flow state reducers',
  'Room offline cache + DataStore settings + WorkManager sync',
  'Retrofit/OkHttp clients for Xtream, WeatherAPI, API-Football, TMDB/OMDB/Fanart/TVMaze',
  'PagingSource per catalog type with local-first reads and remote refresh jobs',
  'Media3 ExoPlayer factories for HLS, DASH, progressive, subtitle and audio track selection',
  'Telemetry layer for startup time, dropped frames, rebuffer ratio, parser throughput, and ANR sentinels',
]

const homeWidgets = [
  { icon: CloudSun, label: 'Weather OS', detail: 'طقس، حرارة، توقعات، سحب وخلفيات حسب الوقت والحالة.' },
  { icon: Trophy, label: 'Live Matches', detail: 'مباريات، نتائج، أحداث مباشرة، ترتيب، وشعارات الفرق.' },
  { icon: Film, label: 'Latest Drops', detail: 'آخر 20 فيلم، مسلسل، وقناة مباشرة من السيرفر.' },
  { icon: BrainCircuit, label: 'AI Hub', detail: 'Continue Watching، Favorites، Recommended، Surprise Me.' },
]

const modules = [
  {
    title: 'Login OS',
    items: ['Glassmorphism TV login', 'M3U URL/File', 'Xtream credentials', 'QR quick login', 'تحميل بالخلفية بعد الدخول'],
  },
  {
    title: 'Live TV Receiver',
    items: ['Groups عمودية', 'Channels عمودية', 'Preview صامت', 'Mini EPG', 'OK x3 للمفضلة'],
  },
  {
    title: 'Movies & Series',
    items: ['Poster grids', 'Focus preview', 'Seasons/Episodes', 'Trailers', 'Resume watching'],
  },
  {
    title: 'Settings Studio',
    items: ['Themes', 'Parental controls', 'Player tuning', 'Remote mapping', 'Backup/restore'],
  },
]

const performanceRules = [
  'لا يتم تحميل الكتالوج كاملًا في الذاكرة: parsing incremental إلى Room batches.',
  'كل شاشة تقرأ من قاعدة محلية reactive، والشبكة تعمل كـ sync/refresh layer.',
  'صور القنوات والبوسترات عبر Coil memory/disk cache مع placeholders وsize hints.',
  'Preview player منفصل منخفض buffer وصامت، والمشغل الرئيسي يمتلك profile أعلى.',
  'Search index محلي normalize للعربية/الإنجليزية مع debounce وPaging results.',
  'Jobs طويلة تعمل على Dispatchers.IO + WorkManager constraints لتجنب ANR.',
]

export function IptvOsExperiencePage() {
  return (
    <section dir="rtl" className="relative min-h-screen overflow-hidden bg-[#050712] pt-28 text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-40 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full bg-amber-300/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:44px_44px] opacity-30" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur-xl">
              <Sparkles className="size-4" />
              OS Experience · Android TV + Mobile · Moalfarras
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              أقوى تجربة IPTV كأنها نظام تشغيل ترفيهي كامل.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300 sm:text-xl">
              صفحة تنفيذية تجمع التصميم، المعمارية، الأداء، تدفق السيرفرات، المشغل الداخلي،
              وواجهة Android TV الفاخرة لتطبيق IPTV Production Ready قابل للتوسع لملايين العناصر.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Kotlin', 'Compose TV', 'Media3', 'Room', 'Paging 3', 'Hilt', 'WorkManager'].map((tag) => (
                <span key={tag} className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/15 bg-white/[0.07] p-4 shadow-2xl shadow-cyan-950/50 backdrop-blur-2xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-4">
              <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
                <span>El Medina IPTV OS</span>
                <span>22:48 · Rain UI</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-4">
                {['Live', 'Movies', 'Series', 'Sports'].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-linear-to-br from-white/15 to-white/5 p-4 text-center shadow-lg"
                  >
                    <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/20">
                      {index === 0 ? <Tv /> : index === 1 ? <Film /> : index === 2 ? <MonitorPlay /> : <Trophy />}
                    </div>
                    <div className="font-semibold">{item}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-[0.7fr_1fr]">
                <div className="rounded-3xl border border-white/10 bg-black/40 p-4">
                  <div className="mb-3 text-sm text-slate-400">Groups</div>
                  {['News', 'Cinema 4K', 'Kids', 'Sports Live'].map((group, index) => (
                    <div key={group} className={`mb-2 rounded-xl px-3 py-2 text-sm ${index === 1 ? 'bg-cyan-300 text-slate-950' : 'bg-white/5 text-slate-300'}`}>
                      {group}
                    </div>
                  ))}
                </div>
                <div className="rounded-3xl border border-white/10 bg-black/40 p-4">
                  <div className="aspect-video rounded-2xl bg-linear-to-br from-cyan-500/30 via-fuchsia-500/20 to-amber-300/20 p-4">
                    <div className="flex h-full flex-col justify-between rounded-xl border border-white/10 bg-black/35 p-4">
                      <div className="text-sm text-cyan-100">Silent preview · Mini EPG</div>
                      <div>
                        <div className="text-2xl font-bold">Cinema Ultra HD</div>
                        <div className="text-sm text-slate-300">Next: World Premiere · 21:30</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center gap-2 rounded-[1.5rem] border border-white/10 bg-white/5 p-3">
                    {['Home', 'Search', 'Player', 'Settings'].map((dock) => (
                      <span key={dock} className="rounded-2xl bg-white/10 px-3 py-2 text-xs text-slate-200">
                        {dock}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
              <Icon className="mb-5 size-8 text-cyan-200" />
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-slate-300">{body}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <Layers3 className="mb-4 size-8 text-amber-200" />
            <h2 className="text-3xl font-black">Clean Architecture Pipeline</h2>
            <div className="mt-6 space-y-3">
              {architecture.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
            <ShieldCheck className="mb-4 size-8 text-emerald-200" />
            <h2 className="text-3xl font-black">Performance Rules</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {performanceRules.map((rule) => (
                <div key={rule} className="rounded-2xl bg-emerald-300/10 p-4 leading-7 text-emerald-50 ring-1 ring-emerald-300/15">
                  {rule}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {homeWidgets.map(({ icon: Icon, label, detail }) => (
            <article key={label} className="rounded-3xl border border-white/10 bg-linear-to-br from-white/10 to-white/[0.03] p-6">
              <Icon className="mb-4 size-7 text-fuchsia-200" />
              <h3 className="text-lg font-bold">{label}</h3>
              <p className="mt-2 leading-7 text-slate-300">{detail}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {modules.map((module) => (
            <article key={module.title} className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <h3 className="mb-4 text-2xl font-black text-cyan-100">{module.title}</h3>
              <ul className="space-y-3 text-slate-300">
                {module.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6 text-cyan-50 backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black">جاهز كمرجع تنفيذي للتطبيق الأصلي</h2>
              <p className="mt-2 text-cyan-100/85">
                يتضمن البحث التطبيقي، حدود الموديولات، قواعد الأداء، UX الريموت، وخطة ربط APIs الخارجية بدون حفظ المفاتيح داخل الواجهة.
              </p>
            </div>
            <div className="flex gap-2 text-cyan-100">
              <Gamepad2 />
              <Search />
              <Wifi />
              <Smartphone />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

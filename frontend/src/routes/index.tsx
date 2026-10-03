import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  GraduationCap, MessageCircle, ListChecks, Lightbulb, BookOpen, Target, Menu, X, User,
  Loader2, Bot, FileText, Sparkle, ArrowRight, AlertCircle,
} from "lucide-react";
import { API_BASE, callApi, type Endpoint } from "@/lib/edugenie-api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduGenie — Gemini Powered Learning Assistant" },
      { name: "description", content: "Ask questions, generate quizzes, summarize notes, and build learning plans with AI." },
      { property: "og:title", content: "EduGenie — AI Learning Assistant" },
      { property: "og:description", content: "Learn smarter with Google Gemini: Q&A, quizzes, summaries, explanations and study plans." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Status = "checking" | "online" | "offline";
const StatusCtx = createContext<(s: Status) => void>(() => {});

const NAV = [
  ["Dashboard", "dashboard"], ["Ask AI", "ask"], ["Quiz", "quiz"],
  ["Summarize", "summarize"], ["Explain", "explain"], ["Learning Plan", "plan"],
] as const;

function Index() {
  const [status, setStatus] = useState<Status>("checking");
  useEffect(() => {
    fetch(API_BASE + "/", { method: "GET" })
      .then(() => setStatus("online"))
      .catch(() => setStatus("offline"));
  }, []);
  return (
    <StatusCtx.Provider value={setStatus}>
      <Header status={status} />
      <main>
        <Hero status={status} />
        <Features />
        <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6">
          <AskSection />
          <QuizSection />
          <SummarizeSection />
          <ExplainSection />
          <PlanSection />
        </div>
      </main>
      <Footer />
    </StatusCtx.Provider>
  );
}

function StatusPill({ status }: { status: Status }) {
  const map = {
    checking: ["bg-muted-foreground", "Checking AI…"],
    online: ["bg-success", "Gemini AI Connected"],
    offline: ["bg-destructive", "AI Temporarily Unavailable"],
  } as const;
  const [dot, label] = map[status];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium">
      <span className="relative flex h-2 w-2">
        {status === "online" && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dot} opacity-60`} />}
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dot}`} />
      </span>
      {label}
    </span>
  );
}

function Header({ status }: { status: Status }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#dashboard" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-bold">EduGenie</span>
            <span className="block text-[11px] text-muted-foreground">AI Learning Assistant</span>
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map(([l, id]) => (
            <a key={id} href={`#${id}`} className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block"><StatusPill status={status} /></span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-secondary-foreground" aria-label="Profile"><User className="h-4 w-4" /></span>
          <button className="grid h-10 w-10 place-items-center rounded-lg border lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="animate-in fade-in slide-in-from-top-2 border-t bg-card px-4 py-3 lg:hidden">
          <div className="mb-2 sm:hidden"><StatusPill status={status} /></div>
          {NAV.map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-secondary">{l}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero({ status }: { status: Status }) {
  return (
    <section id="dashboard" className="relative overflow-hidden border-b bg-hero">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
          <StatusPill status={status} />
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Learn Smarter <span className="text-brand">with AI</span>
          </h1>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Ask questions, understand difficult concepts, practice with quizzes, summarize study material, and create personalized learning plans with AI.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#ask" className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5">
              Start Learning <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#features" className="inline-flex items-center rounded-xl border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary">Explore Features</a>
          </div>
        </div>
        <div className="relative mx-auto hidden h-72 w-full max-w-sm md:block" aria-hidden>
          <div className="absolute inset-6 rounded-3xl bg-brand opacity-90 shadow-lift" />
          <div className="absolute inset-6 grid place-items-center rounded-3xl text-primary-foreground">
            <GraduationCap className="h-24 w-24 opacity-90" strokeWidth={1.25} />
          </div>
          <div className="absolute -left-2 top-4 flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-xs font-medium shadow-soft">
            <ListChecks className="h-4 w-4 text-primary" /> Quiz ready · 5 Qs
          </div>
          <div className="absolute -right-2 top-1/2 flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-xs font-medium shadow-soft">
            <Lightbulb className="h-4 w-4 text-violet" /> Explained simply
          </div>
          <div className="absolute bottom-2 left-8 flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-xs font-medium shadow-soft">
            <Target className="h-4 w-4 text-success" /> Week 1 plan
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: MessageCircle, t: "Smart Q&A", d: "Ask any educational question and get an AI-powered answer.", b: "Ask a Question", id: "ask" },
  { icon: ListChecks, t: "Quiz Generator", d: "Generate practice questions from any topic.", b: "Generate Quiz", id: "quiz" },
  { icon: Lightbulb, t: "Simple Explanation", d: "Understand complex concepts in simple language.", b: "Explain Topic", id: "explain" },
  { icon: BookOpen, t: "Text Summarizer", d: "Turn long educational passages into concise summaries.", b: "Summarize Text", id: "summarize" },
  { icon: Target, t: "Learning Plan", d: "Create a personalized study plan based on your subject and level.", b: "Create Plan", id: "plan" },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      <p className="mt-1 text-sm text-muted-foreground">Pick a tool to get started.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {FEATURES.map((f) => (
          <div key={f.id} className="group flex flex-col rounded-2xl border bg-card p-5 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-semibold">{f.t}</h3>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">{f.d}</p>
            <a href={`#${f.id}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              {f.b} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- shared tool machinery ---------- */

function useTool(endpoint: Endpoint) {
  const setStatus = useContext(StatusCtx);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const run = async (params: Record<string, string>) => {
    if (Object.values(params).some((v) => !v.trim())) {
      setError("Please check your input and try again.");
      return;
    }
    setLoading(true); setError(null);
    try {
      const text = await callApi(endpoint, params);
      setResult(text); setStatus("online");
    } catch (e) {
      console.error(`[EduGenie] /${endpoint} failed:`, e);
      const network = e instanceof TypeError;
      if (network) setStatus("offline");
      setError(network ? "EduGenie couldn't connect to the AI service. Please try again." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return { loading, result, error, run };
}

function Section({ id, icon: Icon, title, desc, children }: { id: string; icon: typeof Bot; title: string; desc: string; children: ReactNode }) {
  return (
    <section id={id} className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon className="h-5 w-5" /></span>
        <h2 className="mt-4 text-2xl font-bold">{title}</h2>
        <p className="mt-1 text-muted-foreground">{desc}</p>
      </div>
      <div className="space-y-4 lg:col-span-3">{children}</div>
    </section>
  );
}

const fieldCls = "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm shadow-soft outline-none transition focus:border-ring focus:ring-4 focus:ring-ring/15";

function SubmitButton({ loading, label, loadingLabel }: { loading: boolean; label: string; loadingLabel: string }) {
  return (
    <button type="submit" disabled={loading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift disabled:translate-y-0 disabled:opacity-70">
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {loading ? loadingLabel : label}
    </button>
  );
}

function ResultCard({ icon, title, badge, loading, error, result, empty, children }: {
  icon: ReactNode; title: string; badge?: string; loading: boolean; error: string | null; result: string | null; empty: string; children?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-semibold">{icon}{title}</h3>
        {badge && result && <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-secondary-foreground">{badge}</span>}
      </div>
      {error && (
        <p className="mb-3 flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"><AlertCircle className="h-4 w-4" />{error}</p>
      )}
      {loading ? (
        <div className="space-y-2" aria-busy>
          {[90, 75, 82, 60].map((w) => <div key={w} className="h-3 animate-pulse rounded bg-muted" style={{ width: `${w}%` }} />)}
        </div>
      ) : result ? (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">{children ?? <Prose text={result} />}</div>
      ) : (
        <p className="py-6 text-center text-sm text-muted-foreground">{empty}</p>
      )}
    </div>
  );
}

/** Light markdown-ish rendering of AI text: headings, bullets, bold. */
function Prose({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-2 text-[15px] leading-relaxed">
      {lines.map((raw, i) => {
        const line = raw.trimEnd();
        if (!line.trim()) return <div key={i} className="h-1" />;
        const h = line.match(/^#{1,4}\s+(.*)/);
        if (h) return <h4 key={i} className="pt-2 font-semibold text-primary">{inline(h[1] ?? "")}</h4>;
        const b = line.match(/^\s*[-*•]\s+(.*)/);
        if (b) return <p key={i} className="flex gap-2 pl-1"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" /><span>{inline(b[1] ?? "")}</span></p>;
        return <p key={i}>{inline(line)}</p>;
      })}
    </div>
  );
}
function inline(s: string) {
  return s.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? <strong key={i} className="font-semibold">{p.slice(2, -2)}</strong> : p,
  );
}

/* ---------- sections ---------- */

function AskSection() {
  const [q, setQ] = useState("");
  const t = useTool("ask");
  return (
    <Section id="ask" icon={MessageCircle} title="Ask EduGenie" desc="Ask anything related to your studies.">
      <form onSubmit={(e) => { e.preventDefault(); t.run({ question: q }); }} className="space-y-3">
        <textarea value={q} onChange={(e) => setQ(e.target.value)} rows={4} placeholder="Example: Explain Artificial Intelligence in simple words." className={fieldCls} />
        <SubmitButton loading={t.loading} label="Ask EduGenie" loadingLabel="Thinking..." />
      </form>
      <ResultCard icon={<Bot className="h-5 w-5 text-primary" />} title="EduGenie Answer" empty="Your AI answer will appear here." {...t} />
    </Section>
  );
}

function QuizSection() {
  const [topic, setTopic] = useState("");
  const t = useTool("quiz");
  return (
    <Section id="quiz" icon={ListChecks} title="Quiz Generator" desc="Test your knowledge with AI-generated questions.">
      <form onSubmit={(e) => { e.preventDefault(); t.run({ topic }); }} className="flex flex-col gap-3 sm:flex-row">
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Example: Python Programming" className={fieldCls} />
        <SubmitButton loading={t.loading} label="Generate Quiz" loadingLabel="Generating Quiz..." />
      </form>
      <ResultCard icon={<ListChecks className="h-5 w-5 text-primary" />} title="Your Quiz" badge="AI Generated Quiz" empty="Your generated quiz will appear here." {...t}>
        {t.result && <QuizView text={t.result} />}
      </ResultCard>
    </Section>
  );
}

function QuizView({ text }: { text: string }) {
  // Split into question blocks on lines that start a new question.
  const blocks = text.split(/\n(?=\s*(?:\*\*)?\s*(?:Q(?:uestion)?\s*\d+|\d+[.)])\s*)/i).map((b) => b.trim()).filter(Boolean);
  if (blocks.length < 2) return <Prose text={text} />;
  return (
    <div className="space-y-3">
      {blocks.map((b, i) => {
        const lines = b.split("\n").map((l) => l.trim()).filter(Boolean);
        return (
          <div key={i} className="rounded-xl border bg-muted/50 p-4">
            {lines.map((l, j) => {
              const clean = l.replace(/\*\*/g, "");
              if (j === 0) return <p key={j} className="font-semibold">{clean}</p>;
              if (/^(correct\s*)?answer/i.test(clean))
                return <p key={j} className="mt-2 inline-block rounded-lg bg-success/15 px-2.5 py-1 text-sm font-semibold text-success">{clean}</p>;
              if (/^[A-D][.)]/.test(clean)) return <p key={j} className="mt-1.5 rounded-lg bg-card px-3 py-1.5 text-sm">{clean}</p>;
              return <p key={j} className="mt-1 text-sm">{clean}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

function SummarizeSection() {
  const [text, setText] = useState("");
  const t = useTool("summarize");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return (
    <Section id="summarize" icon={BookOpen} title="Text Summarizer" desc="Paste your study material and let EduGenie create a concise summary.">
      <form onSubmit={(e) => { e.preventDefault(); t.run({ text }); }} className="space-y-3">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder="Paste your educational text here..." className={fieldCls} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">{words} words · {text.length} characters</span>
          <SubmitButton loading={t.loading} label="Summarize Text" loadingLabel="Summarizing..." />
        </div>
      </form>
      <ResultCard icon={<FileText className="h-5 w-5 text-primary" />} title="Summary" empty="Your summary will appear here." {...t} />
    </Section>
  );
}

function ExplainSection() {
  const [topic, setTopic] = useState("");
  const t = useTool("explain");
  return (
    <Section id="explain" icon={Lightbulb} title="Explain Simply" desc="Turn difficult concepts into easy-to-understand explanations.">
      <form onSubmit={(e) => { e.preventDefault(); t.run({ topic }); }} className="flex flex-col gap-3 sm:flex-row">
        <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Example: Polymorphism in Java" className={fieldCls} />
        <SubmitButton loading={t.loading} label="Explain Simply" loadingLabel="Explaining..." />
      </form>
      <ResultCard icon={<Lightbulb className="h-5 w-5 text-violet" />} title="Simple Explanation" empty="Your explanation will appear here." {...t} />
    </Section>
  );
}

function PlanSection() {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const t = useTool("recommend");
  return (
    <Section id="plan" icon={Target} title="Personalized Learning Plan" desc="Tell EduGenie what you want to learn and your current level.">
      <form onSubmit={(e) => { e.preventDefault(); t.run({ subject, level }); }} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Example: Python" className={fieldCls} aria-label="Subject" />
          <input value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Example: Beginner" className={fieldCls} aria-label="Level" />
        </div>
        <SubmitButton loading={t.loading} label="Create Learning Plan" loadingLabel="Creating Plan..." />
      </form>
      <ResultCard icon={<Target className="h-5 w-5 text-success" />} title="Your Learning Plan" empty="Your personalized learning plan will appear here." {...t} />
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-10 text-center sm:px-6">
        <p className="flex items-center gap-2 font-bold"><GraduationCap className="h-5 w-5 text-primary" /> EduGenie</p>
        <p className="text-sm text-muted-foreground">Google Gemini Powered Learning Assistant</p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Sparkle className="h-3 w-3" /> Built for students • Learn • Practice • Understand • Improve</p>
      </div>
    </footer>
  );
}

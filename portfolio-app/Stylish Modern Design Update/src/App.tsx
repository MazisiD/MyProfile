import { useState, useEffect, useRef } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact']

const SKILLS_BARS = [
  { name: 'C#', level: 90, color: '#9b59ff' },
  { name: 'TypeScript', level: 85, color: '#3178c6' },
  { name: 'SQL', level: 80, color: '#00d4ff' },
  { name: 'Python', level: 75, color: '#ffd43b' },
  { name: 'Java', level: 70, color: '#f89820' },
  { name: 'C++', level: 65, color: '#00427a' },
  { name: 'Angular', level: 80, color: '#dd0031' },
  { name: '.NET', level: 85, color: '#512bd4' },
]

const SKILL_CATEGORIES = [
  {
    title: 'Frameworks & Tools',
    icon: '⚙️',
    items: ['.NET', 'Angular', 'Django', 'Git', 'Azure DevOps', 'GitHub Copilot', 'Claude'],
  },
  {
    title: 'Engineering',
    icon: '🔧',
    items: ['OOP', 'Data Structures & Algorithms', 'REST APIs', 'Microservices', 'CI/CD', 'Event-Driven Architecture', 'Debugging'],
  },
  {
    title: 'Databases',
    icon: '🗄️',
    items: ['SQLite', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Practices',
    icon: '📐',
    items: ['Agile Scrum', 'Code Reviews', 'System Design', 'SDLC', 'Requirements & Solution Design', 'Story Refinements'],
  },
]

const CONCEPTS = ['Event-Driven Architecture', 'CQRS', 'Microservices', 'System Design', 'Server-Sent Events']

const EXPERIENCE = [
  {
    role: 'Software Engineer II',
    company: 'LexisNexis South Africa',
    period: '2025 – Present',
    current: true,
    tags: ['C#', '.NET', 'Angular', 'Azure DevOps', 'Azure Pipelines', 'CQRS', 'SSE'],
    bullets: [
      'Delivered production features end-to-end — design through deployment and ongoing operational support — for enterprise systems used by legal professionals, consistently exceeding sprint-velocity targets among peer engineers.',
      'Contributed to planning, design, and full-stack development (frontend, backend, database, Azure Pipelines) of an event-driven, AI-powered workflow platform that helps legal professionals complete work faster.',
      'Built a CQRS-based service with structured error handling and unit tests, integrated as a micro-frontend across multiple product surfaces.',
      'Contributed to a real-time notification feature built on Server-Sent Events (SSE).',
      'Proactively identified a requirements gap in own delivered work, communicated it transparently to the team, and reworked the implementation before it reached a customer.',
      'Leveraged AI-assisted dev tools (GitHub Copilot, Claude) to accelerate delivery, aligned with Amazon\'s GenAI productivity strategy.',
    ],
  },
  {
    role: 'Residence Tutor',
    company: 'University of Cape Town',
    period: '2022',
    current: false,
    tags: ['Teaching', 'Algorithms', 'Data Structures'],
    bullets: [
      'Mentored students on CS coursework, algorithm design, and data structures — building strong communication and leadership skills.',
    ],
  },
]

const ACHIEVEMENTS = [
  'Averaged a 2.16-day story cycle time against a 5-day target over 6 months',
  'Distinction — Computer Science (CSC1016S)',
  'Longyuan Mulilo Bursary Top 20 Winner',
  'UCT Plus Hours Bronze Award',
  'Top HDI Learner, Alfred Nzo West District (2nd Place)',
]

const TERMINAL_LINES = [
  { prompt: '~', cmd: 'whoami', delay: 0 },
  { out: 'mazisi.dungelo', delay: 300 },
  { prompt: '~', cmd: 'cat role.txt', delay: 700 },
  { out: 'Software Engineer II @ LexisNexis', delay: 1000 },
  { prompt: '~', cmd: 'git log --oneline -3', delay: 1400 },
  { out: 'a3f2c91 fix: resolve SSE connection edge case', delay: 1700 },
  { out: 'b8e1d44 feat: ship CQRS-based notification service', delay: 1900 },
  { out: 'c9a0f33 perf: cut story cycle time by 57%', delay: 2100 },
  { prompt: '~', cmd: 'echo $STACK', delay: 2500 },
  { out: 'C# .NET Angular TypeScript Python SQL', delay: 2800 },
  { prompt: '~', cmd: '', delay: 3200, cursor: true },
]

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ─── Terminal Widget ──────────────────────────────────────────────────────────

function Terminal() {
  const [visibleLines, setVisibleLines] = useState<typeof TERMINAL_LINES>([])
  useEffect(() => {
    TERMINAL_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(prev => [...prev, line]), line.delay)
    })
  }, [])

  return (
    <div className="relative w-full max-w-lg">
      {/* Glow behind terminal */}
      <div className="absolute -inset-4 bg-[#00ff88]/5 rounded-2xl blur-2xl" />
      <div
        className="relative rounded-xl border border-[#1e2a3a] overflow-hidden"
        style={{ background: '#0d1117', fontFamily: "'JetBrains Mono', monospace" }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1e2a3a] bg-[#080b12]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[#7d8ea0] text-xs tracking-widest">mazisi@portfolio ~ </span>
        </div>

        {/* Terminal body */}
        <div className="p-5 space-y-1 min-h-[260px] text-sm">
          {visibleLines.map((line, i) => (
            <div key={i}>
              {'prompt' in line ? (
                <div className="flex items-center gap-2">
                  <span className="text-[#00ff88] font-bold select-none">❯</span>
                  <span className="text-[#7d8ea0]">~</span>
                  <span className="text-[#f0f6fc]">{line.cmd}</span>
                  {line.cursor && (
                    <span className="inline-block w-2 h-4 bg-[#00ff88] cursor-blink ml-0.5 align-middle" />
                  )}
                </div>
              ) : (
                <div className="pl-6 text-[#7d8ea0] font-mono">{line.out}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Skill Bar ────────────────────────────────────────────────────────────────

function SkillBar({ name, level, color, delay = 0 }: { name: string; level: number; color: string; delay?: number }) {
  const { ref, inView } = useInView(0.1)
  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#c9d1d9] font-medium text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {name}
        </span>
        <span className="text-xs font-mono" style={{ color, fontFamily: "'JetBrains Mono', monospace" }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-[#1e2a3a] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: inView ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: inView ? `0 0 12px ${color}66` : 'none',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12">
      <div
        className="text-xs tracking-[0.14em] uppercase mb-3 flex items-center gap-2"
        style={{ color: '#00ff88', fontFamily: "'JetBrains Mono', monospace" }}
      >
        <span className="opacity-60">// </span>{label}
      </div>
      <h2
        className="text-4xl md:text-5xl font-black text-[#f0f6fc] leading-none"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        {title}
      </h2>
      <div className="mt-4 h-px bg-gradient-to-r from-[#00ff88]/40 via-[#00d4ff]/20 to-transparent w-32" />
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard() {
  const [activeTab, setActiveTab] = useState<'problem' | 'approach' | 'solution'>('problem')
  const tabs = ['problem', 'approach', 'solution'] as const
  const content = {
    problem: 'Writing SQL queries manually is slow, error-prone, and requires deep schema knowledge. Business analysts and developers waste hours translating natural-language requirements into correct, optimised SQL.',
    approach: 'Built an OOP-based NLP pipeline in Python that parses intent from natural language, maps entities to the schema graph, and generates structured SQL with JOIN resolution and WHERE clause inference.',
    solution: 'AutoTask SQL Generator produces correct, tested SQL from plain English — reducing query-writing time by ~80% in internal tests and eliminating schema-lookup overhead for analysts.',
  }

  return (
    <div
      className="rounded-xl border border-[#1e2a3a] overflow-hidden transition-all duration-200 hover:border-[#00ff88]/30 hover:shadow-[0_0_40px_rgba(0,255,136,0.05)]"
      style={{ background: '#0d1117' }}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span
                className="text-lg font-bold text-[#f0f6fc]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                AutoTask SQL Generator
              </span>
              <span
                className="text-[10px] px-2 py-0.5 rounded-sm font-mono font-bold tracking-wider"
                style={{
                  background: 'rgba(0,255,136,0.12)',
                  color: '#00ff88',
                  border: '1px solid rgba(0,255,136,0.3)',
                }}
              >
                COMPLETED
              </span>
            </div>
            <div
              className="text-xs text-[#7d8ea0] font-mono mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Capstone Project
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/MaziDaisy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all hover:bg-[#00ff88]/10 hover:text-[#00ff88] text-[#7d8ea0] border border-[#1e2a3a] hover:border-[#00ff88]/40"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <GithubIcon size={13} />
              GitHub
            </a>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {['SQL', 'OOP', 'Python', 'NLP'].map(t => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-0.5 rounded-sm font-mono"
              style={{
                background: 'rgba(0,212,255,0.07)',
                color: '#00d4ff',
                border: '1px solid rgba(0,212,255,0.2)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-[#1e2a3a]">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-3 text-xs font-mono capitalize transition-colors"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: activeTab === tab ? '#00ff88' : '#7d8ea0',
                borderBottom: activeTab === tab ? '2px solid #00ff88' : '2px solid transparent',
                background: activeTab === tab ? 'rgba(0,255,136,0.04)' : 'transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6 text-sm text-[#7d8ea0] leading-relaxed min-h-[100px]">
          {content[activeTab]}
        </div>
      </div>
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function MailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

// ─── ASCII Art decorations ─────────────────────────────────────────────────────

function GridDecoration({ className = '' }: { className?: string }) {
  return (
    <div className={`select-none pointer-events-none ${className}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <div className="text-[#00ff88]/10 text-[10px] leading-4 whitespace-pre">
{`┌─────────────────────────────┐
│  function solve(problem) {  │
│    while (!solved) {        │
│      think();               │
│      code();                │
│      ship();                │
│    }                        │
│    return product;          │
│  }                          │
└─────────────────────────────┘`}
      </div>
    </div>
  )
}

function CircuitDecoration({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`opacity-[0.07] ${className}`}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
    >
      <circle cx="100" cy="100" r="80" stroke="#00ff88" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="50" stroke="#00d4ff" strokeWidth="1" />
      <circle cx="100" cy="100" r="8" fill="#00ff88" />
      <line x1="100" y1="20" x2="100" y2="50" stroke="#00ff88" strokeWidth="1" />
      <line x1="100" y1="150" x2="100" y2="180" stroke="#00ff88" strokeWidth="1" />
      <line x1="20" y1="100" x2="50" y2="100" stroke="#00ff88" strokeWidth="1" />
      <line x1="150" y1="100" x2="180" y2="100" stroke="#00ff88" strokeWidth="1" />
      <circle cx="100" cy="20" r="4" fill="#00d4ff" />
      <circle cx="100" cy="180" r="4" fill="#00d4ff" />
      <circle cx="20" cy="100" r="4" fill="#00d4ff" />
      <circle cx="180" cy="100" r="4" fill="#00d4ff" />
    </svg>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeSection, setActiveSection] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen grid-bg" style={{ background: '#080b12' }}>

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e2a3a]"
        style={{ background: 'rgba(8,11,18,0.9)', backdropFilter: 'blur(12px)' }}
      >
        <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-2 font-mono font-bold text-[#f0f6fc] hover:text-[#00ff88] transition-colors"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <span className="text-[#00ff88]">&lt;/&gt;</span>
            <span>mazisi.dev</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV.map(n => (
              <button
                key={n}
                onClick={() => scrollTo(n.toLowerCase())}
                className="text-[#7d8ea0] hover:text-[#00ff88] transition-colors text-sm font-mono relative group"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8125rem' }}
              >
                {n}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#00ff88] group-hover:w-full transition-all duration-200" />
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#7d8ea0] hover:text-[#00ff88] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#1e2a3a] py-4 px-6 flex flex-col gap-4" style={{ background: '#080b12' }}>
            {NAV.map(n => (
              <button
                key={n}
                onClick={() => scrollTo(n.toLowerCase())}
                className="text-left text-[#7d8ea0] hover:text-[#00ff88] transition-colors text-sm font-mono"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {n}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center pt-14 overflow-hidden">

        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00ff88]/3 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#8b5cf6]/5 blur-[100px]" />
        </div>
        <CircuitDecoration className="absolute top-16 right-8 w-48 h-48 md:w-64 md:h-64" />
        <GridDecoration className="absolute bottom-20 right-1/4 hidden lg:block" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left column */}
            <div className="fade-in-up">
              <div
                className="inline-flex items-center gap-2 text-xs mb-6 px-3 py-1.5 rounded-sm"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#00ff88',
                  background: 'rgba(0,255,136,0.08)',
                  border: '1px solid rgba(0,255,136,0.2)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                // Software Engineer
              </div>

              <h1
                className="text-5xl md:text-7xl font-black text-[#f0f6fc] leading-none mb-6 tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Mazisi
                <br />
                <span style={{ color: '#00ff88' }}>Dungelo</span>
              </h1>

              <p className="text-lg font-semibold text-[#c9d1d9] mb-3 leading-snug">
                Turning business challenges into reliable,<br />
                full-lifecycle software.
              </p>

              <p className="text-[#7d8ea0] text-sm leading-relaxed mb-8 max-w-md">
                Problem Solver. Solution Builder. I take business challenges, figure out what really needs solving, and turn them into products people can actually use.
              </p>

              <div className="flex flex-wrap gap-3 mb-5">
                <button onClick={() => scrollTo('projects')} className="btn-primary">
                  &gt; View Projects
                </button>
                <button onClick={() => scrollTo('contact')} className="btn-secondary">
                  &gt; Get In Touch
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/MaziDaisy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono text-[#7d8ea0] border border-[#1e2a3a] hover:border-[#2a3f58] hover:text-[#f0f6fc] transition-all"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8125rem' }}
                >
                  <GithubIcon size={15} /> GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono text-[#7d8ea0] border border-[#1e2a3a] hover:border-[#2a3f58] hover:text-[#f0f6fc] transition-all"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8125rem' }}
                >
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
              </div>
            </div>

            {/* Right column — Terminal */}
            <div className="flex justify-center lg:justify-end" style={{ animationDelay: '0.3s' }}>
              <Terminal />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-mono text-[#7d8ea0] tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#7d8ea0] to-transparent" />
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="about" title="About Me" />

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-5">
              <p className="text-[#c9d1d9] leading-relaxed">
                I'm a{' '}
                <span style={{ color: '#00ff88' }} className="font-semibold">Software Engineer II at LexisNexis South Africa</span>,
                delivering production features end-to-end for enterprise legal-tech systems — from planning and design through
                deployment and operational support. I work across full-stack, event-driven, and event-sourcing architectures, and
                I'm known for surfacing and correcting my own mistakes quickly and transparently.
              </p>

              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-mono text-[#7d8ea0]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-[#00ff88]">📍</span> Cape Town, South Africa
                </span>
                <span className="hidden sm:block text-[#1e2a3a]">|</span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#00d4ff]">💼</span> Software Engineer II · LexisNexis
                </span>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['C#', '.NET', 'Angular', 'TypeScript', 'Python', 'Java', 'C++', 'SQL'].map(s => (
                  <span key={s} className="tag-pill">{s}</span>
                ))}
              </div>

              {/* Achievements */}
              <div className="pt-4 space-y-2">
                <div className="text-xs font-mono text-[#7d8ea0] mb-3 tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  // achievements
                </div>
                {ACHIEVEMENTS.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-[#7d8ea0]">
                    <span className="text-[#00ff88] mt-0.5 shrink-0 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>▸</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education card */}
            <div className="lg:col-span-2">
              <div
                className="rounded-xl border border-[#1e2a3a] p-6 transition-all duration-200 hover:border-[#00ff88]/30 hover:shadow-[0_0_30px_rgba(0,255,136,0.04)] h-full"
                style={{ background: '#0d1117' }}
              >
                <div className="text-xs font-mono text-[#7d8ea0] mb-5 tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  // education
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center text-sm shrink-0"
                      style={{ background: 'rgba(0,212,255,0.1)', color: '#00d4ff' }}
                    >
                      🎓
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#f0f6fc]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        BSc Computer Science &amp; Computer Engineering
                      </div>
                    </div>
                  </div>
                  <div className="pl-10">
                    <div className="text-xs font-mono text-[#7d8ea0]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      University of Cape Town
                    </div>
                    <div className="text-xs font-mono text-[#2a3f58] mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      2020 – 2025
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#1e2a3a] pt-5">
                  <div className="text-xs font-mono text-[#7d8ea0] mb-3 tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    // stats
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { v: '2.16d', l: 'avg cycle time' },
                      { v: '5d', l: 'team target' },
                      { v: 'Top 20', l: 'bursary winner' },
                      { v: '2nd', l: 'district rank' },
                    ].map(s => (
                      <div
                        key={s.v}
                        className="rounded-lg p-3"
                        style={{ background: '#131a24', border: '1px solid #1e2a3a' }}
                      >
                        <div
                          className="text-lg font-black"
                          style={{ color: '#00ff88', fontFamily: "'Outfit', sans-serif" }}
                        >
                          {s.v}
                        </div>
                        <div
                          className="text-[10px] text-[#7d8ea0] mt-0.5"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────────────────── */}
      <section id="experience" className="py-28 px-6" style={{ background: '#0a0d14' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader label="experience" title="Work History" />

          <div className="relative">
            {/* Vertical timeline rail */}
            <div
              className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px"
              style={{ background: 'linear-gradient(to bottom, #00ff88, #1e2a3a 90%)' }}
            />

            <div className="space-y-10">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="relative flex gap-6 md:gap-8 group">

                  {/* Timeline node */}
                  <div className="relative shrink-0 flex flex-col items-center" style={{ width: 16 }}>
                    <div
                      className="w-4 h-4 rounded-full border-2 mt-1 transition-all duration-300 group-hover:scale-125"
                      style={{
                        background: exp.current ? '#00ff88' : '#1e2a3a',
                        borderColor: exp.current ? '#00ff88' : '#2a3f58',
                        boxShadow: exp.current ? '0 0 12px rgba(0,255,136,0.6)' : 'none',
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 rounded-xl border border-[#1e2a3a] overflow-hidden mb-1 transition-all duration-200 group-hover:border-[#00ff88]/30 group-hover:shadow-[0_0_30px_rgba(0,255,136,0.05)]"
                    style={{ background: '#0d1117' }}
                  >
                    {/* Card header */}
                    <div
                      className="px-5 py-4 border-b border-[#1e2a3a] flex items-center justify-between flex-wrap gap-3"
                      style={{ background: 'rgba(0,255,136,0.02)' }}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          className="text-base font-bold text-[#f0f6fc]"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {exp.role}
                        </h3>
                        <span className="text-[#2a3f58]">·</span>
                        <span
                          className="text-sm font-semibold text-[#c9d1d9]"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {exp.company}
                        </span>
                        {exp.current && (
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-sm font-mono tracking-wider"
                            style={{
                              background: 'rgba(0,255,136,0.1)',
                              color: '#00ff88',
                              border: '1px solid rgba(0,255,136,0.25)',
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            CURRENT
                          </span>
                        )}
                      </div>
                      <span
                        className="text-xs font-mono text-[#7d8ea0] shrink-0"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {exp.period}
                      </span>
                    </div>

                    {/* Bullets */}
                    <div className="px-5 py-4 space-y-2">
                      {exp.bullets.map((b, j) => (
                        <div key={j} className="flex items-start gap-3 text-sm text-[#7d8ea0] leading-relaxed">
                          <span
                            className="text-[#00ff88] mt-0.5 shrink-0 font-mono"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            ▸
                          </span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="px-5 pb-4 flex flex-wrap gap-2">
                      {exp.tags.map(t => (
                        <span key={t} className="tag-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Timeline end — origin marker */}
              <div className="relative flex gap-6 md:gap-8 items-center">
                <div className="shrink-0 flex items-center justify-center" style={{ width: 16 }}>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: '#1e2a3a', border: '1px solid #2a3f58' }}
                  />
                </div>
                <span
                  className="text-xs font-mono text-[#2a3f58]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  // career start · 2020
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ────────────────────────────────────────────────── */}
      <section id="projects" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="projects" title="Featured Work" />
          <ProjectCard />
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────── */}
      <section id="skills" className="py-28 px-6" style={{ background: '#0a0d14' }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="skills" title="Tech Stack" />

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Skill bars */}
            <div>
              <div className="text-xs font-mono text-[#7d8ea0] mb-6 tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                // proficiency
              </div>
              <div className="space-y-5">
                {SKILLS_BARS.map((s, i) => (
                  <SkillBar key={s.name} {...s} delay={i * 80} />
                ))}
              </div>
            </div>

            {/* Category cards */}
            <div className="space-y-4">
              <div className="text-xs font-mono text-[#7d8ea0] mb-6 tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                // categories
              </div>
              {SKILL_CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  className="rounded-xl border border-[#1e2a3a] p-5 transition-all duration-200 hover:border-[#00ff88]/30"
                  style={{ background: '#0d1117' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm">{cat.icon}</span>
                    <span
                      className="text-sm font-semibold text-[#f0f6fc]"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {cat.title}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map(item => (
                      <span key={item} className="tag-pill tag-pill-neutral" style={{ color: '#7d8ea0' }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering concepts */}
          <div className="mt-12 rounded-xl border border-[#1e2a3a] p-6" style={{ background: '#0d1117' }}>
            <div className="text-xs font-mono text-[#7d8ea0] mb-4 tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              // engineering concepts
            </div>
            <div className="flex flex-wrap gap-2">
              {CONCEPTS.map(c => (
                <span
                  key={c}
                  className="text-[11px] px-3 py-1.5 rounded-sm font-mono"
                  style={{
                    background: 'rgba(139,92,246,0.08)',
                    color: '#8b5cf6',
                    border: '1px solid rgba(139,92,246,0.2)',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader label="contact" title="Get In Touch" />

          <p className="text-[#7d8ea0] mb-10 leading-relaxed">
            Have a project, opportunity, or just want to chat about software engineering?
            I'm always open to interesting conversations.
          </p>

          {/* Contact options */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                icon: <MailIcon size={22} />,
                label: 'Email',
                value: 'mazisi.dungelo@gmail.com',
                href: 'mailto:mazisi.dungelo@gmail.com',
                color: '#00ff88',
              },
              {
                icon: <GithubIcon size={22} />,
                label: 'GitHub',
                value: 'MaziDaisy',
                href: 'https://github.com/MaziDaisy',
                color: '#c9d1d9',
              },
              {
                icon: <LinkedinIcon size={22} />,
                label: 'LinkedIn',
                value: 'Mazisi Dungelo',
                href: 'https://linkedin.com',
                color: '#0077b5',
              },
            ].map(c => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 rounded-xl border border-[#1e2a3a] transition-all duration-200 hover:border-[#00ff88]/30 hover:shadow-[0_0_30px_rgba(0,255,136,0.05)] hover:-translate-y-1 group"
                style={{ background: '#0d1117' }}
              >
                <span style={{ color: c.color }} className="transition-transform group-hover:scale-110">
                  {c.icon}
                </span>
                <div>
                  <div className="text-xs font-mono text-[#7d8ea0] mb-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {c.label}
                  </div>
                  <div className="text-sm text-[#f0f6fc] font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {c.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <button
            onClick={() => { window.location.href = 'mailto:mazisi.dungelo@gmail.com' }}
            className="btn-primary text-base px-8 py-3"
          >
            <MailIcon size={16} />
            Send Message
          </button>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="border-t border-[#1e2a3a] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-[#2a3f58] text-xs font-mono"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2025 Mazisi Dungelo
          </span>
          <span
            className="text-[#1e2a3a] text-xs font-mono"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            built with React + TypeScript
          </span>
        </div>
      </footer>

    </div>
  )
}

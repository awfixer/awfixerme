import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowDown, ArrowUpRight, BookOpen, Github, Zap } from 'lucide-react'
import './awfixer.css'

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`kx-reveal${visible ? ' active' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  )
}

function ScrollIndicator() {
  return (
    <div
      className="relative h-36 w-36 shrink-0"
      role="img"
      aria-label="Scroll down"
    >
      <div className="kx-spin absolute inset-0">
        <svg viewBox="0 0 144 144" className="h-full w-full">
          <defs>
            <path
              id="kx-scroll-circle"
              d="M72,72 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0"
              fill="none"
            />
          </defs>
          <text
            fontFamily="'Space Mono', monospace"
            fontSize="9px"
            fontWeight="bold"
            letterSpacing="1px"
          >
            <textPath href="#kx-scroll-circle">
              SCROLL DOWN • SCROLL DOWN • SCROLL DOWN •
            </textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <ArrowDown size={28} strokeWidth={2.5} aria-hidden="true" />
      </div>
    </div>
  )
}

const NAV_LINKS = [
  { label: 'BUILDS', href: '#builds' },
  { label: 'CREED', href: '#creed' },
  { label: 'DISPATCHES', href: '#dispatches' },
  { label: 'CONTACT', href: '#contact' },
]

const SERVICES = [
  {
    index: '01',
    title: 'SOLVED CORP && LABS',
    tags: ['MOTHERSHIP', 'OPERATING CO', 'R&D'],
    desc: 'Corporate arm + R&D arm. Solved Corp ships. Solved Labs breaks things first — prototypes, tooling, and experiments that graduate into real products.',
    links: [] as { label: string; href: string }[],
  },
  {
    index: '02',
    title: 'CHAINED TOOLS',
    tags: ['AGENT TOOLCHAIN', 'CLI', 'COMPOSABLE'],
    desc: 'Chained-together utilities for AI agents and power users. Fast, composable, no bloat — tools that link into bigger workflows.',
    links: [
      { label: 'CHAINED.TOOLS', href: 'https://chained.tools' },
      {
        label: 'THEAUTIST.LINK/CHAINED',
        href: 'https://theautist.link/chained',
      },
      {
        label: 'GITHUB.COM/CHAINEDTOOLS',
        href: 'https://github.com/chainedtools',
      },
    ],
  },
  {
    index: '03',
    title: "BOB'S COMPUTER",
    tags: ['LOCAL-FIRST', 'PERSONAL', 'HACKABLE'],
    desc: "A no-nonsense take on personal computing — local-first, hackable, and owned by the user. Not the cloud's computer. Yours.",
    links: [
      { label: 'BOBS.COMPUTER', href: 'https://bobs.computer' },
      { label: 'THEAUTIST.LINK/BOBSPC', href: 'https://theautist.link/bobspc' },
      {
        label: 'GITHUB.COM/BOBS-COMPUTER',
        href: 'https://github.com/bobs-computer',
      },
    ],
  },
]

const DISPATCHES = [
  {
    index: '04',
    title: 'THEAUTIST.ME',
    tags: ['BLOG', 'LONG-FORM'],
    desc: 'Building, stroke recovery, autism, America, and owning your stack.',
    href: 'https://theautist.me',
    cta: 'READ THE BLOG',
  },
  {
    index: '05',
    title: 'THEAUTIST.LINK/X',
    tags: ['X / TWITTER', 'SHIP LOGS'],
    desc: 'Short-form fire: ship logs, hot takes, build threads, zero filter.',
    href: 'https://theautist.link/x',
    cta: 'FOLLOW ON X',
  },
  {
    index: '06',
    title: 'GITHUB.COM/AWFIXER',
    tags: ['CODE', 'RECEIPTS'],
    desc: 'Every repo, every commit — Solved, Chained, Bobs and more.',
    href: 'https://github.com/awfixer',
    cta: 'STAR THE REPOS',
  },
]

const CREED_TRAITS = [
  {
    title: 'TINKERER',
    desc: 'Hardware, software, systems. If it has screws or source code, it gets opened up.',
  },
  {
    title: 'STROKE VICTIM',
    desc: 'Rebuilt myself from zero once. Rebuilding broken tech is easy by comparison.',
  },
  {
    title: 'AUTISTIC',
    desc: 'Pattern-recognition as a superpower. Details others miss are the whole job.',
  },
  {
    title: 'PROUD AMERICAN',
    desc: 'Built in the USA. Self-reliance, free speech, free markets, finished work.',
  },
]

export default function AwfixerPage() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }),
  )

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
      )
    update()
    const id = setInterval(update, 10_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="kinetic-root min-h-screen bg-[#FF4D00] font-sans text-black selection:bg-black selection:text-[#FF4D00]">
      {/* FLOATING NAVIGATION */}
      <nav className="fixed top-0 right-0 left-0 z-50 px-4 pt-4">
        <div className="flex items-center justify-between gap-3">
          {/* Logo left */}
          <a href="#top" className="group flex items-center gap-3 text-black">
            <span className="flex h-10 w-10 items-center justify-center bg-black font-display text-xl text-[#FF4D00] transition-transform group-hover:scale-110">
              A
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg tracking-[-0.04em] uppercase">
                Awfixer
              </span>
              <span className="block font-mono text-[10px] tracking-[-0.02em] uppercase">
                iResolved, LLC
              </span>
            </span>
          </a>

          {/* Center floating black pill */}
          <div className="hidden items-center gap-1 rounded-full bg-black p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="kx-pill-link rounded-full px-4 py-2 font-mono text-[12px] tracking-[-0.02em] text-white uppercase transition-colors hover:bg-white hover:text-black"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Social icons right */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/awfixer"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="kx-icon-btn rounded-full bg-black p-2.5 text-white transition-all hover:scale-110 hover:bg-white hover:text-black"
            >
              <Github size={18} />
            </a>
            <a
              href="https://theautist.me"
              target="_blank"
              rel="noreferrer"
              aria-label="Blog"
              className="kx-icon-btn rounded-full bg-black p-2.5 text-white transition-all hover:scale-110 hover:bg-white hover:text-black"
            >
              <BookOpen size={18} />
            </a>
            <a
              href="https://theautist.link/x"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="kx-icon-btn hidden rounded-full bg-black p-2.5 text-white transition-all hover:scale-110 hover:bg-white hover:text-black sm:block"
            >
              <Zap size={18} />
            </a>
          </div>
        </div>

        {/* Mobile pill */}
        <div className="mt-3 flex justify-center md:hidden">
          <div className="flex items-center gap-1 rounded-full bg-black p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="kx-pill-link rounded-full px-3 py-1.5 font-mono text-[12px] text-white uppercase transition-colors hover:bg-white hover:text-black"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* TYPOGRAPHIC HERO */}
      <header
        id="top"
        className="flex min-h-screen flex-col justify-center px-4 pt-32 md:px-8 md:pt-36"
      >
        <Reveal>
          <p className="text-center font-mono text-[12px] tracking-[-0.02em] uppercase">
            Founder — iResolved, LLC // USA {time ? `// ${time} local` : ''}
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 text-center font-display text-[16vw] leading-[0.85] tracking-[-0.04em] uppercase">
            Awfixer
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed font-medium md:text-lg">
            I build companies and tools that refuse to break. Solved Corp
            &&nbsp;Solved Labs, Chained Tools, and Bob&apos;s Computer — made in
            America, owned by users, shipped by a tinkerer who doesn&apos;t
            quit.
          </p>
        </Reveal>

        {/* Metadata row separated by 2px black border */}
        <div className="mt-12 border-t-2 border-black md:mx-4">
          <div className="grid items-center gap-8 py-8 md:grid-cols-3 md:py-10">
            <div className="text-center md:text-left">
              <p className="font-mono text-[12px] tracking-[-0.02em] uppercase">
                Based in...
              </p>
              <p className="mt-2 font-display text-3xl tracking-[-0.04em] uppercase md:text-4xl">
                USA —
                <br />
                Proud
              </p>
              <p className="mt-3 font-mono text-[12px] uppercase">
                {time} local // Break → Fix → Ship
              </p>
            </div>
            <div className="flex justify-center">
              <ScrollIndicator />
            </div>
            <div className="text-center md:text-right">
              <p className="font-mono text-[12px] tracking-[-0.02em] uppercase">
                Title / Role
              </p>
              <p className="mt-2 font-display text-3xl leading-[0.9] tracking-[-0.04em] uppercase md:text-4xl">
                Founder
                <br />
                iResolved LLC
                <br />
                Solved / Chained / Bobs
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* SKEWED MARQUEE */}
      <section aria-label="Manifesto marquee" className="relative z-10 -my-6">
        <div className="kx-skew overflow-hidden border-y-2 border-black bg-black py-6 md:py-8">
          {/* Row 1 — orange */}
          <div className="overflow-hidden">
            <div className="kx-marquee-track flex w-max items-center whitespace-nowrap">
              {[0, 1].map((n) => (
                <div
                  key={n}
                  aria-hidden={n === 1}
                  className="flex items-center"
                >
                  {[
                    'FIX IT',
                    'SHIP IT',
                    'OWN IT',
                    'FIX IT',
                    'SHIP IT',
                    'OWN IT',
                  ].map((t, i) => (
                    <span
                      key={`${n}-${i}`}
                      className="px-6 font-display text-[clamp(10px,3vw,24px)] leading-[0.9] tracking-[-0.04em] text-[#FF4D00] uppercase"
                    >
                      {t} <span className="px-2">•</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 — white 80% reverse */}
          <div className="mt-4 overflow-hidden border-t border-white/20 pt-4">
            <div className="kx-marquee-track kx-reverse flex w-max items-center whitespace-nowrap">
              {[0, 1].map((n) => (
                <div
                  key={n}
                  aria-hidden={n === 1}
                  className="flex items-center"
                >
                  {[
                    'TINKERER',
                    'STROKE VICTIM',
                    'AUTISTIC',
                    'PROUD AMERICAN',
                    'RED-BLOODED CAPITALIST',
                  ].map((t) => (
                    <span
                      key={`${n}-${t}`}
                      className="px-6 font-display text-[clamp(10px,2.5vw,20px)] leading-[0.9] tracking-[-0.04em] text-white/80 uppercase md:text-[clamp(10px,2vw,16px)]"
                    >
                      {t} <span className="px-2 text-[#FF4D00]">///</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VERTICAL SERVICE LIST */}
      <section
        id="builds"
        className="scroll-mt-24 bg-black pt-24 pb-20 text-white"
      >
        <div className="px-4 md:px-8">
          <Reveal>
            <p className="font-mono text-[12px] tracking-[-0.02em] text-[#FF4D00] uppercase">
              {'// 01 — What I build'}
            </p>
            <h2 className="mt-3 font-display text-[10vw] leading-[0.85] tracking-[-0.04em] uppercase md:text-[7vw]">
              The Arsenal
            </h2>
          </Reveal>

          <ul className="mt-12 border-b border-white/20">
            {SERVICES.map((s) => (
              <li
                key={s.title}
                className="group border-t border-white/20 transition-colors hover:bg-white/5"
              >
                <div className="flex items-start gap-4 px-2 py-8 md:items-center md:gap-8 md:px-4 md:py-10">
                  <span className="w-10 shrink-0 pt-2 font-mono text-sm text-[#FF4D00] md:pt-0 md:text-base">
                    {s.index}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[9vw] leading-[0.9] tracking-[-0.04em] uppercase transition-transform duration-300 group-hover:translate-x-4 md:text-[7vw]">
                      {s.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/20 px-3 py-1 font-mono text-[12px] tracking-[-0.02em] uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
                      {s.desc}
                    </p>
                    {s.links.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-[12px] text-white uppercase transition-all hover:scale-105 hover:border-[#FF4D00] hover:text-[#FF4D00]"
                          >
                            {l.label}
                            <ArrowUpRight size={14} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="hidden shrink-0 text-[#FF4D00] opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100 sm:block">
                    <ArrowUpRight
                      size={72}
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CREED — orange interlude, brutalist */}
      <section
        id="creed"
        className="scroll-mt-24 border-y-2 border-black bg-[#FF4D00] px-4 py-20 text-black md:px-8 md:py-28"
      >
        <Reveal>
          <p className="font-mono text-[12px] tracking-[-0.02em] uppercase">
            {'// 02 — Who I am'}
          </p>
          <h2 className="mt-3 max-w-5xl font-display text-[11vw] leading-[0.85] tracking-[-0.04em] uppercase md:text-[7vw]">
            Built, not branded.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal delay={100}>
            <div className="space-y-4 text-base leading-relaxed font-medium md:text-lg">
              <p>
                I&apos;m AWFixer — founder of iResolved, LLC. Stroke victim.
                Autistic. Tinkerer to the bone. I survived a stroke and came
                back meaner with a soldering iron: if it&apos;s broken, I fix
                it. If it doesn&apos;t exist, I build it.
              </p>
              <p>
                Proud American. Red-blooded capitalist. Software should be
                owned, not rented — local-first, repairable, and honest about
                what it does.
              </p>
              <p className="border-2 border-black p-4 font-mono text-[12px] tracking-[-0.02em] uppercase">
                Stroke took a lot. It didn&apos;t take the work ethic. Every
                commit is proof of life.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-px border-2 border-black bg-black sm:grid-cols-2">
            {CREED_TRAITS.map((c, i) => (
              <Reveal key={c.title} delay={i * 80} className="h-full">
                <div className="h-full bg-[#FF4D00] p-6 transition-colors hover:bg-black hover:text-[#FF4D00]">
                  <p className="font-mono text-[12px] uppercase">0{i + 1}</p>
                  <h3 className="mt-2 font-display text-2xl tracking-[-0.04em] uppercase">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
            <div className="bg-black p-6 text-[#FF4D00] sm:col-span-2">
              <h3 className="font-display text-2xl tracking-[-0.04em] uppercase md:text-3xl">
                Red-blooded capitalist
              </h3>
              <p className="mt-2 font-mono text-[12px] uppercase">
                Value for value. Ship things worth paying for. No rent-seeking,
                no dark patterns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DISPATCHES — black brutalist rows */}
      <section
        id="dispatches"
        className="scroll-mt-24 bg-black px-4 py-20 text-white md:px-8 md:py-28"
      >
        <Reveal>
          <p className="font-mono text-[12px] tracking-[-0.02em] text-[#FF4D00] uppercase">
            {'// 03 — Follow the work'}
          </p>
          <h2 className="mt-3 font-display text-[10vw] leading-[0.85] tracking-[-0.04em] uppercase md:text-[7vw]">
            Dispatches & Drops
          </h2>
        </Reveal>
        <ul className="mt-12 border-b border-white/20">
          {DISPATCHES.map((d) => (
            <li
              key={d.title}
              className="group border-t border-white/20 transition-colors hover:bg-white/5"
            >
              <a
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 px-2 py-8 text-white md:items-center md:gap-8 md:px-4"
              >
                <span className="w-10 shrink-0 pt-2 font-mono text-sm text-[#FF4D00] md:pt-0 md:text-base">
                  {d.index}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[8vw] leading-[0.9] tracking-[-0.04em] uppercase transition-transform duration-300 group-hover:translate-x-4 md:text-[5vw]">
                    {d.title}
                  </span>
                  <span className="mt-3 flex flex-wrap gap-2">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/20 px-3 py-1 font-mono text-[12px] uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </span>
                  <span className="mt-3 block max-w-xl text-[15px] leading-relaxed text-white/70">
                    {d.desc}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-2 font-mono text-[12px] uppercase text-[#FF4D00]">
                    {d.cta} <ArrowUpRight size={14} />
                  </span>
                </span>
                <span className="hidden shrink-0 text-[#FF4D00] opacity-0 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100 sm:block">
                  <ArrowUpRight
                    size={64}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* GIANT CTA */}
      <section
        id="contact"
        className="scroll-mt-24 bg-[#FF4D00] px-4 pt-20 pb-16 text-center text-black md:px-8 md:pt-28"
      >
        <Reveal>
          <p className="font-mono text-[12px] tracking-[-0.02em] uppercase">
            {'// 04 — Got something broken?'}
          </p>
          <h2 className="mx-auto mt-4 max-w-6xl font-display text-[14vw] leading-[0.85] tracking-[-0.04em] uppercase">
            Let&apos;s fix it
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed font-medium md:text-lg">
            Contract builds, collabs, or just talking shop — fastest way to
            reach me is X or GitHub. Blog for the long version.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href="https://github.com/awfixer"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-black px-12 py-6 font-mono text-sm tracking-[-0.02em] text-white uppercase transition-transform duration-300 hover:scale-110"
            >
              <Github size={20} /> github.com/awfixer
            </a>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://theautist.link/x"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-black px-8 py-3.5 font-mono text-[12px] text-black uppercase transition-all hover:translate-x-4 hover:bg-black hover:text-white"
              >
                <Zap size={16} /> X
              </a>
              <a
                href="https://theautist.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-black px-8 py-3.5 font-mono text-[12px] text-black uppercase transition-all hover:translate-x-4 hover:bg-black hover:text-white"
              >
                <BookOpen size={16} /> Blog
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-black bg-[#FF4D00] px-4 py-8 text-black md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[12px] tracking-[-0.02em] uppercase">
            © {new Date().getFullYear()} iResolved, LLC. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] tracking-[-0.02em] uppercase">
            <a
              href="https://chained.tools"
              target="_blank"
              rel="noreferrer"
              className="text-black transition-transform hover:translate-x-1 hover:scale-110"
            >
              Chained.tools
            </a>
            <a
              href="https://bobs.computer"
              target="_blank"
              rel="noreferrer"
              className="text-black transition-transform hover:translate-x-1 hover:scale-110"
            >
              Bobs.computer
            </a>
            <a
              href="https://theautist.me"
              target="_blank"
              rel="noreferrer"
              className="text-black transition-transform hover:translate-x-1 hover:scale-110"
            >
              Blog
            </a>
            <a
              href="https://theautist.link/x"
              target="_blank"
              rel="noreferrer"
              className="text-black transition-transform hover:translate-x-1 hover:scale-110"
            >
              X
            </a>
            <a
              href="https://github.com/awfixer"
              target="_blank"
              rel="noreferrer"
              className="text-black transition-transform hover:translate-x-1 hover:scale-110"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

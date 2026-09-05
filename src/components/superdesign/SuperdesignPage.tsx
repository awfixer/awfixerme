import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { ArrowUpRight, Star } from 'lucide-react'
import './superdesign.css'

const ATMOSPHERE_IMG =
  'https://framerusercontent.com/images/9zvwRJAavKKacVyhFCwHyXW1U.png?width=1536&height=1024'
const HAND_LEFT_IMG =
  'https://framerusercontent.com/images/KNhiA5A2ykNYqNkj04Hk6BVg5A.png?width=1540&height=1320'
const HAND_RIGHT_IMG =
  'https://framerusercontent.com/images/X89VFCABCEjjZ4oLGa3PjbOmsA.png?width=1542&height=1002'

function formatTime(date: Date): string {
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  if (hours === 0) hours = 12
  return `${hours}:${minutes} ${ampm}`
}

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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`sd-reveal${visible ? ' active' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  )
}

export default function SuperdesignPage() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [time, setTime] = useState('11:11 PM')

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        setScrollY(y)
        setNavScrolled(y > 50)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    const update = () => setTime(formatTime(new Date()))
    update()
    const id = setInterval(update, 10_000)
    return () => clearInterval(id)
  }, [])

  const heroOpacity = scrollY < 1000 ? Math.max(0, 1 - scrollY / 600) : 0
  const heroStyle: CSSProperties =
    scrollY < 1000
      ? { transform: `translateY(${scrollY * 0.4}px)`, opacity: heroOpacity }
      : { opacity: 0 }

  const parallaxUpStyle = {
    '--sd-offset-up': `${scrollY * -0.05}px`,
  } as CSSProperties
  const parallaxDownStyle = {
    '--sd-offset-down': `${scrollY * 0.05}px`,
  } as CSSProperties

  return (
    <div className="superdesign-root min-h-screen scroll-smooth bg-[#050505] text-white selection:bg-[#FF4500] selection:text-white">
      <div className="sd-noise-overlay" aria-hidden="true" />

      {/* Navigation */}
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          navScrolled
            ? 'border-b border-white/5 bg-[#050505]/80 py-4 backdrop-blur-md'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <a
            href="#"
            className="font-serif text-2xl font-bold tracking-tighter text-white"
          >
            Superdesign.
          </a>

          <div className="hidden items-center space-x-8 md:flex">
            <a
              href="#expertise"
              className="text-sm text-gray-400 transition-colors duration-300 hover:text-white"
            >
              Expertise
            </a>
            <a
              href="#works"
              className="text-sm text-gray-400 transition-colors duration-300 hover:text-white"
            >
              Selected Works
            </a>
            <a
              href="#perspectives"
              className="text-sm text-gray-400 transition-colors duration-300 hover:text-white"
            >
              Perspectives
            </a>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-105 hover:bg-gray-100"
          >
            Start Project
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <div className="absolute top-0 left-0 h-full w-full opacity-60 mix-blend-screen">
            <img
              src={ATMOSPHERE_IMG}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-center opacity-80"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
        </div>

        <div className="sd-animate-float-left pointer-events-none absolute top-[-10%] -left-[10%] z-10 w-[50vw] max-w-[800px] opacity-80 mix-blend-hard-light md:top-[-15%] md:left-[-5%] md:w-[40vw]">
          <img
            src={HAND_LEFT_IMG}
            alt=""
            aria-hidden="true"
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="sd-animate-float-right pointer-events-none absolute -right-[10%] bottom-[-10%] z-10 w-[45vw] max-w-[700px] opacity-80 mix-blend-hard-light md:right-[-5%] md:bottom-[-5%] md:w-[35vw]">
          <img
            src={HAND_RIGHT_IMG}
            alt=""
            aria-hidden="true"
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="container relative z-20 mx-auto flex h-full flex-col items-center justify-center px-6 text-center">
          <div className="mx-auto max-w-4xl" style={heroStyle}>
            <Reveal>
              <h1
                className="font-serif mb-6 text-5xl leading-[1.1] font-medium tracking-tight text-[#ffe0e0] mix-blend-overlay md:text-7xl"
                style={{ textShadow: '0 0 12px rgba(255,255,255,0.71)' }}
              >
                Superdesign. <br />
                <span className="font-light text-[#ffe0e0] italic">
                  The design agent.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p
                className="mx-auto mb-16 max-w-lg text-base leading-relaxed font-light tracking-wide text-[#ffe0e0]/90 mix-blend-overlay md:text-lg"
                style={{ textShadow: '0 0 12px rgba(255,255,255,0.71)' }}
              >
                We turn the unseen into the unforgettable. A design agency for
                those who dare to disappear to be found.
              </p>
            </Reveal>

            <Reveal delay={400} className="flex flex-col items-center gap-6">
              <div className="group relative cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-[#FF4500]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
                <div className="relative flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-2 text-xs tracking-widest text-white/80 uppercase backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 md:text-sm">
                  <span>Enter the Void</span>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4 font-mono text-[10px] tracking-widest text-white/40 uppercase md:text-xs">
                <span>{time}</span>
                <span className="h-3 w-px bg-white/20" />
                <span>NYC, USA</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="expertise" className="relative scroll-mt-24 py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <h2 className="font-serif mb-12 text-3xl leading-tight text-white/90 md:text-5xl lg:text-6xl">
                We design the negative space where your brand truly lives.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-xl leading-relaxed font-light text-gray-500 md:text-2xl">
                Elegance is refusal. We remove the noise so your message
                resonates with absolute clarity.
              </p>
            </Reveal>
          </div>

          <div className="mt-32 grid grid-cols-2 items-center justify-items-center gap-8 opacity-40 grayscale transition-all duration-500 hover:grayscale-0 md:grid-cols-4">
            <Reveal className="text-xl font-bold tracking-widest">VOGUE</Reveal>
            <Reveal delay={100} className="text-xl font-bold tracking-widest">
              TESLA
            </Reveal>
            <Reveal delay={200} className="text-xl font-bold tracking-widest">
              MOOMA
            </Reveal>
            <Reveal delay={300} className="text-xl font-bold tracking-widest">
              AESOP
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section
        id="works"
        className="relative scroll-mt-24 overflow-hidden py-40"
      >
        <div className="container relative z-10 mx-auto px-6">
          <Reveal className="mb-32">
            <h2 className="font-serif text-center text-5xl md:text-7xl">
              Define your <br />
              <span className="italic">digital presence</span>
            </h2>
          </Reveal>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="sd-parallax-down" style={parallaxDownStyle}>
              <Reveal className="group flex aspect-[4/5] cursor-pointer flex-col justify-between rounded-3xl bg-[#FF4500] p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(255,69,0,0.3)] md:p-12">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 group-hover:rotate-45">
                    <Star className="text-2xl text-black" size={24} />
                  </div>
                  <span className="rounded-full border border-black/20 px-3 py-1 text-sm font-medium text-black">
                    01
                  </span>
                </div>

                <div>
                  <h3 className="font-serif mb-4 text-4xl leading-none tracking-tight text-black md:text-5xl">
                    Emerging <br />
                    Talent
                  </h3>
                  <p className="text-lg leading-snug text-black/70">
                    You have the spark. We provide the atmosphere for it to
                    ignite into a blazing reality.
                  </p>
                </div>

                <div className="mt-8 h-px w-full bg-black/10" />
              </Reveal>
            </div>

            <div className="sd-parallax-up md:mt-24" style={parallaxUpStyle}>
              <Reveal
                delay={150}
                className="group flex aspect-[4/5] cursor-pointer flex-col justify-between rounded-3xl border border-white/10 bg-[#111] p-8 shadow-2xl transition-all duration-500 hover:border-[#FF4500]/50 md:p-12"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-110">
                    <ArrowUpRight className="text-2xl text-white" size={24} />
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-sm font-medium text-white/50">
                    02
                  </span>
                </div>

                <div>
                  <h3 className="font-serif mb-4 text-4xl leading-none tracking-tight text-white md:text-5xl">
                    Evolving <br />
                    Legacy
                  </h3>
                  <p className="text-lg leading-snug text-gray-400">
                    You&apos;ve arrived. Now let&apos;s make sure you never
                    leave their minds. Permanence is our craft.
                  </p>
                </div>

                <div className="mt-8 h-px w-full bg-white/10" />
              </Reveal>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />
      </section>

      {/* Perspectives anchor (nav target without visual change) */}
      <div id="perspectives" className="scroll-mt-24" aria-hidden="true" />

      {/* Footer */}
      <footer
        id="contact"
        className="relative scroll-mt-24 overflow-hidden border-t border-white/5 bg-[#050505] py-20"
      >
        <div className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
            <div className="w-full md:w-auto">
              <div className="pointer-events-none text-[10vw] leading-[0.8] font-bold tracking-tighter text-white/10 select-none">
                SUPERDESIGN.
              </div>
            </div>

            <div className="flex flex-col gap-8 text-right">
              <div className="flex flex-col gap-4 text-gray-400">
                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 transition-colors hover:text-white">
                  LinkedIn
                </a>
              </div>
              <p className="text-sm text-gray-600">
                © 2024 Superdesign. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

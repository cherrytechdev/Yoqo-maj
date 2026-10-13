import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '../animations/Reveal'

type Capability = {
  number: string
  title: string
  subtitle: string
  text: string
  hoverGradient: string
  icon: React.ReactNode
}

const iconProps = {
  width: 28,
  height: 28,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const capabilities: Capability[] = [
  {
    number: '01',
    title: 'Accept',
    subtitle: 'Payment gateway',
    text: 'Online card acceptance, branded checkout and merchant integration.',
    hoverGradient: 'linear-gradient(135deg, #2563eb 0%, #5b7be0 50%, #1e40af 100%)',
    icon: (
      <svg {...iconProps}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Issue',
    subtitle: 'Prepaid card programs',
    text: 'Physical and virtual cards with configurable spending controls.',
    hoverGradient: 'linear-gradient(135deg, #0e8fb0 0%, #0a6f8c 50%, #075a73 100%)',
    icon: (
      <svg {...iconProps}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <line x1="13" y1="10" x2="18" y2="10" />
        <line x1="13" y1="14" x2="18" y2="14" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Connect',
    subtitle: 'Virtual assets',
    text: 'A regulated capability supporting the development of stablecoin payment flows.',
    hoverGradient: 'linear-gradient(135deg, #4f46e5 0%, #4338ca 50%, #312e81 100%)',
    icon: (
      <svg {...iconProps}>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
]

const TiltCard: React.FC<{ c: Capability }> = ({ c }) => {
  const ref = useRef<HTMLElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-6px)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-8 text-white shadow-[0_10px_30px_rgba(11,42,61,0.25)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_24px_50px_rgba(11,42,61,0.4)]"
      style={{
        background: 'linear-gradient(135deg, #3a4556 0%, #1a2130 40%, #161b2b 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: c.hoverGradient }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.12)_50%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start justify-between">
        {c.icon}
        <span className="text-xs font-semibold tracking-widest text-white/60">{c.number}</span>
      </div>

      <div className="relative z-10">
        <h3 className="text-3xl font-bold tracking-tight">{c.title}</h3>
        <p className="mt-2 text-base font-semibold text-cyan-300 transition-colors duration-500 group-hover:text-white">
          {c.subtitle}
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-white/70 group-hover:text-white/90">
          {c.text}
        </p>
      </div>
    </article>
  )
}

export const SolutionsPreview: React.FC = () => {
  return (
    <section
      id="solutions-preview"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-16 sm:py-24"
      style={{
        background: 'linear-gradient(180deg, #eef4f8 0%, #e4eef6 100%)',
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal direction="up">
          <h2 className="max-w-2xl text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-[#0b2a3d]">
            Three capabilities. One commercial relationship.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {capabilities.map((c, index) => (
            <Reveal key={c.number} direction="up" delay={index * 0.15}>
              <TiltCard c={c} />
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Link
              to="/solutions"
              className="group inline-flex items-center gap-2 rounded-full border border-[#0ea5d9] px-7 py-3 text-sm font-semibold text-[#0ea5d9] transition-all duration-300 hover:bg-[#0ea5d9] hover:text-white hover:shadow-[0_8px_24px_rgba(14,165,217,0.35)]"
            >
              Explore our solutions
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

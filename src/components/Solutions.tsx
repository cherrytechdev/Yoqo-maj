import React, { useRef } from 'react'
import { FeatureSteps, type Feature } from './ui/feature-section'
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

const Visual: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 320 200" fill="none" className="h-full w-full" aria-hidden="true">
    {children}
  </svg>
)

const stroke = '#0b2a3d'
const line = '#c9d8e4'
const accent = '#0ea5d9'

const flow: Feature[] = [
  {
    step: 'Step 01',
    title: 'Merchant checkout',
    content: 'Your customer pays by card on your website, app or platform.',
    visual: (
      <Visual>
        <rect x="26" y="28" width="268" height="144" rx="14" fill="#ffffff" stroke={line} strokeWidth="2" />
        <path d="M26 62h268" stroke={line} strokeWidth="2" />
        <circle cx="46" cy="45" r="4" fill="#d9e5ee" />
        <circle cx="60" cy="45" r="4" fill="#d9e5ee" />
        <circle cx="74" cy="45" r="4" fill="#d9e5ee" />
        <rect x="52" y="82" width="124" height="72" rx="9" fill="#f3f6f9" stroke={stroke} strokeWidth="2" />
        <path d="M52 102h124" stroke={stroke} strokeWidth="2" />
        <path d="M68 138h44" stroke="#5d7284" strokeWidth="2" strokeLinecap="round" />
        <rect x="200" y="92" width="76" height="26" rx="13" fill={accent} />
        <path d="M216 105h44" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <path d="M200 134h76" stroke="#5d7284" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      </Visual>
    ),
  },
  {
    step: 'Step 02',
    title: 'YOQO gateway',
    content: 'Routing, fraud screening and transaction controls in one integration.',
    visual: (
      <Visual>
        <path d="M124 100H92" stroke={line} strokeWidth="2" strokeLinecap="round" />
        <path d="M196 100h32" stroke={line} strokeWidth="2" strokeLinecap="round" />
        <path d="M124 100l-8-5v10l8-5Z" fill={line} />
        <path d="M196 100l8-5v10l-8-5Z" fill={line} />
        <rect x="32" y="80" width="60" height="40" rx="10" fill="#ffffff" stroke={line} strokeWidth="2" />
        <path d="M44 100h36" stroke="#5d7284" strokeWidth="2" strokeLinecap="round" />
        <rect x="228" y="80" width="60" height="40" rx="10" fill="#ffffff" stroke={line} strokeWidth="2" />
        <path d="M240 100h36" stroke="#5d7284" strokeWidth="2" strokeLinecap="round" />
        <rect x="124" y="60" width="72" height="80" rx="18" fill="#1f3d4f" />
        <path d="M138 88c14 0 14 24 28 24" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M138 112c14 0 14-24 28-24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="182" cy="88" r="4" fill={accent} />
        <circle cx="182" cy="112" r="4" fill="#ffffff" />
        <rect x="26" y="156" width="268" height="1.5" fill={line} />
      </Visual>
    ),
  },
  {
    step: 'Step 03',
    title: 'Acquirer and card network',
    content: 'The acquiring bank forwards the request to Visa or Mastercard.',
    visual: (
      <Visual>
        <circle cx="160" cy="96" r="52" fill="#ffffff" stroke={line} strokeWidth="2" />
        <ellipse cx="160" cy="96" rx="20" ry="52" stroke={line} strokeWidth="2" />
        <path d="M108 96h104" stroke={line} strokeWidth="2" />
        <path d="M118 68c26 14 58 14 84 0" stroke={line} strokeWidth="2" strokeLinecap="round" />
        <path d="M118 124c26-14 58-14 84 0" stroke={line} strokeWidth="2" strokeLinecap="round" />
        <circle cx="160" cy="96" r="6" fill={accent} />
        <circle cx="72" cy="150" r="7" fill="#ffffff" stroke={stroke} strokeWidth="2" />
        <circle cx="248" cy="150" r="7" fill="#ffffff" stroke={stroke} strokeWidth="2" />
        <path d="M86 146l68-46" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <path d="M234 146l-68-46" stroke={accent} strokeWidth="2" strokeLinecap="round" />
      </Visual>
    ),
  },
  {
    step: 'Step 04',
    title: 'Card issuer',
    content: 'The issuing bank approves or declines the transaction in real time.',
    visual: (
      <Visual>
        <rect x="46" y="52" width="176" height="112" rx="14" fill="#ffffff" stroke={stroke} strokeWidth="2" />
        <path d="M46 84h176" stroke={stroke} strokeWidth="2" />
        <rect x="64" y="100" width="30" height="22" rx="5" fill="#e6eff6" stroke="#5d7284" strokeWidth="1.5" />
        <path d="M64 111h30" stroke="#5d7284" strokeWidth="1.5" />
        <path d="M110 106h56" stroke="#5d7284" strokeWidth="2" strokeLinecap="round" />
        <path d="M110 122h36" stroke="#c9d8e4" strokeWidth="2" strokeLinecap="round" />
        <circle cx="232" cy="136" r="26" fill={accent} />
        <path d="M221 136l8 9 16-19" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </Visual>
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
      {/* Dégradé de couleur qui apparaît au survol */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: c.hoverGradient }}
      />
      {/* Reflet diagonal */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.12)_50%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Haut : icône + numéro */}
      <div className="relative z-10 flex items-start justify-between">
        {c.icon}
        <span className="text-xs font-semibold tracking-widest text-white/60">{c.number}</span>
      </div>

      {/* Bas : textes */}
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

export const Solutions: React.FC = () => {
  return (
    <section
      id="solutions"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-16 sm:py-24 scroll-mt-28"
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

        {/* Cartes */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {capabilities.map((c, index) => (
            <Reveal key={c.number} direction="up" delay={index * 0.15}>
              <TiltCard c={c} />
            </Reveal>
          ))}
        </div>

        {/* Bloc gateway */}
        <Reveal direction="up" delay={0.2}>
          <div className="mt-10 rounded-3xl border border-[#d9e5ee] bg-white/90 p-6 sm:p-8 md:p-10">
            <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#0b2a3d]">
              A gateway built around your business
            </h3>
            <p className="mt-4 text-base text-[#5d7284]">
              Connect your checkout to card-payment processing through a secure, branded integration.
            </p>

            <div className="mt-8">
              <FeatureSteps features={flow} autoPlayInterval={4000} />
            </div>

            <p className="mt-6 text-sm text-[#5d7284]">
              After authorisation, capture, reconciliation and settlement follow the agreed acquiring
              arrangements.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

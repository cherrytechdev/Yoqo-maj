import React, { useRef } from 'react'

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

const flow = [
  { title: 'Merchant checkout', text: 'Website or platform', active: false },
  { title: 'YOQO gateway', text: 'Routing and controls', active: true },
  { title: 'Acquirer and card network', text: 'Payment authorisation', active: false },
  { title: 'Card issuer', text: 'Approval or decline', active: false },
]

const Arrow: React.FC = () => (
  <svg
    className="mx-auto shrink-0 rotate-90 lg:rotate-0"
    width="44"
    height="10"
    viewBox="0 0 44 10"
    fill="none"
    aria-hidden="true"
  >
    <line x1="0" y1="5" x2="38" y2="5" stroke="#0ea5d9" strokeWidth="1.5" />
    <polygon points="38,1.5 44,5 38,8.5" fill="#0ea5d9" />
  </svg>
)

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
        <h2 className="max-w-2xl text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-[#0b2a3d]">
          Three capabilities. One commercial relationship.
        </h2>

        {/* Cartes */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {capabilities.map((c) => (
            <TiltCard key={c.number} c={c} />
          ))}
        </div>

        {/* Bloc gateway */}
        <div className="mt-10 rounded-3xl border border-[#d9e5ee] bg-white/90 p-8 sm:p-10">
          <h3 className="text-2xl sm:text-[28px] font-bold tracking-tight text-[#0b2a3d]">
            A gateway built around your business
          </h3>
          <p className="mt-4 text-base text-[#5d7284]">
            Connect your checkout to card-payment processing through a secure, branded integration.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
            {flow.map((step, i) => (
              <React.Fragment key={step.title}>
                <div
                  className={`flex-1 rounded-xl border px-5 py-5 ${
                    step.active
                      ? 'border-[#1f3d4f] bg-[#1f3d4f] text-white'
                      : 'border-[#d9e5ee] bg-[#f3f6f9] text-[#0b2a3d]'
                  }`}
                >
                  <p className="text-base font-bold leading-snug">{step.title}</p>
                  <p className={`mt-2 text-sm ${step.active ? 'text-white/70' : 'text-[#5d7284]'}`}>
                    {step.text}
                  </p>
                </div>
                {i < flow.length - 1 && <Arrow />}
              </React.Fragment>
            ))}
          </div>

          <p className="mt-6 text-sm text-[#5d7284]">
            After authorisation, capture, reconciliation and settlement follow the agreed acquiring
            arrangements.
          </p>
        </div>
      </div>
    </section>
  )
}
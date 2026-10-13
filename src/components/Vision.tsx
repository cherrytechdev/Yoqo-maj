import React from 'react'
import { Reveal } from '../animations/Reveal'

const stats = [
  { value: '17+', label: 'Years Experience' },
  { value: '100%', label: 'Compliance Focus' },
  { value: 'Global', label: 'Reach' },
]

export const Vision: React.FC = () => {
  return (
    <section
      id="vision"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-24 sm:py-32"
      style={{ background: 'linear-gradient(180deg, #04141d 0%, #060e18 100%)' }}
    >
      {/* Halo cyan en fond */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-60 top-0 h-[700px] w-[700px] rounded-full bg-cyan-500/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[120px]"
      />

      {/* Grille décorative en fond */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(14,165,217,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,217,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl">

        {/* ── Layout split ── */}
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24 items-start">

          {/* Colonne gauche — Titre */}
          <div className="lg:sticky lg:top-32">
            {/* Pill label */}
            

            <Reveal direction="left" delay={0.08}>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
                Pioneering
                <br />
                the Future
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  of Digital
                  <br />
                  Finance
                </span>
              </h2>
            </Reveal>

            {/* Trait décoratif */}
            <Reveal direction="left" delay={0.18}>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/60 to-transparent" />
                <div className="h-2 w-2 rounded-full bg-cyan-400" />
              </div>
            </Reveal>
          </div>

          {/* Colonne droite — Contenu */}
          <div className="flex flex-col gap-8">

            <Reveal direction="right" delay={0.1}>
              <p className="text-base sm:text-lg leading-relaxed text-white/65 border-l-2 border-cyan-500/40 pl-6">
                YOQO Payments stands as a dynamic and reliable leader in digital finance, driving
                businesses forward with precision and strength. The founder envisioned more than a
                payment provider—they aimed to create a vital link between merchants and markets,
                innovation and regulation, opportunity and action.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.18}>
              <p className="text-base sm:text-lg leading-relaxed text-white/65 border-l-2 border-sky-500/40 pl-6">
                Based in Mauritius, a hub known for its strong financial infrastructure and global
                connectivity, YOQO was ideally placed to become a gateway for international commerce.
                From the beginning, the goal was straightforward: streamline payments, empower
                businesses, and maintain unwavering commitment to compliance and integrity.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.26}>
              <p className="text-base sm:text-lg leading-relaxed text-white/65 border-l-2 border-blue-500/40 pl-6">
                Today, YOQO Payments delivers comprehensive payment intermediary services covering
                onboarding, transaction processing, settlement, and reporting—designed for businesses
                that prioritize speed, security, and scalability.
              </p>
            </Reveal>

            {/* Stats en cards */}
            <Reveal direction="right" delay={0.34}>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {stats.map((s, i) => (
                  <div
                    key={s.value}
                    className="group relative rounded-2xl border border-white/8 bg-white/3 px-5 py-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/8"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {/* Glow au hover */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: 'radial-gradient(circle at 50% 0%, rgba(14,165,217,0.12), transparent 70%)' }}
                    />
                    <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {s.value}
                    </p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-widest text-white/45">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>

      </div>
    </section>
  )
}

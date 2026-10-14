import React from 'react'
import { Reveal } from '../animations/Reveal'
import { CountUp } from '../animations/CountUp'

const stats = [
  { value: '17+', label: 'Years Experience' },
  { value: '100%', label: 'Compliance Focus' },
  { value: 'Global', label: 'Reach' },
]

export const Vision: React.FC = () => {
  return (
    <section
      id="vision"
      className="relative w-full px-6 sm:px-12 md:px-20 lg:px-28 py-24 sm:py-32"
      style={{ background: '#04141d' }}
    >
      <div className="relative mx-auto max-w-7xl">
        <Reveal direction="up">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-24 items-start">

            {/* Colonne gauche — Titre */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
              Pioneering
              <br />
              the Future
              <br />
              <span className="text-cyan-400">
                of Digital
                <br />
                Finance
              </span>
            </h2>

            {/* Colonne droite — Contenu */}
            <div className="flex flex-col gap-6">
              <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                YOQO Payments stands as a dynamic and reliable leader in digital finance, driving
                businesses forward with precision and strength. The founder envisioned more than a
                payment provider—they aimed to create a vital link between merchants and markets,
                innovation and regulation, opportunity and action.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                Based in Mauritius, a hub known for its strong financial infrastructure and global
                connectivity, YOQO was ideally placed to become a gateway for international commerce.
                From the beginning, the goal was straightforward: streamline payments, empower
                businesses, and maintain unwavering commitment to compliance and integrity.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-slate-300">
                Today, YOQO Payments delivers comprehensive payment intermediary services covering
                onboarding, transaction processing, settlement, and reporting—designed for businesses
                that prioritize speed, security, and scalability.
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse">
                    <dt className="text-xs font-medium uppercase tracking-widest text-slate-400">
                      {s.label}
                    </dt>
                    <dd className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
                      <CountUp value={s.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

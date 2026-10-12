import React from 'react'
import { ButtonLink } from './ui/button'
import { Reveal } from '../animations/Reveal'

const licences = [
  { label: 'Payment services', title: 'Payment Intermediary Services' },
  { label: 'Virtual assets', title: 'Virtual Asset Broker-Dealer Class M' },
]

export const Regulation: React.FC = () => {
  return (
    <section
      id="regulation"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-28"
      style={{ background: 'linear-gradient(180deg, #f4f8fb 0%, #eef4f8 100%)' }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal direction="up">
          <h2 className="max-w-3xl text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-[#082a40]">
            A regulated foundation with clear product boundaries
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <p className="mt-8 text-xl sm:text-2xl font-bold tracking-tight text-[#082a40]">
            YOQO Payment Systems Ltd
          </p>
          <p className="mt-3 text-base sm:text-lg text-[#5d7284]">
            Financial Services Commission, Mauritius
          </p>
        </Reveal>

        <div className="mt-10 border-t border-[#d3e0ea]" />

        {/* Les deux grandes cases animées */}
        <div className="mt-8 grid md:grid-cols-2">
          {licences.map((l, i) => (
            <Reveal key={l.title} direction="up" delay={0.2 + i * 0.15}>
              <div
                className={`group relative cursor-default rounded-2xl px-4 py-8 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_18px_40px_rgba(14,165,217,0.18)] sm:px-6 ${
                  i === 1 ? 'md:ml-6 md:border-l md:border-[#d3e0ea] md:pl-10' : 'md:mr-6'
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[#0a86ad] transition-all duration-500 group-hover:translate-x-2 group-hover:tracking-[0.2em]">
                  {l.label}
                </p>

                <h3 className="mt-8 max-w-sm text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[#082a40] transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#0a86ad]">
                  {l.title}
                </h3>

                {/* Barre cyan qui se dessine au survol */}
                <span className="mt-6 block h-1 w-full max-w-[120px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={0.35}>
          <p className="mt-10 max-w-4xl text-sm sm:text-base leading-relaxed text-[#5d7284]">
            Services depend on the relevant licence conditions, partner approvals and contractual
            arrangements. A financial-services licence does not imply a banking or custody licence.
          </p>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#contact" size="lg" className="w-full sm:w-auto">
              Talk to us
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
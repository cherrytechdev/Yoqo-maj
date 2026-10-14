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

        {/* Licences */}
        <div className="mt-8 grid md:grid-cols-2">
          {licences.map((l, i) => (
            <Reveal key={l.title} direction="up" delay={0.2 + i * 0.15}>
              <div
                className={`relative px-4 py-8 sm:px-6 ${
                  i === 1 ? 'md:ml-6 md:border-l md:border-[#d3e0ea] md:pl-10' : 'md:mr-6'
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[#0a86ad]">
                  {l.label}
                </p>

                <h3 className="mt-8 max-w-sm text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[#082a40]">
                  {l.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 border-t border-[#d3e0ea]" />

        {/* Memberships */}
        <div className="mt-8 grid md:grid-cols-2">
          {[
            { label: 'Principal Member', title: 'UnionPay International' },
            { label: 'Payment Facilitator', title: 'Visa, Mastercard and JCB' },
          ].map((m, i) => (
            <Reveal key={m.label} direction="up" delay={0.35 + i * 0.15}>
              <div
                className={`relative px-4 py-8 sm:px-6 ${
                  i === 1 ? 'md:ml-6 md:border-l md:border-[#d3e0ea] md:pl-10' : 'md:mr-6'
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wide text-[#0a86ad]">
                  {m.label}
                </p>
                <h3 className="mt-8 max-w-sm text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-[#082a40]">
                  {m.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={0.55}>
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
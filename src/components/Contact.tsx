import React from 'react'
import { Reveal } from '../animations/Reveal'

const EMAIL_1 = 'meithilesh.ramautar@yoqo.io'
const EMAIL_2 = 'bhovin@yoqo.io'
const PHONE   = '+230 55 15 50 20'

const infos = [
  { label: 'Email',     value: EMAIL_1, href: `mailto:${EMAIL_1}` },
  { label: 'Email',     value: EMAIL_2, href: `mailto:${EMAIL_2}` },
  { label: 'Phone',     value: PHONE,   href: `tel:${PHONE.replace(/\s/g, '')}` },
  { label: 'Website',   value: 'yoqo.io', href: 'https://yoqo.io' },
  { label: 'Based in',  value: 'Mauritius' },
  { label: 'Languages', value: 'English, French' },
]

/* ---------- Carte d'infos ---------- */
const InfoCard: React.FC = () => (
  <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a1c2a] p-5 sm:p-8">
    {infos.map((info, i) => {
      const content = (
        <>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-400">
            {info.label}
          </p>
          <p className="mt-1.5 break-all text-base font-semibold text-white transition-colors duration-200 group-hover:text-cyan-300">
            {info.value}
          </p>
        </>
      )

      return (
        <div key={i} className={i < infos.length - 1 ? 'border-b border-white/10' : ''}>
          {info.href ? (
            <a href={info.href} className="group block py-4">
              {content}
            </a>
          ) : (
            <div className="py-4">{content}</div>
          )}
        </div>
      )
    })}
  </div>
)

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative w-full px-6 sm:px-12 md:px-20 lg:px-28 pt-36 sm:pt-44 pb-20 sm:pb-28 scroll-mt-28"
      style={{ background: '#03111a' }}
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 sm:gap-14 md:grid-cols-2">
        {/* Colonne gauche */}
        <Reveal direction="up">
          <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
            Your next
            <br />
            <span className="sm:whitespace-nowrap text-cyan-400">payment program</span>
            <br />
            starts here.
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-white/75 sm:mt-8 sm:text-lg">
            Talk to YOQO about payment acceptance, prepaid cards and your digital-asset strategy.
          </p>
        </Reveal>

        {/* Colonne droite */}
        <Reveal direction="up" delay={0.15} className="flex md:justify-end">
          <InfoCard />
        </Reveal>
      </div>
    </section>
  )
}

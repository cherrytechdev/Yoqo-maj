import React, { useState } from 'react'
import { ShieldCheck, Key, Eye, Award } from 'lucide-react'
import { Reveal } from '../animations/Reveal'

const steps = [
  {
    phase: 'Before payment',
    title: 'Know the business',
    text: 'Merchant due diligence and compliance review.',
    icon: ShieldCheck,
  },
  {
    phase: 'During payment',
    title: 'Authenticate and protect',
    text: '3D Secure 2.0, tokenization and encryption.',
    icon: Key,
  },
  {
    phase: 'After payment',
    title: 'Monitor and respond',
    text: 'Transaction monitoring, fraud review and dispute support.',
    icon: Eye,
  },
]

export const Security: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeStep = steps[activeIndex]
  const ActiveIcon = activeStep.icon

  return (
    <section
      id="security"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-28"
      style={{
        background:
          'radial-gradient(ellipse 35% 40% at 0% 8%, rgba(186, 225, 245, 0.55) 0%, transparent 70%), linear-gradient(180deg, #eef5fb 0%, #e2edf5 100%)',
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal direction="up">
          <h2 className="max-w-xl text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-[#082a40]">
            Security throughout the payment lifecycle
          </h2>
        </Reveal>

        {/* Disposition style screenshot */}
        <Reveal direction="up" delay={0.12}>
          <div className="mt-12 rounded-2xl border border-[#c8dce6] bg-white/60 backdrop-blur-sm overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12">
            {/* Colonne Gauche - Visuel icône */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-8 sm:p-12 border-b md:border-b-0 md:border-r border-[#c8dce6] bg-[#eaf3f8]/40 min-h-[260px] sm:min-h-[340px]">
              <div className="flex items-center justify-center p-6 rounded-2xl bg-white/80 border border-[#d3e0ea] shadow-sm text-[#082a40]">
                <ActiveIcon size={88} strokeWidth={1.4} className="text-[#082a40]" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#1a80a8]">
                {activeStep.phase}
              </p>
            </div>

            {/* Colonne Droite - Liste d'éléments */}
            <div className="md:col-span-7 flex flex-col justify-center divide-y divide-[#c8dce6]">
              {steps.map((s, index) => {
                const StepIcon = s.icon
                const isActive = activeIndex === index

                return (
                  <button
                    key={s.phase}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-5 sm:p-6 transition-colors duration-150 cursor-pointer ${
                      isActive ? 'bg-white/40' : 'hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <StepIcon
                        size={20}
                        className={`mt-0.5 shrink-0 ${isActive ? 'text-[#082a40]' : 'text-[#5d7284]'}`}
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#1a80a8] uppercase tracking-wider mb-0.5">
                          {s.phase}
                        </p>
                        <h3
                          className={`text-base sm:text-lg tracking-tight ${
                            isActive
                              ? 'font-bold text-[#082a40]'
                              : 'font-semibold text-[#082a40]/90 hover:text-[#082a40]'
                          }`}
                        >
                          {s.title}
                        </h3>
                        {isActive && (
                          <p className="mt-2 text-sm sm:text-base text-[#5d7284] leading-relaxed">
                            {s.text}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* Badge PCI DSS */}
        <div className="mt-8">
          <Reveal direction="zoom" delay={0.25}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0ea5d9] bg-white/40 px-6 py-3 text-sm font-semibold text-[#082a40]">
              <Award size={18} className="text-[#0ea5d9]" />
              PCI DSS-compliant gateway
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
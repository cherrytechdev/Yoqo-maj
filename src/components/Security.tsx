import React from 'react'

const steps = [
  {
    phase: 'Before payment',
    title: 'Know the business',
    text: 'Merchant due diligence and compliance review.',
  },
  {
    phase: 'During payment',
    title: 'Authenticate and protect',
    text: '3D Secure 2.0, tokenization and encryption.',
  },
  {
    phase: 'After payment',
    title: 'Monitor and respond',
    text: 'Transaction monitoring, fraud review and dispute support.',
  },
]

export const Security: React.FC = () => {
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
        <h2 className="max-w-xl text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-[#082a40]">
          Security throughout the payment lifecycle
        </h2>

        {/* Lignes du cycle de paiement */}
        <div className="mt-10">
          {steps.map((s) => (
            <div
              key={s.phase}
              className="grid items-center gap-2 border-b border-[#d3e0ea] py-6 md:grid-cols-[220px_1fr_1fr] md:gap-8"
            >
              <p className="text-sm font-semibold text-[#1a80a8]">{s.phase}</p>
              <h3 className="text-2xl font-bold tracking-tight text-[#082a40]">{s.title}</h3>
              <p className="text-[15px] leading-relaxed text-[#5d7284] md:max-w-xs">{s.text}</p>
            </div>
          ))}
        </div>

        {/* Badge */}
        <div className="mt-8">
          <span className="inline-flex items-center rounded-full border border-[#0ea5d9] bg-white/40 px-6 py-3 text-sm font-semibold text-[#082a40]">
            PCI DSS-compliant gateway
          </span>
        </div>
      </div>
    </section>
  )
}
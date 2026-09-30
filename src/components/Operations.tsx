import React from 'react'

const items = [
  {
    title: 'Merchant onboarding',
    text: 'Business review, documentation and coordination with the relevant payment partners.',
  },
  {
    title: 'Integration and configuration',
    text: 'Gateway connection, branded checkout and agreed transaction settings.',
  },
  {
    title: 'Transaction oversight',
    text: 'Fraud monitoring, portfolio management and support for payment issues.',
  },
  {
    title: 'Settlement and disputes',
    text: 'Reconciliation support, chargeback handling and settlement follow-up.',
  },
]

export const Operations: React.FC = () => {
  return (
    <section
      id="operations"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-28"
      style={{
        background:
          'radial-gradient(ellipse 40% 50% at 0% 0%, rgba(186, 225, 245, 0.35) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 85% 100%, rgba(186, 225, 240, 0.45) 0%, transparent 70%), linear-gradient(180deg, #f8fbfd 0%, #eef4f8 100%)',
      }}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-xl text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-[#082a40]">
          Support beyond the transaction
        </h2>

        <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#5d7284]">
          Technology works best with an operating model that supports the merchant every day, from
          onboarding to settlement.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {items.map((item) => (
            <div key={item.title} className="border-t-2 border-[#0ea5d9] pt-6">
              <h3 className="text-xl font-bold leading-snug tracking-tight text-[#082a40]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#5d7284]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
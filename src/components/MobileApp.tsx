import React from 'react'

const PHONE1_SRC = '/phone1.png' // ← change l'extension si besoin (.jpg, .webp...)
const PHONE2_SRC = '/phone2.png'

const features = [
  'Onboard and request a card',
  'Activate, block or unblock',
  'Manage the PIN',
  'Check balances and statements',
  'Receive notifications',
]

const Check: React.FC = () => (
  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#0ea5d9] text-[#0ea5d9]">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
)

export const MobileApp: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 40% 50% at 100% 30%, rgba(200, 224, 240, 0.55) 0%, transparent 70%), linear-gradient(180deg, #eef4f8 0%, #f4f8fb 100%)',
      }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold leading-[1.15] tracking-tight text-[#082a40]">
            The YOQO mobile app
          </h2>
          <p className="mt-4 text-base text-[#5d7284]">
            Everyday card control in the cardholder's hands.
          </p>

          <ul className="mt-8 max-w-xs space-y-2.5">
            {features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-3 rounded-lg border border-[#d9e5ee] bg-white/80 px-3 py-2 text-sm text-[#082a40] shadow-sm"
              >
                <Check />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center gap-4 md:justify-end">
          <img
            src={PHONE1_SRC}
            alt="YOQO app - card details"
            draggable={false}
            className="mt-10 w-[44%] max-w-[220px] select-none drop-shadow-[0_25px_35px_rgba(11,42,61,0.3)] transition-transform duration-500 hover:-translate-y-2"
          />
          <img
            src={PHONE2_SRC}
            alt="YOQO app - your cards"
            draggable={false}
            className="-mt-6 w-[44%] max-w-[220px] select-none drop-shadow-[0_25px_35px_rgba(11,42,61,0.3)] transition-transform duration-500 hover:-translate-y-2"
          />
        </div>
      </div>
    </section>
  )
}
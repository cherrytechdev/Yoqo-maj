import React from 'react'
import { Reveal } from '../animations/Reveal'
import { YoqoCard3D } from './ui/YoqoCard3D'

export const Cards: React.FC = () => {
  return (
    <section
      id="cards"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-28"
      style={{
        background:
          'linear-gradient(180deg, #f8fbfd 0%, #eef4f8 100%)',
      }}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[1fr_1.1fr]">
        {/* Texte */}
        <div>
          <Reveal direction="left">
            <h2 className="text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-[#082a40]">
              YOQO Platinum
            </h2>
          </Reveal>

          <Reveal direction="left" delay={0.15}>
            <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-[#5d7284]">
              A UnionPay-powered prepaid card for everyday spending and business programs, with
              branded issuance and full program control.
            </p>
          </Reveal>
        </div>

        <div className="animate-slide-in-left-delay w-full max-w-[360px] mx-auto xl:max-w-[95%] justify-self-center">
          <YoqoCard3D />
        </div>
      </div>
    </section>
  )
}
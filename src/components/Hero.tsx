import React from 'react'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from './ui/button'

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between pt-36 sm:pt-44 pb-12 px-6 sm:px-12 md:px-20 lg:px-28 overflow-hidden select-none font-montserrat"
      style={{
        background: 'linear-gradient(180deg, #03131b 0%, #04141d 45%, #0b5482 100%)'
      }}
    >
      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl my-auto">
        <h1 className="animate-slide-in-left font-montserrat text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-black text-white leading-[1.02] tracking-tight mb-8 sm:mb-12 max-w-4xl drop-shadow-md">
          Payments for<br />
          international<br />
          business
        </h1>

        <p className="animate-slide-in-left-delay text-slate-200 text-lg sm:text-2xl md:text-[27px] font-normal max-w-2xl leading-relaxed tracking-wide font-montserrat opacity-90">
          Payment acceptance. Prepaid cards. Virtual-asset capabilities.
        </p>

        <div className="animate-slide-in-left-delay-2 mt-10 flex flex-col items-stretch gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4">
          <ButtonLink href="#contact" size="lg" className="w-full sm:w-auto">
            Talk to us
          </ButtonLink>

          <ButtonLink
            href="#solutions"
            variant="secondary"
            size="lg"
            className="group w-full text-white sm:w-auto"
          >
            Explore solutions
            <ArrowRight
              size={18}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </ButtonLink>
        </div>
      </div>
    </section>
  )
} 
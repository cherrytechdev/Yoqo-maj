import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3.5 text-sm font-bold text-[#03131b] shadow-[0_0_20px_rgba(14,165,217,0.45)] transition duration-300 ease-out hover:scale-105 active:scale-95 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
          >
            Talk to us
          </Link>

          <Link
            to="/solutions"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-current/25 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 ease-out hover:border-[#0ea5d9] hover:text-[#0ea5d9] active:scale-95 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
          >
            Explore solutions
            <ArrowRight
              size={18}
              strokeWidth={2.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  )
} 
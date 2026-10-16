import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'
import { YoqoCard3D } from './ui/YoqoCard3D'

gsap.registerPlugin(ScrollTrigger)

const XL = '(min-width: 1280px)'

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)
  const [isXl, setIsXl] = useState(() => window.matchMedia(XL).matches)

  useEffect(() => {
    const mq = window.matchMedia(XL)
    const update = () => setIsXl(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // ScrollTrigger suit le défilement doux de Lenis
  useLenis(() => ScrollTrigger.update())

  // Au scroll : la carte tourne, vient au centre et zoome, puis voile bleu vers la section suivante
  useLayoutEffect(() => {
    if (!isXl) return
    const mm = gsap.matchMedia()
    mm.add(`${XL} and (prefers-reduced-motion: no-preference)`, () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: '+=150%', pin: true, scrub: true },
      })
      tl.to(textRef.current, { autoAlpha: 0, y: -80, duration: 0.25 }, 0)
        .to(progress, { current: 1, duration: 0.8 }, 0)
        .to(veilRef.current, { opacity: 1, duration: 0.3 }, 0.7)
      return () => { progress.current = 0 }
    })
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => mm.revert()
  }, [isXl, progress])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between pt-36 sm:pt-44 pb-12 px-6 sm:px-12 md:px-20 lg:px-28 overflow-hidden font-montserrat"
      style={{
        background: 'linear-gradient(180deg, #03131b 0%, #04141d 45%, #0b5482 100%)'
      }}
    >
      {isXl && (
        <>
          {/* même entrée que la colonne de l'ancre, pour que la carte arrive avec elle */}
          <YoqoCard3D anchor={anchorRef} progress={progress} className="animate-slide-in-left-delay" style={{ position: 'absolute', inset: 0, height: '100%', aspectRatio: 'auto' }} />
          <div
            ref={veilRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0"
            style={{ background: 'linear-gradient(180deg, #0b5482 0%, #0b5482 45%, #04141d 100%)' }}
          />
        </>
      )}

      <div className="relative z-10 my-auto grid items-center gap-12 xl:grid-cols-[auto_minmax(0,1fr)]">
        {/* Main Content Area */}
        <div ref={textRef} className="max-w-5xl">
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

        {/* Visuel produit — grands écrans uniquement */}
        <div className="animate-slide-in-left-delay hidden w-full max-w-95% justify-self-center xl:block">
          <div ref={anchorRef} style={{ width: '100%', aspectRatio: '4 / 3' }} />
        </div>
      </div>
    </section>
  )
} 
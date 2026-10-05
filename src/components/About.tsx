import React, { useEffect, useRef, useState } from 'react'
import { Reveal } from '../animations/Reveal'

const details = [
  { label: 'Technical delivery', value: 'Practical operational experience' },
  { label: 'Languages', value: 'English, French and Hindi' },
]

export const About: React.FC = () => {
  const underlineRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  // Underline reveal on scroll
  useEffect(() => {
    const el = underlineRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = 'scaleX(1)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Vertical bar reveal on scroll
  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = 'scaleY(1)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-28"
      style={{
        background:
          'radial-gradient(ellipse 40% 50% at 0% 0%, rgba(186, 225, 245, 0.35) 0%, transparent 70%), linear-gradient(180deg, #f8fbfd 0%, #eef4f8 100%)',
      }}
    >
      {/* Halos qui flottent lentement — CSS animation */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-sky-200/50 blur-[110px]"
        style={{ animation: 'floatHalo1 12s ease-in-out infinite' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-[110px]"
        style={{ animation: 'floatHalo2 14s ease-in-out infinite' }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-0">
        {/* ---------- Colonne gauche ---------- */}
        <div className="lg:pr-20">
          <Reveal direction="up">
            <h2 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#082a40]">
              <span className="block overflow-hidden pb-1">
                <span className="block">
                  Payment expertise. A
                </span>
              </span>
              <span className="relative block overflow-hidden pb-2">
                <span className="block">
                  Mauritius foundation.
                </span>
                {/* Soulignement */}
                <span
                  ref={underlineRef}
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                  style={{
                    transform: 'scaleX(0)',
                    transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
                  }}
                />
              </span>
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <p className="mt-8 max-w-xl text-xl sm:text-[22px] leading-relaxed text-[#0c2a3d]">
              YOQO Payment Systems Ltd helps businesses establish and manage international payment
              operations.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[#5d7284]">
              We combine gateway technology, prepaid card programs and virtual-asset capabilities with
              hands-on support across merchant onboarding, risk and settlement operations.
            </p>
          </Reveal>
        </div>

        {/* ---------- Colonne droite ---------- */}
        <div className="relative pl-8 sm:pl-14">
          {/* Trait cyan */}
          <span
            ref={barRef}
            aria-hidden
            className="absolute left-0 top-0 h-full w-0.5 origin-top bg-[#0ea5d9]"
            style={{
              transform: 'scaleY(0)',
              transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />

          <Reveal direction="right" delay={0.1}>
            <h3 className="max-w-xs text-2xl sm:text-[26px] font-bold leading-tight tracking-tight text-[#082a40]">
              Make payment operations easier to manage.
            </h3>
          </Reveal>

          <dl className="mt-6 space-y-3">
            {details.map((d, index) => (
              <Reveal key={d.label} direction="right" delay={0.2 + index * 0.1}>
                <div className="group relative cursor-default rounded-xl px-4 py-3 -mx-4 transition-all duration-300 hover:translate-x-2 hover:bg-white/80 hover:shadow-[0_10px_30px_rgba(14,165,217,0.15)]">
                  <dt className="text-sm font-bold text-[#082a40] transition-colors duration-300 group-hover:text-[#0a86ad]">
                    {d.label}
                  </dt>
                  <dd className="mt-3 text-sm text-[#5d7284]">{d.value}</dd>
                  {/* Barre cyan qui se remplit au survol */}
                  <span className="mt-3 block h-0.5 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
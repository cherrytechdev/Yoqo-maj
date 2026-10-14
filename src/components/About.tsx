import React, { useEffect, useRef, useState } from 'react'
import { Reveal } from '../animations/Reveal'

const details = [
  { label: 'Technical delivery', value: 'Practical operational experience' },
  { label: 'Languages', value: 'English, French' },
]

/* Trait qui se dessine une seule fois quand il entre dans l'écran */
const DrawnUnderline: React.FC = () => {
  const ref = useRef<HTMLSpanElement>(null)
  // Respect prefers-reduced-motion : trait déjà dessiné
  const [drawn, setDrawn] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const el = ref.current
    if (!el || drawn) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [drawn])

  return (
    <span
      ref={ref}
      aria-hidden
      className="absolute bottom-0 left-0 h-[3px] w-full origin-left rounded-full bg-[#0ea5d9]"
      style={{
        transform: drawn ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
      }}
    />
  )
}

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative w-full px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-28"
      style={{ background: '#f4f8fb' }}
    >
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-0">

        {/* ---------- Colonne gauche ---------- */}
        <Reveal direction="up" className="lg:pr-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-[#082a40]">
            Payment expertise. A
            <br />
            <span className="relative inline-block pb-2">
              Mauritius foundation.
              <DrawnUnderline />
            </span>
          </h2>

          <p className="mt-8 max-w-xl text-xl sm:text-[22px] leading-relaxed text-[#0c2a3d]">
            YOQO Payment Systems Ltd helps businesses establish and manage international payment
            operations.
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5d7284]">
            We combine gateway technology, prepaid card programs and virtual-asset capabilities with
            hands-on support across merchant onboarding, risk and settlement operations.
          </p>
        </Reveal>

        {/* ---------- Colonne droite ---------- */}
        <Reveal direction="up" delay={0.15} className="border-l-2 border-[#0ea5d9] pl-8 sm:pl-14">
          <h3 className="max-w-xs text-2xl sm:text-[26px] font-bold leading-tight tracking-tight text-[#082a40]">
            Make payment operations easier to manage.
          </h3>

          <dl className="mt-6 space-y-5">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="text-sm font-bold text-[#082a40]">{d.label}</dt>
                <dd className="mt-1 text-sm text-[#5d7284]">{d.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

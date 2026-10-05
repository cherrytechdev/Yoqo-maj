import React, { useRef, useState } from 'react'
import { Reveal } from '../animations/Reveal'

const EMAIL = 'meithilesh.ramautar@yoqo.io'

const infos = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Website', value: 'yoqo.io', href: 'https://yoqo.io' },
  { label: 'Based in', value: 'Mauritius' },
  { label: 'Languages', value: 'English, French, and Hindi' }, 
]

/* ---------- Carte d'infos : inclinaison 3D + lumière qui suit la souris ---------- */
const InfoCard: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)')
  const [spotPos, setSpotPos] = useState({ x: -300, y: -300 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = e.clientX - left - width / 2
    const y = e.clientY - top - height / 2
    const rotX = (y / 150) * -8
    const rotY = (x / 200) * 8
    setTransform(`rotateX(${rotX}deg) rotateY(${rotY}deg)`)
    setSpotPos({ x: e.clientX - left, y: e.clientY - top })
  }
  const onLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg)')
    setSpotPos({ x: -300, y: -300 })
  }

  return (
    <div style={{ perspective: '1000px' }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
        className="relative w-full max-w-lg transform-gpu overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8"
      >
        {/* Lumière qui suit la souris */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(260px circle at ${spotPos.x}px ${spotPos.y}px, rgba(34,211,238,0.16), transparent 70%)`,
          }}
        />

        {/* Bordure lumineuse animée */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-px left-0 h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          style={{ animation: 'slideBorder 5s linear infinite' }}
        />

        <div style={{ transform: 'translateZ(25px)' }} className="relative">
          {infos.map((info, i) => {
            const content = (
              <>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400 transition-all duration-300 group-hover:tracking-[0.3em]">
                  {info.label}
                </p>
                <p className="mt-1.5 break-all text-base font-semibold text-white transition-all duration-300 group-hover:translate-x-2 group-hover:text-cyan-300">
                  {info.value}
                </p>
              </>
            )

            return (
              <div key={info.label} className="group relative">
                {info.href ? (
                  <a href={info.href} className="block py-4">
                    {content}
                  </a>
                ) : (
                  <div className="py-4">{content}</div>
                )}

                {/* Séparateur qui se remplit au survol */}
                {i < infos.length - 1 && (
                  <div className="relative h-px w-full bg-white/10">
                    <span className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-28"
      style={{ background: '#03111a' }}
    >
      {/* Halos lumineux qui flottent — CSS animation */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[720px] w-[720px] rounded-full bg-blue-600/25 blur-[120px]"
        style={{ animation: 'floatHalo1 12s ease-in-out infinite' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[720px] w-[720px] rounded-full bg-cyan-500/20 blur-[130px]"
        style={{ animation: 'floatHalo2 14s ease-in-out infinite' }}
      />

      {/* Particules lumineuses — CSS animation */}
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-cyan-300/60"
          style={{
            left: `${8 + i * 12}%`,
            top: `${20 + ((i * 37) % 60)}%`,
            animation: `floatParticle ${4 + (i % 4)}s ease-in-out ${i * 0.5}s infinite`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 sm:gap-14 md:grid-cols-2">
        {/* Colonne gauche */}
        <div>
          <Reveal direction="left">
            <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Your next
              <br />
              <span className="sm:whitespace-nowrap bg-gradient-to-r from-sky-400 via-cyan-200 to-sky-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite]">
                payment program
              </span>
              <br />
              starts here.
            </h2>
          </Reveal>

          <Reveal direction="left" delay={0.15}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75 sm:mt-8 sm:text-lg">
              Talk to YOQO about payment acceptance, prepaid cards and your digital-asset strategy.
            </p>
          </Reveal>

          <Reveal direction="left" delay={0.25}>
            <div className="mt-8">
              <a
                href={`mailto:${EMAIL}`}
                className="group relative inline-flex overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 max-w-full px-5 py-3.5 text-sm font-bold sm:px-8 sm:py-4 sm:text-base text-[#03131b] transition-transform duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
              >
                {/* Halo qui pulse */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(14,165,217,0.7)]"
                  style={{ animation: 'pulseGlow 2.4s ease-in-out infinite' }}
                />
                {/* Reflet qui traverse le bouton */}
                <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/40 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[400%]" />
                <span className="relative break-all">{EMAIL}</span>
              </a>
            </div>

            <a
              href="https://yoqo.io"
              className="group mt-8 inline-block text-sm font-bold text-white"
            >
              <span className="relative">
                yoqo.io
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </a>
          </Reveal>
        </div>

        {/* Colonne droite */}
        <div className="flex md:justify-end">
          <Reveal direction="right" delay={0.2}>
            <InfoCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
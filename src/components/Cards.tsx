import React, { useRef, useState } from 'react'
import { Reveal } from '../animations/Reveal'

const CARD_SRC = '/cards.png' // ← garde le nom réel de ton image dans public/

/* ---------- Carte 3D : suit la souris, reflet, ombre dynamique, flottement ---------- */
const Card3D: React.FC = () => {
  const zone = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(6)
  const [rotateY, setRotateY] = useState(-12)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [shadowX, setShadowX] = useState(10)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zone.current) return
    const r = zone.current.getBoundingClientRect()
    const mx = ((e.clientX - r.left) / r.width) * 2 - 1
    const my = ((e.clientY - r.top) / r.height) * 2 - 1

    // Au repos la carte est déjà légèrement inclinée (rotateY -12, rotateX 6)
    setRotateY(-34 + (10 - -34) * ((mx + 1) / 2))
    setRotateX(24 + (-12 - 24) * ((my + 1) / 2))
    setGlarePos({ x: (mx + 1) * 50, y: (my + 1) * 50 })
    setShadowX(40 + (-20 - 40) * ((mx + 1) / 2))
  }
  const onLeave = () => {
    setRotateX(6)
    setRotateY(-12)
    setGlarePos({ x: 50, y: 50 })
    setShadowX(10)
  }

  return (
    <div
      ref={zone}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex items-center justify-center py-10"
      style={{ perspective: '1400px' }}
    >
      {/* Halo lumineux derrière la carte */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[380px] w-[380px] rounded-full bg-sky-300/40 blur-[90px]"
        style={{ animation: 'pulseHalo 6s ease-in-out infinite' }}
      />

      {/* Flottement */}
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          animation: 'cardFloat 5s ease-in-out infinite',
        }}
      >
        {/* Ombre dynamique au sol */}
        <div
          aria-hidden
          className="absolute -bottom-10 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[50%] bg-[#0b2a3d]/35 blur-2xl"
          style={{
            transform: `translateX(${shadowX}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        />

        {/* La carte */}
        <div
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.15s ease-out',
          }}
          className="relative transform-gpu"
        >
          <img
            src={CARD_SRC}
            alt="YOQO Platinum prepaid card"
            draggable={false}
            style={{ transform: 'translateZ(40px)' }}
            className="h-[430px] w-auto select-none drop-shadow-[0_30px_40px_rgba(11,42,61,0.35)] sm:h-[520px] lg:h-[620px]"
          />

          {/* Reflet qui suit la souris */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[6%/4%] mix-blend-soft-light"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 30%, transparent 60%)`,
              transform: 'translateZ(60px)',
              transition: 'background 0.15s ease-out',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export const Cards: React.FC = () => {
  return (
    <section
      id="cards"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-28"
      style={{
        background:
          'radial-gradient(ellipse 40% 50% at 100% 0%, rgba(200, 224, 240, 0.55) 0%, transparent 70%), linear-gradient(180deg, #f8fbfd 0%, #eef4f8 100%)',
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

        {/* Carte 3D */}
        <Reveal direction="zoom" delay={0.2}>
          <Card3D />
        </Reveal>
      </div>
    </section>
  )
}
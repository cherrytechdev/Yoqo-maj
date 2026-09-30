import React, { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'

const CARD_SRC = '/cards.png' // ← garde le nom réel de ton image dans public/

const ease = [0.22, 1, 0.36, 1] as const

/* ---------- Carte 3D : suit la souris, reflet, ombre dynamique, flottement ---------- */
const Card3D: React.FC = () => {
  const zone = useRef<HTMLDivElement>(null)

  // Position de la souris dans la zone, normalisée entre -1 et 1
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const springCfg = { stiffness: 140, damping: 16, mass: 0.6 }

  // Au repos la carte est déjà légèrement inclinée (rotateY -12, rotateX 6)
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-34, 10]), springCfg)
  const rotateX = useSpring(useTransform(my, [-1, 1], [24, -12]), springCfg)

  // Reflet lumineux qui suit le curseur
  const gx = useTransform(mx, [-1, 1], [0, 100])
  const gy = useTransform(my, [-1, 1], [0, 100])
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 30%, transparent 60%)`

  // Ombre au sol qui se décale à l'opposé de l'inclinaison
  const shadowX = useTransform(rotateY, [-34, 10], [40, -20])
  const shadowScale = useTransform(rotateX, [-12, 24], [0.9, 1.1])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zone.current) return
    const r = zone.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
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
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[380px] w-[380px] rounded-full bg-sky-300/40 blur-[90px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Flottement */}
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Ombre dynamique au sol */}
        <motion.div
          aria-hidden
          className="absolute -bottom-10 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[50%] bg-[#0b2a3d]/35 blur-2xl"
          style={{ x: shadowX, scaleX: shadowScale }}
        />

        {/* La carte */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
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
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[6%/4%] mix-blend-soft-light"
            style={{ background: glare, transform: 'translateZ(60px)' }}
          />
        </motion.div>
      </motion.div>
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
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease }}
            className="text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-[#082a40]"
          >
            YOQO Platinum
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-[#5d7284]"
          >
            A UnionPay-powered prepaid card for everyday spending and business programs, with
            branded issuance and full program control.
          </motion.p>
        </div>

        {/* Carte 3D */}
        <Card3D />
      </div>
    </section>
  )
}
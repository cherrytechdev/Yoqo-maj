import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const steps = [
  { n: '1', title: 'Define', text: 'Markets, payment methods, expected activity and settlement needs.' },
  { n: '2', title: 'Review', text: 'Business model, ownership, KYC documents and risk assessment.' },
  { n: '3', title: 'Integrate', text: 'Technical setup, configuration and transaction testing.' },
  { n: '4', title: 'Launch', text: 'Agreed approvals, operating procedures and ongoing monitoring.' },
]

type Step = (typeof steps)[number]

//3D
const TiltCard: React.FC<{ s: Step; onClick?: () => void; featured?: boolean }> = ({
  s,
  onClick,
  featured,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-150, 150], [10, -10])
  const rotateY = useTransform(mouseX, [-150, 150], [-10, 10])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20, mass: 0.5 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20, mass: 0.5 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - left - width / 2)
    mouseY.set(e.clientY - top - height / 2)
  }
  const onLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        boxShadow: featured
          ? '0 30px 60px rgba(11,42,61,0.45), 0 0 35px rgba(14,165,217,0.35)'
          : '0 15px 35px rgba(11,42,61,0.3)',
      }}
      className={`relative min-h-[270px] w-full transform-gpu overflow-hidden rounded-xl bg-[#0d2b3e] p-6 text-white transition-shadow duration-300 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.06)_50%,transparent_70%)]" />
      <div style={{ transform: 'translateZ(25px)' }} className="relative z-10">
        <span className="text-4xl font-bold text-[#0ea5d9]">{s.n}</span>
        <h3 className="mt-8 text-lg font-bold">{s.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{s.text}</p>
      </div>
    </motion.div>
  )
}

/* ---------- Éventail de 4 cartes (desktop) : clic = la carte passe au premier plan ---------- */
const slots = [
  { x: -390, rotate: -9, y: 30 },
  { x: -130, rotate: -3, y: 8 },
  { x: 130, rotate: 3, y: 8 },
  { x: 390, rotate: 9, y: 30 },
]

const CardFan: React.FC = () => {
  const [active, setActive] = useState(1)

  return (
    <div className="relative hidden h-[400px] w-full md:block" style={{ perspective: '1000px' }}>
      {steps.map((s, i) => {
        const isActive = i === active
        const slot = slots[i]
        return (
          <motion.div
            key={s.n}
            animate={{
              x: slot.x,
              y: isActive ? -6 : slot.y,
              rotate: isActive ? 0 : slot.rotate,
              scale: isActive ? 1.06 : 0.97,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="absolute left-1/2 top-6 w-[250px] -ml-[125px]"
            style={{ zIndex: isActive ? 30 : 10 - Math.abs(i - active) }}
          >
            <TiltCard s={s} featured={isActive} onClick={() => setActive(i)} />
          </motion.div>
        )
      })}
    </div>
  )
}

export const Launch: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28"
      style={{ background: 'linear-gradient(180deg, #e9f1f7 0%, #f8fbfd 100%)' }}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-md text-3xl sm:text-4xl font-bold leading-[1.15] tracking-tight text-[#082a40]">
          A clear route from scope to launch
        </h2>

        {/* Desktop : éventail interactif */}
        <div className="mt-6">
          <CardFan />
        </div>

        {/* Mobile : cartes empilées avec inclinaison */}
        <div
          className="mt-10 grid gap-5 sm:grid-cols-2 md:hidden"
          style={{ perspective: '1000px' }}
        >
          {steps.map((s) => (
            <TiltCard key={s.n} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
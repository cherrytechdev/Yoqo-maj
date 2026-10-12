import React, { useRef, useState } from 'react'
import { ButtonLink } from './ui/button'
import { Reveal } from '../animations/Reveal'

const steps = [
  { n: '1', title: 'Define', text: 'Markets, payment methods, expected activity and settlement needs.' },
  { n: '2', title: 'Review', text: 'Business model, ownership, KYC documents and risk assessment.' },
  { n: '3', title: 'Integrate', text: 'Technical setup, configuration and transaction testing.' },
  { n: '4', title: 'Launch', text: 'Agreed approvals, operating procedures and ongoing monitoring.' },
]

type Step = (typeof steps)[number]

// 3D tilt card — pure CSS/JS, no motion
const TiltCard: React.FC<{ s: Step; onClick?: () => void; featured?: boolean }> = ({
  s,
  onClick,
  featured,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)')

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = e.clientX - left - width / 2
    const y = e.clientY - top - height / 2
    const rotX = (y / 150) * -10
    const rotY = (x / 150) * 10
    setTransform(`rotateX(${rotX}deg) rotateY(${rotY}deg)`)
  }
  const onLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg)')
  }

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        boxShadow: featured
          ? '0 30px 60px rgba(11,42,61,0.45), 0 0 35px rgba(14,165,217,0.35)'
          : '0 15px 35px rgba(11,42,61,0.3)',
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
      }}
      className={`relative min-h-[270px] w-full transform-gpu overflow-hidden rounded-xl bg-[#0d2b3e] p-6 text-white ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.06)_50%,transparent_70%)]" />
      <div style={{ transform: 'translateZ(25px)' }} className="relative z-10">
        <span className="text-4xl font-bold text-[#0ea5d9]">{s.n}</span>
        <h3 className="mt-8 text-lg font-bold">{s.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{s.text}</p>
      </div>
    </div>
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
          <div
            key={s.n}
            className="absolute left-1/2 top-6 w-[250px] -ml-[125px]"
            style={{
              transform: `translateX(${slot.x}px) translateY(${isActive ? -6 : slot.y}px) rotate(${isActive ? 0 : slot.rotate}deg) scale(${isActive ? 1.06 : 0.97})`,
              zIndex: isActive ? 30 : 10 - Math.abs(i - active),
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <TiltCard s={s} featured={isActive} onClick={() => setActive(i)} />
          </div>
        )
      })}
    </div>
  )
}

export const Launch: React.FC = () => {
  return (
    <section
      id="launch"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-28"
      style={{ background: 'linear-gradient(180deg, #e9f1f7 0%, #f8fbfd 100%)' }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal direction="up">
          <h2 className="max-w-md text-3xl sm:text-4xl font-bold leading-[1.15] tracking-tight text-[#082a40]">
            A clear route from scope to launch
          </h2>
        </Reveal>

        {/* Desktop : éventail interactif */}
        <Reveal direction="zoom" delay={0.15}>
          <div className="mt-6">
            <CardFan />
          </div>
        </Reveal>

        {/* Mobile : cartes empilées avec inclinaison */}
        <div
          className="mt-10 grid gap-5 sm:grid-cols-2 md:hidden"
          style={{ perspective: '1000px' }}
        >
          {steps.map((s, index) => (
            <Reveal key={s.n} direction="up" delay={index * 0.1}>
              <TiltCard s={s} />
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={0.25}>
          <div className="mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="#contact" size="lg" className="w-full sm:w-auto">
              Talk to us
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
import React, { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion'

const EMAIL = 'meithilesh.ramautar@yoqo.io'

const infos = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'Website', value: 'yoqo.io', href: 'https://yoqo.io' },
  { label: 'Based in', value: 'Mauritius' },
  { label: 'Languages', value: 'English, French, and Hindi' }, 
]

/* ---------- Variantes d'animation ---------- */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
}

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

const fromBottom: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const rowVariant: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

/* ---------- Carte d'infos : inclinaison 3D + lumière qui suit la souris ---------- */
const InfoCard: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotX = useMotionValue(-300)
  const spotY = useMotionValue(-300)

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), {
    stiffness: 250,
    damping: 20,
    mass: 0.5,
  })
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), {
    stiffness: 250,
    damping: 20,
    mass: 0.5,
  })

  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${spotX}px ${spotY}px, rgba(34,211,238,0.16), transparent 70%)`

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - left - width / 2)
    mouseY.set(e.clientY - top - height / 2)
    spotX.set(e.clientX - left)
    spotY.set(e.clientY - top)
  }
  const onLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    spotX.set(-300)
    spotY.set(-300)
  }

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full max-w-lg transform-gpu overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8"
      >
        {/* Lumière qui suit la souris */}
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

        {/* Bordure lumineuse animée */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-px left-0 h-px w-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
          animate={{ x: ['-50%', '220%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
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
              <motion.div key={info.label} variants={rowVariant} className="group relative">
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
              </motion.div>
            )
          })}
        </div>
      </motion.div>
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
      {/* Halos lumineux qui flottent */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[720px] w-[720px] rounded-full bg-blue-600/25 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-[720px] w-[720px] rounded-full bg-cyan-500/20 blur-[130px]"
        animate={{ x: [0, -50, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Particules lumineuses */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-cyan-300/60"
          style={{ left: `${8 + i * 12}%`, top: `${20 + ((i * 37) % 60)}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 sm:gap-14 md:grid-cols-2">
        {/* Colonne gauche */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fromLeft}
            className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your next
            <br />
            <span className="sm:whitespace-nowrap bg-gradient-to-r from-sky-400 via-cyan-200 to-sky-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite]">
              payment program
            </span>
            <br />
            starts here.
          </motion.h2>

          <motion.p variants={fromBottom} className="mt-6 max-w-md text-base leading-relaxed text-white/75 sm:mt-8 sm:text-lg">
            Talk to YOQO about payment acceptance, prepaid cards and your digital-asset strategy.
          </motion.p>

          <motion.div variants={fromBottom} className="mt-8">
            <motion.a
              href={`mailto:${EMAIL}`}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 max-w-full px-5 py-3.5 text-sm font-bold sm:px-8 sm:py-4 sm:text-base text-[#03131b]"
            >
              {/* Halo qui pulse */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(14,165,217,0.7)]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Reflet qui traverse le bouton */}
              <span className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/40 blur-sm transition-transform duration-700 ease-out group-hover:translate-x-[400%]" />
              <span className="relative break-all">{EMAIL}</span>
            </motion.a>
          </motion.div>

          <motion.a
            variants={fromBottom}
            href="https://yoqo.io"
            className="group mt-8 inline-block text-sm font-bold text-white"
          >
            <span className="relative">
              yoqo.io
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </motion.a>
        </motion.div>

        {/* Colonne droite */}
        <div className="flex md:justify-end">
          <InfoCard />
        </div>
      </div>
    </section>
  )
}
import React from 'react'
import { motion, type Variants } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

// Ligne de titre qui monte depuis un masque
const lineUp: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.9, ease } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

const fromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

const details = [
  { label: 'Technical delivery', value: 'Practical operational experience' },
  { label: 'Languages', value: 'English, French and Hindi' },
]

export const About: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28"
      style={{
        background:
          'radial-gradient(ellipse 40% 50% at 0% 0%, rgba(186, 225, 245, 0.35) 0%, transparent 70%), linear-gradient(180deg, #f8fbfd 0%, #eef4f8 100%)',
      }}
    >
      {/* Halos qui flottent lentement */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-sky-200/50 blur-[110px]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-cyan-200/40 blur-[110px]"
        animate={{ x: [0, 40, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-0">
        {/* ---------- Colonne gauche ---------- */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="lg:pr-20"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-[#082a40]">
            <span className="block overflow-hidden pb-1">
              <motion.span variants={lineUp} className="block">
                Payment expertise. A
              </motion.span>
            </span>
            <span className="relative block overflow-hidden pb-2">
              <motion.span variants={lineUp} className="block">
                Mauritius foundation.
              </motion.span>
              {/* Soulignement qui se dessine */}
              <motion.span
                aria-hidden
                className="absolute bottom-0 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.9, ease }}
              />
            </span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-xl sm:text-[22px] leading-relaxed text-[#0c2a3d]"
          >
            YOQO Payment Systems Ltd helps businesses establish and manage international payment
            operations.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl text-base leading-relaxed text-[#5d7284]"
          >
            We combine gateway technology, prepaid card programs and virtual-asset capabilities with
            hands-on support across merchant onboarding, risk and settlement operations.
          </motion.p>
        </motion.div>

        {/* ---------- Colonne droite ---------- */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative pl-8 sm:pl-14"
        >
          {/* Trait cyan qui se dessine de haut en bas */}
          <motion.span
            aria-hidden
            className="absolute left-0 top-0 h-full w-0.5 origin-top bg-[#0ea5d9]"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
          />

          <motion.h3
            variants={fromRight}
            className="max-w-xs text-2xl sm:text-[26px] font-bold leading-tight tracking-tight text-[#082a40]"
          >
            Make payment operations easier to manage.
          </motion.h3>

          <dl className="mt-6 space-y-3">
            {details.map((d) => (
              <motion.div
                key={d.label}
                variants={fromRight}
                className="group relative cursor-default rounded-xl px-4 py-3 -mx-4 transition-all duration-300 hover:translate-x-2 hover:bg-white/80 hover:shadow-[0_10px_30px_rgba(14,165,217,0.15)]"
              >
                <dt className="text-sm font-bold text-[#082a40] transition-colors duration-300 group-hover:text-[#0a86ad]">
                  {d.label}
                </dt>
                <dd className="mt-3 text-sm text-[#5d7284]">{d.value}</dd>
                {/* Barre cyan qui se remplit au survol */}
                <span className="mt-3 block h-0.5 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
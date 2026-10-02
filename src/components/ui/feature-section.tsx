import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Feature {
  step: string
  title: string
  content: string
  visual?: React.ReactNode
  image?: string
}

export interface FeatureStepsProps {
  features: Feature[]
  className?: string
  autoPlayInterval?: number
  imageHeight?: string
}

const TICK_MS = 100

export function FeatureSteps({
  features,
  className,
  autoPlayInterval = 3000,
  imageHeight = 'h-[200px] md:h-[300px] lg:h-[400px]',
}: FeatureStepsProps) {
  const reduce = useReducedMotion()
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const progressRef = useRef(0)

  const steps = features.length
  const autoPlay = !reduce && !paused && steps > 1

  useEffect(() => {
    if (!autoPlay) return

    const id = window.setInterval(() => {
      progressRef.current += 100 / (autoPlayInterval / TICK_MS)
      if (progressRef.current >= 100) {
        progressRef.current = 0
        setCurrentFeature((prev) => (prev + 1) % steps)
      }
      setProgress(progressRef.current)
    }, TICK_MS)

    return () => window.clearInterval(id)
  }, [autoPlay, autoPlayInterval, steps])

  const select = (index: number) => {
    progressRef.current = 0
    setProgress(0)
    setCurrentFeature(index)
  }

  const active = features[currentFeature]

  return (
    <div
      className={cn('w-full text-[#0b2a3d]', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-[#d9e5ee]">
        <motion.div
          className="h-full rounded-full bg-[#0ea5d9]"
          style={{ originX: 0 }}
          animate={{ scaleX: steps > 1 ? progress / 100 : 0 }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>

      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:items-center md:gap-10">
        <div className="order-2 space-y-4 md:order-1">
          {features.map((feature, index) => {
            const isActive = index === currentFeature
            const isDone = index < currentFeature

            return (
              <button
                key={feature.step}
                type="button"
                onClick={() => select(index)}
                aria-current={isActive}
                className="group flex w-full items-start gap-4 rounded-2xl border border-transparent p-3 text-left transition-colors duration-500 hover:border-[#d9e5ee] hover:bg-white/70 focus-visible:border-[#0ea5d9] focus-visible:outline-none md:gap-5 md:p-4"
              >
                <motion.span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-base font-bold transition-colors duration-500 md:h-11 md:w-11',
                    isActive
                      ? 'border-[#1f3d4f] bg-[#1f3d4f] text-white'
                      : isDone
                        ? 'border-[#0ea5d9] bg-[#0ea5d9] text-white'
                        : 'border-[#d9e5ee] bg-white text-[#5d7284]'
                  )}
                  animate={{ scale: isActive && !reduce ? 1.08 : 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {isDone ? <Check size={18} strokeWidth={3} /> : index + 1}
                </motion.span>

                <motion.div
                  className="min-w-0 flex-1"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[11px] font-bold tracking-[0.18em] text-[#0ea5d9] uppercase">
                    {feature.step}
                  </p>
                  <h4 className="mt-1 text-lg leading-snug font-bold text-[#0b2a3d] md:text-xl">
                    {feature.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-[#5d7284] md:text-base">
                    {feature.content}
                  </p>
                </motion.div>
              </button>
            )
          })}
        </div>

        <div
          className={cn(
            'relative order-1 overflow-hidden rounded-3xl border border-[#d9e5ee] md:order-2',
            imageHeight
          )}
          style={{
            background: 'linear-gradient(140deg, #f7fafc 0%, #e6eff6 100%)',
            perspective: 1200,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              className="absolute inset-0 flex items-center justify-center p-6 md:p-8"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, rotateX: -20 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -40, rotateX: 20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {active.visual ?? (
                <img
                  src={active.image}
                  alt={active.step}
                  className="h-full w-full object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#eef4f8] via-[#eef4f8]/40 to-transparent p-5 md:p-7">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0ea5d9] uppercase">
              {active.step}
            </p>
            <p className="mt-1 text-lg font-bold text-[#0b2a3d] md:text-xl">{active.title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Step3DViewer } from './Step3DViewer'

export interface Feature {
  step: string
  title: string
  content: string
  visual?: React.ReactNode
  image?: string
  poster?: string
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
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const progressRef = useRef(0)

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
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

  return (
    <div
      className={cn('w-full text-[#0b2a3d]', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Progress bar */}
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-[#d9e5ee]">
        <div
          className="h-full rounded-full bg-[#0ea5d9] origin-left"
          style={{
            transform: `scaleX(${steps > 1 ? progress / 100 : 0})`,
            transition: 'transform 0.1s linear',
          }}
        />
      </div>

      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:items-center md:gap-10">
        {/* Steps list — left column */}
        <div className="order-2 space-y-4 md:order-1">
          {features.map((feature, index) => {
            const isActive = index === currentFeature
            const isDone = index < currentFeature

            return (
              <button
                key={feature.step}
                type="button"
                onClick={() => select(index)}
                aria-current={isActive ? true : undefined}
                className="group flex w-full items-start gap-4 rounded-2xl border border-transparent p-3 text-left transition-colors duration-500 hover:border-[#d9e5ee] hover:bg-white/70 focus-visible:border-[#0ea5d9] focus-visible:outline-none md:gap-5 md:p-4 cursor-pointer"
              >
                <span
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-base font-bold transition-all duration-400 md:h-11 md:w-11',
                    isActive
                      ? 'border-[#1f3d4f] bg-[#1f3d4f] text-white scale-105'
                      : isDone
                        ? 'border-[#0ea5d9] bg-[#0ea5d9] text-white scale-100'
                        : 'border-[#d9e5ee] bg-white text-[#5d7284] scale-100'
                  )}
                >
                  {isDone ? <Check size={18} strokeWidth={3} /> : index + 1}
                </span>

                <div
                  className="min-w-0 flex-1 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0.5 }}
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
                </div>
              </button>
            )
          })}
        </div>

        {/* Sliding visual panel — right column */}
        <div
          className={cn(
            'relative order-1 overflow-hidden rounded-3xl border border-[#1e2a30] md:order-2',
            imageHeight
          )}
          style={{
            background: '#b1bfc7',
          }}
        >
          {/*
           * The strip is `steps` times wider than the container.
           * Translating it by -(currentFeature / steps * 100)% reveals the active slide.
           */}
          <div
            style={{
              display: 'flex',
              width: `${steps * 100}%`,
              height: '100%',
              transform: `translateX(${-(currentFeature * (100 / steps))}%)`,
              transition: reduce
                ? 'none'
                : 'transform 0.55s cubic-bezier(0.45, 0, 0.15, 1)',
            }}
          >
            {features.map((feature) => (
              <div
                key={feature.step}
                style={{
                  width: `${100 / steps}%`,
                  flexShrink: 0,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              >
                {/* SVG / 3D model / image visual */}
                {feature.visual ?? (
                  feature.image ? (
                    <Step3DViewer
                      src={feature.image}
                      poster={feature.poster}
                      alt={feature.title}
                    />
                  ) : null
                )}

                {/* Step label overlay at the bottom */}
                <div
                  style={{
                    pointerEvents: 'none',
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    background:
                      'linear-gradient(to top, #2b2a2a 0%, #343738b3 0%)',
                    padding: '1.25rem 1.5rem',
                  }}
                >
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.18em',
                      color: '#0ea5d9',
                      textTransform: 'uppercase',
                    }}
                  >
                    {feature.step}
                  </p>
                  <p
                    style={{
                      marginTop: '0.25rem',
                      fontSize: '1.125rem',
                      fontWeight: 700,
                      color: '#ffffff',
                    }}
                  >
                    {feature.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

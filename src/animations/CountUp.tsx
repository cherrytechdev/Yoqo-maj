import React, { useEffect, useRef, useState } from 'react'

const DURATION_MS = 1400

/**
 * Anime la partie numérique d'une valeur ("17+", "100%") de 0 jusqu'à sa valeur
 * quand elle entre dans l'écran. Une valeur sans nombre ("Global") est affichée telle quelle.
 */
export const CountUp: React.FC<{ value: string }> = ({ value }) => {
  const match = value.match(/^(\D*)(\d+)(.*)$/)
  const ref = useRef<HTMLSpanElement>(null)
  // Respect prefers-reduced-motion : valeur finale directement
  const [reduce] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || !match || reduce) return
    const target = Number(match[2])

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.unobserve(el)
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION_MS, 1)
          const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
          setCurrent(Math.round(eased * target))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return <>{value}</>

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {match[1]}
        {reduce ? match[2] : current}
        {match[3]}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  )
}

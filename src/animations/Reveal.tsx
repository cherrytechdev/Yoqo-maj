import React, { useEffect, useRef, useState } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'zoom'

// Apparition vers le haut, sans glissement latéral,
// quelle que soit la direction demandée.
const offsets: Record<Direction, string> = {
  up: 'translate(0, 24px)',
  down: 'translate(0, -24px)',
  left: 'translate(0, 24px)',
  right: 'translate(0, 24px)',
  zoom: 'translate(0, 24px)',
}

// Les délais sont plafonnés pour éviter les cascades trop longues.
const MAX_DELAY = 0.35

export const Reveal: React.FC<{
  children: React.ReactNode
  direction?: Direction
  delay?: number
  className?: string
}> = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0, 0)' : offsets[direction],
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${Math.min(delay, MAX_DELAY)}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${Math.min(delay, MAX_DELAY)}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
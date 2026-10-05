import React, { useEffect, useRef, useState } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'zoom'

const offsets: Record<Direction, string> = {
  up: 'translate(0, 35px)',
  down: 'translate(0, -35px)',
  left: 'translate(-40px, 0)',
  right: 'translate(40px, 0)',
  zoom: 'translate(0, 15px) scale(0.94)',
}

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
      { threshold: 0.2 }
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
        transform: visible ? 'translate(0, 0) scale(1)' : offsets[direction],
        transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
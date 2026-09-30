import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Direction = 'up' | 'left' | 'right' | 'zoom'

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 70 },
  left: { x: -90 },
  right: { x: 90 },
  zoom: { scale: 0.92, y: 30 },
}

export const Reveal: React.FC<{
  children: React.ReactNode
  direction?: Direction
  delay?: number
}> = ({ children, direction = 'up', delay = 0 }) => {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
// NetworkCoinsVideo — bande « Card networks » : pièces argentées Visa, Mastercard, UnionPay, JCB (vidéo en boucle).
// Fichiers : public/tokens/coins.webm, public/tokens/coins.mp4, public/tokens/coins-poster.jpg

import React, { useEffect, useRef, useState } from 'react'

interface NetworkCoinsVideoProps {
  background?: string
  style?: React.CSSProperties
}

export const NetworkCoinsVideo: React.FC<NetworkCoinsVideoProps> = ({ background = '#000000', style }) => {
  const ref = useRef<HTMLVideoElement>(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  // Lecture seulement quand la bande est visible (économise batterie et processeur)
  useEffect(() => {
    const v = ref.current
    if (!v || reduce) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { rootMargin: '120px' })
    io.observe(v)
    return () => io.disconnect()
  }, [reduce])

  const fade = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'absolute', top: 0, bottom: 0, width: '8%', [side]: 0, pointerEvents: 'none',
    background: `linear-gradient(${side === 'left' ? 90 : -90}deg, ${background}, transparent)`,
  })

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1920 / 768', maxWidth: 1400, margin: '0 auto', overflow: 'hidden', background, ...style }}>
      {reduce ? (
        <img
          src="/tokens/coins-poster.jpg"
          alt="Pièces argentées frappées des logos Visa, Mastercard, UnionPay et JCB"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <video
          ref={ref}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster="/tokens/coins-poster.jpg"
          aria-label="Pièces argentées frappées des logos Visa, Mastercard, UnionPay et JCB, qui défilent"
          style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/tokens/coins.webm" type="video/webm" />
          <source src="/tokens/coins.mp4" type="video/mp4" />
        </video>
      )}
      <div style={fade('left')} />
      <div style={fade('right')} />
    </div>
  )
}

interface NetworkCoinsVideoSectionProps {
  eyebrow?: string
  title?: string
  lead?: string
  note?: string
}

export const NetworkCoinsVideoSection: React.FC<NetworkCoinsVideoSectionProps> = ({
  eyebrow = 'Card networks',
  title = 'Connected to the networks that move international commerce',
  lead = 'Visa, Mastercard, UnionPay and JCB, through one gateway, one onboarding and one commercial relationship.',
  note = 'Network availability and integration scope depend on the applicable program, partner arrangements and approvals.',
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-black pt-14 pb-10 text-[#f2f6fa]">
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-3.5 px-4 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#19c3ee]">{eyebrow}</span>
        <h2 className="text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-white">{title}</h2>
        <p className="max-w-[52ch] text-[15px] leading-relaxed text-[#93a4b5]">{lead}</p>
      </div>
      <div className="my-7">
        <NetworkCoinsVideo />
      </div>
      <p className="px-4 text-center text-xs text-[#93a4b5]">{note}</p>
    </section>
  )
}

export default NetworkCoinsVideoSection

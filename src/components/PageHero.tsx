import React, { useEffect, useRef, useState } from 'react'

interface PageHeroProps {
  /** Plain prefix of the title (white) */
  titlePrefix: string
  /** Highlighted part of the title — animated with typewriter effect */
  titleHighlight: string
  /** Optional third line of the title (plain white) */
  titleSuffix?: string
  /** Short description shown in the frosted pill below the title */
  description: string
}

export const PageHero: React.FC<PageHeroProps> = ({
  titlePrefix,
  titleHighlight,
  titleSuffix,
  description,
}) => {
  const [displayed, setDisplayed] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const [typingDone, setTypingDone] = useState(false)
  const indexRef = useRef(0)

  // Typewriter — start after a short initial delay
  useEffect(() => {
    setDisplayed('')
    setTypingDone(false)
    indexRef.current = 0

    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1
        setDisplayed(titleHighlight.slice(0, indexRef.current))
        if (indexRef.current >= titleHighlight.length) {
          clearInterval(interval)
          setTypingDone(true)
        }
      }, 80) // ms per character

      return () => clearInterval(interval)
    }, 400)

    return () => clearTimeout(startDelay)
  }, [titleHighlight])

  // Cursor blink — faster while typing, slower once done
  useEffect(() => {
    const blinkInterval = setInterval(
      () => setCursorVisible((v) => !v),
      typingDone ? 530 : 400,
    )
    return () => clearInterval(blinkInterval)
  }, [typingDone])

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden select-none"
      style={{
        minHeight: '420px',
        paddingTop: '120px',
        paddingBottom: '64px',
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, #0d2a4a 0%, #03131b 60%)',
      }}
    >
      {/* Dot-grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Central purple glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[280px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse, rgba(99,60,180,0.30) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Title */}
      <div
        className="relative z-10 px-6"
        style={{ animation: 'heroFadeUp 0.55s ease both' }}
      >
        <h1 className="font-montserrat font-black text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight mb-4">
          {/* Static white prefix */}
          <span className="text-white">{titlePrefix} </span>

          {/* Typewriter highlighted word */}
          <span
            style={{
              background: 'linear-gradient(90deg, #22d3ee 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {displayed}
          </span>

          {/* Blinking cursor */}
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              width: '3px',
              height: '0.85em',
              marginLeft: '3px',
              verticalAlign: 'middle',
              borderRadius: '2px',
              background: 'linear-gradient(180deg, #22d3ee, #3b82f6)',
              opacity: cursorVisible ? 1 : 0,
              transition: 'opacity 0.08s',
            }}
          />

          {/* Optional suffix line */}
          {titleSuffix && (
            <>
              <br />
              <span className="text-white">{titleSuffix}</span>
            </>
          )}
        </h1>

        {/* Description pill — fades in after typing */}
        <div
          className="mt-8 mx-auto max-w-xl rounded-2xl px-8 py-5 text-slate-200 text-base sm:text-lg leading-relaxed"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            opacity: typingDone ? 1 : 0,
            transform: typingDone ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {description}
        </div>
      </div>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  )
}

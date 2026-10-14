import React from 'react'

interface PageHeroProps {
  /** Plain prefix of the title (white) */
  titlePrefix: string
  /** Highlighted part of the title (cyan) */
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
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        minHeight: '420px',
        paddingTop: '120px',
        paddingBottom: '64px',
        background:
          'linear-gradient(180deg, #0a2236 0%, #03131b 100%)',
      }}
    >
      {/* Title */}
      <div
        className="page-hero-anim relative z-10 px-6"
        style={{ animation: 'heroFadeUp 0.55s ease both' }}
      >
        <h1 className="font-montserrat font-black text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight mb-4">
          {/* Static white prefix */}
          <span className="text-white">{titlePrefix} </span>

          {/* Highlighted word */}
          <span className="text-cyan-400">{titleHighlight}</span>

          {/* Optional suffix line */}
          {titleSuffix && (
            <>
              <br />
              <span className="text-white">{titleSuffix}</span>
            </>
          )}
        </h1>

        {/* Description — fades in just after the title */}
        <p
          className="page-hero-anim mt-6 mx-auto max-w-xl text-slate-300 text-base sm:text-lg leading-relaxed"
          style={{ animation: 'heroFadeUp 0.6s ease 0.15s both' }}
        >
          {description}
        </p>
      </div>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @media (prefers-reduced-motion: reduce) {
          .page-hero-anim { animation: none !important; }
        }
      `}</style>
    </section>
  )
}

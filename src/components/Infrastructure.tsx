import React from 'react'
import { Reveal } from '../animations/Reveal'

const highlights = [
  { title: 'Cloud infrastructure', text: 'AWS hosting supports scale and deployment.' },
  { title: 'Continuity planning', text: 'Redundancy, failover and disaster recovery.' },
  { title: 'Operational monitoring', text: 'System oversight and incident response.' },
]

// Dossier des logos dans public/ (adapte le nom si ton dossier s'écrit autrement)
const LOGO_DIR = '/image_infrastructure'

type Item = { name: string; logo?: string }

const rows: { label: string; items: Item[] }[] = [
  {
    label: 'Card networks',
    items: [
      { name: 'VISA', logo: `${LOGO_DIR}/visa.png` },
      { name: 'Mastercard', logo: `${LOGO_DIR}/mastercard.png` },
      { name: 'UnionPay', logo: `${LOGO_DIR}/unionpay.png` },
      { name: 'JCB', logo: `${LOGO_DIR}/jcb.png` },
    ],
  },
  {
    label: 'eCommerce platforms',
    items: [{ name: 'Shopify' }, { name: 'WooCommerce' }, { name: 'Magento' }, { name: 'OpenCart' }],
  },
  {
    label: 'Risk and technology',
    items: [
      { name: 'World-Check' },
      { name: 'WebShield', logo: `${LOGO_DIR}/webshield.png` },
      { name: 'AWS', logo: `${LOGO_DIR}/aws.png` },
    ],
  },
]

export const Infrastructure: React.FC = () => {
  return (
    <section
      id="infrastructure"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-28"
      style={{ background: 'linear-gradient(180deg, #f4f8fb 0%, #e9f1f7 100%)' }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal direction="up">
          <h2 className="max-w-lg text-3xl sm:text-4xl font-bold leading-[1.15] tracking-tight text-[#082a40]">
            Infrastructure and connections for international commerce
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {highlights.map((h, index) => (
            <Reveal key={h.title} direction="up" delay={0.1 + index * 0.1}>
              <div>
                <h3 className="text-sm font-bold text-[#082a40]">{h.title}</h3>
                <p className="mt-1 text-sm text-[#5d7284]">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Panneau des partenaires */}
        <Reveal direction="up" delay={0.25}>
          <div className="mt-10 rounded-3xl border border-white/70 bg-white/60 p-6 shadow-[0_20px_50px_rgba(11,42,61,0.08)] backdrop-blur-md sm:p-8">
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid items-center gap-4 py-5 md:grid-cols-[200px_1fr] ${
                  i > 0 ? 'border-t border-[#d3e0ea]' : ''
                }`}
              >
                <p className="text-sm font-bold text-[#082a40]">{row.label}</p>
                <div className="flex flex-wrap gap-3">
                  {row.items.map((it) => (
                    <div
                      key={it.name}
                      className={`group flex cursor-default items-center justify-center overflow-hidden rounded-lg border border-[#e1eaf1] bg-white text-sm font-semibold text-[#082a40] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-105 hover:border-[#0ea5d9] hover:text-[#0a7fa8] hover:shadow-[0_12px_28px_rgba(14,165,217,0.25)] ${
                        it.logo ? 'h-14 w-28 p-1.5' : 'h-12 min-w-[110px] px-4'
                      }`}
                    >
                      {it.logo ? (
                        <img
                          src={it.logo}
                          alt={it.name}
                          className="h-full w-full select-none object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                          draggable={false}
                        />
                      ) : (
                        it.name
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.35}>
          <p className="mt-6 text-xs text-[#5d7284]">
            Network availability and integration scope depend on the applicable program, partner
            arrangements and approvals.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
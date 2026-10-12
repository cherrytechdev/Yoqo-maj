import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'
import { Reveal } from '../animations/Reveal'

const items = [
  {
    title: 'Merchant onboarding',
    text: 'Business review, documentation and coordination with the relevant payment partners.',
  },
  {
    title: 'Integration and configuration',
    text: 'Gateway connection, branded checkout and agreed transaction settings.',
  },
  {
    title: 'Transaction oversight',
    text: 'Fraud monitoring, portfolio management and support for payment issues.',
  },
  {
    title: 'Settlement and disputes',
    text: 'Reconciliation support, chargeback handling and settlement follow-up.',
  },
]

const AccordionItem: React.FC<{
  item: { title: string; text: string }
  isOpen: boolean
  onToggle: () => void
}> = ({ item, isOpen, onToggle }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  const measure = useCallback(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  return (
    <div className="border-b border-[#c8dce6]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 sm:py-6 text-left cursor-pointer group"
      >
        <h3 className="text-lg sm:text-xl font-bold leading-snug tracking-tight text-[#082a40] group-hover:text-[#0ea5d9] transition-colors duration-300">
          {item.title}
        </h3>
        <span
          className="ml-4 flex-shrink-0 text-[#5d7284] transition-transform duration-[400ms]"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <ChevronDown size={22} />
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-[400ms]"
        style={{
          maxHeight: isOpen ? height : 0,
          opacity: isOpen ? 1 : 0,
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div ref={contentRef}>
          <p className="pb-6 text-sm sm:text-base leading-relaxed text-[#5d7284] max-w-2xl">
            {item.text}
          </p>
        </div>
      </div>
    </div>
  )
}

export const Operations: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      id="operations"
      className="relative w-full overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 scroll-mt-28"
      style={{
        background:
          'radial-gradient(ellipse 40% 50% at 0% 0%, rgba(186, 225, 245, 0.35) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 85% 100%, rgba(186, 225, 240, 0.45) 0%, transparent 70%), linear-gradient(180deg, #f8fbfd 0%, #eef4f8 100%)',
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal direction="up">
          <h2 className="max-w-xl text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-[#082a40]">
            Support beyond the transaction
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#5d7284]">
            Technology works best with an operating model that supports the merchant every day, from
            onboarding to settlement.
          </p>
        </Reveal>

        <div className="mt-14 max-w-3xl border-t border-[#c8dce6]">
          {items.map((item, index) => (
            <Reveal key={item.title} direction="up" delay={index * 0.08}>
              <AccordionItem
                item={item}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
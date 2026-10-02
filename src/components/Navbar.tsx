import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Layers, Settings, ShieldCheck, CreditCard, Scale } from 'lucide-react'
import { ButtonLink } from './ui/button'

const navItems = [
  { name: 'Home', url: '#home', icon: Home },
  { name: 'Solutions', url: '#solutions', icon: Layers },
  { name: 'Operations', url: '#operations', icon: Settings },
  { name: 'Security', url: '#security', icon: ShieldCheck },
  { name: 'Cards', url: '#cards', icon: CreditCard },
  { name: 'Regulation', url: '#regulation', icon: Scale },
]

export const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home')

  // Met à jour l'onglet actif selon la section visible à l'écran
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          if (entry.target.id === 'contact') {
            setActiveTab('') // Contact n'a pas d'onglet : on éteint la lampe
            return
          }
          const item = navItems.find((i) => i.url === `#${entry.target.id}`)
          if (item) setActiveTab(item.name)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    ;[...navItems.map((i) => i.url), '#contact'].forEach((sel) => {
      const el = document.querySelector(sel)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    // Pas de transform ni de backdrop-filter sur le header/nav en mobile :
    // sinon la barre d'icônes "fixed" serait piégée dans la navbar.
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-5">
      <nav className="flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#0b1220]/85 px-3 py-2 shadow-lg md:bg-[#0b1220]/70 md:px-4 md:backdrop-blur-lg">
        {/* Logo : simple image, aucun lien */}
        <img
          src="/Yoqo-icon.png"
          alt="YOQO"
          className="h-8 w-auto shrink-0 select-none sm:h-10"
          draggable={false}
        />

        {/* Liens : barre flottante en bas sur mobile, centrée dans la navbar sur ordinateur */}
        <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/10 bg-[#0b1220]/85 p-1 shadow-xl backdrop-blur-lg md:static md:translate-x-0 md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                aria-label={item.name}
                className={`relative cursor-pointer rounded-full px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors md:px-5 md:py-2 ${
                  isActive ? 'bg-white/5 text-cyan-300' : 'text-white/80 hover:text-cyan-300'
                }`}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>

                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 -z-10 w-full rounded-full bg-cyan-400/5"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-cyan-400">
                      <div className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-cyan-400/20 blur-md" />
                      <div className="absolute -top-1 h-6 w-8 rounded-full bg-cyan-400/20 blur-md" />
                      <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-cyan-400/20 blur-sm" />
                    </div>
                  </motion.div>
                )}
              </a>
            )
          })}
        </div>

        {/* Bouton Contact */}
        <ButtonLink href="#contact" size="sm" className="shrink-0 sm:px-5 sm:py-2.5 sm:text-sm">
          Contact us
        </ButtonLink>
      </nav>
    </header>
  )
}
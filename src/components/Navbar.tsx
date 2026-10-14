import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Layers, Settings, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Home',      path: '/',          icon: Home        },
  { name: 'Solutions', path: '/solutions', icon: Layers      },
  { name: 'Platform',  path: '/platform',  icon: Settings    },
  { name: 'Security',  path: '/security',  icon: ShieldCheck },
]

export const Navbar: React.FC = () => {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  // Fermer le menu lors d'un changement de page
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Bloquer le scroll d'arrière-plan quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-5">
        <nav className="glass-nav flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 md:px-5">
          {/* Logo */}
          <Link
            to="/"
            aria-label="YOQO – Home"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/yoqo-logo-light.png"
              alt="YOQO"
              className="h-8 w-auto shrink-0 select-none sm:h-10"
              draggable={false}
            />
          </Link>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(item.path)
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  aria-label={item.name}
                  className={cn(
                    'relative cursor-pointer rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] transition-colors',
                    active ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Actions à droite */}
          <div className="flex items-center gap-2">
            {/* Bouton Contact desktop */}
            <Link
              to="/contact"
              className="hidden md:inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 text-xs font-bold text-[#03131b] shadow-[0_0_20px_rgba(14,165,217,0.45)] transition duration-300 ease-out hover:scale-105 active:scale-95 sm:text-sm"
            >
              Contact us
            </Link>

            {/* Bouton Hamburger mobile */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isOpen}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10 active:scale-95"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay fond flouté pour le menu mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer / Menu déroulant mobile */}
      <div
        className={cn(
          'fixed inset-x-3 top-20 z-50 origin-top rounded-3xl border border-white/10 bg-[#061523]/95 p-5 shadow-2xl backdrop-blur-2xl transition-all duration-300 ease-out md:hidden',
          isOpen
            ? 'scale-100 opacity-100 translate-y-0 pointer-events-auto'
            : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'
        )}
      >
        <div className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-200',
                  active
                    ? 'border border-cyan-400/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'text-slate-200 hover:bg-white/5 hover:text-white'
                )}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-xl border',
                      active
                        ? 'border-cyan-400/40 bg-cyan-400/20 text-cyan-300'
                        : 'border-white/10 bg-white/5 text-slate-400'
                    )}
                  >
                    <Icon size={18} />
                  </span>
                  <span>{item.name}</span>
                </div>
                <ArrowRight
                  size={16}
                  className={cn(
                    'transition-transform duration-200',
                    active ? 'text-cyan-400 translate-x-0.5' : 'text-slate-500 opacity-60'
                  )}
                />
              </Link>
            )
          })}

          <div className="my-2 border-t border-white/10" />

          {/* Bouton Contact dans le menu mobile */}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3.5 text-center text-sm font-bold text-[#03131b] shadow-[0_0_25px_rgba(14,165,217,0.4)] transition duration-300 active:scale-98"
          >
            <span>Contact us</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  )
}
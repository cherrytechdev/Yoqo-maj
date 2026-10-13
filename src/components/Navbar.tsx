import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Layers, Settings, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Home',      path: '/',          icon: Home        },
  { name: 'Solutions', path: '/solutions', icon: Layers      },
  { name: 'Platform',  path: '/platform',  icon: Settings    },
  { name: 'Security',  path: '/security',  icon: ShieldCheck },
]

export const Navbar: React.FC = () => {
  const { pathname } = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-5">
      <nav className="flex w-full max-w-6xl items-center justify-between rounded-full border border-white/60 bg-white/75 px-3 py-2 shadow-[0_4px_24px_rgba(11,42,61,0.12)] backdrop-blur-md md:px-4">

        {/* Logo */}
        <Link to="/" aria-label="YOQO – Home">
          <img
            src="/Yoqo-icon.png"
            alt="YOQO"
            className="h-12 w-auto shrink-0 select-none sm:h-14"
            draggable={false}
          />
        </Link>

        {/* Nav links — desktop top bar + mobile bottom bar */}
        <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-[#d9e5ee] bg-white p-1 shadow-xl backdrop-blur-lg md:static md:translate-x-0 md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <Link
                key={item.name}
                to={item.path}
                aria-label={item.name}
                className={cn(
                  'relative cursor-pointer rounded-full px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors md:px-5 md:py-2',
                  active ? 'bg-cyan-50 text-[#0a86ad]' : 'text-[#0b2a3d] hover:text-[#0a86ad]'
                )}
              >
                {/* Label desktop */}
                <span className="hidden md:inline">{item.name}</span>
                {/* Icône mobile */}
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>

                {/* Lampe active */}
                {active && (
                  <div className="absolute inset-0 -z-10 w-full rounded-full bg-cyan-400/5 transition-all duration-300">
                    <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-cyan-400">
                      <div className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-cyan-400/20 blur-md" />
                      <div className="absolute -top-1 h-6 w-8 rounded-full bg-cyan-400/20 blur-md" />
                      <div className="absolute left-2 top-0 h-4 w-4 rounded-full bg-cyan-400/20 blur-sm" />
                    </div>
                  </div>
                )}
              </Link>
            )
          })}
        </div>

        {/* Bouton Contact */}
        <Link
          to="/contact"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-xs font-bold text-[#03131b] shadow-[0_0_20px_rgba(14,165,217,0.45)] transition duration-300 ease-out hover:scale-105 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          Contact us
        </Link>
      </nav>
    </header>
  )
}
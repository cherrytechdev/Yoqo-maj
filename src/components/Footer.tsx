import React from 'react'
import { Mail } from 'lucide-react'
import { ButtonLink } from './ui/button'

const EMAIL = 'meithilesh.ramautar@yoqo.io'

const navLinks = [
  { label: 'Home', url: '#home' },
  { label: 'About', url: '#about' },
  { label: 'Solutions', url: '#solutions' },
  { label: 'Operations', url: '#operations' },
  { label: 'Security', url: '#security' },
  { label: 'Cards', url: '#cards' },
  { label: 'Regulation', url: '#regulation' },
  { label: 'Contact', url: '#contact' },
]

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative w-full overflow-hidden border-t border-white/10 px-6 pb-24 pt-16 sm:px-12 sm:pb-20 md:px-20 lg:px-28"
      style={{ background: '#03111a' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div>
            <img
              src="/Yoqo-icon.png"
              alt="YOQO"
              className="h-10 w-auto select-none"
              draggable={false}
            />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              YOQO Payment Systems Ltd. Mauritius.
            </p>
            <p className="mt-2 text-sm text-white/40">English, French, and Hindi</p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="text-xs font-bold tracking-[0.18em] text-cyan-300 uppercase">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-1">
              {navLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    className="text-sm text-white/70 transition-colors duration-300 hover:text-cyan-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-cyan-300 uppercase">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 break-all transition-colors duration-300 hover:text-cyan-300"
                >
                  <Mail size={16} className="shrink-0 text-cyan-400" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href="https://yoqo.io"
                  className="transition-colors duration-300 hover:text-cyan-300"
                >
                  yoqo.io
                </a>
              </li>
            </ul>

            <ButtonLink href={`mailto:${EMAIL}`} size="md" className="mt-6">
              Talk to us
            </ButtonLink>
          </div>

          {/* Ce que fait YOQO */}
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-cyan-300 uppercase">Solutions</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>Payment acceptance</li>
              <li>Prepaid card programs</li>
              <li>Virtual-asset capabilities</li>
              <li>Acquiring arrangements</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} YOQO Payment Systems Ltd. Mauritius.
        </div>
      </div>
    </footer>
  )
}

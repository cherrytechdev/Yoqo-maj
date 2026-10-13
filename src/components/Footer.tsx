import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { ButtonLink } from './ui/button'

const EMAILS = ['meithilesh.ramautar@yoqo.io', 'bhovin@yoqo.io']
const PHONE_DISPLAY = '+230 55 15 50 20'
const PHONE_HREF = 'tel:+23055155020'

const navLinks = [
  { label: 'Home',      path: '/'          },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Platform',  path: '/platform'  },
  { label: 'Security',  path: '/security'  },
  { label: 'Contact',   path: '/contact'   },
]

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative w-full overflow-hidden border-t border-white/10 px-6 pb-24 pt-16 sm:px-12 sm:pb-20 md:px-20 lg:px-28"
      style={{ background: '#061925' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div>
            <img
              src="/Yoqo-icon.png"
              alt="YOQO"
              className="h-16 w-auto select-none"
              draggable={false}
            />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              YOQO Payment Systems Ltd. Mauritius.
            </p>
            <p className="mt-2 text-sm text-white/40">English, French</p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="text-xs font-bold tracking-[0.18em] text-cyan-300 uppercase">Navigate</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 transition-colors duration-300 hover:text-cyan-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-cyan-300 uppercase">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {EMAILS.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 break-all transition-colors duration-300 hover:text-cyan-300"
                  >
                    <Mail size={16} className="shrink-0 text-cyan-400" aria-hidden="true" />
                    {email}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-cyan-300"
                >
                  <Phone size={16} className="shrink-0 text-cyan-400" aria-hidden="true" />
                  {PHONE_DISPLAY}
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

            <ButtonLink href={`mailto:${EMAILS[0]}`} size="md" className="mt-6">
              Talk to us
            </ButtonLink>
          </div>

          {/* Solutions */}
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
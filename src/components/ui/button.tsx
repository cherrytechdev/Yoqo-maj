import React from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-cyan-400 to-blue-500 text-[#03131b] font-bold shadow-[0_0_20px_rgba(14,165,217,0.45)] hover:scale-105',
  secondary:
    'border border-current/25 text-current font-semibold hover:border-[#0ea5d9] hover:text-[#0ea5d9]',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base',
}

const buttonStyles = ({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: Variant
  size?: Size
  className?: string
} = {}) =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-full text-center transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#03111a] active:scale-95 motion-reduce:transition-none',
    variants[variant],
    sizes[size],
    className
  )

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: Size
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  variant,
  size,
  className,
  children,
  ...props
}) => (
  <a className={buttonStyles({ variant, size, className })} {...props}>
    {children}
  </a>
)

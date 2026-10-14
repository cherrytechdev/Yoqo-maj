import type * as React from 'react'

type ModelViewerAttributes = React.HTMLAttributes<HTMLElement> & {
  src?: string
  alt?: string
  poster?: string
  loading?: 'auto' | 'lazy' | 'eager'
  'auto-rotate'?: boolean | string
  'rotation-per-second'?: string
  'camera-controls'?: boolean | string
  'disable-zoom'?: boolean | string
  'disable-pan'?: boolean | string
  'interaction-prompt'?: string
  'camera-orbit'?: string
  'shadow-intensity'?: string
  'shadow-softness'?: string
  'environment-image'?: string
  exposure?: string
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerAttributes
    }
  }
}

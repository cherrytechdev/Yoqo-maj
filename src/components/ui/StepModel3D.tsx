import React from 'react'
import '@google/model-viewer'
import './StepModel3D.css'

export interface StepModel3DProps {
  activeStep: number
  steps: { step: string; title: string }[]
  className?: string
}

const MODELS = [
  '/3D/step-1.glb',
  '/3D/step-2.glb',
  '/3D/step-3.glb',
  '/3D/step-4.glb',
]

const ALTS = [
  '3D model of a smartphone representing the merchant checkout step',
  '3D model of a shield with a padlock representing the YOQO gateway step',
  '3D model of a globe with an orbiting ring representing the acquirer and card network step',
  '3D model of a bank with a validation badge representing the card issuer step',
]

export const StepModel3D: React.FC<StepModel3DProps> = ({
  activeStep,
  steps,
  className = '',
}) => {
  const activeIndex = Math.min(Math.max(activeStep, 1), MODELS.length) - 1

  return (
    <div className={`step-model-panel ${className}`.trim()}>
      {MODELS.map((src, index) => {
        const isActive = index === activeIndex
        const label = steps[index]

        return (
          <div
            key={src}
            className={`step-model-slide${isActive ? ' is-active' : ''}`}
            aria-hidden={!isActive}
          >
            <div className="step-model-float">
              <model-viewer
                src={src}
                alt={ALTS[index]}
                loading={index === 0 ? 'eager' : 'lazy'}
                auto-rotate=""
                rotation-per-second="18deg"
                camera-controls=""
                disable-zoom=""
                disable-pan=""
                interaction-prompt="none"
                camera-orbit="25deg 75deg auto"
                shadow-intensity="0.6"
                shadow-softness="1"
                environment-image="neutral"
                exposure="1.05"
                style={{ width: '100%', height: '100%' }}
              />
            </div>

            <div className="step-model-shade" />

            <div className="step-model-caption">
              <p className="step-model-step">{label?.step}</p>
              <p className="step-model-title">{label?.title}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

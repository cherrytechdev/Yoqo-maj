import React from 'react'
import { PageHero } from '../components/PageHero'
import { Operations } from '../components/Operations'
import { Infrastructure } from '../components/Infrastructure'
import { Launch } from '../components/Launch'

export const PlatformPage: React.FC = () => {
  return (
    <div className="pt-[72px] sm:pt-[84px]">
      <PageHero
        titlePrefix="YOQO"
        titleHighlight="Platform"
        description="A robust, scalable infrastructure powering real-time operations, seamless integrations, and rapid deployment — so your business never misses a beat."
      />
      <Operations />
      <Infrastructure />
      <Launch />
    </div>
  )
}

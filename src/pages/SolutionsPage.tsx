import React from 'react'
import { PageHero } from '../components/PageHero'
import { Solutions } from '../components/Solutions'
import { Cards } from '../components/Cards'
import { MobileApp } from '../components/MobileApp'

export const SolutionsPage: React.FC = () => {
  return (
    <div>
      <PageHero
        titlePrefix="Our"
        titleHighlight="Solutions"
        description="One unified platform to accept payments, issue prepaid cards, and unlock virtual-asset capabilities — built for businesses operating across borders."
      />
      <Solutions />
      <Cards />
      <MobileApp />
    </div>
  )
}

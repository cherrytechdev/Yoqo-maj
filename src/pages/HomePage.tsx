import React from 'react'
import { Hero } from '../components/Hero'
import { Vision } from '../components/Vision'
import { About } from '../components/About'
import { SolutionsPreview } from '../components/SolutionsPreview'

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Vision />
      <About />
      <SolutionsPreview />
    </>
  )
}

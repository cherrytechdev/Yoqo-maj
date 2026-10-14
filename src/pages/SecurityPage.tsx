import React from 'react'
import { PageHero } from '../components/PageHero'
import { Security } from '../components/Security'
import { Regulation } from '../components/Regulation'

export const SecurityPage: React.FC = () => {
  return (
    <div>
      <PageHero
        titlePrefix="Security &"
        titleHighlight="Compliance"
        description="Bank-grade security protocols and full regulatory compliance — protecting your transactions, your data, and your customers' trust at every layer."
      />
      <Security />
      <Regulation />
    </div>
  )
}

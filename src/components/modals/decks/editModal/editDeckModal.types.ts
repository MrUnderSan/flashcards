import { ReactNode } from 'react'

import { Deck } from '@/services'

export type EditDeckModalProps = {
  className?: string
  deck: Deck
  trigger: ReactNode
}

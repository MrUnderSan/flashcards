import { ReactNode } from 'react'

import { Card } from '@/common/types'

export type EditCardModalProps = {
  card: Card
  className?: string
  trigger: ReactNode
}

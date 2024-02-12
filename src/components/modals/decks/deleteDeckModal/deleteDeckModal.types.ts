import { ReactNode } from 'react'

export type DeleteDeckModalProps = {
  className?: string
  id: string
  isBackOnDelete?: boolean
  name: string
  trigger: ReactNode
}

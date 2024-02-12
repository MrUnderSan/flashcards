import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Root } from '@radix-ui/react-dialog'

export type ModalProps = {
  children?: ReactNode
  className?: string
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof Root>

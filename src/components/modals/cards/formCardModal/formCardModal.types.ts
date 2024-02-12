import { ComponentPropsWithoutRef } from 'react'

import { CARD_SCHEMA } from '@/common/constants'
import { Card } from '@/common/types'
import { z } from 'zod'

export type FormCardModalProps = {
  buttonText: string
  card?: Card
  disabled?: boolean
  onSubmit: (data: FormData) => void
  setOpen: (open: boolean) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export type FormCardModalValues = z.input<typeof CARD_SCHEMA>

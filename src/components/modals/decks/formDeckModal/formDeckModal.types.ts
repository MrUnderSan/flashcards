import { ComponentPropsWithoutRef } from 'react'

import { DECK_SCHEMA } from '@/common/constants'
import { Deck } from '@/services'
import { z } from 'zod'

export type FormDeckModalProps = {
  buttonText: string
  deck?: Deck
  disabled?: boolean
  onSubmit: (data: FormData) => void
  setOpen: (open: boolean) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export type FormDeckModalValues = z.input<typeof DECK_SCHEMA>

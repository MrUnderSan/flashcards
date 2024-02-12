import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { ZodEffects } from 'zod'

export type FileUploaderProps = {
  setFile: (file: File | null) => void
  trigger: ReactNode
  validationSchema?: ZodEffects<any>
} & ComponentPropsWithoutRef<'input'>

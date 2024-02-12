import { ComponentPropsWithoutRef } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxRadix.Root> & {
  label?: string
}

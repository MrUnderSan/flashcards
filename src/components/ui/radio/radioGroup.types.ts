import { ComponentPropsWithoutRef } from 'react'

import { Option } from '@/common/types'
import { Root } from '@radix-ui/react-radio-group'

export type RadioGroupProps = Omit<ComponentPropsWithoutRef<typeof Root>, 'children'> & {
  options: Option[]
}

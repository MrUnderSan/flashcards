import { FieldValues, UseControllerProps } from 'react-hook-form'

import { CheckboxProps } from '@/components/ui/checkbox/checkbox.types'

export type FormCheckboxProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<CheckboxProps, 'checked' | 'onValueChange'>

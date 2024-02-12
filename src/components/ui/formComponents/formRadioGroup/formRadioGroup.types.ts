import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { RadioGroupProps } from '@/components/ui/radio'

export type FormRadioGroupProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & Omit<RadioGroupProps, 'onValueChange' | 'value'>

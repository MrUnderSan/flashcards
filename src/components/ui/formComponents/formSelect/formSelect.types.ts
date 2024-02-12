import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { SelectProps } from '@/components/ui/select'

export type FormSelectProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<SelectProps, 'onValueChange' | 'value'>

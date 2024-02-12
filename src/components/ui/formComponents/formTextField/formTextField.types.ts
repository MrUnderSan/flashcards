import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { TextFieldProps } from '@/components/ui/textField'

export type FormTextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<TextFieldProps, 'id' | 'onChange' | 'value'>

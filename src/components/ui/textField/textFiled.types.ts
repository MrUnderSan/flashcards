import { ComponentProps, ComponentPropsWithoutRef } from 'react'

export type TextFieldProps = {
  errorMessage?: string
  label?: string
  labelProps?: ComponentProps<'label'>
  onValueChange?: (value: string) => void
  rootContainerProps?: ComponentProps<'div'>
  type?: 'password' | 'search' | 'text'
} & ComponentPropsWithoutRef<'input'>

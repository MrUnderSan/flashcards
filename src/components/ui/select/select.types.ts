import { ComponentPropsWithoutRef } from 'react'

import { Item, Root } from '@radix-ui/react-select'

export type Option = {
  disabled?: boolean
  title: string
  value: string
}

export type SelectProps = {
  className?: string
  errorMessage?: string
  label?: string
  options?: Option[]
  pagination?: boolean
  placeholder?: string
} & ComponentPropsWithoutRef<typeof Root>

export type SelectItemProps = {
  disabled?: boolean
  pagination?: boolean
} & ComponentPropsWithoutRef<typeof Item>

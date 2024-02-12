import { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode, Ref } from 'react'

export type ButtonOwnProps<T extends ElementType> = {
  as?: T
  fullWidth?: boolean
  variant?: 'icon' | 'link' | 'primary' | 'secondary' | 'tertiary'
}

export type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>

export type ButtonWithRef = <T extends ElementType = 'button'>(
  props: ButtonProps<T>,
  ref?: Ref<ElementRef<T>>
) => ReactNode

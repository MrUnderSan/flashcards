import { ComponentPropsWithoutRef, ElementRef, ElementType, ReactNode, Ref } from 'react'

export type CardOwnProps<T extends ElementType> = {
  as?: T
}

export type CardProps<T extends ElementType = 'div'> = CardOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps<T>>

export type CardWithRef = <T extends ElementType = 'div'>(
  props: CardProps<T>,
  ref?: Ref<ElementRef<T>>
) => ReactNode

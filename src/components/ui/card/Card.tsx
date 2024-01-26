import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ReactNode,
  Ref,
  forwardRef,
} from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

type CardOwnProps<T extends ElementType> = {
  as?: T
}

export type CardProps<T extends ElementType = 'div'> = CardOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps<T>>

type CardWithRef = <T extends ElementType = 'div'>(
  props: CardProps<T>,
  ref?: Ref<ElementRef<T>>
) => ReactNode

export const Card: CardWithRef = forwardRef(
  <T extends ElementType = 'div'>(props: CardProps<T>, ref: Ref<ElementRef<T>>) => {
    const { as, className, ...restProps } = props
    const Tag: ElementType = as || 'div'
    const classNames = clsx(s.card, className)

    return <Tag className={classNames} ref={ref} {...restProps} />
  }
)

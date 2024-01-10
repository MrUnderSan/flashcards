import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ReactNode,
  Ref,
  forwardRef,
} from 'react'

import { ButtonProps } from '@/components/ui/button'
import { clsx } from 'clsx'

import s from './card.module.scss'

type CardProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

type CardWithRef = <T extends ElementType = 'div'>(
  props: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
  ref?: Ref<ElementRef<T>>
) => ReactNode
export const Card: CardWithRef = forwardRef(
  <T extends ElementType = 'div'>(
    props: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
    ref: ElementRef<T>
  ) => {
    const { as, className, ...restProps } = props
    const Tag: ElementType = as || 'div'
    const classNames = clsx(s.card, className)

    return <Tag className={classNames} ref={ref} {...restProps} />
  }
)

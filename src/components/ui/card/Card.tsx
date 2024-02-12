import { ElementRef, ElementType, Ref, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

import { CardProps, CardWithRef } from './card.types'

export const Card: CardWithRef = forwardRef(
  <T extends ElementType = 'div'>(props: CardProps<T>, ref: Ref<ElementRef<T>>) => {
    const { as, className, ...restProps } = props
    const Tag: ElementType = as || 'div'
    const classNames = clsx(s.card, className)

    return <Tag className={classNames} ref={ref} {...restProps} />
  }
)

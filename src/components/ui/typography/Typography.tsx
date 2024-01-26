import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

export interface TextProps<T extends ElementType> {
  as?: T
  children?: ReactNode
  className?: string
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
}

export function Typography<T extends ElementType = 'p'>({
  as,
  className,
  variant = 'body1',
  ...restProps
}: TextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>) {
  const Component = as || 'p'

  const classNames = clsx(s[variant], className || null)

  return <Component className={classNames} {...restProps} />
}

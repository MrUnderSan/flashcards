import { ComponentPropsWithoutRef, ElementType } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

import { TypographyProps } from './typography.types'

export const Typography = <T extends ElementType = 'p'>({
  as,
  className,
  variant = 'body1',
  ...restProps
}: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) => {
  const Component = as || 'p'

  const classNames = clsx(s[variant], className || null)

  return <Component className={classNames} {...restProps} />
}

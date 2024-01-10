import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ReactNode,
  Ref,
  forwardRef,
} from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType> = {
  as?: T
  fullWidth?: boolean
  variant?: 'link' | 'primary' | 'secondary' | 'tertiary'
} & ComponentPropsWithoutRef<T>

type ButtonWithRef = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
  ref?: Ref<ElementRef<T>>
) => ReactNode

export const Button: ButtonWithRef = forwardRef(
  <T extends ElementType = 'button'>(
    props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
    ref: Ref<ElementRef<T>>
  ) => {
    const { as, className, fullWidth, variant = 'primary', ...rest } = props
    const Tag: ElementType = as || 'button'
    const classNames = clsx(s.button, s[variant], fullWidth ? s.fullWidth : '', className)

    return <Tag className={classNames} ref={ref} {...rest} />
  }
)

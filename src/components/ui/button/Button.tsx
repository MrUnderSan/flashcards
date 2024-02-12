import { ElementRef, ElementType, Ref, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

import { ButtonProps, ButtonWithRef } from './button.types'

export const Button: ButtonWithRef = forwardRef(
  <T extends ElementType>(props: ButtonProps<T>, ref: Ref<ElementRef<T>>) => {
    const { as, className, fullWidth, variant = 'primary', ...rest } = props
    const Tag: ElementType = as || 'button'
    const classNames = clsx(s.button, s[variant], fullWidth && s.fullWidth, className)

    return <Tag className={classNames} ref={ref} {...rest} />
  }
)

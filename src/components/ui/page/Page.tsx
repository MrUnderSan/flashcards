import { CSSProperties, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './page.module.scss'

import { PageProps } from './page.types'

export const Page = forwardRef<ElementRef<'div'>, PageProps>(
  ({ className, marginTop = '33px', style, ...rest }, ref) => {
    const classNames = clsx(s.container, className)
    const styles: CSSProperties = { marginTop, ...style }

    return <div className={classNames} style={styles} {...rest} ref={ref} />
  }
)

import { CSSProperties, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './page.module.scss'
type OwnPageProps = {
  marginTop?: CSSProperties['marginTop']
}

export type PageProps = OwnPageProps & Omit<ComponentPropsWithoutRef<'div'>, keyof OwnPageProps>

export const Page = forwardRef<ElementRef<'div'>, PageProps>(
  ({ className, marginTop = '33px', style, ...rest }, ref) => {
    const classNames = clsx(s.container, className)
    const styles: CSSProperties = { marginTop, ...style }

    return <div className={classNames} style={styles} {...rest} ref={ref} />
  }
)

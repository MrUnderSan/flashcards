import { CSSProperties } from 'react'

import { clsx } from 'clsx'

import s from './loader.module.scss'

type LoaderProps = {
  className?: string
  style?: CSSProperties
}

export const Loader = ({ className, style }: LoaderProps) => {
  const classNames = clsx(s.loader, className)

  return <div className={classNames} style={style}></div>
}

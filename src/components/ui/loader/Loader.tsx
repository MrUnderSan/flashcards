import { clsx } from 'clsx'

import s from './loader.module.scss'

import { LoaderProps } from './loader.types'

export const Loader = ({ className, style }: LoaderProps) => {
  const classNames = clsx(s.loader, className)

  return <div className={classNames} style={style}></div>
}

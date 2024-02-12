import { ComponentPropsWithoutRef } from 'react'

import { Separator } from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropDownSeparator.module.scss'

export type DropDownSeparatorProps = ComponentPropsWithoutRef<typeof Separator>

export const DropDownSeparator = ({ className }: DropDownSeparatorProps) => {
  const classNames = clsx(s.separator, className)

  return <Separator className={classNames} />
}

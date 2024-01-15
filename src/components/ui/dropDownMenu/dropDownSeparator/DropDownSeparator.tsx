import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropDownSeparator.module.scss'

export type DropDownSeparatorProps = ComponentPropsWithoutRef<typeof DropdownMenu.Separator>

export const DropDownSeparator = ({ className }: DropDownSeparatorProps) => {
  const classNames = clsx(s.separator, className)

  return <DropdownMenu.Separator className={classNames} />
}

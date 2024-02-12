import { ElementRef, forwardRef } from 'react'

import { Item } from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropDownItem.module.scss'

import { DropDownItemProps } from '../dropDownMenu.types'

export const DropDownItem = forwardRef<ElementRef<typeof Item>, DropDownItemProps>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.dropDownItem, className)

    return <Item className={classNames} ref={ref} {...rest} />
  }
)

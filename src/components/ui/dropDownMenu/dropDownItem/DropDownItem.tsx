import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './dropDownItem.module.scss'

export type DropDownItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>

export const DropDownItem = forwardRef<ElementRef<typeof DropdownMenu.Item>, DropDownItemProps>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.dropDownItem, className)

    return <DropdownMenu.Item className={classNames} ref={ref} {...rest} />
  }
)

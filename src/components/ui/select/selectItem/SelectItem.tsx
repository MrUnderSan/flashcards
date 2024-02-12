import { ElementRef, forwardRef } from 'react'

import { Item, ItemText } from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './selectItem.module.scss'

import { SelectItemProps } from '../select.types'

export const SelectItem = forwardRef<ElementRef<typeof Item>, SelectItemProps>(
  ({ children, className, pagination, ...restProps }, ref) => {
    const classNames = clsx(s.SelectItem, pagination && s.paginationItem, className)

    return (
      <Item className={classNames} {...restProps} ref={ref}>
        <ItemText>{children}</ItemText>
      </Item>
    )
  }
)

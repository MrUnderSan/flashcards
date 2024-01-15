import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SelectFromRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './selectItem.module.scss'

type SelectItemProps = {
  disabled?: boolean
  pagination?: boolean
} & ComponentPropsWithoutRef<typeof SelectFromRadix.Item>

export const SelectItem = forwardRef<ElementRef<typeof SelectFromRadix.Item>, SelectItemProps>(
  ({ children, className, pagination, ...restProps }, ref) => {
    const classNames = clsx(s.SelectItem, pagination && s.paginationItem, className)

    return (
      <SelectFromRadix.Item className={classNames} {...restProps} ref={ref}>
        <SelectFromRadix.ItemText>{children}</SelectFromRadix.ItemText>
      </SelectFromRadix.Item>
    )
  }
)

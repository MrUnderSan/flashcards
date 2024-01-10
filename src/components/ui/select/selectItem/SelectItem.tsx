import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SelectFromRadix from '@radix-ui/react-select'

import s from './selectItem.module.scss'

type SelectItemProps = {
  disabled?: boolean
  value: string
} & ComponentPropsWithoutRef<typeof SelectFromRadix.Item>

export const SelectItem = forwardRef<ElementRef<typeof SelectFromRadix.Item>, SelectItemProps>(
  ({ className, value, ...restProps }, ref) => {
    return (
      <SelectFromRadix.Item
        className={`${s.SelectItem} ${className}`}
        value={value}
        {...restProps}
        ref={ref}
      >
        <SelectFromRadix.ItemText>{value}</SelectFromRadix.ItemText>
      </SelectFromRadix.Item>
    )
  }
)

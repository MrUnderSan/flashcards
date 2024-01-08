import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SelectFromRadix from '@radix-ui/react-select'

import s from './selectItem.module.scss'

type SelectItemProps = {
  disabled?: boolean
} & ComponentPropsWithoutRef<typeof SelectFromRadix.Item>

export const SelectItem = forwardRef<ElementRef<typeof SelectFromRadix.Item>, SelectItemProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <SelectFromRadix.Item className={`${s.SelectItem} ${className}`} {...restProps} ref={ref}>
        <SelectFromRadix.ItemText>{children}</SelectFromRadix.ItemText>
      </SelectFromRadix.Item>
    )
  }
)

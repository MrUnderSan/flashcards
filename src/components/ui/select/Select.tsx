import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ArrowDown } from '@/assets'
import * as SelectFromRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './select.module.scss'

import { Typography } from '../typography'
import { SelectItem } from './selectItem'

export type Option = {
  disabled?: boolean
  title: string
  value: string
}

export type SelectProps = {
  className?: string
  errorMessage?: string
  label?: string
  options?: Option[]
  pagination?: boolean
  placeholder?: string
} & ComponentPropsWithoutRef<typeof SelectFromRadix.Root>

export const Select = forwardRef<ElementRef<typeof SelectFromRadix.Root>, SelectProps>(
  (props: SelectProps, ref) => {
    const {
      className,
      defaultValue,
      disabled,
      errorMessage,
      label,
      onValueChange,
      options,
      pagination,
      placeholder,
      value,
      ...restProps
    } = props

    const classNames = {
      content: s.SelectContent,
      label: clsx(s.SelectLabel, disabled && s.disabled, className),
      scrollButton: s.SelectScrollButton,
      trigger: clsx(s.SelectTrigger, errorMessage && s.error, pagination && s.pagination),
      triggerIcon: s.SelectIcon,
      viewport: s.SelectViewport,
    }

    const currentPlaceholder = pagination ? options?.[0].title : placeholder
    const showError = !!errorMessage && errorMessage.length > 0

    const selectItems = options?.map(el => {
      return <SelectItem disabled={el.disabled} key={el.value} value={el.value} />
    })

    return (
      <>
        <Typography as={'label'} className={classNames.label} variant={'body2'}>
          {label}
        </Typography>
        <SelectFromRadix.Root
          defaultValue={defaultValue}
          disabled={disabled}
          onValueChange={onValueChange}
          value={value}
          {...restProps}
        >
          <SelectFromRadix.Trigger className={classNames.trigger} ref={ref}>
            <SelectFromRadix.Value placeholder={currentPlaceholder} />
            <SelectFromRadix.Icon asChild className={classNames.triggerIcon}>
              <ArrowDown />
            </SelectFromRadix.Icon>
          </SelectFromRadix.Trigger>
          <SelectFromRadix.Portal>
            <SelectFromRadix.Content className={classNames.content} position={'popper'}>
              <SelectFromRadix.Viewport asChild className={classNames.viewport}>
                <SelectFromRadix.Group className={s.selectGroup}>
                  {selectItems}
                </SelectFromRadix.Group>
              </SelectFromRadix.Viewport>
            </SelectFromRadix.Content>
          </SelectFromRadix.Portal>
        </SelectFromRadix.Root>
        {showError && <Typography variant={'error'}>{errorMessage}</Typography>}
      </>
    )
  }
)

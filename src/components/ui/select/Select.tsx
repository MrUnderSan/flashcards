import { ElementRef, forwardRef } from 'react'

import { ArrowDown } from '@/assets'
import * as SelectFromRadix from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './select.module.scss'

import { Typography } from '../typography'
import { SelectProps } from './select.types'
import { SelectItem } from './selectItem'

const { Content, Group, Icon, Portal, Root, Trigger, Value, Viewport } = SelectFromRadix

export const Select = forwardRef<ElementRef<typeof Root>, SelectProps>(
  (
    {
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
    }: SelectProps,
    ref
  ) => {
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

    const selectItems = options?.map(el => (
      <SelectItem key={el.value} pagination={pagination} value={el.value}>
        {el.title}
      </SelectItem>
    ))

    return (
      <>
        <Typography as={'label'} className={classNames.label} variant={'body2'}>
          {label}
        </Typography>
        <Root
          defaultValue={defaultValue}
          disabled={disabled}
          onValueChange={onValueChange}
          value={value}
          {...restProps}
        >
          <Trigger className={classNames.trigger} ref={ref}>
            <Value placeholder={currentPlaceholder} />
            <Icon asChild className={classNames.triggerIcon}>
              <ArrowDown />
            </Icon>
          </Trigger>
          <Portal>
            <Content className={classNames.content} position={'popper'}>
              <Viewport asChild className={classNames.viewport}>
                <Group className={s.selectGroup}>{selectItems}</Group>
              </Viewport>
            </Content>
          </Portal>
        </Root>
        {showError && <Typography variant={'error'}>{errorMessage}</Typography>}
      </>
    )
  }
)

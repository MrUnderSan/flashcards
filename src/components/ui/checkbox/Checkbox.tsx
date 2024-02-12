import { ElementRef, forwardRef } from 'react'

import { Check } from '@/assets/icons/check'
import { Typography } from '@/components/ui/typography'
import { Indicator, Root } from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

import { CheckboxProps } from './checkbox.types'

export const Checkbox = forwardRef<ElementRef<typeof Root>, CheckboxProps>(
  ({ className, id, label, ...rest }, ref) => {
    const classNames = clsx(s.container, className)

    return (
      <div className={classNames}>
        <Root {...rest} className={s.checkbox} defaultChecked ref={ref}>
          <Indicator>
            <Check />
          </Indicator>
        </Root>
        {label && (
          <Typography as={'label'} className={s.label} htmlFor={id} variant={'body2'}>
            {label}
          </Typography>
        )}
      </div>
    )
  }
)

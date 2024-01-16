import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Check } from '@/assets/icons/check'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './checkbox.module.scss'

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxRadix.Root> & {
  label?: string
}

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  ({ className, id, label, ...rest }, ref) => {
    const classNames = clsx(s.container, className)

    return (
      <div className={classNames}>
        <CheckboxRadix.Root {...rest} className={s.checkbox} defaultChecked ref={ref}>
          <CheckboxRadix.Indicator>
            <Check />
          </CheckboxRadix.Indicator>
        </CheckboxRadix.Root>
        {label && (
          <Typography as={'label'} className={s.label} htmlFor={id} variant={'body2'}>
            {label}
          </Typography>
        )}
      </div>
    )
  }
)

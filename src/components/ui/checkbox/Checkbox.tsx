import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Check } from '@/assets/icons/check'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

export type CheckboxProps = ComponentPropsWithoutRef<typeof CheckboxRadix.Root> & {
  label?: string
}

export const Checkbox = forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
  ({ className, id, label, ...rest }, ref) => {
    return (
      <div className={s.container}>
        <CheckboxRadix.Root
          {...rest}
          className={`${s.checkbox} ${className ? className : ''}`}
          defaultChecked
          ref={ref}
        >
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

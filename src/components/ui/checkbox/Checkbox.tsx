import { Check } from '@/assets/icons/check'
import { Typography } from '@/components/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  checked?: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: string
  onChange?: (checked: boolean) => void
  required?: boolean
}

export const Checkbox = (props: CheckboxProps) => {
  const { checked, className, disabled, id, label, onChange, required } = props

  return (
    <div className={s.container}>
      <CheckboxRadix.Root
        checked={checked}
        className={`${s.checkbox} ${className ? className : ''}`}
        defaultChecked
        disabled={disabled}
        id={id}
        onCheckedChange={onChange}
        required={required}
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

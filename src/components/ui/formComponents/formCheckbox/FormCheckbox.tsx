import { FieldValues, useController } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox'

import { FormCheckboxProps } from './formCheckbox.types'

export const FormCheckbox = <T extends FieldValues>({
  control,
  shouldUnregister,
  ...rest
}: FormCheckboxProps<T>) => {
  const {
    field: { onBlur, onChange, ref, value },
  } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  })

  return <Checkbox {...rest} checked={value} onBlur={onBlur} onCheckedChange={onChange} ref={ref} />
}

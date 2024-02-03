import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui/checkbox'

export type FormCheckboxProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<CheckboxProps, 'checked' | 'onValueChange'>
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

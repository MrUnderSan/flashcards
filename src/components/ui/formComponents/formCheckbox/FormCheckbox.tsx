import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui/checkbox'

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'defaultValue' | 'disabled' | 'rules'
> &
  Omit<CheckboxProps, 'checked' | 'onValueChange'>
export const ControlledCheckbox = <T extends FieldValues>({
  control,
  shouldUnregister,
  ...rest
}: Props<T>) => {
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

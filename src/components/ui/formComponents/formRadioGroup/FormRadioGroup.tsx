import { FieldValues, useController } from 'react-hook-form'

import { RadioGroup } from '@/components/ui/radio'

import { FormRadioGroupProps } from './formRadioGroup.types'

export const FormRadioGroup = <T extends FieldValues>({
  control,
  name,
  ...rest
}: FormRadioGroupProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    name,
  })

  return <RadioGroup name={name} onValueChange={onChange} value={value} {...rest} />
}

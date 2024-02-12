import { FieldValues, useController } from 'react-hook-form'

import { Select } from '@/components/ui/select'

import { FormSelectProps } from './formSelect.types'

export const FormSelect = <TFieldValues extends FieldValues>(
  props: FormSelectProps<TFieldValues>
) => {
  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return (
    <Select
      {...props}
      {...field}
      errorMessage={error?.message}
      onValueChange={onChange}
      value={value}
    />
  )
}

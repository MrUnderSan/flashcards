import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Select, SelectProps } from '@/components/ui/select'

export type FormSelectProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<SelectProps, 'onValueChange' | 'value'>

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

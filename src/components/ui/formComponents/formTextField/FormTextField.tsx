import { FieldValues, useController } from 'react-hook-form'

import { TextField } from '@/components/ui/textField'

import { FormTextFieldProps } from './formTextField.types'

export const FormTextField = <TFieldValues extends FieldValues>(
  props: FormTextFieldProps<TFieldValues>
) => {
  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return (
    <TextField
      {...props}
      {...field}
      errorMessage={error?.message}
      id={props.name}
      onChange={onChange}
      value={value}
    />
  )
}

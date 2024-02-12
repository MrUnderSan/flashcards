import { RefObject } from 'react'
import { FieldValues } from 'react-hook-form'

import { UploadImage } from '@/common/types'
import { FormCheckboxProps } from '@/components/ui/formComponents/formCheckbox'
import { FormTextFieldProps } from '@/components/ui/formComponents/formTextField'

type FormTextFieldPropsWithoutControl<TFieldValues extends FieldValues> = Omit<
  FormTextFieldProps<TFieldValues>,
  'control'
>

export type FormAddNewItemProps<TFieldValues extends FieldValues> = {
  cardSubtitle?: string
  checkboxProps?: FormCheckboxProps<TFieldValues>
  clearImg: () => void
  fileRef: RefObject<HTMLInputElement>
  img: UploadImage
  isCard?: boolean
  isDeck?: boolean
  newItemTextField: FormTextFieldPropsWithoutControl<TFieldValues>
  setImg: (questionImg: File | null) => void
}

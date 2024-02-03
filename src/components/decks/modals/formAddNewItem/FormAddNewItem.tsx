import { RefObject } from 'react'
import { FieldValues, useFormContext } from 'react-hook-form'

import { Trash } from '@/assets'
import { UploadImage } from '@/common/types'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
import { FormCheckbox, FormCheckboxProps } from '@/components/ui/formComponents/formCheckbox'
import { FormTextField, FormTextFieldProps } from '@/components/ui/formComponents/formTextField'
import { Typography } from '@/components/ui/typography'

import s from './formAddNewItem.module.scss'

type FormTextFieldPropsWithoutControl<TFieldValues extends FieldValues> = Omit<
  FormTextFieldProps<TFieldValues>,
  'control'
>

type FormAddNewItemProps<TFieldValues extends FieldValues> = {
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
export const FormAddNewItem = <TFieldValues extends FieldValues>({
  cardSubtitle,
  checkboxProps,
  clearImg,
  fileRef,
  img,
  isCard,
  isDeck,
  newItemTextField,
  setImg,
}: FormAddNewItemProps<TFieldValues>) => {
  const { label, name, placeholder } = newItemTextField
  const { control } = useFormContext()

  return (
    <>
      {isCard && (
        <Typography as={'h3'} variant={'subtitle2'}>
          {cardSubtitle}
        </Typography>
      )}
      <FormTextField
        autoComplete={'off'}
        control={control}
        label={label}
        name={name}
        placeholder={placeholder}
        rootContainerProps={{ className: s.inputContainer }}
      />
      {img ? (
        <div className={s.imgContainer}>
          <img
            alt={'questionImg'}
            className={s.img}
            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
          />
          <div>
            <Button className={s.delete} onClick={clearImg} variant={'secondary'}>
              <Trash />
            </Button>
            <FileUploader
              ref={fileRef}
              setFile={setImg}
              trigger={
                <Button as={'span'} className={s.buttonImage} fullWidth variant={'secondary'}>
                  Change image
                </Button>
              }
            />
          </div>
        </div>
      ) : (
        <FileUploader
          ref={fileRef}
          setFile={setImg}
          trigger={
            <Button as={'span'} className={s.buttonImage} fullWidth variant={'secondary'}>
              Upload image
            </Button>
          }
        />
      )}
      {isDeck && (
        <FormCheckbox
          className={checkboxProps?.className}
          control={control}
          label={checkboxProps?.label}
          name={checkboxProps?.name ?? ''}
        />
      )}
    </>
  )
}

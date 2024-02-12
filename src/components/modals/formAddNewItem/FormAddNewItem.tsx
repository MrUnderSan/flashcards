import { FieldValues, useFormContext } from 'react-hook-form'

import { Trash } from '@/assets'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
import { FormCheckbox } from '@/components/ui/formComponents/formCheckbox'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { Typography } from '@/components/ui/typography'

import s from './formAddNewItem.module.scss'

import { FormAddNewItemProps } from './formAddNewItem.types'
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

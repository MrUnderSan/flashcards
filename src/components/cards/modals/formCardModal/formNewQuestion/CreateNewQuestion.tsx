import { RefObject } from 'react'
import { useFormContext } from 'react-hook-form'

import { Trash } from '@/assets'
import { UploadImage } from '@/common/types'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { Typography } from '@/components/ui/typography'

import s from './createNewQuestion.module.scss'
type CreateNewQuestionProps = {
  clearQuestionImg?: () => void
  fileRef: RefObject<HTMLInputElement>
  questionImg: UploadImage
  setQuestionImg: (questionImg: File | null) => void
}

export const CreateNewQuestion = ({
  clearQuestionImg,
  fileRef,
  questionImg,
  setQuestionImg,
}: CreateNewQuestionProps) => {
  const { control } = useFormContext()

  return (
    <>
      <Typography as={'h3'} variant={'subtitle2'}>
        Question:
      </Typography>
      <FormTextField
        autoComplete={'off'}
        control={control}
        label={'Question'}
        name={'question'}
        placeholder={'Enter your question'}
        rootContainerProps={{ className: s.inputContainer }}
      />
      {questionImg ? (
        <div className={s.imgContainer}>
          <img
            alt={'questionImg'}
            className={s.img}
            src={typeof questionImg === 'string' ? questionImg : URL.createObjectURL(questionImg)}
          />
          <div>
            <Button className={s.delete} onClick={clearQuestionImg} variant={'secondary'}>
              <Trash />
            </Button>
            <FileUploader
              ref={fileRef}
              setFile={setQuestionImg}
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
          setFile={setQuestionImg}
          trigger={
            <Button as={'span'} className={s.buttonImage} fullWidth variant={'secondary'}>
              Upload image
            </Button>
          }
        />
      )}
    </>
  )
}

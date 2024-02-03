import { RefObject } from 'react'
import { useFormContext } from 'react-hook-form'

import { Trash } from '@/assets'
import { UploadImage } from '@/common/types'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { Typography } from '@/components/ui/typography'

import s from './createNewAnswer.module.scss'
type CreateNewQuestionProps = {
  answerImg: UploadImage
  clearAnswerImg?: () => void
  fileRef: RefObject<HTMLInputElement>
  setAnswerImg: (questionImg: File | null) => void
}

export const CreateNewAnswer = ({
  answerImg,
  clearAnswerImg,
  fileRef,
  setAnswerImg,
}: CreateNewQuestionProps) => {
  const { control } = useFormContext()

  return (
    <>
      <Typography as={'h3'} variant={'subtitle2'}>
        Answer:
      </Typography>
      <FormTextField
        autoComplete={'off'}
        control={control}
        label={'Answer'}
        name={'answer'}
        placeholder={'Enter your answer'}
        rootContainerProps={{ className: s.inputContainer }}
      />
      {answerImg ? (
        <div className={s.imgContainer}>
          <img
            alt={'questionImg'}
            className={s.img}
            src={typeof answerImg === 'string' ? answerImg : URL.createObjectURL(answerImg)}
          />
          <div>
            <Button className={s.delete} onClick={clearAnswerImg} variant={'secondary'}>
              <Trash />
            </Button>
            <FileUploader
              ref={fileRef}
              setFile={setAnswerImg}
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
          setFile={setAnswerImg}
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

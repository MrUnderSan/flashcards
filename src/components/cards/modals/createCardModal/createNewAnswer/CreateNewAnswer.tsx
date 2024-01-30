import { useFormContext } from 'react-hook-form'

import { Trash } from '@/assets'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { Typography } from '@/components/ui/typography'

import s from './createNewAnswer.module.scss'
type CreateNewQuestionProps = {
  currentAnswerImg?: string
  deleteAnswerImg?: () => void
  newAnswerImg: File | null
  setAnswerImg: (questionImg: File | null) => void
}

export const CreateNewAnswer = ({
  currentAnswerImg,
  deleteAnswerImg,
  newAnswerImg,
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
      {newAnswerImg || currentAnswerImg ? (
        <div className={s.imgContainer}>
          {currentAnswerImg && !newAnswerImg && (
            <img alt={'cover'} className={s.img} src={currentAnswerImg} />
          )}
          {newAnswerImg && (
            <img alt={'cover'} className={s.img} src={URL.createObjectURL(newAnswerImg)} />
          )}
          <div>
            <Button className={s.delete} onClick={deleteAnswerImg} variant={'secondary'}>
              <Trash />
            </Button>
            <FileUploader
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

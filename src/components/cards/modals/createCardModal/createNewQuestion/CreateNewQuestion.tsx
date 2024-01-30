import { useFormContext } from 'react-hook-form'

import { Trash } from '@/assets'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { Typography } from '@/components/ui/typography'

import s from './createNewQuestion.module.scss'
type CreateNewQuestionProps = {
  currentQuestionImg?: string
  deleteQuestionImg?: () => void
  newQuestionImg: File | null
  setQuestionImg: (questionImg: File | null) => void
}

export const CreateNewQuestion = ({
  currentQuestionImg,
  deleteQuestionImg,
  newQuestionImg,
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
      {newQuestionImg || currentQuestionImg ? (
        <div className={s.imgContainer}>
          {currentQuestionImg && !newQuestionImg && (
            <img alt={'cover'} className={s.img} src={currentQuestionImg} />
          )}
          {newQuestionImg && (
            <img alt={'cover'} className={s.img} src={URL.createObjectURL(newQuestionImg)} />
          )}
          <div>
            <Button className={s.delete} onClick={deleteQuestionImg} variant={'secondary'}>
              <Trash />
            </Button>
            <FileUploader
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

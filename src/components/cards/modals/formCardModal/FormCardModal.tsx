import { ComponentPropsWithoutRef, useRef } from 'react'
import { FormProvider } from 'react-hook-form'

import { Card } from '@/common/types'
import { CreateNewAnswer } from '@/components/cards/modals/formCardModal/formNewAnswer/CreateNewAnswer'
import { CreateNewQuestion } from '@/components/cards/modals/formCardModal/formNewQuestion/CreateNewQuestion'
import {
  FormCardModalValues,
  useFormCardModal,
} from '@/components/cards/modals/formCardModal/hooks/useFormCardModal'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'

import s from '@/components/cards/modals/formCardModal/formCardModal.module.scss'

type FormCardModalProps = {
  buttonText: string
  card?: Card
  disabled?: boolean
  onSubmit: (data: FormData) => void
  setOpen: (open: boolean) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export const FormCardModal = ({
  buttonText,
  card,
  className,
  disabled,
  onSubmit,
  setOpen,
}: FormCardModalProps) => {
  const { formMethods, images } = useFormCardModal(card)

  const { answerImg, questionImg, setAnswerImg, setQuestionImg } = images
  const { handleSubmit } = formMethods

  const isStringAnswerImg = typeof answerImg === 'string'
  const isStringQuestionImg = typeof questionImg === 'string'

  const onSubmitHandler = (data: FormCardModalValues) => {
    const formData = new FormData()

    formData.append('question', data.question)
    formData.append('answer', data.answer)
    !isStringQuestionImg && formData.append('questionImg', questionImg === null ? '' : questionImg)
    !isStringAnswerImg && formData.append('answerImg', answerImg === null ? '' : answerImg)
    onSubmit(formData)
  }

  const answerFileRef = useRef<HTMLInputElement>(null)
  const questionFileRef = useRef<HTMLInputElement>(null)

  const clearQuestionImg = () => {
    setQuestionImg(null)
    if (questionFileRef.current) {
      questionFileRef.current.value = ''
    }
  }
  const clearAnswerImg = () => {
    setAnswerImg(null)
    if (answerFileRef.current) {
      answerFileRef.current.value = ''
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmitHandler)}>
        <CreateNewQuestion
          clearQuestionImg={clearQuestionImg}
          fileRef={questionFileRef}
          questionImg={questionImg}
          setQuestionImg={setQuestionImg}
        />
        <CreateNewAnswer
          answerImg={answerImg}
          clearAnswerImg={clearAnswerImg}
          fileRef={answerFileRef}
          setAnswerImg={setAnswerImg}
        />
        <div className={s.buttons}>
          <Button onClick={() => setOpen(false)} type={'reset'} variant={'secondary'}>
            Cancel
          </Button>
          <Button disabled={disabled} type={'submit'} variant={'primary'}>
            {buttonText}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

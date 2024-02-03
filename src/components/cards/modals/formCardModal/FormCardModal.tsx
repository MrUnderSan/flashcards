import { ComponentPropsWithoutRef, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CARD_SCHEMA } from '@/common/const'
import { Card, UploadImage } from '@/common/types'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from '@/components/cards/modals/formCardModal/formCardModal.module.scss'

import { CreateNewAnswer } from './formNewAnswer'
import { CreateNewQuestion } from './formNewQuestion'

type FormCardModalProps = {
  buttonText: string
  card?: Card
  disabled?: boolean
  onSubmit: (data: FormData) => void
  setOpen: (open: boolean) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>
export type FormCardModalValues = z.input<typeof CARD_SCHEMA>

export const FormCardModal = ({
  buttonText,
  card,
  className,
  disabled,
  onSubmit,
  setOpen,
}: FormCardModalProps) => {
  const [questionImg, setQuestionImg] = useState<UploadImage>(card?.questionImg || null)
  const [answerImg, setAnswerImg] = useState<UploadImage>(card?.answerImg || null)
  const formMethods = useForm<FormCardModalValues>({
    defaultValues: {
      answer: card?.answer || '',
      question: card?.question || '',
    },
    resolver: zodResolver(CARD_SCHEMA),
  })

  const { handleSubmit } = formMethods

  const isStringAnswerImg = typeof answerImg === 'string'
  const isStringQuestionImg = typeof questionImg === 'string'

  const onSubmitHandler = (data: FormCardModalValues) => {
    const formData = new FormData()
    const sentQuestionImg = questionImg === null ? '' : questionImg
    const sentAnswerImg = answerImg === null ? '' : answerImg

    formData.append('question', data.question)
    formData.append('answer', data.answer)
    !isStringQuestionImg && formData.append('questionImg', sentQuestionImg)
    !isStringAnswerImg && formData.append('answerImg', sentAnswerImg)
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

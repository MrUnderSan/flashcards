import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CARD_SCHEMA } from '@/common/constants'
import { UploadImage } from '@/common/types'
import { FormAddNewItem } from '@/components/modals/formAddNewItem'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'

import s from '@/components/modals/cards/formCardModal/formCardModal.module.scss'

import { FormCardModalProps, FormCardModalValues } from './formCardModal.types'

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
        <FormAddNewItem
          cardSubtitle={'Question:'}
          clearImg={clearQuestionImg}
          fileRef={questionFileRef}
          img={questionImg}
          isCard
          newItemTextField={{
            label: 'Question',
            name: 'question',
            placeholder: 'Enter your question',
          }}
          setImg={setQuestionImg}
        />
        <FormAddNewItem
          cardSubtitle={'Answer:'}
          clearImg={clearAnswerImg}
          fileRef={answerFileRef}
          img={answerImg}
          isCard
          newItemTextField={{
            label: 'Answer',
            name: 'answer',
            placeholder: 'Enter your answer',
          }}
          setImg={setAnswerImg}
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

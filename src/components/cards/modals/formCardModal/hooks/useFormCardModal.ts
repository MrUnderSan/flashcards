import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { CARD_SCHEMA } from '@/common/const'
import { Card, UploadImage } from '@/common/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export type FormCardModalValues = z.input<typeof CARD_SCHEMA>

export const useFormCardModal = (card?: Card) => {
  const [questionImg, setQuestionImg] = useState<UploadImage>(card?.questionImg || null)
  const [answerImg, setAnswerImg] = useState<UploadImage>(card?.answerImg || null)
  const formMethods = useForm<FormCardModalValues>({
    defaultValues: {
      answer: card?.answer || '',
      question: card?.question || '',
    },
    resolver: zodResolver(CARD_SCHEMA),
  })

  return {
    formMethods,
    images: {
      answerImg,
      questionImg,
      setAnswerImg,
      setQuestionImg,
    },
  }
}

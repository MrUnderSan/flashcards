import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Card } from '@/common/types'
import { CreateNewAnswer } from '@/components/cards/modals/createCardModal/createNewAnswer/CreateNewAnswer'
import { CreateNewQuestion } from '@/components/cards/modals/createCardModal/createNewQuestion/CreateNewQuestion'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useUpdateCardMutation } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './editCardModal.module.scss'

type EditCardModalProps = {
  cardToEdit?: Card
  id: string | undefined
  onOpenChange: (open: boolean) => void
  open: boolean
}

const updateCardSchema = z.object({
  answer: z.optional(z.string().min(3).max(30)),
  question: z.optional(z.string().min(3).max(30)),
})

type EditCardModalPropsFormValues = z.infer<typeof updateCardSchema>

export const EditCardModal = ({ cardToEdit, id, onOpenChange, open }: EditCardModalProps) => {
  const [newQuestionImg, setNewQuestionImg] = useState<File | null>(null)
  const [newAnswerImg, setNewAnswerImg] = useState<File | null>(null)
  const [currentAnswerImg, setCurrentAnswerImg] = useState<string>('')
  const [currentQuestionImg, setCurrentQuestionImg] = useState<string>('')
  const [updateCard] = useUpdateCardMutation()

  const methods = useForm<EditCardModalPropsFormValues>({
    defaultValues: { answer: cardToEdit?.answer ?? '', question: cardToEdit?.question ?? '' },
    resolver: zodResolver(updateCardSchema),
  })
  const { handleSubmit, reset } = methods

  useEffect(() => {
    setCurrentAnswerImg(cardToEdit?.answerImg ?? '')
    setCurrentQuestionImg(cardToEdit?.questionImg ?? '')
    reset({ answer: cardToEdit?.answer, question: cardToEdit?.question })
  }, [open, cardToEdit, reset])

  const onOpenChangeHandler = () => {
    onOpenChange(open)
    reset()
    setNewQuestionImg(null)
    setNewAnswerImg(null)
  }

  const onSubmit = async (data: EditCardModalPropsFormValues) => {
    const formData = new FormData()

    data.question && formData.append('question', data.question)
    data.answer && formData.append('answer', data.answer)
    !currentQuestionImg && formData.append('questionImg', newQuestionImg ?? '')
    !currentAnswerImg && formData.append('answerImg', newAnswerImg ?? '')

    const updateCardHandler = updateCard({ body: formData, id: id ?? '' }).unwrap()

    await toast.promise(updateCardHandler, {
      error: 'Failed to update card',
      pending: 'Update card...',
      success: 'Card update successfully!',
    })
    await updateCardHandler
    reset()
    onOpenChange(false)
  }

  const deleteQuestionImg = () => {
    setNewQuestionImg(null)
    setCurrentQuestionImg('')
  }

  const deleteAnswerImg = () => {
    setNewAnswerImg(null)
    setCurrentAnswerImg('')
  }

  return (
    <FormProvider {...methods}>
      <Modal onOpenChange={onOpenChangeHandler} open={open} title={`Edit ${cardToEdit?.question}`}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <CreateNewQuestion
            currentQuestionImg={currentQuestionImg}
            deleteQuestionImg={deleteQuestionImg}
            newQuestionImg={newQuestionImg}
            setQuestionImg={setNewQuestionImg}
          />
          <CreateNewAnswer
            currentAnswerImg={currentAnswerImg}
            deleteAnswerImg={deleteAnswerImg}
            newAnswerImg={newAnswerImg}
            setAnswerImg={setNewAnswerImg}
          />
          <div className={s.buttons}>
            <Button onClick={onOpenChangeHandler} type={'reset'} variant={'secondary'}>
              Cancel
            </Button>
            <Button type={'submit'} variant={'primary'}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </FormProvider>
  )
}

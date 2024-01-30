import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { CreateNewAnswer } from '@/components/cards/modals/createCardModal/createNewAnswer/CreateNewAnswer'
import { CreateNewQuestion } from '@/components/cards/modals/createCardModal/createNewQuestion/CreateNewQuestion'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { useCreateCardMutation } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createCardModal.module.scss'

type CreateCardModalProps = {
  deckId: string | undefined
  onOpenChange: (open: boolean) => void
  open: boolean
}

const newCardSchema = z.object({
  answer: z.string().min(3).max(30),
  question: z.string().min(3).max(30),
})

type CreateCardModalFormValues = z.infer<typeof newCardSchema>

export const CreateCardModal = ({ deckId, onOpenChange, open }: CreateCardModalProps) => {
  const [questionImg, setQuestionImg] = useState<File | null>(null)
  const [answerImg, setAnswerImg] = useState<File | null>(null)
  const [createCard] = useCreateCardMutation()

  const methods = useForm<CreateCardModalFormValues>({
    defaultValues: { answer: '', question: '' },
    resolver: zodResolver(newCardSchema),
  })
  const { handleSubmit, reset } = methods
  const onOpenChangeHandler = () => {
    onOpenChange(open)
    reset()
    setQuestionImg(null)
    setAnswerImg(null)
  }

  const onSubmit = async (data: CreateCardModalFormValues) => {
    const formData = new FormData()

    formData.append('question', data.question)
    formData.append('answer', data.answer)
    questionImg && formData.append('questionImg', questionImg)
    answerImg && formData.append('answerImg', answerImg)

    const createNewCard = createCard({ body: formData, id: deckId ?? '' }).unwrap()

    await toast.promise(createNewCard, {
      error: 'Failed to create card',
      pending: 'Create card...',
      success: 'Card create successfully!',
    })
    await createNewCard
    reset()
    setQuestionImg(null)
    setAnswerImg(null)
    onOpenChange(false)
  }

  return (
    <FormProvider {...methods}>
      <Modal onOpenChange={onOpenChangeHandler} open={open} title={'Add New Card'}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <CreateNewQuestion newQuestionImg={questionImg} setQuestionImg={setQuestionImg} />
          <CreateNewAnswer newAnswerImg={answerImg} setAnswerImg={setAnswerImg} />
          <div className={s.buttons}>
            <Button onClick={onOpenChangeHandler} type={'reset'} variant={'secondary'}>
              Cancel
            </Button>
            <Button type={'submit'} variant={'primary'}>
              Add New Card
            </Button>
          </div>
        </form>
      </Modal>
    </FormProvider>
  )
}

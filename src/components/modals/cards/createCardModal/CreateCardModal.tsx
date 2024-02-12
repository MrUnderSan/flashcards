import { useState } from 'react'
import { toast } from 'react-toastify'

import { Modal } from '@/components/ui/modal'
import { useCreateCardMutation } from '@/services'

import { FormCardModal } from '../formCardModal'
import { TestCreateCardModalProps } from './createCardModal.types'

export const CreateCardModal = ({ className, deckId, trigger }: TestCreateCardModalProps) => {
  const [open, setOpen] = useState(false)

  const [createCard, { isLoading }] = useCreateCardMutation()

  const createCardHandler = async (values: FormData) => {
    await createCard({ body: values, id: deckId })

    toast.success('A new cards has been created')
    setOpen(false)
  }

  return (
    <Modal onOpenChange={setOpen} open={open} title={'Add New Card'} trigger={trigger}>
      <FormCardModal
        buttonText={'Add New Card'}
        className={className}
        disabled={isLoading}
        onSubmit={createCardHandler}
        setOpen={setOpen}
      />
    </Modal>
  )
}

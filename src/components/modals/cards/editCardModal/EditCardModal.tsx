import { useState } from 'react'
import { toast } from 'react-toastify'

import { Modal } from '@/components/ui/modal'
import { useUpdateCardMutation } from '@/services'

import { FormCardModal } from '../formCardModal'
import { EditCardModalProps } from './editCardModal.types'

export const EditCardModal = ({ card, className, trigger }: EditCardModalProps) => {
  const [open, setOpen] = useState(false)
  const [updateCard, { isLoading }] = useUpdateCardMutation()
  const { id } = card
  const updateCardHandler = async (data: FormData) => {
    setOpen(false)
    await updateCard({ body: data, id })

    toast.success('Success updated cards')
  }

  return (
    <Modal onOpenChange={setOpen} open={open} title={'Edit Card'} trigger={trigger}>
      <FormCardModal
        buttonText={'Save Changes'}
        card={card}
        className={className}
        disabled={isLoading}
        onSubmit={updateCardHandler}
        setOpen={setOpen}
      />
    </Modal>
  )
}

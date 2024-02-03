import { ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

import { Card } from '@/common/types'
import { FormCardModal } from '@/components/cards/modals/formCardModal'
import { Modal } from '@/components/ui/modal'
import { useUpdateCardMutation } from '@/services'

type EditCardModalProps = {
  card: Card
  className?: string
  trigger: ReactNode
}

export const EditCardModal = ({ card, className, trigger }: EditCardModalProps) => {
  const [open, setOpen] = useState(false)
  const [updateCard, { isLoading }] = useUpdateCardMutation()
  const { id } = card
  const updateCardHandler = async (data: FormData) => {
    setOpen(false)
    await updateCard({ body: data, id })

    toast.success('Success updated card')
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

import { ReactNode } from 'react'
import { toast } from 'react-toastify'

import { DeleteModal } from '@/components/ui/modal/deleteModal'
import { Typography } from '@/components/ui/typography'
import { useDeleteCardMutation } from '@/services'

type DeleteCardModalProps = {
  className?: string
  id: string
  name: string
  trigger: ReactNode
}

export const DeleteCardModal = ({ className, id, name, trigger }: DeleteCardModalProps) => {
  const [deleteCard, { isLoading }] = useDeleteCardMutation()

  const deleteCardHandler = async () => {
    await deleteCard({ id: id })

    toast.success('Success updated card')
  }

  return (
    <DeleteModal
      additionalText={<Typography>All cards will be deleted.</Typography>}
      className={className}
      deleteItemHandler={deleteCardHandler}
      disabled={isLoading}
      name={name}
      title={'Delete card'}
      trigger={trigger}
    />
  )
}

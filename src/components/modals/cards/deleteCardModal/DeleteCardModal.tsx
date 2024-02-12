import { toast } from 'react-toastify'

import { DeleteModal } from '@/components/ui/modal/deleteModal'
import { Typography } from '@/components/ui/typography'
import { useDeleteCardMutation } from '@/services'

import { DeleteCardModalProps } from './deleteCardModal.types'

export const DeleteCardModal = ({ className, id, name, trigger }: DeleteCardModalProps) => {
  const [deleteCard, { isLoading }] = useDeleteCardMutation()

  const deleteCardHandler = async () => {
    await deleteCard({ id: id })

    toast.success('Success updated cards')
  }

  return (
    <DeleteModal
      additionalText={<Typography>All cards will be deleted.</Typography>}
      className={className}
      deleteItemHandler={deleteCardHandler}
      disabled={isLoading}
      name={name}
      title={'Delete cards'}
      trigger={trigger}
    />
  )
}

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { DeleteModal } from '@/components/ui/modal/deleteModal'
import { Typography } from '@/components/ui/typography'
import { useDeleteDeckMutation } from '@/services'

import { DeleteDeckModalProps } from './deleteDeckModal.types'

export const DeleteDeckModal = ({
  className,
  id,
  isBackOnDelete,
  name,
  trigger,
}: DeleteDeckModalProps) => {
  const navigate = useNavigate()
  const [deleteDeck, { isLoading }] = useDeleteDeckMutation()

  const deleteDeckHandler = async () => {
    const deleteDeckUnwrap = deleteDeck({ id: id }).unwrap()

    await toast.promise(deleteDeckUnwrap, {
      error: 'Failed to delete decks',
      pending: 'Delete decks...',
      success: 'DeckPage delete successfully!',
    })
    await deleteDeckUnwrap
    isBackOnDelete && navigate(-1)
  }

  return (
    <DeleteModal
      additionalText={<Typography>All cards will be deleted.</Typography>}
      className={className}
      deleteItemHandler={deleteDeckHandler}
      disabled={isLoading}
      name={name}
      title={'Delete decks'}
      trigger={trigger}
    />
  )
}

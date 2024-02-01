import { toast } from 'react-toastify'

import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { useDeleteCardMutation } from '@/services'

import s from './deleteCardModal.module.scss'

type DeleteCardModalProps = {
  cardName: string
  id: string
  onOpenChange: (open: boolean) => void
  open: boolean
}
export const DeleteCardModal = ({ cardName, id, onOpenChange, open }: DeleteCardModalProps) => {
  const [deleteCard] = useDeleteCardMutation()

  const closeHandler = () => {
    onOpenChange(false)
  }

  const deleteHandler = async () => {
    const deleteCardHandler = deleteCard({ id: id }).unwrap()

    await toast.promise(deleteCardHandler, {
      error: 'Failed to delete card',
      pending: 'Delete card...',
      success: 'Card delete successfully!',
    })
    await deleteCardHandler
    closeHandler()
  }

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={'Delete Card'}>
      <div className={s.text}>
        <Typography>Do you really want to remove {cardName}?</Typography>
        <Typography>All cards will be deleted.</Typography>
      </div>
      <div className={s.buttons}>
        <Button onClick={closeHandler} variant={'secondary'}>
          Cancel
        </Button>
        <Button onClick={deleteHandler} variant={'primary'}>
          Delete Card
        </Button>
      </div>
    </Modal>
  )
}

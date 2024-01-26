import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'
import { useDeleteDeckMutation } from '@/services'

import s from './deleteDeckModal.module.scss'

type DeleteDeckModalProps = {
  deckName: string
  id: string
  onOpenChange: (open: boolean) => void
  open: boolean
}
export const DeleteDeckModal = ({ deckName, id, onOpenChange, open }: DeleteDeckModalProps) => {
  const [deleteDeck] = useDeleteDeckMutation()

  const closeHandler = () => {
    onOpenChange(false)
  }

  const deleteHandler = () => {
    deleteDeck({ id: id })
    closeHandler()
  }

  return (
    <Modal onOpenChange={onOpenChange} open={open} title={'Delete Deck'}>
      <div className={s.text}>
        <Typography>Do you really want to remove {deckName}?</Typography>
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

import { ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

import { FormDeckModal } from '@/components/decks/modals/formDeckModal/FormDeckModal'
import { Modal } from '@/components/ui/modal'
import { useCreateDeckMutation } from '@/services'

type CreateDeckModalProps = {
  className?: string
  trigger: ReactNode
}
export const CreateDeckModal = ({ className, trigger }: CreateDeckModalProps) => {
  const [open, setOpen] = useState(false)
  const [createDeck, { isLoading }] = useCreateDeckMutation()

  const createDeckHandler = async (data: FormData) => {
    const createNewDeck = createDeck(data).unwrap()

    await toast.promise(createNewDeck, {
      error: 'Failed to create Deck',
      pending: 'Create Deck...',
      success: 'Deck create successfully!',
    })
    await createNewDeck
    setOpen(false)
  }

  return (
    <Modal onOpenChange={setOpen} open={open} title={'Add New Card'} trigger={trigger}>
      <FormDeckModal
        buttonText={'Add New Deck'}
        className={className}
        disabled={isLoading}
        onSubmit={createDeckHandler}
        setOpen={setOpen}
      />
    </Modal>
  )
}

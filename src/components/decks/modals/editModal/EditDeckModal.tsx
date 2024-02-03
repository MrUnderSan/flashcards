import { ReactNode, useState } from 'react'
import { toast } from 'react-toastify'

import { FormDeckModal } from '@/components/decks/modals/formDeckModal/FormDeckModal'
import { Modal } from '@/components/ui/modal'
import { Deck, useUpdateDeckMutation } from '@/services'

type EditDeckModalProps = {
  className?: string
  deck: Deck
  trigger: ReactNode
}

export const EditDeckModal = ({ className, deck, trigger }: EditDeckModalProps) => {
  const [open, setOpen] = useState(false)
  const [updateDeck, { isLoading }] = useUpdateDeckMutation()

  const updateDeckHandler = async (data: FormData) => {
    setOpen(false)
    const updateDeckUnwrap = updateDeck({ data, id: deck.id }).unwrap()

    await toast.promise(updateDeckUnwrap, {
      error: 'Failed to update deck',
      pending: 'updating deck...',
      success: 'deck update successfully!',
    })

    await updateDeckUnwrap
  }

  return (
    <Modal onOpenChange={setOpen} open={open} title={'Edit Deck'} trigger={trigger}>
      <FormDeckModal
        buttonText={'Save changes'}
        className={className}
        deck={deck}
        disabled={isLoading}
        onSubmit={updateDeckHandler}
        setOpen={setOpen}
      />
    </Modal>
  )
}

import { useState } from 'react'
import { toast } from 'react-toastify'

import { Modal } from '@/components/ui/modal'
import { useUpdateDeckMutation } from '@/services'

import { FormDeckModal } from '../formDeckModal'
import { EditDeckModalProps } from './editDeckModal.types'

export const EditDeckModal = ({ className, deck, trigger }: EditDeckModalProps) => {
  const [open, setOpen] = useState(false)
  const [updateDeck, { isLoading }] = useUpdateDeckMutation()

  const updateDeckHandler = async (data: FormData) => {
    setOpen(false)
    const updateDeckUnwrap = updateDeck({ data, id: deck.id }).unwrap()

    await toast.promise(updateDeckUnwrap, {
      error: 'Failed to update decks',
      pending: 'updating decks...',
      success: 'decks update successfully!',
    })

    await updateDeckUnwrap
  }

  return (
    <Modal onOpenChange={setOpen} open={open} title={'Edit DeckPage'} trigger={trigger}>
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

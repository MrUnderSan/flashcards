import { useState } from 'react'
import { toast } from 'react-toastify'

import { Modal } from '@/components/ui/modal'
import { useCreateDeckMutation } from '@/services'

import { FormDeckModal } from '../formDeckModal'
import { CreateDeckModalProps } from './createDeckModal.types'

export const CreateDeckModal = ({ className, trigger }: CreateDeckModalProps) => {
  const [open, setOpen] = useState(false)
  const [createDeck, { isLoading }] = useCreateDeckMutation()

  const createDeckHandler = async (data: FormData) => {
    const createNewDeck = createDeck(data).unwrap()

    await toast.promise(createNewDeck, {
      error: 'Failed to create DeckPage',
      pending: 'Create DeckPage...',
      success: 'DeckPage create successfully!',
    })
    await createNewDeck
    setOpen(false)
  }

  return (
    <Modal onOpenChange={setOpen} open={open} title={'Add New Card'} trigger={trigger}>
      <FormDeckModal
        buttonText={'Add New DeckPage'}
        className={className}
        disabled={isLoading}
        onSubmit={createDeckHandler}
        setOpen={setOpen}
      />
    </Modal>
  )
}

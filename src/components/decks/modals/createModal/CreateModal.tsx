import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/components/ui/formComponents/formCheckbox'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { Modal } from '@/components/ui/modal'
import { useCreateDeckMutation } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './createModals.module.scss'

type CreateModalProps = {
  onOpenChange: (open: boolean) => void
  open: boolean
}
const newDeckSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3).max(30),
})

type FormValues = z.infer<typeof newDeckSchema>

export const CreateModal = ({ onOpenChange, open }: CreateModalProps) => {
  const [createDeck] = useCreateDeckMutation()
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      isPrivate: false,
      name: '',
    },
    resolver: zodResolver(newDeckSchema),
  })
  const onSubmit = handleSubmit(data => {
    createDeck({ isPrivate: data.isPrivate, name: data.name })
    reset()
    onOpenChange(false)
  })

  const CloseHandler = () => {
    onOpenChange(open)
    reset()
  }

  return (
    <Modal onOpenChange={CloseHandler} open={open} title={'Add New Deck'}>
      <form className={s.form} onSubmit={onSubmit}>
        <FormTextField
          autoComplete={'off'}
          control={control}
          label={'Name Pack'}
          name={'name'}
          placeholder={'Name'}
        />
        <FormCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
        <div className={s.buttons}>
          <Button onClick={CloseHandler} type={'reset'} variant={'secondary'}>
            Cancel
          </Button>
          <Button type={'submit'} variant={'primary'}>
            Add New Pack
          </Button>
        </div>
      </form>
    </Modal>
  )
}

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Trash } from '@/assets'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
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

  const [img, setImg] = useState<File | null>(null)
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      isPrivate: false,
      name: '',
    },
    resolver: zodResolver(newDeckSchema),
  })
  const onSubmit = handleSubmit(data => {
    const formData = new FormData()

    formData.append('cover', img ?? '')
    formData.append('name', data.name)
    formData.append('isPrivate', data.isPrivate ? 'true' : 'false')
    createDeck(formData)
    reset()
    setImg(null)
    onOpenChange(false)
  })
  const isValidImage =
    img !== null && ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(img.type)
  const CloseHandler = () => {
    onOpenChange(open)
    reset()
    setImg(null)
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
        {isValidImage ? (
          <div className={s.imgContainer}>
            <img alt={'cover'} className={s.img} src={URL.createObjectURL(img)} />
            <div>
              <Button className={s.delete} onClick={() => setImg(null)} variant={'secondary'}>
                <Trash />
              </Button>
              <FileUploader
                setFile={setImg}
                trigger={
                  <Button as={'span'} fullWidth variant={'secondary'}>
                    cover image
                  </Button>
                }
              />
            </div>
          </div>
        ) : (
          <FileUploader
            setFile={setImg}
            trigger={
              <Button as={'span'} fullWidth variant={'secondary'}>
                Upload image
              </Button>
            }
          />
        )}
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

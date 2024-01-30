import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Trash } from '@/assets'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
import { FormCheckbox } from '@/components/ui/formComponents/formCheckbox'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { Modal } from '@/components/ui/modal'
import { useUpdateDeckMutation } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './editModal.module.scss'

type EditModalProps = {
  id: string
  img: string
  name: string
  onOpenChange: (open: boolean) => void
  open: boolean
}

const editDeckSchema = z.object({
  isPrivate: z.boolean(),
  name: z.string().min(3).max(30),
})

type FormValues = z.infer<typeof editDeckSchema>

export const EditModal = ({ id, img, name, onOpenChange, open }: EditModalProps) => {
  const [coverImg, setCoverImg] = useState<File | null>(null)
  const [currentImg, setCurrentImg] = useState(img)
  const isValidImage =
    coverImg !== null &&
    ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(coverImg.type)
  const [updateDeck] = useUpdateDeckMutation()
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      isPrivate: false,
      name: name,
    },
    resolver: zodResolver(editDeckSchema),
  })

  useEffect(() => {
    setCurrentImg(img)
    reset({ isPrivate: false, name: name })
  }, [open, reset])

  const onSubmit = handleSubmit(data => {
    const formData = new FormData()

    formData.append('cover', coverImg || img || '')
    formData.append('name', data.name)
    formData.append('isPrivate', data.isPrivate ? 'true' : 'false')
    updateDeck({ data: formData, id: id })
    reset()
    setCoverImg(null)
    onOpenChange(false)
  })

  const CloseHandler = () => {
    onOpenChange(open)
    reset()
    setCoverImg(null)
  }

  const removeImg = () => {
    setCurrentImg('')
    setCoverImg(null)
  }

  return (
    <Modal onOpenChange={CloseHandler} open={open} title={`change ${name} `}>
      <form className={s.form} onSubmit={onSubmit}>
        <FormTextField control={control} name={'name'} />
        {currentImg || isValidImage ? (
          <div className={s.imgContainer}>
            {currentImg && !isValidImage && (
              <img alt={'cover'} className={s.img} src={currentImg} />
            )}
            {isValidImage && (
              <img alt={'cover'} className={s.img} src={URL.createObjectURL(coverImg)} />
            )}
            <div>
              <Button className={s.delete} onClick={removeImg} variant={'secondary'}>
                <Trash />
              </Button>
              <FileUploader
                setFile={setCoverImg}
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
            setFile={setCoverImg}
            trigger={
              <Button as={'span'} fullWidth variant={'secondary'}>
                upload image
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
            Save changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}

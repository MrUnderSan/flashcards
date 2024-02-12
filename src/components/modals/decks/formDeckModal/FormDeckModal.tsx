import { useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { DECK_SCHEMA } from '@/common/constants'
import { UploadImage } from '@/common/types'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'

import s from './FormDeckModal.module.scss'

import { FormAddNewItem } from '../../formAddNewItem'
import { FormDeckModalProps, FormDeckModalValues } from './formDeckModal.types'

export const FormDeckModal = ({
  buttonText,
  className,
  deck,
  disabled,
  onSubmit,
  setOpen,
}: FormDeckModalProps) => {
  const [deckImg, setDeckImg] = useState<UploadImage>(deck?.cover || null)
  const formMethods = useForm<FormDeckModalValues>({
    defaultValues: { isPrivate: deck?.isPrivate || false, name: deck?.name || '' },
    resolver: zodResolver(DECK_SCHEMA),
  })

  const { handleSubmit } = formMethods

  const isStringDeckImg = typeof deckImg === 'string'

  const onSubmitHandler = (data: FormDeckModalValues) => {
    const formData = new FormData()
    const sentDeckImg = deckImg === null ? '' : deckImg

    !isStringDeckImg && formData.append('cover', sentDeckImg)
    formData.append('name', data.name)
    formData.append('isPrivate', data.isPrivate ? 'true' : 'false')
    onSubmit(formData)
  }

  const deckFileRef = useRef<HTMLInputElement>(null)
  const clearDeckImg = () => {
    setDeckImg(null)
    if (deckFileRef.current) {
      deckFileRef.current.value = ''
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmitHandler)}>
        <FormAddNewItem
          checkboxProps={{ className: s.checkbox, label: 'Private pack', name: 'isPrivate' }}
          clearImg={clearDeckImg}
          fileRef={deckFileRef}
          img={deckImg}
          isDeck
          newItemTextField={{
            label: 'Name DeckPage',
            name: 'name',
            placeholder: 'Enter a new decks name',
          }}
          setImg={setDeckImg}
        />
        <div className={s.buttons}>
          <Button onClick={() => setOpen(false)} type={'reset'} variant={'secondary'}>
            Cancel
          </Button>
          <Button disabled={disabled} type={'submit'} variant={'primary'}>
            {buttonText}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

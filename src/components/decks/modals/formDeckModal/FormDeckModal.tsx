import { ComponentPropsWithoutRef, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { DECK_SCHEMA } from '@/common/const'
import { UploadImage } from '@/common/types'
import { FormAddNewItem } from '@/components/decks/modals/formAddNewItem'
import { Button } from '@/components/ui/button'
import { Deck } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './FormDeckModal.module.scss'

type FormDeckModalProps = {
  buttonText: string
  deck?: Deck
  disabled?: boolean
  onSubmit: (data: FormData) => void
  setOpen: (open: boolean) => void
} & Omit<ComponentPropsWithoutRef<'form'>, 'onSubmit'>

export type FormDeckModalValues = z.input<typeof DECK_SCHEMA>

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
            label: 'Name Deck',
            name: 'name',
            placeholder: 'Enter a new deck name',
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

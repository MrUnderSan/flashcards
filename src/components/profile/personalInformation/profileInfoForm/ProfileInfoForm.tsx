import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './profileInfoForm.module.scss'

const ProfileInfoFormSchema = z.object({
  name: z.string().min(3).trim(),
})

export type ProfileInfoFormValues = z.infer<typeof ProfileInfoFormSchema>

type ProfileInfoFormProps = {
  className?: string
  deactivateEditMode: () => void
  initialValues?: ProfileInfoFormValues
  onSubmit: (data: FormData) => void
}
export const ProfileInfoForm = ({
  className,
  deactivateEditMode,
  initialValues,
  onSubmit,
}: ProfileInfoFormProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileInfoFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(ProfileInfoFormSchema),
  })

  const onSubmitHandler = (data: ProfileInfoFormValues) => {
    const formData = new FormData()

    formData.append('username', data.name)
    console.log('profileFORM:', data.name)
    onSubmit(formData)
    deactivateEditMode()
  }

  return (
    <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmitHandler)}>
      <FormTextField
        className={s.inputNick}
        control={control}
        errorMessage={errors.name?.message}
        label={'Nickname'}
        name={'name'}
      />
      <Button className={s.saveButton} fullWidth type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}

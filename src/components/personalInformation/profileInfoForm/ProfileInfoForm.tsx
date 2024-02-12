import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './profileInfoForm.module.scss'

import { ProfileInfoFormProps, ProfileInfoFormValues } from '../persotalInformation.types'

export const ProfileInfoFormSchema = z.object({
  name: z.string().min(3).trim(),
})

export const ProfileInfoForm = ({
  className,
  deactivateEditMode,
  initialValues,
  updateNickname,
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
    updateNickname(data)
    deactivateEditMode()
  }

  return (
    <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={s.username}>
        <FormTextField
          control={control}
          errorMessage={errors.name?.message}
          label={'Nickmame'}
          name={'name'}
        />
      </div>
      <Button fullWidth type={'submit'}>
        Save Changes
      </Button>
    </form>
  )
}

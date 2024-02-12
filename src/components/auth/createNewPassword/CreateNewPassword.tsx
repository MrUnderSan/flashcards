import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './createNewPassword.module.scss'

import {
  CreateNewPasswordProps,
  CreateNewPasswordSchema,
  CreateNewPasswordValues,
} from './createNewPassword.types'

export const CreateNewPassword = ({ onSubmit }: CreateNewPasswordProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateNewPasswordValues>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(CreateNewPasswordSchema),
  })

  const onSubmitHandler = (data: CreateNewPasswordValues) => onSubmit(data)

  return (
    <Card className={s.card}>
      <Typography as={'h1'} variant={'h1'}>
        Create new password
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={s.password}>
          <FormTextField
            control={control}
            errorMessage={errors.password?.message}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
        </div>
        <Typography className={s.instructions} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button fullWidth type={'submit'}>
          Create new password
        </Button>
      </form>
    </Card>
  )
}

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '../forgotPassword.module.scss'

const signUpSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof signUpSchema>
export const Form = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = (data: FormValues) => console.log(data)

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <FormTextField
        control={control}
        errorMessage={errors.email?.message}
        label={'email'}
        name={'email'}
      />
      <Typography as={'p'} className={s.form__description} variant={'body2'}>
        Enter your email address and we will send you further instructions{' '}
      </Typography>
      <Button fullWidth type={'submit'}>
        Send Instructions
      </Button>
    </form>
  )
}

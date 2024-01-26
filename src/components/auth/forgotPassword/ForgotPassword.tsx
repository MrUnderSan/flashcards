import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/const'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

const signUpSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof signUpSchema>

type Props = {
  recoverPassword: (email: string) => void
}

export const ForgotPassword = ({ recoverPassword }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const handleRecoverPassword = (data: FormValues) => {
    recoverPassword(data.email)
    reset()
  }

  return (
    <Card>
      <Typography as={'h2'} variant={'large'}>
        Forgot your password?
      </Typography>
      <form className={s.form} onSubmit={handleSubmit(handleRecoverPassword)}>
        <FormTextField
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
        />
        <Typography as={'p'} className={s.form__description} variant={'body2'}>
          Enter your email address and we will send you further instructions{' '}
        </Typography>
        <Button fullWidth type={'submit'}>
          Send Instructions
        </Button>
      </form>
      <div className={s.bottom}>
        <Typography as={'p'} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Button as={Link} className={s.logIn} to={ROUTES.signIn} variant={'link'}>
          Try logging in
        </Button>
      </div>
    </Card>
  )
}

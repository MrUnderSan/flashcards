import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/enums'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FormCheckbox } from '@/components/ui/formComponents/formCheckbox'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './signIn.module.scss'

import { SignInFormValues, SignInProps, loginSchema } from './signIn.types'

export const SignIn = ({ onSubmit }: SignInProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })

  return (
    <Card className={s.card}>
      <Typography variant={'large'}>Sign In</Typography>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.email}>
          <FormTextField
            control={control}
            errorMessage={errors.email?.message}
            label={'Email'}
            name={'email'}
          />
        </div>
        <div className={s.password}>
          <FormTextField
            control={control}
            errorMessage={errors.password?.message}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
        </div>

        <FormCheckbox
          className={s.checkbox}
          control={control}
          label={'Remember me'}
          name={'rememberMe'}
        />
        <Typography
          as={Link}
          className={s.recoverPassword}
          to={ROUTES.RECOVER_PASSWORD}
          variant={'body2'}
        >
          Forgot Password?
        </Typography>
        <Button className={s.submit} fullWidth type={'submit'}>
          Sign In
        </Button>
      </form>
      <Typography className={s.description} variant={'body2'}>
        Don&apos;t have an account?
      </Typography>
      <Button as={Link} className={s.signUp} to={ROUTES.SIGN_UP} variant={'link'}>
        Sign Up
      </Button>
    </Card>
  )
}

import { useForm } from 'react-hook-form'

import {
  FormSignUpFormValues,
  FormSignUpProps,
  signUpSchema,
} from '@/components/auth/signUp/form/formSignUp.types'
import { Button } from '@/components/ui/button'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { zodResolver } from '@hookform/resolvers/zod'

import s from '@/components/auth/signUp/signUp.module.scss'
export const FormSignUp = ({ onSubmit }: FormSignUpProps) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSignUpFormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.form__inner}>
        <FormTextField
          control={control}
          errorMessage={errors.email?.message}
          label={'Name'}
          name={'name'}
        />
        <FormTextField
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
        />
        <FormTextField
          control={control}
          errorMessage={errors.password?.message}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <FormTextField
          control={control}
          errorMessage={errors.confirmPassword?.message}
          label={'Confirm Password'}
          name={'confirmPassword'}
          type={'password'}
        />
      </div>
      <Button as={'button'} fullWidth type={'submit'}>
        Sign Up
      </Button>
    </form>
  )
}

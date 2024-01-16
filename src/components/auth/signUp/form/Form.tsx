import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormTextField } from '@/components/ui/formComponents/formTextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from '@/components/auth/signUp/signUp.module.scss'

const signUpSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(30),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof signUpSchema>
export const Form = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = (data: FormValues) => console.log(data)

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.form__inner}>
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
        />
      </div>
      <Button as={'button'} fullWidth type={'submit'}>
        Sign Up
      </Button>
    </form>
  )
}

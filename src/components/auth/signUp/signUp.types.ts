import { FormSignUpFormValues } from '@/components/auth/signUp/form/formSignUp.types'

export type SignUpProps = {
  onSubmit: (data: FormSignUpFormValues) => void
}

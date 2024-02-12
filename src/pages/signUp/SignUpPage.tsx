import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/common/enums'
import { SignUp as SignUpCard } from '@/components/auth/signUp'
import { Page } from '@/components/ui/page'
import { SignUpArgs, useSignUpMutation } from '@/services'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()
  const handleSignUp = async (data: SignUpArgs) => {
    const { email, name, password } = data

    try {
      await signUp({ email, name, password }).unwrap()
      navigate(ROUTES.BASE)
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Could not sign up')
    }
  }

  return (
    <Page>
      <SignUpCard onSubmit={handleSignUp} />
    </Page>
  )
}

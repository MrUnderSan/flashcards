import { toast } from 'react-toastify'

import { SignIn as SignInCard } from '@/components/auth/signIn'
import { Page } from '@/components/page'
import { LoginArgs, useLoginMutation } from '@/services'

export const SignIn = () => {
  const [login] = useLoginMutation()
  const handleSignIn = async (data: LoginArgs) => {
    try {
      await login(data).unwrap()
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Could not sign in')
    }
  }

  return (
    <Page>
      <SignInCard onSubmit={handleSignIn} />
    </Page>
  )
}

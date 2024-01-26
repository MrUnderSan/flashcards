import { toast } from 'react-toastify'

import { ForgotPassword } from '@/components/auth/forgotPassword'
import { Page } from '@/components/page'
import { useRecoverPasswordMutation } from '@/services'

import s from './recoverPassword.module.scss'

export const RecoverPassword = () => {
  const [recoverPassword] = useRecoverPasswordMutation()

  const handleRecoverPassword = async (email: string) => {
    try {
      await recoverPassword({ email }).unwrap()
      toast.info('Password recovery email sent successfully')
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Uncaught Error')
    }
  }

  return (
    <Page className={s.page}>
      <ForgotPassword recoverPassword={handleRecoverPassword} />
    </Page>
  )
}

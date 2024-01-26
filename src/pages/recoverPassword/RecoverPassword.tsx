import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/common/const'
import { ForgotPassword } from '@/components/auth/forgotPassword'
import { Page } from '@/components/page'
import { useRecoverPasswordMutation } from '@/services'

import s from './recoverPassword.module.scss'

export const RecoverPassword = () => {
  const [recoverPassword] = useRecoverPasswordMutation()

  const navigate = useNavigate()

  const handleRecoverPassword = async (email: string) => {
    try {
      await recoverPassword({ email }).unwrap()
      navigate(ROUTES.checkEmail, { state: { email } })
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

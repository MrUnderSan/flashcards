import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { PASSWORD_RESET_EMAIL_TEMPLATE } from '@/common/constants'
import { ROUTES } from '@/common/enums'
import { ForgotPassword } from '@/components/auth/forgotPassword'
import { Page } from '@/components/ui/page'
import { useRecoverPasswordMutation } from '@/services'

import s from './recoverPasswordPage.module.scss'

export const RecoverPasswordPage = () => {
  const [recoverPassword] = useRecoverPasswordMutation()

  const navigate = useNavigate()

  const recoverPasswordHandler = async (email: string) => {
    try {
      navigate(ROUTES.CHECK_EMAIL, { state: { email } })
      const recoverPasswordResult = recoverPassword({
        email,
        html: PASSWORD_RESET_EMAIL_TEMPLATE,
      }).unwrap()

      await toast.promise(recoverPasswordResult, {
        pending: 'Sending email...',
        success: 'Email sent successfully!',
      })
      await recoverPasswordResult
    } catch (error: any) {
      toast.error(error?.data?.message ?? 'Error sending email. Please try again.')
    }
  }

  return (
    <Page className={s.page}>
      <ForgotPassword recoverPassword={recoverPasswordHandler} />
    </Page>
  )
}

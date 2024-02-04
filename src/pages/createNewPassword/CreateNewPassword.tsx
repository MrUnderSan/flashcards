import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/common/const'
import {
  CreateNewPassword as CreateNewPasswordComponent,
  CreateNewPasswordValues,
} from '@/components/auth/createNewPassword'
import { useResetPasswordMutation } from '@/services'
export const CreateNewPassword = () => {
  const navigate = useNavigate()
  const { token } = useParams()
  const [resetPassword] = useResetPasswordMutation()
  const onSubmit = async ({ password }: CreateNewPasswordValues) => {
    if (token) {
      const resetPasswordResult = resetPassword({ password, token }).unwrap()

      await toast.promise(resetPasswordResult, {
        error: 'Error creating a new password. Please try again.',
        pending: 'Creating a new password...',
        success: 'Password created successfully!',
      })
      await resetPasswordResult
      navigate(ROUTES.signIn)
    }
  }

  return <CreateNewPasswordComponent onSubmit={onSubmit}></CreateNewPasswordComponent>
}

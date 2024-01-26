import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/common/const'
import { Page } from '@/components/page'
import { PersonalInformation } from '@/components/personalInformation'
import { AvatarUploaderValue } from '@/components/personalInformation/avatarUploader'
import { ProfileInfoFormValues } from '@/components/personalInformation/profileInfoForm'
import { useGetMeQuery, useLogoutMutation, useUpdateProfileMutation } from '@/services'

export const Profile = () => {
  const { data } = useGetMeQuery()
  const [updateProfile] = useUpdateProfileMutation()
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const updateAvatar = async (avatar: AvatarUploaderValue) => {
    const formData = new FormData()

    formData.append('avatar', avatar)
    await updateProfile(formData).unwrap()

    toast.success('Your avatar successfully changed')
  }

  const updateNickname = async (data: ProfileInfoFormValues) => {
    const formData = new FormData()

    formData.append('name', data.name)
    await updateProfile(formData).unwrap()
    toast.success('Your nickname successfully changed')
  }

  const logoutHandler = async () => {
    await logout()
      .unwrap()
      .then(() => navigate(ROUTES.signIn))
    toast.success(
      'You have successfully logged out of your account. Thank you for using our application'
    )
  }

  return (
    <Page>
      <PersonalInformation
        data={data}
        logout={logoutHandler}
        updateAvatar={updateAvatar}
        updateNickname={updateNickname}
      />
    </Page>
  )
}

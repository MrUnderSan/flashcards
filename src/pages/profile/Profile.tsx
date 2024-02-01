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
    const updateProfilePromise = updateProfile(formData).unwrap()

    await toast.promise(updateProfilePromise, {
      error: 'Failed to update avatar',
      pending: 'Updating avatar...',
      success: 'Avatar updated successfully!',
    })

    await updateProfilePromise
  }

  const updateNickname = async (data: ProfileInfoFormValues) => {
    const formData = new FormData()

    formData.append('name', data.name)
    const updateProfilePromise = updateProfile(formData).unwrap()

    await toast.promise(updateProfilePromise, {
      error: 'Failed to update nickname',
      pending: 'Updating nickname...',
      success: 'Nickname updated successfully!',
    })

    await updateProfilePromise
  }

  const logoutHandler = async () => {
    await logout()
      .unwrap()
      .then(() => navigate(ROUTES.signIn))
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

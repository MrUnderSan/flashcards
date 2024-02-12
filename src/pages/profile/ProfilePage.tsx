import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ROUTES } from '@/common/enums'
import { PersonalInformation } from '@/components/personalInformation'
import { AvatarUploaderValue } from '@/components/personalInformation/avatarUploader'
import { ProfileInfoFormValues } from '@/components/personalInformation/profileInfoForm'
import { BackButton } from '@/components/ui/backButton'
import { Loader } from '@/components/ui/loader'
import { Page } from '@/components/ui/page'
import { useGetMeQuery, useLogoutMutation, useUpdateProfileMutation } from '@/services'

export const ProfilePage = () => {
  const { data, isFetching: isFetchingMe, isLoading: isLoadingMe } = useGetMeQuery()
  const [updateProfile] = useUpdateProfileMutation()
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const updateAvatar = async (avatar: AvatarUploaderValue) => {
    const formData = new FormData()

    formData.append('avatar', avatar)
    const updateProfilePromise = updateProfile(formData).unwrap()

    await toast.promise(updateProfilePromise, {
      error: 'Failed to update avatar',
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
      .then(() => navigate(ROUTES.SIGN_IN))
  }

  return (
    <>
      {isFetchingMe && <Loader />}
      <Page marginTop={'24px'}>
        <BackButton text={'Back to DecksPage List'} />
        <PersonalInformation
          data={data}
          isLoading={isLoadingMe}
          logout={logoutHandler}
          updateAvatar={updateAvatar}
          updateNickname={updateNickname}
        />
      </Page>
    </>
  )
}

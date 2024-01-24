import { useState } from 'react'

import { ProfileData } from '@/common/types'
import {
  AvatarUploader,
  AvatarUploaderValue,
} from '@/components/profile/personalInformation/avatarUploader/AvatarUploader'
import { ProfileInfo } from '@/components/profile/personalInformation/profileInfo/ProfileInfo'
import {
  ProfileInfoForm,
  ProfileInfoFormValues,
} from '@/components/profile/personalInformation/profileInfoForm/ProfileInfoForm'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './personalInformation.module.scss'

type PersonalInformationProps = {
  className?: string
  data?: ProfileData
  logout: () => void
  updateAvatar: (avatar: AvatarUploaderValue) => void
  updateNickname: (data: ProfileInfoFormValues) => void
}

export const PersonalInformation = ({
  className,
  data,
  logout,
  updateAvatar,
  updateNickname,
}: PersonalInformationProps) => {
  const [editMode, setEditMode] = useState(false)
  const activeEditModeHandler = () => setEditMode(true)

  const deactivateEditModeHandler = () => setEditMode(false)

  return (
    <Card className={clsx(s.root, className)}>
      <Typography as={'h1'} className={s.title} variant={'large'}>
        Personal Information
      </Typography>
      <AvatarUploader
        avatarUrl={data?.avatar}
        editable={!editMode}
        name={data?.name}
        updateAvatar={updateAvatar}
      />
      {editMode ? (
        <ProfileInfoForm
          deactivateEditMode={deactivateEditModeHandler}
          initialValues={{ name: data?.name ? data?.name : '' }}
          updateNickname={updateNickname}
        />
      ) : (
        <ProfileInfo
          activeEditMode={activeEditModeHandler}
          email={data?.email}
          logout={logout}
          username={data?.name}
        />
      )}
    </Card>
  )
}

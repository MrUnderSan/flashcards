import { useState } from 'react'

import { AvatarUploader } from '@/components/profile/personalInformation/avatarUploader/AvatarUploader'
import { ProfileInfo } from '@/components/profile/personalInformation/profileInfo/ProfileInfo'
import { ProfileInfoForm } from '@/components/profile/personalInformation/profileInfoForm/ProfileInfoForm'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './personalInformation.module.scss'

type ProfileData = {
  avatar?: string
  email: string
  username: string
}

type PersonalInformationProps = {
  className?: string
  data: ProfileData
  logout: () => void
  updateProfile: (data: FormData) => void
}

export const PersonalInformation = ({ className, data, logout }: PersonalInformationProps) => {
  const [editMode, setEditMode] = useState(false)
  const activeEditModeHandler = () => setEditMode(true)

  const deactivateEditModeHandler = () => setEditMode(false)

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const logoutHandler = () => {
    logout()
  }

  return (
    <Card className={clsx(s.root, className)}>
      <Typography as={'h1'} className={s.title} variant={'large'}>
        Personal Information
      </Typography>
      <AvatarUploader
        avatarUrl={data.avatar}
        editable={!editMode}
        name={data.username}
        onSubmit={onSubmit}
      />
      {editMode ? (
        <ProfileInfoForm
          deactivateEditMode={deactivateEditModeHandler}
          initialValues={{ name: data.username }}
          onSubmit={onSubmit}
        />
      ) : (
        <ProfileInfo
          activeEditMode={activeEditModeHandler}
          email={data.email}
          logout={logoutHandler}
          username={data.username}
        />
      )}
    </Card>
  )
}

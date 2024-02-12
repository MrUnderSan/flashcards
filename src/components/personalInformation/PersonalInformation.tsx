import { useState } from 'react'

import { AvatarUploader } from '@/components/personalInformation/avatarUploader/AvatarUploader'
import { ProfileInfo } from '@/components/personalInformation/profileInfo/ProfileInfo'
import { ProfileInfoForm } from '@/components/personalInformation/profileInfoForm/ProfileInfoForm'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './personalInformation.module.scss'

import { PersonalInformationProps } from './persotalInformation.types'

export const PersonalInformation = ({
  className,
  data,
  isLoading,
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
        isLoading={isLoading}
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
          isLoading={isLoading}
          logout={logout}
          username={data?.name}
        />
      )}
    </Card>
  )
}

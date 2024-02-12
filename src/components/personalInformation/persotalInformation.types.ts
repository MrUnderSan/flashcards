import { IMAGE_SCHEMA } from '@/common/constants'
import { ProfileData } from '@/common/types'
import { ProfileInfoFormSchema } from '@/components/personalInformation/profileInfoForm'
import { z } from 'zod'

export type PersonalInformationProps = {
  className?: string
  data?: ProfileData
  isLoading?: boolean
  logout: () => void
  updateAvatar: (avatar: AvatarUploaderValue) => Promise<void>
  updateNickname: (data: ProfileInfoFormValues) => void
}

export type ProfileInfoFormValues = z.infer<typeof ProfileInfoFormSchema>

export type ProfileInfoFormProps = {
  className?: string
  deactivateEditMode: () => void
  initialValues?: ProfileInfoFormValues
  updateNickname: (data: ProfileInfoFormValues) => void
}

export type ProfileInfoProps = {
  activeEditMode: () => void
  email?: string
  isLoading?: boolean
  logout: () => void
  username?: string
}

export type AvatarUploaderValue = z.infer<typeof IMAGE_SCHEMA>

export type AvatarUploaderProps = {
  avatarUrl?: string
  className?: string
  editable?: boolean
  isLoading?: boolean
  updateAvatar: (avatar: AvatarUploaderValue) => Promise<void>
}

import { ProfileData } from '@/common/types'

export type HeaderProps = {
  isAuth: boolean
  logout: () => void
  profile?: ProfileData
}

export type HeaderDropDownProps = {
  logout: () => void
  profile: ProfileData
}

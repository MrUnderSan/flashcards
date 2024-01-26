import { Edit, LogOut } from '@/assets'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

import s from './profileInfo.module.scss'

type ProfileInfoProps = {
  activeEditMode: () => void
  email?: string
  logout: () => void
  username?: string
}

export const ProfileInfo = ({ activeEditMode, email, logout, username = '' }: ProfileInfoProps) => {
  return (
    <>
      <div className={s.nameWithEditButton}>
        <Typography className={s.name} variant={'h1'}>
          {username}
        </Typography>
        <button className={s.editNameButton} onClick={activeEditMode}>
          <Edit />
        </button>
      </div>
      <Typography as={'span'} className={s.email} variant={'body2'}>
        {email}
      </Typography>
      <div className={s.buttonContainer}>
        <Button onClick={logout} variant={'secondary'}>
          <LogOut />
          Sign Out
        </Button>
      </div>
    </>
  )
}

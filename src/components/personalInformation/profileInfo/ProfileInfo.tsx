import { Edit, LogOut } from '@/assets'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Typography } from '@/components/ui/typography'

import s from './profileInfo.module.scss'

import { ProfileInfoProps } from '../persotalInformation.types'

export const ProfileInfo = ({
  activeEditMode,
  email,
  isLoading,
  logout,
  username = '',
}: ProfileInfoProps) => {
  return (
    <>
      <div className={s.nameWithEditButton}>
        {isLoading ? (
          <Skeleton height={'30px'} width={'130px'} />
        ) : (
          <Typography className={s.name} variant={'h1'}>
            {username}
          </Typography>
        )}
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

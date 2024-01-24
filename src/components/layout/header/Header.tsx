import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from '@/assets'
import { ROUTES } from '@/common/const'
import { ProfileData } from '@/common/types'
import { Button } from '@/components/ui/button'

import s from './header.module.scss'

import { HeaderDropDown } from './headerDropDown'

export type HeaderProps = {
  isAuth: boolean
  logout: () => void
  profile?: ProfileData
}

export const Header = memo(({ isAuth, logout, profile }: HeaderProps) => {
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <Link className={s.headerLink} to={ROUTES.base}>
          <Logo className={s.headerLogo} />
        </Link>
        {isAuth && profile ? (
          <HeaderDropDown logout={logout} profile={profile} />
        ) : (
          <Button as={Link} to={ROUTES.signIn}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
})

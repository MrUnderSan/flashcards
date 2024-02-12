import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from '@/assets'
import { ROUTES } from '@/common/enums'
import { Button } from '@/components/ui/button'

import s from './header.module.scss'

import { HeaderProps } from './header.types'
import { HeaderDropDown } from './headerDropDown'

export const Header = memo(({ isAuth, logout, profile }: HeaderProps) => {
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <Link className={s.headerLink} to={ROUTES.BASE}>
          <Logo className={s.headerLogo} />
        </Link>
        {isAuth && profile ? (
          <HeaderDropDown logout={logout} profile={profile} />
        ) : (
          <Button as={Link} to={ROUTES.SIGN_IN}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
})

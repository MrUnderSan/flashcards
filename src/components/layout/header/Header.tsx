import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from '@/assets'
import { ROUTES } from '@/common/const'
import { Button } from '@/components/ui/button'

import s from './header.module.scss'

import { HeaderDropDown, HeaderDropDownProps } from './headerDropDown'

export type HeaderProps =
  | {
      isLoggedIn: false
      profile?: HeaderDropDownProps
    }
  | {
      isLoggedIn: true
      profile: HeaderDropDownProps
    }

export const Header = memo(({ isLoggedIn, profile }: HeaderProps) => {
  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <Link className={s.headerLink} to={ROUTES.base}>
          <Logo className={s.headerLogo} />
        </Link>
        {isLoggedIn ? (
          <HeaderDropDown {...profile} />
        ) : (
          <Button as={Link} to={ROUTES.signIn}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
})

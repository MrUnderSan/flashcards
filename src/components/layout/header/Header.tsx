import { memo } from 'react'

import { Logo } from '@/assets'
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
      <div className={s.headerContent}>
        <a className={s.headerLink} href={'/'}>
          <Logo className={s.headerLogo} />
        </a>
        {isLoggedIn ? (
          <HeaderDropDown {...profile} />
        ) : (
          <Button as={'a'} href={'/sign-in'}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
})

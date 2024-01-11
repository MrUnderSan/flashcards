import { ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

import { DropDownItem } from './dropDownItem'

export type DropDownMenuItem = {
  icon?: ReactNode
  name?: string
}

export type DropDownMenuProfile = {
  email?: string
  img?: string
  name?: string
}

type DropDownMenuProps = {
  children: ReactNode
  defaultOpen?: boolean
  items: DropDownMenuItem[]
  modal?: boolean
  profile?: DropDownMenuProfile
}

export const DropDownMenu = ({
  children,
  defaultOpen = false,
  items,
  modal = false,
  profile,
}: DropDownMenuProps) => {
  return (
    <DropdownMenu.Root defaultOpen={defaultOpen} modal={modal}>
      <DropdownMenu.Trigger asChild className={s.dropDownMenuTrigger}>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.dropDownMenuContent} sideOffset={12}>
          {profile && (
            <>
              <DropDownItem className={s.dropDownMenuProfile}>
                <img alt={'photo'} className={s.dropDownMenuProfileImg} src={profile.img} />
                <div className={s.dropDownMenuProfileInfo}>
                  <Typography className={s.dropDownMenuProfileInfoName} variant={'subtitle2'}>
                    {profile.name}
                  </Typography>
                  <Typography className={s.dropDownMenuProfileInfoEmail} variant={'caption'}>
                    {profile.email}
                  </Typography>
                </div>
              </DropDownItem>
              <DropdownMenu.Separator className={s.dropDownMenuSeparator} />
            </>
          )}

          {items.map((item, index) => (
            <>
              {index !== 0 && <DropdownMenu.Separator className={s.dropDownMenuSeparator} />}

              <DropDownItem>
                <div className={s.dropDownMenuItemIcon}>{item.icon}</div>
                <Typography variant={'caption'}>{item.name}</Typography>
              </DropDownItem>
            </>
          ))}

          <DropdownMenu.Arrow asChild className={s.dropDownMenuArrow}>
            <div className={s.dropDownMenuArrowDiv}></div>
          </DropdownMenu.Arrow>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

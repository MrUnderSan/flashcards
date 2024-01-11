import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

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
              <DropdownMenu.Item className={s.dropDownMenuProfile}>
                <img alt={'photo'} className={s.dropDownMenuProfileImg} src={profile.img} />
                <div className={s.dropDownMenuProfileInfo}>
                  <div className={s.dropDownMenuProfileInfoName}>{profile.name}</div>
                  <div className={s.dropDownMenuProfileInfoEmail}>{profile.email}</div>
                </div>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className={s.dropDownMenuSeparator} />
            </>
          )}

          {items.map((item, index) => (
            <>
              {index !== 0 && <DropdownMenu.Separator className={s.dropDownMenuSeparator} />}
              <DropdownMenu.Item className={s.dropDownMenuItem}>
                <div className={s.dropDownMenuItemIcon}>{item.icon}</div>
                {item.name}
              </DropdownMenu.Item>
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

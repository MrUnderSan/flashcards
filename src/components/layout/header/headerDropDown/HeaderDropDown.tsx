import { LogOut, Person } from '@/assets'
import {
  DropDownBasicItemContent,
  DropDownItem,
  DropDownItemProps,
  DropDownMenu,
  DropDownSeparator,
} from '@/components/ui/dropDownMenu'
import { Typography } from '@/components/ui/typography'

import s from './headerDropDown.module.scss'

export type HeaderDropDownProps = {
  avatar: null | string
  email: string
  onLogout: DropDownItemProps['onSelect']
  userName: string
}

export const HeaderDropDown = ({ avatar, email, onLogout, userName }: HeaderDropDownProps) => {
  if (!avatar) {
    avatar = `https://ui-avatars.com/api/?name=${userName.split(' ').join('+')}`
  }

  const trigger = (
    <button className={s.trigger}>
      <Typography className={s.triggerName} variant={'subtitle1'}>
        {userName}
      </Typography>
      <img alt={'photo'} className={s.triggerImg} src={avatar} />
    </button>
  )

  return (
    <DropDownMenu trigger={trigger}>
      <DropDownItem className={s.profile}>
        <img alt={'photo'} className={s.profileImg} src={avatar} />
        <div className={s.profileInfo}>
          <Typography className={s.profileInfoName} variant={'subtitle2'}>
            {userName}
          </Typography>
          <Typography className={s.profileInfoEmail} variant={'caption'}>
            {email}
          </Typography>
        </div>
      </DropDownItem>{' '}
      <DropDownSeparator />
      <DropDownItem asChild>
        <a href={'/profile'}>
          <DropDownBasicItemContent icon={<Person />} name={'My Profile'} />
        </a>
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem onSelect={onLogout}>
        <DropDownBasicItemContent icon={<LogOut />} name={'Sign Out'} />
      </DropDownItem>
    </DropDownMenu>
  )
}

import { Link } from 'react-router-dom'

import { LogOut, Person } from '@/assets'
import { ROUTES } from '@/common/enums'
import {
  DropDownBasicItemContent,
  DropDownItem,
  DropDownMenu,
  DropDownSeparator,
} from '@/components/ui/dropDownMenu'
import { Typography } from '@/components/ui/typography'

import s from './headerDropDown.module.scss'

import { HeaderDropDownProps } from '../header.types'

export const HeaderDropDown = ({
  logout,
  profile: { avatar, email, name },
}: HeaderDropDownProps) => {
  if (!avatar) {
    avatar = `https://ui-avatars.com/api/?name=${name.split(' ').join('+')}`
  }

  const trigger = (
    <button className={s.trigger}>
      <Typography className={s.triggerName} variant={'subtitle1'}>
        {name}
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
            {name}
          </Typography>
          <Typography className={s.profileInfoEmail} variant={'caption'}>
            {email}
          </Typography>
        </div>
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem asChild>
        <Link to={ROUTES.PROFILE}>
          <DropDownBasicItemContent icon={<Person />} name={'My ProfilePage'} />
        </Link>
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem onSelect={logout}>
        <DropDownBasicItemContent icon={<LogOut />} name={'Sign Out'} />
      </DropDownItem>
    </DropDownMenu>
  )
}

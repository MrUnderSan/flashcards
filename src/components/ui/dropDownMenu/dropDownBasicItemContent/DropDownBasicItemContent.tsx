import { Typography } from '@/components/ui/typography'

import s from './dropDownBasicItemContent.module.scss'

import { DropDownBasicItemContentProps } from '../dropDownMenu.types'

export const DropDownBasicItemContent = ({ icon, name }: DropDownBasicItemContentProps) => {
  return (
    <>
      <div className={s.icon}>{icon}</div>
      <Typography variant={'caption'}>{name}</Typography>
    </>
  )
}

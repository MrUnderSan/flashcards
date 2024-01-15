import { ReactNode } from 'react'

import { Typography } from '@/components/ui/typography'

import s from './dropDownBasicItemContent.module.scss'

export type DropDownBasicItemContentProps = {
  icon: ReactNode
  name: string
}

export const DropDownBasicItemContent = ({ icon, name }: DropDownBasicItemContentProps) => {
  return (
    <>
      <div className={s.icon}>{icon}</div>
      <Typography variant={'caption'}>{name}</Typography>
    </>
  )
}

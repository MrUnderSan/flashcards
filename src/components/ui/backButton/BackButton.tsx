import { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ArrowBack } from '@/assets'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './backButton.module.scss'

export type BackButtonProps = {
  className?: string
  text?: string
}

export const BackButton = ({
  className,
  text = 'Back to Previous Page',
  ...rest
}: BackButtonProps) => {
  const navigate = useNavigate()

  const backHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate(-1)
  }

  const classNames = clsx(s.button, className)

  return (
    <Button
      as={Link}
      className={classNames}
      onClick={backHandler}
      relative={'path'}
      to={'..'}
      variant={'link'}
      {...rest}
    >
      <ArrowBack className={s.icon} />
      <Typography variant={'body2'}>{text}</Typography>
    </Button>
  )
}

import { MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ArrowBack } from '@/assets'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'

import s from './backButton.module.scss'

export type BackButtonProps = {
  className?: string
  pathToBack?: string
  text?: string
}

export const BackButton = ({
  className,
  pathToBack,
  text = 'Back to Previous Page',
  ...rest
}: BackButtonProps) => {
  const navigate = useNavigate()

  const backHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    pathToBack ? navigate(pathToBack) : navigate(-1)
  }

  const classNames = clsx(s.button, className)

  return (
    <Button
      as={Link}
      className={classNames}
      onClick={backHandler}
      relative={'path'}
      to={'..'}
      variant={'icon'}
      {...rest}
    >
      <ArrowBack className={s.icon} />
      {text}
    </Button>
  )
}

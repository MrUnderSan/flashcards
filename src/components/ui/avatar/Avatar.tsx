import { ElementRef, forwardRef } from 'react'

import { Fallback, Image, Root } from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './avatar.module.scss'

import { AvatarProps } from './avatar.types'

export const Avatar = forwardRef<ElementRef<typeof Root>, AvatarProps>(
  ({ className, size = 'large', src, title, ...rest }, ref) => {
    return (
      <Root className={clsx(s.root, s[size], className)} ref={ref} {...rest}>
        <Image alt={'avatar'} className={s.image} src={src} />
        <Fallback className={s.fallback}>{title}</Fallback>
      </Root>
    )
  }
)

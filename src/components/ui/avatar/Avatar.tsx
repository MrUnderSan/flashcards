import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixAvatar from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './avatar.module.scss'

type Props = {
  size?: 'large' | 'small'
  src?: string
  title?: string
} & ComponentPropsWithoutRef<typeof RadixAvatar.Root>

export const Avatar = forwardRef<ElementRef<typeof RadixAvatar.Root>, Props>(
  ({ className, size = 'large', src, title, ...rest }, ref) => {
    return (
      <RadixAvatar.Root className={clsx(s.root, s[size], className)} ref={ref} {...rest}>
        <RadixAvatar.Image alt={'avatar'} className={s.image} src={src} />
        <RadixAvatar.Fallback className={s.fallback}>{title}</RadixAvatar.Fallback>
      </RadixAvatar.Root>
    )
  }
)

import { ComponentPropsWithoutRef } from 'react'

import * as RadixAvatar from '@radix-ui/react-avatar'

export type AvatarProps = {
  size?: 'large' | 'small'
  src?: string
  title?: string
} & ComponentPropsWithoutRef<typeof RadixAvatar.Root>

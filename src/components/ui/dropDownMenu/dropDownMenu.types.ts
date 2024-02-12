import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export type DropDownMenuProps = {
  children: ReactNode
  defaultOpen?: boolean
  modal?: boolean
  trigger: ReactNode
}

export type DropDownBasicItemContentProps = {
  icon: ReactNode
  name: string
}

export type DropDownItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>

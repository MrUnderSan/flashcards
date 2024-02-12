import { ComponentPropsWithoutRef } from 'react'

import { Root } from '@radix-ui/react-tabs'

export type TabType = {
  disabled?: boolean
  title: string
  value: string
}

export type TabsProps = {
  tabs: TabType[]
} & ComponentPropsWithoutRef<typeof Root>

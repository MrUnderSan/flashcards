import { ComponentPropsWithoutRef } from 'react'

import * as Tabs from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'

export type TabType = {
  disabled?: boolean
  title: string
  value: string
}

type TabsProps = {
  tabs: TabType[]
} & ComponentPropsWithoutRef<typeof Tabs.Root>

export const TabSwitcher = ({ defaultValue, onValueChange, tabs, ...rest }: TabsProps) => {
  return (
    <Tabs.Root
      className={s.root}
      defaultValue={defaultValue ? defaultValue : tabs[0].value}
      onValueChange={onValueChange}
      {...rest}
    >
      <Tabs.List className={s.list}>
        {tabs.map(tab => (
          <Tabs.Trigger
            className={s.trigger}
            disabled={tab.disabled}
            key={tab.value}
            value={tab.value}
          >
            {tab.title}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}

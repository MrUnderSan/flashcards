import { List, Root, Trigger } from '@radix-ui/react-tabs'
import { clsx } from 'clsx'

import s from './tabSwitcher.module.scss'

import { TabsProps } from './tabSwitcher.types'

export const TabSwitcher = ({ className, defaultValue, tabs, ...rest }: TabsProps) => {
  return (
    <Root
      className={clsx(s.root, className)}
      defaultValue={defaultValue ?? tabs[0].value}
      {...rest}
    >
      <List className={s.list}>
        {tabs.map(tab => (
          <Trigger className={s.trigger} disabled={tab.disabled} key={tab.value} value={tab.value}>
            {tab.title}
          </Trigger>
        ))}
      </List>
    </Root>
  )
}

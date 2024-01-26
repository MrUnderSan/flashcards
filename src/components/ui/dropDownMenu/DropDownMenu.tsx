import { ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

export type DropDownMenuProps = {
  children: ReactNode
  defaultOpen?: boolean
  modal?: boolean
  trigger: ReactNode
}

export const DropDownMenu = ({
  children,
  defaultOpen = false,
  modal = false,
  trigger,
}: DropDownMenuProps) => {
  return (
    <DropdownMenu.Root defaultOpen={defaultOpen} modal={modal}>
      <DropdownMenu.Trigger asChild className={s.dropDownMenuTrigger}>
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.dropDownMenuContent} sideOffset={12}>
          {children}
          <DropdownMenu.Arrow asChild className={s.dropDownMenuArrow}>
            <div className={s.dropDownMenuArrowDiv}></div>
          </DropdownMenu.Arrow>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

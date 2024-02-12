import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

import { DropDownMenuProps } from './dropDownMenu.types'

const { Arrow, Content, Portal, Root, Trigger } = DropdownMenu

export const DropDownMenu = ({
  children,
  defaultOpen = false,
  modal = false,
  trigger,
}: DropDownMenuProps) => {
  return (
    <Root defaultOpen={defaultOpen} modal={modal}>
      <Trigger asChild className={s.dropDownMenuTrigger}>
        {trigger}
      </Trigger>

      <Portal>
        <Content className={s.dropDownMenuContent} sideOffset={9}>
          {children}
          <Arrow asChild className={s.dropDownMenuArrow}>
            <div className={s.dropDownMenuArrowDiv}></div>
          </Arrow>
        </Content>
      </Portal>
    </Root>
  )
}

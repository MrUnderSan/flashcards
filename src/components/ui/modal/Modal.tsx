import { ElementRef, forwardRef } from 'react'

import { Close as CloseIcon } from '@/assets'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { Close, Content, Overlay, Portal, Root, Trigger } from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from './modal.module.scss'

import { ModalProps } from './modal.types'

export const Modal = forwardRef<ElementRef<typeof Root>, ModalProps>(
  ({ children, className, title, trigger, ...restProps }, ref) => {
    const classNames = {
      closeButton: s.closeButton,
      content: clsx(s.content, className),
      overlay: s.overlay,
      title: s.title,
    }

    return (
      <Root {...restProps}>
        <Trigger asChild>{trigger}</Trigger>
        <Portal>
          <Overlay className={classNames.overlay} />
          <Content asChild className={classNames.content} ref={ref}>
            <Card className={s.modal}>
              {title && (
                <div className={classNames.title}>
                  <Typography as={'h2'} variant={'h2'}>
                    {title}
                  </Typography>
                  <Close className={classNames.closeButton}>
                    <CloseIcon />
                  </Close>
                </div>
              )}
              {children}
            </Card>
          </Content>
        </Portal>
      </Root>
    )
  }
)

import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Close } from '@/assets'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import * as DialogFromRadix from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import s from './modal.module.scss'

export type ModalProps = {
  children?: ReactNode
  className?: string
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
} & ComponentPropsWithoutRef<typeof DialogFromRadix.Root>

export const Modal = forwardRef<ElementRef<typeof DialogFromRadix.Root>, ModalProps>(
  (props, ref) => {
    const { children, className, title, ...restProps } = props
    const classNames = {
      closeButton: s.closeButton,
      content: clsx(s.content, className),
      overlay: s.overlay,
      title: s.title,
    }

    return (
      <DialogFromRadix.Root {...restProps}>
        <DialogFromRadix.Portal>
          <DialogFromRadix.Overlay className={classNames.overlay} />
          <DialogFromRadix.Content asChild className={classNames.content} ref={ref}>
            <Card className={s.modal}>
              {title && (
                <div className={classNames.title}>
                  <Typography as={'h2'} variant={'h2'}>
                    {title}
                  </Typography>
                  <DialogFromRadix.Close className={classNames.closeButton}>
                    <Close />
                  </DialogFromRadix.Close>
                </div>
              )}
              {children}
            </Card>
          </DialogFromRadix.Content>
        </DialogFromRadix.Portal>
      </DialogFromRadix.Root>
    )
  }
)

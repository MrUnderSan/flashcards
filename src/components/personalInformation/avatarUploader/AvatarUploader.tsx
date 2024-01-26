import { useRef } from 'react'

import { EditAvatar } from '@/assets'
import { IMAGE_SCHEMA } from '@/common/const'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './avatarUploader.module.scss'

type AvatarUploaderProps = {
  avatarUrl?: string
  className?: string
  editable?: boolean
  name?: string
  updateAvatar: (avatar: AvatarUploaderValue) => void
}

export type AvatarUploaderValue = z.infer<typeof IMAGE_SCHEMA>

export const AvatarUploader = ({
  avatarUrl,
  className,
  editable,
  updateAvatar,
}: AvatarUploaderProps) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const updateAvatarHandler = (avatar: File | null) => {
    if (avatar) {
      updateAvatar(avatar)
    }
  }

  const avatarUploaderClasses = clsx(s.root, className)

  const onClickTrigger = () => {
    fileRef.current?.click()
  }

  return (
    <div className={avatarUploaderClasses}>
      <Avatar className={s.avatar} src={avatarUrl} />
      {editable && (
        <FileUploader
          className={s.uploader}
          ref={fileRef}
          setFile={updateAvatarHandler}
          trigger={
            <Button className={s.editAvatar} onClick={onClickTrigger}>
              <EditAvatar />
            </Button>
          }
        />
      )}
    </div>
  )
}

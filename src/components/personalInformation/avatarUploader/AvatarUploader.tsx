import { useRef, useState } from 'react'

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
  updateAvatar: (avatar: AvatarUploaderValue) => Promise<void>
}

export type AvatarUploaderValue = z.infer<typeof IMAGE_SCHEMA>

export const AvatarUploader = ({
  avatarUrl,
  className,
  editable,
  updateAvatar,
}: AvatarUploaderProps) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [avatar, setAvatar] = useState<File | null>(null)

  const updateAvatarHandler = async (avatar: File | null) => {
    if (avatar) {
      await updateAvatar(avatar)
      setAvatar(avatar)
    }
  }

  const avatarUploaderClasses = clsx(s.root, className)

  const onClickTrigger = () => {
    fileRef.current?.click()
  }

  return (
    <div className={avatarUploaderClasses}>
      <Avatar className={s.avatar} src={avatar ? URL.createObjectURL(avatar) : avatarUrl} />
      {editable && (
        <FileUploader
          className={s.uploader}
          ref={fileRef}
          setFile={updateAvatarHandler}
          trigger={
            <Button className={s.editAvatar} onClick={onClickTrigger}>
              <EditAvatar className={s.editAvatarIcon} />
            </Button>
          }
        />
      )}
    </div>
  )
}

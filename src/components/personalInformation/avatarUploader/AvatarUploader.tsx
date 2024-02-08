import { useRef, useState } from 'react'

import { EditAvatar } from '@/assets'
import { IMAGE_SCHEMA } from '@/common/const'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
import { Skeleton } from '@/components/ui/skeleton'
import { clsx } from 'clsx'
import { z } from 'zod'

import s from './avatarUploader.module.scss'

type AvatarUploaderProps = {
  avatarUrl?: string
  className?: string
  editable?: boolean
  isLoading?: boolean
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
  const [isUpdateAvatar, setUpdateAvatar] = useState(false)

  const updateAvatarHandler = async (avatar: File | null) => {
    setUpdateAvatar(prevState => !prevState)
    if (avatar) {
      await updateAvatar(avatar)
      setAvatar(avatar)
    }
    setUpdateAvatar(prevState => !prevState)
  }

  const avatarUploaderClasses = clsx(s.root, className)

  const onClickTrigger = () => {
    fileRef.current?.click()
  }

  return (
    <div className={avatarUploaderClasses}>
      {isUpdateAvatar || avatarUrl === undefined ? (
        <Skeleton circle height={'96px'} width={'96px'} />
      ) : (
        <Avatar className={s.avatar} src={avatar ? URL.createObjectURL(avatar) : avatarUrl} />
      )}
      {editable && (
        <FileUploader
          className={s.uploader}
          ref={fileRef}
          setFile={updateAvatarHandler}
          trigger={
            <Button className={s.editAvatar} onClick={onClickTrigger} variant={'icon'}>
              <EditAvatar />
            </Button>
          }
        />
      )}
    </div>
  )
}

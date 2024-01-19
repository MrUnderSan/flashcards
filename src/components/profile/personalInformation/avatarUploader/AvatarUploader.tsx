import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { EditAvatar } from '@/assets'
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
  name: string
  onSubmit: (data: FormData) => void
}

const AvatarUploaderSchema = z
  .instanceof(File)
  .refine(file => file.size <= 1000000, `Max image size is 1MB. The file will not be uploaded.`)
  .refine(
    file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported. The file will not be uploaded.'
  )

export type AvatarUploaderValue = z.infer<typeof AvatarUploaderSchema>

export const AvatarUploader = ({
  avatarUrl,
  className,
  editable,
  onSubmit,
}: AvatarUploaderProps) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const [avatar, setAvatar] = useState<File | null>(null)

  const avatarIsValid =
    avatar !== null &&
    ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(avatar.type) &&
    avatar.size <= 1000000

  const { handleSubmit } = useForm<AvatarUploaderValue>()

  const onSubmitHandler = () => {
    const formData = new FormData()

    if (avatarIsValid) {
      formData.append('avatar', avatar)
      onSubmit(formData)
    }
  }

  const avatarUploaderClasses = clsx(s.root, className)

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className={avatarUploaderClasses}>
        <Avatar
          className={s.avatar}
          src={avatarIsValid ? URL.createObjectURL(avatar) : avatarUrl}
          title={'avatar'}
        />
        {editable && (
          <FileUploader
            className={s.uploader}
            ref={fileRef}
            setFile={setAvatar}
            trigger={
              <Button as={'span'} className={s.editAvatar}>
                <EditAvatar />
              </Button>
            }
            validationSchema={AvatarUploaderSchema}
          />
        )}
      </div>
    </form>
  )
}

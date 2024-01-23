import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
import { Toast } from '@/components/ui/toast'
import { Meta, StoryObj } from '@storybook/react'
import { z } from 'zod'

const meta = {
  component: FileUploader,
  tags: ['autodocs'],
  title: 'components/FileUploader',
} satisfies Meta<typeof FileUploader>

export default meta

type Story = StoryObj<typeof meta>

const coverSchema = z
  .instanceof(File)
  .refine(file => file.size <= 1000000, `Max image size is 1MB. The file will not be uploaded.`)
  .refine(
    file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported. The file will not be uploaded.'
  )

const FormFileUploader = () => {
  const [cover, setCover] = useState<File | null>(null)

  const isValidImage =
    cover !== null && ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(cover.type)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
      <FileUploader
        setFile={setCover}
        trigger={
          <Button as={'span'} fullWidth>
            Change cover
          </Button>
        }
        validationSchema={coverSchema}
      />
      {isValidImage && <img alt={'cover'} src={URL.createObjectURL(cover)} />}
      <Toast />
    </div>
  )
}

export const FormImageUploader: Story = {
  args: {
    trigger: null,
    validationSchema: coverSchema,
  },
  render: args => <FormFileUploader {...args} />,
}

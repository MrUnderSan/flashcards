import { useState } from 'react'

import { IMAGE_SCHEMA } from '@/common/constants'
import { Button } from '@/components/ui/button'
import { FileUploader } from '@/components/ui/fileUploader/FileUploader'
import { Toast } from '@/components/ui/toast'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: FileUploader,
  tags: ['autodocs'],
  title: 'components/FileUploader',
} satisfies Meta<typeof FileUploader>

export default meta

type Story = StoryObj<typeof meta>

const FormFileUploader = () => {
  const [cover, setCover] = useState<File | null>(null)

  const isValidImage =
    cover !== null &&
    ['images/jpeg', 'images/jpg', 'images/png', 'images/webp'].includes(cover.type)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
      <FileUploader
        setFile={setCover}
        trigger={
          <Button as={'span'} fullWidth>
            Change cover
          </Button>
        }
        validationSchema={IMAGE_SCHEMA}
      />
      {isValidImage && <img alt={'cover'} src={URL.createObjectURL(cover)} />}
      <Toast />
    </div>
  )
}

export const FormImageUploader: Story = {
  args: {
    trigger: null,
    validationSchema: IMAGE_SCHEMA,
  },
  render: args => <FormFileUploader {...args} />,
}

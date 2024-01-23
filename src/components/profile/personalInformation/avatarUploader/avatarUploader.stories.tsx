import type { Meta, StoryObj } from '@storybook/react'

import { AvatarUploader } from '@/components/profile/personalInformation/avatarUploader/AvatarUploader'
import { Toast } from '@/components/ui/toast'

const meta = {
  argTypes: {
    onSubmit: {
      action: 'onSubmit avatar',
    },
  },
  component: AvatarUploader,
  title: 'Components/Profile/AvatarUploader',
} satisfies Meta<typeof AvatarUploader>

export default meta

type Story = StoryObj<typeof meta>

export const AvatarUploaderDemo = () => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <AvatarUploader editable name={'avatar'} onSubmit={() => {}} />
      <Toast />
    </div>
  )
}

export const editableTrue: Story = {
  args: {
    editable: true,
    name: 'avatar',
  },
  render: () => <AvatarUploaderDemo />,
}

export const editableFalse = () => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <AvatarUploader name={'avatar'} onSubmit={() => {}} />
    </div>
  )
}

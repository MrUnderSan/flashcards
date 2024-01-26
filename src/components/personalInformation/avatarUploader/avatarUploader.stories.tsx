import type { Meta, StoryObj } from '@storybook/react'

import { AvatarUploader } from '@/components/personalInformation/avatarUploader/AvatarUploader'
import { Toast } from '@/components/ui/toast'

const meta = {
  argTypes: {
    updateAvatar: {
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
      <AvatarUploader editable name={'avatar'} updateAvatar={() => {}} />
      <Toast />
    </div>
  )
}

export const EditableTrue: Story = {
  args: {
    editable: true,
    name: 'avatar',
  },
  render: () => <AvatarUploaderDemo />,
}

export const EditableFalse = () => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <AvatarUploader name={'avatar'} updateAvatar={() => {}} />
    </div>
  )
}

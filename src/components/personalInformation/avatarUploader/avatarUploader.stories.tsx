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
  const updateAvatarHandler = async (avatar: File) => {
    console.log('Updating avatar:', avatar)

    return Promise.resolve()
  }

  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <AvatarUploader editable name={'avatar'} updateAvatar={updateAvatarHandler} />
      <Toast />
    </div>
  )
}

export const EditableTrue: Story = {
  args: {
    editable: true,
    name: 'avatar',
    updateAvatar: async (avatar: File) => {
      console.log('Updating avatar:', avatar)
      // Your update avatar logic here

      // Return a promise to match the expected type
      return Promise.resolve()
    },
  },
  render: () => <AvatarUploaderDemo />,
}

export const EditableFalse = () => {
  const updateAvatarHandler = async (avatar: File) => {
    console.log('Updating avatar:', avatar)

    return Promise.resolve()
  }

  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <AvatarUploader name={'avatar'} updateAvatar={updateAvatarHandler} />
    </div>
  )
}

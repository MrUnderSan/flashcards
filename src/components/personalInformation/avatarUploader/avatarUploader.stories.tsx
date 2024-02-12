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
  title: 'Components/ProfilePage/AvatarUploader',
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
      <AvatarUploader editable updateAvatar={updateAvatarHandler} />
      <Toast />
    </div>
  )
}

export const EditableTrue: Story = {
  args: {
    editable: true,
    updateAvatar: async (avatar: File) => {
      console.log('Updating avatar:', avatar)

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
      <AvatarUploader updateAvatar={updateAvatarHandler} />
    </div>
  )
}

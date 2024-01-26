import type { Meta, StoryObj } from '@storybook/react'

import { Toast } from '@/components/ui/toast'

import { PersonalInformation } from './PersonalInformation'

const meta = {
  argTypes: {
    logout: {
      action: 'Success logout',
    },
    updateAvatar: {
      action: 'Success update avatar',
    },
    updateNickname: {
      action: 'Success update username',
    },
  },
  component: PersonalInformation,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/Profile/PersonalInformation',
} satisfies Meta<typeof PersonalInformation>

export default meta

type Story = StoryObj<typeof meta>

export const WithAvatar: Story = {
  args: {
    data: {
      avatar: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/3_avatar-1024.png',
      email: 'example@email.com',
      name: 'MyUsername',
    },
  },

  render: args => {
    return (
      <>
        <PersonalInformation {...args} />
        <Toast />
      </>
    )
  },
}

export const NoAvatar: Story = {
  args: {
    data: {
      email: 'example@email.com',
      name: 'MyUsername',
    },
  },
  render: args => {
    return (
      <>
        <PersonalInformation {...args} />
        <Toast />
      </>
    )
  },
}

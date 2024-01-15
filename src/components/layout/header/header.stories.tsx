import type { Meta, StoryObj } from '@storybook/react'

import { action } from '@storybook/addon-actions'

import { Header } from './'

const meta = {
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Unlogged: Story = {
  args: { isLoggedIn: false },
}

export const Logged: Story = {
  args: {
    isLoggedIn: true,
    profile: {
      avatar: null,
      email: 'johnsmith@it-incubator.io',
      onLogout: action('onLogout'),
      userName: 'John Smith',
    },
  },
}

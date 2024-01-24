import type { Meta, StoryObj } from '@storybook/react'

import { action } from '@storybook/addon-actions'
import { withRouter } from 'storybook-addon-react-router-v6'

import { Header } from './'

const meta = {
  component: Header,
  decorators: [withRouter],
  parameters: {
    docs: {
      story: {
        height: '60px',
      },
    },
  },
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Unlogged: Story = {
  args: { isAuth: false },
}

export const Logged: Story = {
  args: {
    isAuth: true,
    logout: action('onLogout'),
    profile: {
      email: 'johnsmith@it-incubator.io',
      name: 'John Smith',
    },
  },
}

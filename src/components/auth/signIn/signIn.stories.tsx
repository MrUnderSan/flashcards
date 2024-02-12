import type { Meta, StoryObj } from '@storybook/react'

import { withRouter } from 'storybook-addon-react-router-v6'

import { SignIn } from './'

const meta = {
  args: {},
  component: SignIn,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Components/Auth/SignInPage',
} satisfies Meta<typeof SignIn>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

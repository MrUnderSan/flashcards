import type { Meta, StoryObj } from '@storybook/react'

import { withRouter } from 'storybook-addon-react-router-v6'

import { CheckEmail } from './'

const meta = {
  args: {},
  component: CheckEmail,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'Components/Auth/CheckEmail',
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { email: 'johnsmith@it-incubator.io' },
}

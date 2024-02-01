import type { Meta, StoryObj } from '@storybook/react'

import { withRouter } from 'storybook-addon-react-router-v6'

import { BackButton } from './'

const meta = {
  args: {},
  component: BackButton,
  decorators: [withRouter],
  tags: ['autodocs'],
  title: 'components/BackButton',
} satisfies Meta<typeof BackButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

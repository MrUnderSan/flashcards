import type { Meta, StoryObj } from '@storybook/react'

import { SignUp } from './'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'Components/Auth',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const SignUpCard: Story = {
  args: {},
}

import type { Meta, StoryObj } from '@storybook/react'

import { Loader } from './'

const meta = {
  component: Loader,
  tags: ['autodocs'],
  title: 'components/Loader',
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    style: { top: 0 },
  },
}

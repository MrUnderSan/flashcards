import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/components/ui/typography'

import { Card } from './'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Typography variant={'h3'}>Card</Typography>,
    style: {
      height: '552px',
      width: ' 420px',
    },
  },
}

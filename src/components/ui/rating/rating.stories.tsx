import { Meta, StoryObj } from '@storybook/react'

import { Rating } from './Rating'

const meta = {
  component: Rating,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Rating',
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Rating1: Story = {
  args: {
    rating: 1,
  },
}
export const Rating2: Story = {
  args: {
    rating: 2,
  },
}
export const Rating3: Story = {
  args: {
    rating: 3,
  },
}
export const Rating4: Story = {
  args: {
    rating: 4,
  },
}
export const Rating5: Story = {
  args: {
    rating: 5,
  },
}

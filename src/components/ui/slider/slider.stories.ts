import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './'

const meta = {
  argTypes: {},
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderOwn: Story = {
  args: {
    defaultValue: [1, 3],
    max: 10,
    min: 1,
    minStepsBetweenThumbs: 1,
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '@/components/ui/select/Select'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { title: 'title 1', value: '1' },
  { title: 'title 2', value: '2' },
  { title: 'title 3', value: '3' },
  { title: 'title 4', value: '4' },
  { title: 'title 5 ', value: '5' },
]

export const Default: Story = {
  args: {
    disabled: false,
    label: 'Label',
    options: options,
    placeholder: 'Select-box',
  },
}

export const InPagination: Story = {
  args: {
    disabled: false,
    label: 'Label',
    options: options,
    pagination: true,
    placeholder: 'Select-box',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Label',
    options: options,
    placeholder: 'Select-box',
  },
}

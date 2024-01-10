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
  { label: 'label 1', value: '1' },
  { label: 'label 2', value: '2' },
  { label: 'label 3', value: '3' },
  { label: 'label 4', value: '4' },
  { label: 'label 5 ', value: '5' },
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

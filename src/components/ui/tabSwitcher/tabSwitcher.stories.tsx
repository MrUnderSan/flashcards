import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from './'

const meta = {
  argTypes: {
    onValueChange: { action: 'onValueChange' },
  },
  component: TabSwitcher,
  tags: ['autodocs'],
  title: 'Components/TabSwitcher',
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'Switcher 2',
    tabs: [
      { title: 'Switcher 1', value: 'Switcher 1' },

      { title: 'Switcher 2', value: 'Switcher 2' },
      { title: 'Switcher 3', value: 'Switcher 3' },
      { disabled: true, title: 'Switcher 4', value: 'Switcher 4' },

      { title: 'Switcher 5', value: 'Switcher 5' },
    ],
  },
}

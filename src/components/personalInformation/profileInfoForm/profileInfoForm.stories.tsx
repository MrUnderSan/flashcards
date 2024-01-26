import type { Meta, StoryObj } from '@storybook/react'

import { ProfileInfoForm } from './ProfileInfoForm'

const meta = {
  component: ProfileInfoForm,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  title: 'Components/Profile/ProfileInfoForm',
} satisfies Meta<typeof ProfileInfoForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { initialValues: { name: 'name' } },
}

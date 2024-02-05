import { Skeleton } from '@/components/ui/skeleton/Skeleton'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Skeleton,
  tags: ['autodocs'],
  title: 'Components/Skeleton',
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: args => {
    return (
      <div>
        <Skeleton {...args} height={24} />
        <Skeleton {...args} circle height={60} width={60} />
      </div>
    )
  },
}
